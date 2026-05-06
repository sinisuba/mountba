import { MapContainer, TileLayer } from 'react-leaflet';
import MountainMarker from './MountainMarker';

const MAPY_API_KEY = import.meta.env.MAPY_API_KEY || '';

const tileUrl = `https://api.mapy.com/v1/maptiles/outdoor/{z}/{x}/{y}?apikey=${MAPY_API_KEY}`;

export default function MapView({ mountains = [], style }) {
    return (
        <MapContainer
            center={[44.0, 17.5]}
            zoom={8}
            style={style || { height: '100%', width: '100%' }}
            className="z-0"
        >
            <TileLayer
                url={tileUrl}
                attribution='&copy; <a href="https://mapy.com/" target="_blank">Mapy.com</a>'
                maxZoom={18}
            />
            {mountains.map((mountain) => (
                <MountainMarker key={mountain.id} mountain={mountain} />
            ))}
        </MapContainer>
    );
}
