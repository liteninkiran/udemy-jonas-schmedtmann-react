import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo.png';

const Logo = () => {
    return (
        <Link href='/' className='flex items-center gap-4 z-10'>
            <Image
                height='60'
                width='60'
                quality={100}
                alt='The Wild Oasis logo'
                src={logo}
            />
            <span className='text-xl font-semibold text-primary-100'>
                The Wild Oasis
            </span>
        </Link>
    );
};

export default Logo;
