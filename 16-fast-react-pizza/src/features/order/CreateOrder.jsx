import { useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../../ui/Button';

const fakeCart = [
    {
        pizzaId: 12,
        name: 'Mediterranean',
        quantity: 2,
        unitPrice: 16,
        totalPrice: 32,
    },
    {
        pizzaId: 6,
        name: 'Vegetale',
        quantity: 1,
        unitPrice: 13,
        totalPrice: 13,
    },
    {
        pizzaId: 11,
        name: 'Spinach and Mushroom',
        quantity: 1,
        unitPrice: 15,
        totalPrice: 15,
    },
];

const CreateOrder = () => {
    // const [withPriority, setWithPriority] = useState(false);
    const { username } = useSelector((state) => state.user);
    const cart = fakeCart;
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const formErrors = useActionData();
    const containerClasses =
        'mb-5 flex flex-col gap-2 sm:flex-row sm:items-center';

    return (
        <div className='px-4 py-6'>
            <h2 className='mb-8 text-xl font-semibold'>
                Ready to order? Let&apos;s go!
            </h2>

            <Form method='POST'>
                {/* First Name */}
                <div className={containerClasses}>
                    <label htmlFor='customer' className='sm:basis-40'>
                        First Name
                    </label>
                    <input
                        type='text'
                        placeholder='Enter your name'
                        defaultValue={username}
                        name='customer'
                        required
                        className='input grow'
                    />
                </div>

                {/* Phone Number */}
                <div className={containerClasses}>
                    <label htmlFor='phone' className='sm:basis-40'>
                        Phone number
                    </label>
                    <div className='grow'>
                        <input
                            type='tel'
                            name='phone'
                            placeholder='Enter your telephone number'
                            required
                            className='input w-full'
                        />
                        {formErrors?.phone && (
                            <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                                {formErrors.phone}
                            </p>
                        )}
                    </div>
                </div>

                {/* Address */}
                <div className={containerClasses}>
                    <label htmlFor='address' className='sm:basis-40'>
                        Address
                    </label>
                    <div className='grow'>
                        <input
                            type='text'
                            name='address'
                            placeholder='Enter your address'
                            required
                            className='input w-full'
                        />
                    </div>
                </div>

                {/* Priority */}
                <div className='mb-12 flex items-center gap-5'>
                    <input
                        type='checkbox'
                        name='priority'
                        id='priority'
                        // value={withPriority}
                        // onChange={(e) => setWithPriority(e.target.checked)}
                        className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
                    />
                    <label className='font-medium' htmlFor='priority'>
                        Want to give your order priority?
                    </label>
                </div>

                {/* Submit */}
                <div>
                    <input
                        type='hidden'
                        name='cart'
                        value={JSON.stringify(cart)}
                    />

                    <Button disabled={isSubmitting}>
                        {isSubmitting ? 'Placing order....' : 'Order now'}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CreateOrder;
