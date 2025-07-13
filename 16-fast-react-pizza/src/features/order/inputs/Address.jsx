import { useDispatch } from 'react-redux';
import { orderContainerClass } from '../../../ui/classes';
import { fetchAddress } from '../../user/userSlice';
import Button from '../../../ui/Button';

const Address = ({ user }) => {
    const dispatch = useDispatch();
    const {
        status: addressStatus,
        position,
        address,
        error: addressError,
    } = user;
    const isLoadingAddress = addressStatus === 'loading';
    const clickHandler = (e) => {
        e.preventDefault();
        dispatch(fetchAddress());
    };
    return (
        <div className={`${orderContainerClass} relative`}>
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
                    defaultValue={address}
                    disabled={isLoadingAddress}
                />
                {addressStatus === 'error' && (
                    <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                        {addressError}
                    </p>
                )}
            </div>

            {!position.latitude && !position.longitude && (
                <span className='absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]'>
                    <Button
                        disabled={isLoadingAddress}
                        type='small'
                        onClick={clickHandler}
                    >
                        Get position
                    </Button>
                </span>
            )}

            <input
                type='hidden'
                name='position'
                value={
                    position.longitude && position.latitude
                        ? `${position.latitude},${position.longitude}`
                        : ''
                }
            />
        </div>
    );
};

export default Address;
