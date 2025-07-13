import { useState } from 'react';
import { Form, useNavigation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import FirstName from './inputs/FirstName';
import PhoneNumber from './inputs/PhoneNumber';
import Address from './inputs/Address';
import Priority from './inputs/Priority';
import SubmitButton from './inputs/SubmitButton';
import { fetchAddress } from '../user/userSlice';

const CreateOrder = () => {
    const [withPriority, setWithPriority] = useState(false);
    const { username } = useSelector((state) => state.user);
    const cart = useSelector(getCart);
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const dispatch = useDispatch();

    if (!cart.length) {
        return <EmptyCart />;
    }

    return (
        <div className='px-4 py-6'>
            <h2 className='mb-8 text-xl font-semibold'>
                Ready to order? Let&apos;s go!
            </h2>

            <button onClick={() => dispatch(fetchAddress())}>
                Get Position
            </button>

            <Form method='POST'>
                {/* First Name */}
                <FirstName username={username} />

                {/* Phone Number */}
                <PhoneNumber />

                {/* Address */}
                <Address />

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
