import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

const UpdateItemQuantity = ({ pizzaId, currentQuantity }) => {
    const dispatch = useDispatch();
    const handleMinus = () => dispatch(decreaseItemQuantity(pizzaId));
    const handlePlus = () => dispatch(increaseItemQuantity(pizzaId));

    return (
        <div className='flex items-center gap-2 md:gap-3'>
            <Button type='round' onClick={handleMinus}>
                -
            </Button>
            <span className='text-sm font-medium'>{currentQuantity}</span>
            <Button type='round' onClick={handlePlus}>
                +
            </Button>
        </div>
    );
};

export default UpdateItemQuantity;
