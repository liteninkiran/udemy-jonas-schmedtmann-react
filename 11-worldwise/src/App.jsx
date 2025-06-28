import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Homepage from './pages/Homepage/Homepage';
import Product from './pages/Product/Product';
import Pricing from './pages/Pricing/Pricing';
import Login from './pages/Login/Login';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import AppLayout from './pages/AppLayout/AppLayout';

import CityList from './components/CityList/CityList';
import CountryList from './components/CountryList/CountryList';
import City from './components/City/City';
import Form from './components/Form/Form';

const BASE_URL = 'http://localhost:9001';

const App = () => {
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

    return (
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <Routes>
                <Route index element={<Homepage />} />
                <Route path='product' element={<Product />} />
                <Route path='pricing' element={<Pricing />} />
                <Route path='login' element={<Login />} />
                <Route path='app' element={<AppLayout />}>
                    <Route index element={<Navigate to='cities' replace />} />
                    <Route
                        path='cities'
                        element={
                            <CityList cities={cities} isLoading={isLoading} />
                        }
                    />
                    <Route path='cities/:id' element={<City />}></Route>
                    <Route
                        path='countries'
                        element={
                            <CountryList
                                cities={cities}
                                isLoading={isLoading}
                            />
                        }
                    />
                    <Route path='form' element={<Form />} />
                </Route>
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
