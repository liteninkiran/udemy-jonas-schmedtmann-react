import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';

const Header = () => {
    return (
        <header className='border-b border-primary-900 px-8 py-5'>
            <div className='flex justify-between items-center mx-auto'>
                <Logo />
                <Navigation />
            </div>
        </header>
    );
};

export default Header;
