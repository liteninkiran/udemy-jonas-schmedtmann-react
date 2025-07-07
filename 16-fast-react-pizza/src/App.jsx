import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import Menu from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder from './features/order/CreateOrder';
import Order from './features/order/Order';
import AppLayout from './ui/AppLayout';
import { loader as menuLoader } from './utils/helpers';

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/menu',
                element: <Menu />,
                loader: menuLoader,
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '/order/new',
                element: <CreateOrder />,
            },
            {
                path: '/order/:orderId',
                element: <Order />,
            },
        ],
    },
]);

const App = () => {
    return (
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
    );
};

export default App;
