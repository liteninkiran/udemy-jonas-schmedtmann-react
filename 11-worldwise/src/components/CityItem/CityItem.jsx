import { useCities } from '../../contexts/Cities/useCities';
import { formatDate } from '../helper';
import styles from './CityItem.module.css';
import { Link } from 'react-router-dom';

const dateFormat = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
};

const CityItem = ({ city }) => {
    const { currentCity } = useCities();
    const { cityName, emoji, date, id, position } = city;
    const url = `${id}?lat=${position.lat}&lng=${position.lng}`;
    const activeCity = id === currentCity.id ? styles['cityItem--active'] : '';
    const linkClass = `${styles.cityItem} ${activeCity}`;
    return (
        <li>
            <Link className={linkClass} to={url}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>
                    {formatDate(date, dateFormat)}
                </time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    );
};

export default CityItem;
