import { useState } from 'react';
import RoutesMap from '../components/map/RoutesMap';
import ErrorMessage from '../components/ui/ErrorMessage';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { getRoute } from '../api/routes';
import { useRoutes } from '../hooks/useRoutes';

function formatDuration(minutes) {
    if (!minutes) return null;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0) return `${m}m`;
    return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export default function RoutesPage() {
    const { routes, loading, error } = useRoutes();
    const [activeRoute, setActiveRoute] = useState(null);
    const [loadingRoute, setLoadingRoute] = useState(null);

    const handleShowOnMap = async (route) => {
        if (activeRoute?.id === route.id) {
            setActiveRoute(null);
            return;
        }
        setLoadingRoute(route.id);
        try {
            const res = await getRoute(route.id);
            setActiveRoute({ ...res.data.data, coordinates: res.data.coordinates });
        } finally {
            setLoadingRoute(null);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="mb-8">
                <h1 className="font-heading text-5xl md:text-6xl font-semibold tracking-tight leading-[0.98] text-charcoal">
                    Bosnia&apos;s trails,
                    <br />
                    <span className="italic text-slate">mapped and ready.</span>
                </h1>
            </div>

            <div className="mb-8 border border-mist overflow-hidden">
                <RoutesMap activeRoute={activeRoute} />
            </div>

            {loading && <LoadingSpinner className="py-16" />}
            {error && <ErrorMessage message="Failed to load routes." />}

            {!loading && !error && routes.length === 0 && (
                <p className="text-slate text-center py-12">No routes available yet.</p>
            )}

            {!loading && !error && routes.length > 0 && (
                <div className="bg-white border border-mist">
                    <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr_120px] items-center gap-4 px-5 py-3 border-b border-mist text-[10px] tracking-[0.16em] uppercase text-slate/70 font-medium">
                        <div>Route</div>
                        <div>Mountain</div>
                        <div>Distance</div>
                        <div>Duration</div>
                        <div />
                    </div>
                    {routes.map((route) => {
                        const isActive = activeRoute?.id === route.id;
                        const isLoading = loadingRoute === route.id;

                        return (
                            <div
                                key={route.id}
                                className={`grid grid-cols-[1.6fr_1fr_1fr_1fr_120px] items-center gap-4 px-5 py-4 border-b border-mist last:border-b-0 transition-colors ${isActive ? 'bg-amber/5' : 'hover:bg-stone/30'}`}
                            >
                                <div>
                                    <span className="text-sm font-medium text-charcoal">{route.name}</span>
                                    {route.description && (
                                        <p className="text-xs text-slate/70 mt-0.5 line-clamp-1">{route.description}</p>
                                    )}
                                </div>
                                <div className="text-sm text-slate">{route.mountain_name}</div>
                                <div className="text-sm text-slate">
                                    {route.distance_km ? `${route.distance_km} km` : '—'}
                                </div>
                                <div className="text-sm text-slate">
                                    {formatDuration(route.duration_minutes) ?? '—'}
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleShowOnMap(route)}
                                        disabled={isLoading}
                                        className={`text-xs font-medium px-3 py-1.5 transition-colors ${
                                            isActive
                                                ? 'bg-amber text-charcoal'
                                                : 'border border-mist text-slate hover:border-amber hover:text-amber'
                                        }`}
                                    >
                                        {isLoading ? 'Loading…' : isActive ? 'Active' : 'Show on map'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
