import { Link } from 'react-router-dom';
import DifficultyBadge from './DifficultyBadge';

export default function FeaturedPeak({ mountain }) {
    return (
        <div className="relative overflow-hidden bg-charcoal text-stone p-8 md:p-10 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
            {/* Faint ridge backdrop */}
            <svg viewBox="0 0 600 180" className="absolute inset-0 w-full h-full opacity-[0.06]" aria-hidden="true">
                <path d="M0 180 L60 130 L120 150 L200 80 L260 110 L340 40 L420 90 L500 60 L600 100 L600 180 Z" fill="#f5f0e8" />
            </svg>

            <div className="relative">
                <div className="text-[11px] tracking-[0.16em] uppercase text-amber font-medium mb-3">
                    Featured Peak
                </div>
                <h2 className="font-heading text-5xl md:text-6xl font-semibold leading-[0.95] tracking-tight">
                    {mountain.name}
                </h2>
                {mountain.description && (
                    <p className="mt-3 text-sm text-stone/70 max-w-sm leading-relaxed">{mountain.description}</p>
                )}
                <div className="mt-6 flex gap-6 items-baseline flex-wrap">
                    <div>
                        <div className="text-[10px] tracking-[0.16em] uppercase text-stone/50 mb-1">Elevation</div>
                        <div className="font-heading text-3xl text-amber leading-none tracking-tight">
                            {mountain.elevation_m.toLocaleString()}{' '}
                            <span className="text-lg opacity-70">m</span>
                        </div>
                    </div>
                    {mountain.region && (
                        <div>
                            <div className="text-[10px] tracking-[0.16em] uppercase text-stone/50 mb-1">Region</div>
                            <div className="font-heading text-3xl leading-none tracking-tight">{mountain.region}</div>
                        </div>
                    )}
                    {mountain.difficulty && (
                        <div>
                            <div className="text-[10px] tracking-[0.16em] uppercase text-stone/50 mb-1">Grade</div>
                            <DifficultyBadge difficulty={mountain.difficulty} />
                        </div>
                    )}
                </div>
                <Link
                    to={`/mountains/${mountain.slug}`}
                    className="inline-block mt-7 text-sm font-medium tracking-wide bg-amber text-charcoal px-4 py-2.5 hover:bg-amber-light transition-colors"
                >
                    View peak →
                </Link>
            </div>

            <div className="relative hidden md:flex justify-center">
                <svg viewBox="0 0 320 220" className="w-full h-[220px]" aria-hidden="true">
                    <path d="M0 220 L70 150 L130 180 L180 130 L240 170 L320 140 L320 220 Z" fill="#c17f3d" opacity="0.18" />
                    <path d="M0 220 L40 170 L100 195 L160 110 L220 175 L280 150 L320 180 L320 220 Z" fill="#c17f3d" opacity="0.32" />
                    <path d="M0 220 L60 195 L120 175 L180 70 L240 175 L300 195 L320 210 L320 220 Z" fill="#c17f3d" />
                    <line x1="180" y1="70" x2="180" y2="40" stroke="#f5f0e8" strokeWidth="1" />
                    <circle cx="180" cy="38" r="3" fill="#f5f0e8" />
                    <text x="186" y="42" fontFamily="DM Sans, sans-serif" fontSize="10" fill="#f5f0e8" letterSpacing="1">
                        {mountain.elevation_m.toLocaleString()} M
                    </text>
                </svg>
            </div>
        </div>
    );
}
