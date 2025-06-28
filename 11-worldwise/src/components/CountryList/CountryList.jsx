import Spinner from '../Spinner/Spinner';
import styles from './CountryList.module.css';
import CountryItem from '../CountyItem/CountryItem';
import Message from '../Message/Message';
import { useCities } from '../../contexts/Cities/useCities';

const msg = 'Add your first city by clicking on a city on the map';

const CountryList = () => {
    const { cities, isLoading } = useCities();
    if (isLoading) {
        return <Spinner />;
    }

    if (cities.length === 0) {
        return <Message message={msg} />;
    }

    const reducer = (acc, cur) => {
        const included = acc.map((city) => city.country).includes(cur.country);
        const newCountry = { country: cur.country, emoji: cur.emoji };
        return included ? acc : [...acc, newCountry];
    };

    const countries = cities.reduce(reducer, []);

    const mapFn = (country) => (
        <CountryItem country={country} key={country.country} />
    );

    return <ul className={styles.countryList}>{countries.map(mapFn)}</ul>;
};

export default CountryList;
