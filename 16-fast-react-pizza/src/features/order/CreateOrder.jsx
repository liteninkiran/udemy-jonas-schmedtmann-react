import { useState } from 'react';
import { Form, useNavigation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCart } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import FirstName from './inputs/FirstName';
import PhoneNumber from './inputs/PhoneNumber';
import Address from './inputs/Address';
import Priority from './inputs/Priority';
import SubmitButton from './inputs/SubmitButton';

const CreateOrder = () => {
    const [withPriority, setWithPriority] = useState(false);
    const user = useSelector((state) => state.user);
    const cart = useSelector(getCart);
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    if (!cart.length) {
        return <EmptyCart />;
    }

    return (
        <div className='px-4 py-6'>
            <h2 className='mb-8 text-xl font-semibold'>
                Ready to order? Let&apos;s go!
            </h2>

            <Form method='POST'>
                {/* First Name */}
                <FirstName username={user.username} />

                {/* Phone Number */}
                <PhoneNumber />

                {/* Address */}
                <Address user={user} />

                {/* Priority */}
                <Priority
                    withPriority={withPriority}
                    setWithPriority={setWithPriority}
                />

                {/* Submit */}
                <SubmitButton
                    cart={cart}
                    isSubmitting={isSubmitting}
                    withPriority={withPriority}
                />
            </Form>
        </div>
    );
};

export default CreateOrder;
