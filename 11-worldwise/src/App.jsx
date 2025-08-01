// React
import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Pages
const Homepage = lazy(() => import('./pages/Homepage/Homepage'));
const Product = lazy(() => import('./pages/Product/Product'));
const Pricing = lazy(() => import('./pages/Pricing/Pricing'));
const Login = lazy(() => import('./pages/Login/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout/AppLayout'));
const PageNotFound = lazy(() => import('./pages/PageNotFound/PageNotFound'));
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';

// Components
import CityList from './components/CityList/CityList';
import CountryList from './components/CountryList/CountryList';
import City from './components/City/City';
import Form from './components/Form/Form';
import SpinnerFullPage from './components/SpinnerFullPage/SpinnerFullPage';

// Providers
import { CitiesProvider } from './contexts/Cities/CitiesProvider';
import { AuthProvider } from './contexts/Auth/AuthProvider';

const App = () => {
    const appElement = (
        <ProtectedRoute>
            <AppLayout />
        </ProtectedRoute>
    );
    const rootRoute = <Navigate to='cities' replace />;
    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Suspense fallback={<SpinnerFullPage />}>
                        <Routes>
                            <Route index element={<Homepage />} />
                            <Route path='product' element={<Product />} />
                            <Route path='pricing' element={<Pricing />} />
                            <Route path='login' element={<Login />} />
                            <Route path='app' element={appElement}>
                                <Route index element={rootRoute} />
                                <Route path='cities' element={<CityList />} />
                                <Route
                                    path='cities/:id'
                                    element={<City />}
                                ></Route>
                                <Route
                                    path='countries'
                                    element={<CountryList />}
                                />
                                <Route path='form' element={<Form />} />
                            </Route>
                            <Route path='*' element={<PageNotFound />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    );
};

export default App;
