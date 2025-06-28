import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import styles from './Map.module.css';

const Map = () => {
    const nav = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const [position, setPosition] = useState([40, 0]);
    return (
        <div className={styles.mapContainer}>
            <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={true}
                className={styles.mapContainer}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Map;
