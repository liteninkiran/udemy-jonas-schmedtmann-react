import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
    useMapEvents,
} from 'react-leaflet';
import Button from '../Button/Button';
import { useCities } from '../../contexts/Cities/useCities';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useUrlPosition } from '../../hooks/useUrlPosition';
import styles from './Map.module.css';

const url = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

const Map = () => {
    const { cities } = useCities();
    const [position, setPosition] = useState([51.349985, -1.67121]);
    const [mapLat, mapLng] = useUrlPosition();
    const {
        isLoading: isLoadingPosition,
        position: geolocationPosition,
        error,
        getPosition: getGeolocationPosition,
    } = useGeolocation();

    const getPosition = (city) => [city.position.lat, city.position.lng];
    const mapCities = (city) => (
        <Marker position={getPosition(city)} key={city.id}>
            <Popup>{city.cityName}</Popup>
        </Marker>
    );
    const buttonLabel = isLoadingPosition ? 'Loading' : 'Use your position';
    const containerProps = {
        center: position,
        zoom: 6,
        scrollWheelZoom: true,
        className: styles.mapContainer,
    };
    useEffect(() => {
        if (mapLat && mapLng) {
            setPosition([mapLat, mapLng]);
        }
    }, [mapLat, mapLng]);

    useEffect(() => {
        if (geolocationPosition) {
            setPosition([geolocationPosition.lat, geolocationPosition.lng]);
        }
    }, [geolocationPosition]);

    return (
        <div className={styles.mapContainer}>
            {!geolocationPosition && (
                <Button type='position' onClick={getGeolocationPosition}>
                    {buttonLabel}
                </Button>
            )}
            <MapContainer {...containerProps}>
                <TileLayer url={url} />
                {cities.map(mapCities)}
                <ChangeCentre position={position} />
                <DetectClick />
            </MapContainer>
        </div>
    );
};

const ChangeCentre = ({ position }) => {
    const map = useMap();
    map.setView(position);
    return null;
};

const DetectClick = () => {
    const navigate = useNavigate();
    const getUrl = (e) => `form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`;
    useMapEvents({
        click: (e) => navigate(getUrl(e)),
    });
};

export default Map;
