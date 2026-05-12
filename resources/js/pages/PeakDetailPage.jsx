import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPeak } from '../api/peaks';
import MapInset from '../components/map/MapInset';
import ErrorMessage from '../components/ui/ErrorMessage';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useMountain } from '../hooks/useMountain';

export default function PeakDetailPage() {
    const { slug, peakSlug } = useParams();
    const { mountain, loading: mountainLoading } = useMountain(slug);
    const [peak, setPeak] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getPeak(slug, peakSlug)
            .then((res) => setPeak(res.data.data))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [slug, peakSlug]);

    if (loading || mountainLoading) {
        return <LoadingSpinner className="py-24" />;
    }

    if (error || !peak) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-10">
                <ErrorMessage message="Peak not found." />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-slate mb-6">
                <Link to="/mountains" className="hover:text-charcoal transition-colors">
                    Mountains
                </Link>
                <span>&rsaquo;</span>
                <Link to={`/mountains/${slug}`} className="hover:text-charcoal transition-colors">
                    {mountain?.name ?? slug}
                </Link>
                <span>&rsaquo;</span>
                <span className="text-charcoal">{peak.name}</span>
            </nav>

            {/* Hero */}
            <div className="mb-8">
                <h1 className="font-heading text-5xl font-semibold text-charcoal leading-none mb-3">
                    {peak.name}
                </h1>
                {peak.elevation_m && (
                    <div className="flex items-baseline gap-4 mb-4">
                        <span className="font-heading text-4xl font-medium text-amber">
                            {peak.elevation_m.toLocaleString()} m
                        </span>
                        {mountain?.region && (
                            <span className="text-slate text-sm tracking-wide uppercase">
                                {mountain.region}
                            </span>
                        )}
                    </div>
                )}
                {peak.description && (
                    <p className="text-slate leading-relaxed max-w-2xl">{peak.description}</p>
                )}
            </div>

            {/* Map */}
            {peak.latitude && peak.longitude && (
                <div className="mb-10 border border-mist overflow-hidden">
                    <MapInset latitude={peak.latitude} longitude={peak.longitude} name={peak.name} />
                </div>
            )}

            {/* Back link */}
            <Link
                to={`/mountains/${slug}`}
                className="text-sm font-medium text-forest hover:text-forest/80 transition-colors"
            >
                &larr; Back to {mountain?.name ?? 'mountain'}
            </Link>
        </div>
    );
}
