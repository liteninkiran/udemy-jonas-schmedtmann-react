import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import styles from './PageNav.module.css';

const PageNav = () => {
    const pages = [
        { route: '/pricing', label: 'Pricing' },
        { route: '/product', label: 'Product' },
        { route: '/login', label: 'Login', class: styles.ctaLink },
    ];
    const mapFn = (page) => (
        <li key={page.label}>
            <NavLink to={page.route} className={page.class}>
                {page.label}
            </NavLink>
        </li>
    );
    return (
        <nav className={styles.nav}>
            <Logo />
            <ul>{pages.map(mapFn)}</ul>
        </nav>
    );
};

export default PageNav;
