import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path='product' element={<Product />} />
                <Route path='pricing' element={<Pricing />} />
                <Route path='login' element={<Login />} />
                <Route path='app' element={<AppLayout />}>
                    <Route index element={<p>INDEX</p>} />
                    <Route path='cities' element={<p>List of Cities</p>} />
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
