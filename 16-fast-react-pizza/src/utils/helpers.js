import { redirect } from 'react-router-dom';
import { createOrder, getMenu, getOrder } from '../services/apiRestaurant';
import store from '../store';
import { clearCart } from '../features/cart/cartSlice';

const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str,
    );

const INVALID_PHONE =
    'Please enter a valid phone number. We might need it to contact you.';

export const formatCurrency = (value) => {
    return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'GBP',
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

    const errors = {};
    if (!isValidPhone(order.phone)) {
        errors.phone = INVALID_PHONE;
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    const newOrder = await createOrder(order);

    store.dispatch(clearCart());

    return redirect(`/order/${newOrder.id}`);
};
