import { orderContainerClass } from '../../../ui/classes';
import { useActionData } from 'react-router-dom';

const PhoneNumber = () => {
    const formErrors = useActionData();
    return (
        <div className={orderContainerClass}>
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
    );
};

export default PhoneNumber;
