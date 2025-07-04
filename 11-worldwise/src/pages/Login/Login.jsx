// React
import { useEffect, useState } from 'react';

// Components
import PageNav from '../../components/PageNav/PageNav';
import Button from '../../components/Button/Button';

// Hooks
import { useAuth } from '../../contexts/Auth/useAuth';
import { useNavigate } from 'react-router-dom';

// Styles
import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('jack@example.com');
    const [password, setPassword] = useState('qwerty');

    const { login, isAuthenticated } = useAuth();
    const nav = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            login(email, password);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            nav('/app', { replace: true });
        }
    }, [isAuthenticated, nav]);

    return (
        <main className={styles.login}>
            <PageNav />
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label htmlFor='email'>Email address</label>
                    <input
                        type='email'
                        id='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div>
                    <Button type='primary'>Login</Button>
                </div>
            </form>
        </main>
    );
};

export default Login;
