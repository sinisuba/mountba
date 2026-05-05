import { Link } from 'react-router-dom';
import DifficultyBadge from './DifficultyBadge';

export default function MountainCard({ mountain }) {
    return (
        <Link
            to={`/mountains/${mountain.slug}`}
            className="block bg-white border border-mist hover:border-amber transition-colors group"
        >
            <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h2 className="font-heading text-xl font-semibold text-charcoal group-hover:text-forest transition-colors leading-tight">
                        {mountain.name}
                    </h2>
                    <DifficultyBadge difficulty={mountain.difficulty} />
                </div>
                <p className="text-2xl font-heading font-medium text-amber leading-none mb-3">
                    {mountain.elevation_m.toLocaleString()} m
                </p>
                {mountain.region && (
                    <p className="text-slate text-xs tracking-wide uppercase">{mountain.region}</p>
                )}
            </div>
        </Link>
    );
}
