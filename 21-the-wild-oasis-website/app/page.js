import Link from 'next/link';
import Navigation from './components/Navigation';

const Home = () => {
    return (
        <div>
            <Navigation />
            <h1>The Wild Oasis</h1>
            <Link href='/cabins'>Explore Luxury Cabins</Link>
        </div>
    );
};

export default Home;
