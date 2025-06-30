// Built-in
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';

// Internal Components
import Button from '../Button/Button';
import BackButton from '../BackButton/BackButton';
import Message from '../Message/Message';
import Spinner from '../Spinner/Spinner';

// Custom Hooks
import { useUrlPosition } from '../../hooks/useUrlPosition';
import { useCities } from '../../contexts/Cities/useCities';

// Styles
import styles from './Form.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
const NO_COUNTRY_ERROR =
    "That doesn't seem to be a city. Please click somewhere else on the map.😒";
const NO_LAT_LNG = 'Start by clicking somewhere on the map';

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
    const { createCity, isLoading } = useCities();
    const navigate = useNavigate();

    useEffect(() => {
        if (!lat || !lng) {
            return;
        }
        const fetchCityData = async () => {
            try {
                setIsLoadingGeocoding(true);
                setGeocodingError('');
                const url = `${BASE_URL}?latitude=${lat}&longitude=${lng}`;
                const res = await fetch(url);
                const data = await res.json();
                if (!data.countryCode) {
                    throw new Error(NO_COUNTRY_ERROR);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cityName || !date) return;

        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: { lat, lng },
        };

        await createCity(newCity);
        navigate('/app/cities');
    };

    if (!lat || !lng) {
        return <Message message={NO_LAT_LNG} />;
    }

    if (isLoadingGeocoding) {
        return <Spinner />;
    }

    if (geocodingError) {
        return <Message message={geocodingError} />;
    }

    return (
        <form
            className={`${styles.form} ${isLoading && styles.loading}`}
            onSubmit={handleSubmit}
        >
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

                <DatePicker
                    id='date'
                    onChange={(date) => setDate(date)}
                    selected={date}
                    dateFormat='dd/MM/yyyy'
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
