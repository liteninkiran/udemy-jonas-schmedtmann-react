import { useEffect, useState } from 'react';
import { CitiesContext } from './CitiesContext';

const BASE_URL = 'http://localhost:9001';

const CitiesProvider = ({ children }) => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCityData = () => {
        const fetchCities = async () => {
            try {
                setIsLoading(true);
                const url = `${BASE_URL}/cities`;
                const res = await fetch(url);
                const data = await res.json();
                setCities(data);
            } catch (err) {
                alert('Error fetching data');
            } finally {
                setIsLoading(false);
            }
        };
        fetchCities();
    };

    useEffect(fetchCityData, []);

    const value = { cities, isLoading };

    return (
        <CitiesContext.Provider value={value}>
            {children}
        </CitiesContext.Provider>
    );
};

export { CitiesProvider };
