import { redirect } from 'react-router-dom';
import { createOrder, getMenu, getOrder } from '../services/apiRestaurant';

export const formatCurrency = (value) => {
    return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'EUR',
    }).format(value);
};

export const formatDate = (dateStr) => {
    return new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(dateStr));
};

export const calcMinutesLeft = (dateStr) => {
    const d1 = new Date().getTime();
    const d2 = new Date(dateStr).getTime();
    return Math.round((d2 - d1) / 60000);
};

export const menuLoader = async () => await getMenu();

export const orderLoader = async ({ params }) => await getOrder(params.orderId);

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === 'true',
    };

    const newOrder = await createOrder(order);

    console.log(order);

    return redirect(`/order/${newOrder.id}`);
};
