import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import GlobalStyles from './styles/GlobalStyles';
import Dashboard from '@pages/Dashboard';
import Bookings from '@pages/Bookings';
import Cabins from '@pages/Cabins';
import Users from '@pages/Users';
import Settings from '@pages/Settings';
import Account from '@pages/Account';
import Login from '@pages/Login';
import PageNotFound from '@pages/PageNotFound';
import AppLayout from './ui/AppLayout';
import { toasterProps } from '@utils/toaster';

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
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <GlobalStyles />
            <BrowserRouter future={future}>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route
                            index
                            element={<Navigate replace to='dashboard' />}
                        />
                        <Route path='dashboard' element={<Dashboard />} />
                        <Route path='bookings' element={<Bookings />} />
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
    );
};

export default App;
