import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

const peakIcon = L.divIcon({
    className: '',
    html: `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
        <polygon points="14,3 26,24 2,24" fill="#2d5016" stroke="#f5f0e8" stroke-width="1.5"/>
        <polygon points="14,3 26,24 2,24" fill="none" stroke="#c17f3d" stroke-width="0" class="peak-hover"/>
    </svg>`,
    iconSize: [28, 28],
    iconAnchor: [14, 24],
    popupAnchor: [0, -26],
});

const peakIconHover = L.divIcon({
    className: '',
    html: `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
        <polygon points="14,3 26,24 2,24" fill="#c17f3d" stroke="#f5f0e8" stroke-width="1.5"/>
    </svg>`,
    iconSize: [28, 28],
    iconAnchor: [14, 24],
    popupAnchor: [0, -26],
});

export default function MountainMarker({ mountain }) {
    return (
        <Marker
            position={[mountain.latitude, mountain.longitude]}
            icon={peakIcon}
            eventHandlers={{
                mouseover: (e) => e.target.setIcon(peakIconHover),
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
