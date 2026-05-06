import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

const MAPY_API_KEY = import.meta.env.MAPY_API_KEY || '';

const tileUrl = `https://api.mapy.com/v1/maptiles/outdoor/{z}/{x}/{y}?apikey=${MAPY_API_KEY}`;

const peakIcon = L.divIcon({
    className: '',
    html: `<svg width="24" height="24" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
        <polygon points="14,3 26,24 2,24" fill="#2d5016" stroke="#f5f0e8" stroke-width="1.5"/>
    </svg>`,
    iconSize: [24, 24],
    iconAnchor: [12, 22],
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
