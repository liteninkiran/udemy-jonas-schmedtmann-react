import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
    useMapEvents,
} from 'react-leaflet';
import { useCities } from '../../contexts/Cities/useCities';
import styles from './Map.module.css';

const url = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

const Map = () => {
    const nav = useNavigate();
    const { cities } = useCities();
    const [searchParams] = useSearchParams();
    const [position, setPosition] = useState([51.349985, -1.67121]);
    const mapLat = searchParams.get('lat');
    const mapLng = searchParams.get('lng');
    const getPosition = (city) => [city.position.lat, city.position.lng];
    const mapCities = (city) => (
        <Marker position={getPosition(city)} key={city.id}>
            <Popup>{city.cityName}</Popup>
        </Marker>
    );
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
    return (
        <div className={styles.mapContainer}>
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
