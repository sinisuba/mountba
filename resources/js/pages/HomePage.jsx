import { Link } from 'react-router-dom';
import MapView from '../components/map/MapView';
import { useMountains } from '../hooks/useMountains';

export default function HomePage() {
    const { mountains } = useMountains();

    return (
        <div className="relative" style={{ height: 'calc(100vh - 3.5rem)' }}>
            {/* Full-screen map */}
            <div className="absolute inset-0">
                <MapView mountains={mountains} style={{ height: '100%', width: '100%' }} />
            </div>

            {/* Intro overlay */}
            <div className="absolute bottom-8 left-4 right-4 sm:left-8 sm:right-auto sm:max-w-sm z-10 pointer-events-none">
                <div className="bg-charcoal/90 text-stone p-6 backdrop-blur-sm">
                    <h1 className="font-heading text-2xl font-semibold mb-2 leading-tight">
                        Bosnia's Mountains
                    </h1>
                    <p className="text-stone/70 text-sm leading-relaxed mb-4">
                        Explore {mountains.length > 0 ? mountains.length : 'the'} peaks of Bosnia and Herzegovina.
                        Download GPX tracks, browse photos, and plan your next hike.
                    </p>
                    <Link
                        to="/mountains"
                        className="pointer-events-auto inline-block text-sm font-medium bg-amber text-charcoal px-4 py-2 hover:bg-amber-light transition-colors"
                    >
                        View all mountains
                    </Link>
                </div>
            </div>
        </div>
    );
}
