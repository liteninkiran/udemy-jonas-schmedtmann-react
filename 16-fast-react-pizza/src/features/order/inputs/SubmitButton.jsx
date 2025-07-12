import Button from '../../../ui/Button';
import { useSelector } from 'react-redux';
import { getTotalCartPrice } from '../../cart/cartSlice';
import { formatCurrency } from '../../../utils/helpers';

const SubmitButton = ({ cart, isSubmitting, withPriority }) => {
    const totalCartPrice = useSelector(getTotalCartPrice);
    const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
    const totalPrice = totalCartPrice + priorityPrice;
    return (
        <div>
            <input type='hidden' name='cart' value={JSON.stringify(cart)} />

            <Button disabled={isSubmitting}>
                {isSubmitting
                    ? 'Placing order....'
                    : `Order now ${formatCurrency(totalPrice)}`}
            </Button>
        </div>
    );
};

export default SubmitButton;
