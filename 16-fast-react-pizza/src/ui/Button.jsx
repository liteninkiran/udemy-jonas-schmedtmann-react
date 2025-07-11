import { Link } from 'react-router-dom';
import { baseClasses, secondaryClasses } from './classes';

const Button = ({ children, disabled, to, type = 'primary' }) => {
    const base = baseClasses.join(' ');
    const secondary = secondaryClasses.join(' ');

    const styles = {
        primary: base + ' px-4 py-3 md:px-6 md:py-4',
        small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
        secondary,
    };

    if (to)
        return (
            <Link to={to} className={styles[type]}>
                {children}
            </Link>
        );

    return (
        <button disabled={disabled} className={styles[type]}>
            {children}
        </button>
    );
};

export default Button;
