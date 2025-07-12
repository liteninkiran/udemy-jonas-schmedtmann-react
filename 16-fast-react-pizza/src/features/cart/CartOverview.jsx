import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { cartContainerClass, cartParaClass } from '../../ui/classes';

const CartOverview = () => {
    const totalCartQuantity = useSelector(getTotalCartQuantity);
    const totalCartPrice = useSelector(getTotalCartPrice);

    if (!totalCartQuantity) return null;

    return (
        <div className={cartContainerClass}>
            <p className={cartParaClass}>
                <span>{totalCartQuantity} pizzas</span>
                <span>{formatCurrency(totalCartPrice)}</span>
            </p>
            <Link to='/cart'>Open cart &rarr;</Link>
        </div>
    );
};

export default CartOverview;
