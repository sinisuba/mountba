import { useParams } from 'react-router-dom';
import MapInset from '../components/map/MapInset';
import DifficultyBadge from '../components/ui/DifficultyBadge';
import ErrorMessage from '../components/ui/ErrorMessage';
import RouteList from '../components/ui/RouteList';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import PhotoGallery from '../components/ui/PhotoGallery';
import { useMountain } from '../hooks/useMountain';

export default function MountainDetailPage() {
    const { slug } = useParams();
    const { mountain, loading, error, refetch } = useMountain(slug);

    if (loading) {
        return <LoadingSpinner className="py-24" />;
    }

    if (error) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-10">
                <ErrorMessage message="Mountain not found." />
            </div>
        );
    }

    if (!mountain) {
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            {/* Hero */}
            <div className="mb-8">
                <div className="flex items-start gap-3 mb-3 flex-wrap">
                    <h1 className="font-heading text-5xl font-semibold text-charcoal leading-none">
                        {mountain.name}
                    </h1>
                    <DifficultyBadge difficulty={mountain.difficulty} />
                </div>
                <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-heading text-4xl font-medium text-amber">
                        {mountain.elevation_m.toLocaleString()} m
                    </span>
                    {mountain.region && (
                        <span className="text-slate text-sm tracking-wide uppercase">{mountain.region}</span>
                    )}
                </div>
                {mountain.description && (
                    <p className="text-slate leading-relaxed max-w-2xl">{mountain.description}</p>
                )}
            </div>

            {/* Map inset */}
            <div className="mb-10 border border-mist overflow-hidden">
                <MapInset latitude={mountain.latitude} longitude={mountain.longitude} name={mountain.name} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Photos */}
                <section>
                    <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">Photos</h2>
                    <PhotoGallery
                        photos={mountain.photos || []}
                        mountainSlug={slug}
                        onUpload={refetch}
                    />
                </section>

                {/* Routes */}
                <section>
                    <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">Routes</h2>
                    <RouteList routes={[
                        ...(mountain.gpx_tracks || []),
                        ...(mountain.hiking_routes || []),
                    ]} />
                </section>
            </div>
        </div>
    );
}
