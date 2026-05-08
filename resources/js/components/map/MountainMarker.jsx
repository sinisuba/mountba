import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

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

export default function MountainMarker({ mountain }) {
    return (
        <Marker
            position={[mountain.latitude, mountain.longitude]}
            icon={peakIcon}
            eventHandlers={{
                mouseout: (e) => e.target.setIcon(peakIcon),
            }}
        >
            <Popup className="mountain-popup">
                <div className="min-w-40">
                    <p className="font-heading font-semibold text-charcoal text-base leading-tight mb-0.5">
                        {mountain.name}
                    </p>
                    <p className="text-slate text-xs mb-2">
                        {mountain.elevation_m} m &bull; {mountain.region}
                    </p>
                    <Link
                        to={`/mountains/${mountain.slug}`}
                        className="text-xs font-medium text-amber hover:text-amber-light underline"
                    >
                        View details
                    </Link>
                </div>
            </Popup>
        </Marker>
    );
}
