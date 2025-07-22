import Logo from '@/app/_components/Logo';
import Navigation from '@/app/_components/Navigation';
import '@/app/_styles/globals.css';

export const metadata = {
    title: {
        template: 'The Wild Oasis | %s',
        default: 'The Wild Oasis',
    },
    description:
        'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and forests.',
};

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body className={`bg-primary-950 text-primary-100 min-h-screen`}>
                <header>
                    <Logo />
                    <Navigation />
                </header>
                <main>{children}</main>
                <footer>Copyright by The Wild Oasis</footer>
            </body>
        </html>
    );
};

export default RootLayout;
