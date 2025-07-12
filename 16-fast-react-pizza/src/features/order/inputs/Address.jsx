import { orderContainerClass } from '../../../ui/classes';

const Address = () => {
    return (
        <div className={orderContainerClass}>
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
    );
};

export default Address;
