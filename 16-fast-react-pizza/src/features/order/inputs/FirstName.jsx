import { orderContainerClass } from '../../../ui/classes';

const FirstName = ({ username }) => {
    return (
        <div className={orderContainerClass}>
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
    );
};

export default FirstName;
