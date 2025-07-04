import styles from './Sidebar.module.css';

const SidebarFooter = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                &copy; Copyright {new Date().getFullYear()} by Worldwise Inc.
            </p>
        </footer>
    );
};

export default SidebarFooter;
