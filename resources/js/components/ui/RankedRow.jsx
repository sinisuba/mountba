import { Link } from 'react-router-dom';
import DifficultyBadge from './DifficultyBadge';

export default function RankedRow({ mountain, rank, maxElev }) {
    const pct = (mountain.elevation_m / maxElev) * 100;
    return (
        <Link
            to={`/mountains/${mountain.slug}`}
            className="grid grid-cols-[36px_1.6fr_1fr_1.4fr_110px] items-center gap-4 px-5 py-4 border-b border-mist last:border-b-0 hover:bg-stone/60 transition-colors group"
        >
            <div className="font-heading text-sm text-slate/70 tracking-wide">
                {String(rank).padStart(2, '0')}
            </div>
            <div>
                <h3 className="font-heading text-xl font-semibold text-charcoal tracking-tight leading-tight group-hover:text-forest transition-colors">
                    {mountain.name}
                </h3>
                {mountain.region && (
                    <div className="text-[11px] tracking-[0.14em] uppercase text-slate/80 mt-1">
                        {mountain.region}
                    </div>
                )}
            </div>
            <div className="font-heading text-xl text-amber leading-none tracking-tight">
                {mountain.elevation_m.toLocaleString()}{' '}
                <span className="text-sm opacity-70">m</span>
            </div>
            <div>
                <div className="h-1.5 bg-mist relative">
                    <div
                        className="absolute inset-y-0 left-0 bg-amber group-hover:opacity-100 opacity-85 transition-opacity"
                        style={{ width: `${pct}%` }}
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <DifficultyBadge difficulty={mountain.difficulty} />
            </div>
        </Link>
    );
}
