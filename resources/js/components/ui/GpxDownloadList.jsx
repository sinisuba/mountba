import { useState } from 'react';
import { downloadGpx } from '../../api/mountains';

export default function GpxDownloadList({ tracks = [], mountainSlug }) {
    const [downloading, setDownloading] = useState(null);

    if (tracks.length === 0) {
        return <p className="text-slate text-sm">No GPX tracks available yet.</p>;
    }

    const handleDownload = async (track) => {
        setDownloading(track.id);
        try {
            await downloadGpx(mountainSlug, track.id, track.title);
        } catch {
            // silently fail - user sees no response
        } finally {
            setDownloading(null);
        }
    };

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
            {tracks.map((track) => (
                <li key={track.id} className="py-3 flex items-center justify-between gap-4">
                    <div>
                        <p className="font-medium text-charcoal text-sm">{track.title}</p>
                        <p className="text-slate text-xs mt-0.5">
                            {track.distance_km && <span>{track.distance_km} km</span>}
                            {track.distance_km && track.duration_minutes && <span className="mx-1">&bull;</span>}
                            {track.duration_minutes && <span>{formatDuration(track.duration_minutes)}</span>}
                        </p>
                    </div>
                    <button
                        onClick={() => handleDownload(track)}
                        disabled={downloading === track.id}
                        className="text-xs font-medium bg-forest text-stone px-3 py-1.5 hover:bg-forest-light transition-colors disabled:opacity-50"
                    >
                        {downloading === track.id ? 'Downloading...' : 'Download GPX'}
                    </button>
                </li>
            ))}
        </ul>
    );
}
