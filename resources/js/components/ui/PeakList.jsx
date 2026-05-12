import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PeakList({ peaks = [], mountainSlug }) {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';

    if (peaks.length === 0) {
        return (
            <div>
                <p className="text-slate text-sm mb-4">No peaks yet.</p>
                {isAdmin && (
                    <Link
                        to="/admin/peaks"
                        className="text-xs font-medium border border-forest text-forest px-3 py-1.5 hover:bg-forest hover:text-stone transition-colors"
                    >
                        Add peaks
                    </Link>
                )}
            </div>
        );
    }

    return (
        <div>
            <ul className="divide-y divide-mist mb-4">
                {peaks.map((peak) => (
                    <li key={peak.id} className="py-3">
                        <Link
                            to={`/mountains/${mountainSlug}/${peak.slug}`}
                            className="group flex items-baseline justify-between gap-2"
                        >
                            <span className="font-medium text-charcoal text-sm group-hover:text-amber transition-colors">
                                {peak.name}
                            </span>
                            {peak.elevation_m && (
                                <span className="text-xs text-slate shrink-0">
                                    {peak.elevation_m.toLocaleString()} m
                                </span>
                            )}
                        </Link>
                        {peak.description && (
                            <p className="text-xs text-slate mt-0.5 line-clamp-2">{peak.description}</p>
                        )}
                    </li>
                ))}
            </ul>
            {isAdmin && (
                <Link
                    to="/admin/peaks"
                    className="text-xs font-medium border border-forest text-forest px-3 py-1.5 hover:bg-forest hover:text-stone transition-colors"
                >
                    Manage peaks
                </Link>
            )}
        </div>
    );
}
