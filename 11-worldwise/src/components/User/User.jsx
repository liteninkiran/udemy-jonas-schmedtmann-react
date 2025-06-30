import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth/useAuth';
import styles from './User.module.css';

const User = () => {
    const { user, logout } = useAuth();
    const nav = useNavigate();

    const handleClick = () => {
        logout();
        nav('/');
    };

    if (!user) {
        return null;
    }

    return (
        <div className={styles.user}>
            <img src={user.avatar} alt={user.name} />
            <span>Welcome, {user.name}</span>
            <button onClick={handleClick}>Logout</button>
        </div>
    );
};

export default User;
