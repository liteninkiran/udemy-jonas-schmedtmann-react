import Button from '../../ui/Button';
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

            <Form method="POST">
                {/* First Name */}
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        name="customer"
                        required
                        className="input"
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label>Phone number</label>
                    <div>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter your telephone number"
                            required
                            className="input"
                        />
                        {formErrors?.phone && <p>{formErrors.phone}</p>}
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label>Address</label>
                    <div className="grow">
                        <input
                            type="text"
                            name="address"
                            placeholder="Enter your address"
                            required
                            className="input"
                        />
                    </div>
                </div>

                {/* Priority */}
                <div>
                    <input
                        type="checkbox"
                        name="priority"
                        id="priority"
                        // value={withPriority}
                        // onChange={(e) => setWithPriority(e.target.checked)}
                        className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                    />
                    <label htmlFor="priority">
                        Want to yo give your order priority?
                    </label>
                </div>

                {/* Submit */}
                <div>
                    <input
                        type="hidden"
                        name="cart"
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
