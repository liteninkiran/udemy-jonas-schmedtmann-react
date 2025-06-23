import { Link } from 'react-router-dom';
import PageNav from '../components/PageNav';
import AppNav from '../components/AppNav';

const Homepage = () => {
    return (
        <div>
            <PageNav />
            <AppNav />
            <h1>Worldwise</h1>
            <Link to='/app'>App Layout</Link>
        </div>
    );
};

export default Homepage;
