import { useEffect, useState } from 'react';
import { CitiesContext } from './CitiesContext';

const BASE_URL = 'http://localhost:9001';

const CitiesProvider = ({ children }) => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    const fetchCities = async (domain, setter) => {
        try {
            setIsLoading(true);
            const url = `${BASE_URL}/${domain}`;
            const res = await fetch(url);
            const data = await res.json();
            setter(data);
        } catch (err) {
            alert('Error fetching data');
        } finally {
            setIsLoading(false);
        }
    };

    const createCity = async (newCity) => {
        try {
            setIsLoading(true);
            const url = `${BASE_URL}/cities`;
            const options = {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: { 'Content-Type': 'application/json' },
            };
            const res = await fetch(url, options);
            const data = await res.json();
            setCities([...cities, data]);
        } catch (err) {
            alert('Error creating city');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCityData = () => {
        fetchCities('cities', setCities);
    };

    const deleteCity = async (id) => {
        try {
            setIsLoading(true);
            const url = `${BASE_URL}/cities/${id}`;
            const options = {
                method: 'DELETE',
            };
            await fetch(url, options);
            const filterFn = (city) => city.id !== id;
            setCities((cities) => cities.filter(filterFn));
        } catch (err) {
            alert('Error deleting city');
        } finally {
            setIsLoading(false);
        }
    };

    const getCity = async (id) => fetchCities(`cities/${id}`, setCurrentCity);

    const value = {
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
    };

    useEffect(fetchCityData, []);

    return (
        <CitiesContext.Provider value={value}>
            {children}
        </CitiesContext.Provider>
    );
};

export { CitiesProvider };
