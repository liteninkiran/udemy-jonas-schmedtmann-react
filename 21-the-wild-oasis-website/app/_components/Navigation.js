import Link from 'next/link';
import { auth } from '../_lib/auth';

const Navigation = async () => {
    const session = await auth();

    return (
        <nav className='z-10 text-xl'>
            <ul className='flex gap-16 items-center'>
                <li>
                    <Link
                        href='/cabins'
                        className='hover:text-accent-400 transition-colors'
                    >
                        Cabins
                    </Link>
                </li>
                <li>
                    <Link
                        href='/about'
                        className='hover:text-accent-400 transition-colors'
                    >
                        About
                    </Link>
                </li>
                <li>
                    {session?.user?.image ? (
                        <Link
                            href='/account'
                            className='hover:text-accent-400 transition-colors flex items-center gap-4'
                        >
                            <img
                                src={session.user.image}
                                className='h-8 rounded-full'
                                alt={session.user.name}
                                referrerPolicy='no-referrer'
                            />
                            <span>Guest Area</span>
                        </Link>
                    ) : (
                        <Link
                            href='/account'
                            className='hover:text-accent-400 transition-colors'
                        >
                            Guest Area
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
