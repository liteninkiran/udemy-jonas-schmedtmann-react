import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useCities } from '../../contexts/Cities/useCities';
import styles from './Map.module.css';

const url = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

const Map = () => {
    const nav = useNavigate();
    const { cities } = useCities();
    const [searchParams, setSearchParams] = useSearchParams();
    const [position, setPosition] = useState([40, 0]);
    const getPosition = (city) => [city.position.lat, city.position.lng];
    const mapCities = (city) => (
        <Marker position={getPosition(city)} key={city.id}>
            <Popup>{city.cityName}</Popup>
        </Marker>
    );
    const containerProps = {
        center: position,
        zoom: 13,
        scrollWheelZoom: true,
        className: styles.mapContainer,
    };
    return (
        <div className={styles.mapContainer}>
            <MapContainer {...containerProps}>
                <TileLayer url={url} />
                {cities.map(mapCities)}
            </MapContainer>
        </div>
    );
};

export default Map;
