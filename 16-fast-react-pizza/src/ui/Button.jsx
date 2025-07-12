import { Link } from 'react-router-dom';
import { baseClass, secondaryClass } from './classes';

const Button = ({ children, disabled, to, type = 'primary', onClick }) => {
    const base = baseClass;
    const secondary = secondaryClass;

    const styles = {
        primary: base + ' px-4 py-3 md:px-6 md:py-4',
        small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
        round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
        secondary,
    };

    if (to) {
        return (
            <Link to={to} className={styles[type]}>
                {children}
            </Link>
        );
    }

    if (onClick) {
        return (
            <button
                disabled={disabled}
                className={styles[type]}
                onClick={onClick}
            >
                {children}
            </button>
        );
    }

    return (
        <button disabled={disabled} className={styles[type]}>
            {children}
        </button>
    );
};

export default Button;
