import { Outlet } from 'react-router-dom';
import AppNav from '../AppNav/AppNav';
import Logo from '../Logo/Logo';
import styles from './Sidebar.module.css';
import SidebarFooter from './SidebarFooter';

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />
            <Outlet />
            <SidebarFooter />
        </div>
    );
};

export default Sidebar;
