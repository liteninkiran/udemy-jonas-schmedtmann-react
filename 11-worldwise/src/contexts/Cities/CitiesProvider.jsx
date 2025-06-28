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

    const fetchCityData = () => {
        fetchCities('cities', setCities);
    };
    const getCity = async (id) => fetchCities(`cities/${id}`, setCurrentCity);
    const value = { cities, isLoading, currentCity, getCity };

    useEffect(fetchCityData, []);

    return (
        <CitiesContext.Provider value={value}>
            {children}
        </CitiesContext.Provider>
    );
};

export { CitiesProvider };
