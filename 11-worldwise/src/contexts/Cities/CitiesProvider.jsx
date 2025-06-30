import { useEffect, useReducer } from 'react';
import { CitiesContext } from './CitiesContext';

const BASE_URL = 'http://localhost:9001';

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: '',
};

const reducer = (state, action) => {
    const filterFn = (city) => city.id !== action.payload;
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                isLoading: true,
            };
        case 'cities/loaded':
            return {
                ...state,
                isLoading: false,
                cities: action.payload,
            };
        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload,
            };
        case 'city/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };
        case 'city/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(filterFn),
                currentCity: {},
            };
        case 'rejected':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

const CitiesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { cities, isLoading, currentCity, error } = state;

    const fetchCities = async (domain, type) => {
        dispatch({ type: 'loading' });
        try {
            const url = `${BASE_URL}/${domain}`;
            const res = await fetch(url);
            const data = await res.json();
            dispatch({ type, payload: data });
        } catch (err) {
            dispatch({ type: 'rejected', payload: 'Error fetching data' });
        }
    };

    const createCity = async (newCity) => {
        dispatch({ type: 'loading' });
        try {
            const url = `${BASE_URL}/cities`;
            const options = {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: { 'Content-Type': 'application/json' },
            };
            const res = await fetch(url, options);
            const data = await res.json();
            dispatch({ type: 'city/created', payload: data });
        } catch (err) {
            alert('Error creating city');
        }
    };

    const deleteCity = async (id) => {
        dispatch({ type: 'loading' });
        try {
            const url = `${BASE_URL}/cities/${id}`;
            const options = {
                method: 'DELETE',
            };
            await fetch(url, options);
            dispatch({ type: 'city/deleted', payload: id });
        } catch (err) {
            dispatch({
                type: 'rejected',
                payload: 'There was an error deleting the city...',
            });
        }
    };

    const fetchCity = () => {
        fetchCities('cities', 'cities/loaded');
    };

    const getCity = async (id) => {
        if (Number(id) === currentCity.id) {
            return;
        }
        fetchCities(`cities/${id}`, 'city/loaded');
    };

    const value = {
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
    };

    useEffect(fetchCity, []);

    return (
        <CitiesContext.Provider value={value}>
            {children}
        </CitiesContext.Provider>
    );
};

export { CitiesProvider };
