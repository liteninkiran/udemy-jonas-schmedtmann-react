import OrderItem from './OrderItem';

import { useFetcher, useLoaderData } from 'react-router-dom';
import {
    calcMinutesLeft,
    formatCurrency,
    formatDate,
} from '../../utils/helpers';
import { useEffect } from 'react';
import UpdateOrder from './UpdateOrder';

const Order = () => {
    const order = useLoaderData();
    const fetcher = useFetcher();

    // Everyone can search for all orders, so for privacy reasons we will
    // exclude names or address, these are only for the restaurant staff
    const {
        id,
        status,
        priority,
        priorityPrice,
        orderPrice,
        estimatedDelivery,
        cart,
    } = order;

    const deliveryIn = calcMinutesLeft(estimatedDelivery);
    const menu = fetcher?.data;
    const getPizzaById = (id) => menu?.find((el) => el.id === id);
    const getIngredients = (id) => getPizzaById(id)?.ingredients ?? [];
    const mapFn = (item) => (
        <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={getIngredients(item.pizzaId)}
        />
    );
    const effectFn = () => {
        if (!fetcher.data && fetcher.state === 'idle') {
            fetcher.load('/menu');
        }
    };

    useEffect(effectFn, [fetcher]);

    return (
        <div className='space-y-8 px-4 py-6'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
                <h2 className='text-xl font-semibold'>Order #{id} status</h2>

                <div className='space-x-2'>
                    {priority && (
                        <span className='rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50'>
                            Priority
                        </span>
                    )}
                    <span className='rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50'>
                        {status} order
                    </span>
                </div>
            </div>

            <div className='flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5'>
                <p className='font-medium'>
                    {deliveryIn >= 0
                        ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
                        : 'Order should have arrived'}
                </p>
                <p className='text-xs text-stone-500'>
                    (Estimated delivery: {formatDate(estimatedDelivery)})
                </p>
            </div>

            <ul className='dive-stone-200 divide-y border-b border-t'>
                {cart.map(mapFn)}
            </ul>

            <div className='space-y-2 bg-stone-200 px-6 py-5'>
                <p className='text-sm font-medium text-stone-600'>
                    Price pizza: {formatCurrency(orderPrice)}
                </p>
                {priority && (
                    <p className='text-sm font-medium text-stone-600'>
                        Price priority: {formatCurrency(priorityPrice)}
                    </p>
                )}
                <p className='font-bold'>
                    To pay on delivery:
                    {formatCurrency(orderPrice + priorityPrice)}
                </p>
            </div>
            {!priority && <UpdateOrder />}
        </div>
    );
};

export default Order;
