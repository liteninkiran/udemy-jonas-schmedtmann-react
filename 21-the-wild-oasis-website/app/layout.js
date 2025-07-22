import Header from '@/app/_components/Header';
import '@/app/_styles/globals.css';
import { Josefin_Sans } from 'next/font/google';

export const metadata = {
    title: {
        template: 'The Wild Oasis | %s',
        default: 'The Wild Oasis',
    },
    description:
        'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and forests.',
};

const josefin = Josefin_Sans({
    subsets: ['latin'],
    display: 'swap',
});

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body
                className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
            >
                <Header />
                <div className='flex-1 px-8 py-12 grid'>
                    <main className='mx-auto w-full '>{children}</main>
                </div>
            </body>
        </html>
    );
};

export default RootLayout;
