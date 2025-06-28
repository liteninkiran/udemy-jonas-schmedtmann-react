import Spinner from '../Spinner/Spinner';
import styles from './CityList.module.css';
import CityItem from '../CityItem/CityItem';
import Message from '../Message/Message';

const msg = 'Add your first city by clicking on a city on the map';

const CityList = ({ cities, isLoading }) => {
    if (isLoading) {
        return <Spinner />;
    }

    if (cities.length === 0) {
        return <Message message={msg} />;
    }

    const mapFn = (city) => <CityItem city={city} key={city.id} />;

    return <ul className={styles.cityList}>{cities.map(mapFn)}</ul>;
};

export default CityList;
