import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import BackButton from '../BackButton/BackButton';
import { useUrlPosition } from '../../hooks/useUrlPosition';
import styles from './Form.module.css';
import Message from '../Message/Message';
import Spinner from '../Spinner/Spinner';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

const convertToEmoji = (countryCode) => {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
};

const Form = () => {
    const [cityName, setCityName] = useState('');
    const [country, setCountry] = useState('');
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState('');
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [emoji, setEmoji] = useState('');
    const [geocodingError, setGeocodingError] = useState('');

    const [lat, lng] = useUrlPosition();

    useEffect(() => {
        const fetchCityData = async () => {
            try {
                setIsLoadingGeocoding(true);
                setGeocodingError('');
                const url = `${BASE_URL}?latitude=${lat}&longitude=${lng}`;
                const res = await fetch(url);
                const data = await res.json();
                if (!data.countryCode) {
                    throw new Error(
                        "That doesn't seem to be a city. Please click somewhere else on the map.😒"
                    );
                }
                setCityName(data.city || data.locality || '');
                setCountry(data.countryName);
                setEmoji(convertToEmoji(data.countryCode));
            } catch (err) {
                setGeocodingError(err.message);
            } finally {
                setIsLoadingGeocoding(false);
            }
        };
        fetchCityData();
    }, [lat, lng]);

    if (isLoadingGeocoding) {
        return <Spinner />;
    }

    if (geocodingError) {
        return <Message message={geocodingError} />;
    }

    return (
        <form className={styles.form}>
            <div className={styles.row}>
                <label htmlFor='cityName'>City name</label>
                <input
                    id='cityName'
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor='date'>When did you go to {cityName}?</label>
                <input
                    id='date'
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                />
            </div>

            <div className={styles.row}>
                <label htmlFor='notes'>
                    Notes about your trip to {cityName}
                </label>
                <textarea
                    id='notes'
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type={'primary'}>Add</Button>
                <BackButton />
            </div>
        </form>
    );
};

export default Form;
