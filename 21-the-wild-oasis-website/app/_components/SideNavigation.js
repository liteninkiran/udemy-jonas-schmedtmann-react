'use client';

import {
    CalendarDaysIcon,
    HomeIcon,
    UserIcon,
} from '@heroicons/react/24/solid';
import SignOutButton from './SignOutButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
    {
        name: 'Home',
        href: '/account',
        icon: <HomeIcon className='h-5 w-5 text-primary-600' />,
    },
    {
        name: 'Reservations',
        href: '/account/reservations',
        icon: <CalendarDaysIcon className='h-5 w-5 text-primary-600' />,
    },
    {
        name: 'Guest profile',
        href: '/account/profile',
        icon: <UserIcon className='h-5 w-5 text-primary-600' />,
    },
];

const linkClasses = [
    'py-3',
    'px-5',
    'hover:bg-primary-900',
    'hover:text-primary-100',
    'transition-colors',
    'flex',
    'items-center',
    'gap-4',
    'font-semibold',
    'text-primary-200',
];

const SideNavigation = () => {
    const pathname = usePathname();
    const activeClass = (href) => (pathname === href ? ' bg-primary-900' : '');
    const linkClass = linkClasses.join(' ');
    const mapFn = (link) => (
        <li key={link.name}>
            <Link
                className={linkClass + activeClass(link.href)}
                href={link.href}
            >
                {link.icon}
                <span>{link.name}</span>
            </Link>
        </li>
    );
    return (
        <nav className='border-r border-primary-900'>
            <ul className='flex flex-col gap-2 h-full text-lg'>
                {navLinks.map(mapFn)}

                <li className='mt-auto'>
                    <SignOutButton />
                </li>
            </ul>
        </nav>
    );
};

export default SideNavigation;
