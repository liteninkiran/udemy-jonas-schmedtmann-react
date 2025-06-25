import { formatDate } from './helper';
import styles from './CityItem.module.css';
import { Link } from 'react-router-dom';

const dateFormat = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
};

const CityItem = ({ city }) => {
    const { cityName, emoji, date, id } = city;
    return (
        <li>
            <Link className={styles.cityItem} to={`${id}`}>
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
