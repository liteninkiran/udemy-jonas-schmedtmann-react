import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import CityList from './components/CityList';
import { useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:9001';

const App = () => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
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
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path='product' element={<Product />} />
                <Route path='pricing' element={<Pricing />} />
                <Route path='login' element={<Login />} />
                <Route path='app' element={<AppLayout />}>
                    <Route
                        index
                        element={
                            <CityList cities={cities} isLoading={isLoading} />
                        }
                    />
                    <Route
                        path='cities'
                        element={
                            <CityList cities={cities} isLoading={isLoading} />
                        }
                    />
                    <Route
                        path='countries'
                        element={<p>List of Countries</p>}
                    />
                    <Route path='form' element={<p>Form</p>} />
                </Route>
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
