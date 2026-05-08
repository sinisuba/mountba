import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

const MAPY_API_KEY = import.meta.env.VITE_MAPY_API_KEY || '';

const tileUrl = `https://api.mapy.com/v1/maptiles/outdoor/256/{z}/{x}/{y}?apikey=${MAPY_API_KEY}`;

const peakIcon = L.divIcon({
    className: '',
    html: `<svg width="14" height="14" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <line x1="2" y1="2" x2="16" y2="16" stroke="#0091ffff" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="16" y1="2" x2="2" y2="16" stroke="#0091ffff" stroke-width="3.5" stroke-linecap="round"/>
    </svg>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -10],
});

export default function MapInset({ latitude, longitude, name }) {
    if (!latitude || !longitude) {
        return null;
    }

    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={12}
            style={{ height: '240px', width: '100%' }}
            zoomControl={true}
            scrollWheelZoom={false}
            className="rounded z-0"
        >
            <TileLayer
                url={tileUrl}
                attribution='&copy; <a href="https://mapy.com/" target="_blank">Mapy.com</a>'
                maxZoom={18}
            />
            <Marker position={[latitude, longitude]} icon={peakIcon} />
        </MapContainer>
    );
}
