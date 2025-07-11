import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { cartContainerClasses, cartParaClasses } from '../../ui/classes';

const CartOverview = () => {
    const totalCartQuantity = useSelector(getTotalCartQuantity);
    const totalCartPrice = useSelector(getTotalCartPrice);

    if (!totalCartQuantity) return null;

    return (
        <div className={cartContainerClasses.join(' ')}>
            <p className={cartParaClasses.join(' ')}>
                <span>{totalCartQuantity} pizzas</span>
                <span>{formatCurrency(totalCartPrice)}</span>
            </p>
            <Link to='/cart'>Open cart &rarr;</Link>
        </div>
    );
};

export default CartOverview;
