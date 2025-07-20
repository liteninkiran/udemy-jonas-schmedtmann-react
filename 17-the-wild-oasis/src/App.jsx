import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import GlobalStyles from './styles/GlobalStyles';
import Account from '@pages/Account';
import Bookings from '@pages/Bookings';
import Booking from '@pages/Booking';
import Cabins from '@pages/Cabins';
import Checkin from '@pages/Checkin';
import Dashboard from '@pages/Dashboard';
import Settings from '@pages/Settings';
import Login from '@pages/Login';
import PageNotFound from '@pages/PageNotFound';
import Users from '@pages/Users';
import AppLayout from './ui/AppLayout';
import { toasterProps } from '@utils/toaster';
import ProtectedRoute from '@ui/ProtectedRoute';
import { DarkModeProvider } from './context/DarkModeContext';

const future = {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            //staleTime: 60 * 1000,
            staleTime: 0,
        },
    },
});

const App = () => {
    return (
        <DarkModeProvider>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <GlobalStyles />
                <BrowserRouter future={future}>
                    <Routes>
                        <Route
                            element={
                                <ProtectedRoute>
                                    <AppLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route
                                index
                                element={<Navigate replace to='dashboard' />}
                            />
                            <Route path='dashboard' element={<Dashboard />} />
                            <Route path='bookings' element={<Bookings />} />
                            <Route
                                path='bookings/:bookingId'
                                element={<Booking />}
                            />
                            <Route
                                path='checkin/:bookingId'
                                element={<Checkin />}
                            />
                            <Route path='cabins' element={<Cabins />} />
                            <Route path='users' element={<Users />} />
                            <Route path='settings' element={<Settings />} />
                            <Route path='account' element={<Account />} />
                        </Route>

                        <Route path='login' element={<Login />} />
                        <Route path='*' element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>

                <Toaster {...toasterProps} />
            </QueryClientProvider>
        </DarkModeProvider>
    );
};

export default App;
