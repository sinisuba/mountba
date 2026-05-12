export default function RouteList({ routes = [] }) {
    if (routes.length === 0) {
        return <p className="text-slate text-sm">No routes available yet.</p>;
    }

    const formatDuration = (minutes) => {
        if (!minutes) {
            return null;
        }
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return h > 0 ? `${h}h ${m}m` : `${m}m`;
    };

    return (
        <ul className="divide-y divide-mist">
            {routes.map((route) => (
                <li key={route.id} className="py-3">
                    <p className="font-medium text-charcoal text-sm">{route.title}</p>
                    <p className="text-slate text-xs mt-0.5">
                        {route.distance_km && <span>{route.distance_km} km</span>}
                        {route.distance_km && route.duration_minutes && <span className="mx-1">&bull;</span>}
                        {route.duration_minutes && <span>{formatDuration(route.duration_minutes)}</span>}
                    </p>
                </li>
            ))}
        </ul>
    );
}
