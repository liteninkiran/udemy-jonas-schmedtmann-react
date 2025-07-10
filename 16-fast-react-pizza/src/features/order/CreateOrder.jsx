import { useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router-dom';

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
    const cart = fakeCart;
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const formErrors = useActionData();
    const buttonClasses = [
        'bg-yellow-400',
        'uppercase',
        'tracking-wide',
        'font-semibold',
        'text-stone-800',
        'py-3',
        'px-4',
        'inline-block',
        'rounded-full',
        'hover:bg-yellow-300',
        'transition-colors',
        'duration-300',
        'focus:outline-none',
        'focus:ring',
        'focus:ring-yellow-300',
        'focus:bg-yellow-300',
        'focus:ring-offset-2',
        'disabled:cursor-not-allowed',
    ];

    return (
        <div>
            <h2>Ready to order? Lets go!</h2>

            <Form method='POST'>
                <div>
                    <label>First Name</label>
                    <input type='text' name='customer' required />
                </div>

                <div>
                    <label>Phone number</label>
                    <div>
                        <input type='tel' name='phone' required />
                        {formErrors?.phone && <p>{formErrors.phone}</p>}
                    </div>
                </div>

                <div>
                    <label>Address</label>
                    <div>
                        <input type='text' name='address' required />
                    </div>
                </div>

                <div>
                    <input
                        type='checkbox'
                        name='priority'
                        id='priority'
                        // value={withPriority}
                        // onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor='priority'>
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    <input
                        type='hidden'
                        name='cart'
                        value={JSON.stringify(cart)}
                    />

                    <button
                        disabled={isSubmitting}
                        className={buttonClasses.join(' ')}
                    >
                        {isSubmitting ? 'Placing order....' : `Order now`}
                    </button>
                </div>
            </Form>
        </div>
    );
};

export default CreateOrder;
