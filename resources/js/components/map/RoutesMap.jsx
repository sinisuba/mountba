import { useEffect } from 'react';
import { MapContainer, Polyline, TileLayer, useMap } from 'react-leaflet';

const MAPY_API_KEY = import.meta.env.VITE_MAPY_API_KEY || '';

const tileUrl = `https://api.mapy.com/v1/maptiles/outdoor/256/{z}/{x}/{y}?apikey=${MAPY_API_KEY}`;

function FitBounds({ coordinates }) {
    const map = useMap();

    useEffect(() => {
        if (coordinates && coordinates.length > 0) {
            map.fitBounds(coordinates, { padding: [40, 40] });
        }
    }, [coordinates, map]);

    return null;
}

export default function RoutesMap({ activeRoute }) {
    const coordinates = activeRoute?.coordinates ?? null;

    return (
        <MapContainer
            center={[44.0, 17.5]}
            zoom={8}
            style={{ height: '400px', width: '100%' }}
            className="z-0"
        >
            <TileLayer
                url={tileUrl}
                attribution='&copy; <a href="https://mapy.com/" target="_blank">Mapy.com</a>'
                maxZoom={18}
            />
            {coordinates && (
                <>
                    <Polyline positions={coordinates} color="#ff0000" weight={3} opacity={0.85} />
                    <FitBounds coordinates={coordinates} />
                </>
            )}
        </MapContainer>
    );
}
