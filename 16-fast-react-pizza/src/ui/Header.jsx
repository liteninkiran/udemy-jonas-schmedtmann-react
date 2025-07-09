import SearchOrder from '../features/order/SearchOrder';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <Link to='/' className='tracking-widest'>
                Fast React Pizza Co.
            </Link>
            <SearchOrder />
        </header>
    );
};

export default Header;
