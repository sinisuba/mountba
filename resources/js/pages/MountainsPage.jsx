import { useMemo, useState } from 'react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import Select from '../components/ui/Select';
import FeaturedPeak from '../components/ui/FeaturedPeak';
import RankedRow from '../components/ui/RankedRow';
import { useMountains } from '../hooks/useMountains';

const SORT_OPTIONS = [
    { value: 'elevation_desc', label: 'Highest first' },
    { value: 'elevation_asc', label: 'Lowest first' },
    { value: 'name_asc', label: 'Name A–Z' },
];

const DIFFICULTY_OPTIONS = [
    { value: '', label: 'All difficulties' },
    { value: 'easy', label: 'Easy' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'hard', label: 'Hard' },
    { value: 'technical', label: 'Technical' },
];

export default function MountainsPage() {
    const { mountains, loading, error } = useMountains();
    const [region, setRegion] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [sort, setSort] = useState('elevation_desc');

    const regions = useMemo(
        () => [...new Set(mountains.map((m) => m.region).filter(Boolean))].sort(),
        [mountains],
    );

    const filtered = useMemo(() => {
        let result = mountains;
        if (region) result = result.filter((m) => m.region === region);
        if (difficulty) result = result.filter((m) => m.difficulty === difficulty);
        const [field, dir] = sort.split('_');
        return [...result].sort((a, b) => {
            if (field === 'elevation') {
                return dir === 'desc'
                    ? b.elevation_m - a.elevation_m
                    : a.elevation_m - b.elevation_m;
            }
            return a.name.localeCompare(b.name);
        });
    }, [mountains, region, difficulty, sort]);

    const featured = useMemo(() => {
        if (!mountains.length) return null;
        return mountains[Math.floor(Math.random() * mountains.length)];
    }, [mountains]);
    const rest = filtered.filter((m) => m.id !== featured?.id);
    const maxElev = Math.max(...filtered.map((m) => m.elevation_m), 1);

    const regionOptions = [
        { value: '', label: 'All regions' },
        ...regions.map((r) => ({ value: r, label: r })),
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="mb-8">
                <div className="text-[11px] tracking-[0.16em] uppercase text-amber font-medium mb-2.5">
                    Bosnia &amp; Herzegovina
                </div>
                <h1 className="font-heading text-5xl md:text-6xl font-semibold tracking-tight leading-[0.98] text-charcoal">
                    The country&apos;s peaks,
                    <br />
                    <span className="italic text-slate">ranked by height.</span>
                </h1>
            </div>

            {loading && <LoadingSpinner className="py-16" />}
            {error && <ErrorMessage message="Failed to load mountains." />}

            {!loading && !error && (
                <>
                    {featured && <FeaturedPeak mountain={featured} />}

                    {/* Filters bar */}
                    <div className="flex items-center justify-between gap-4 py-5 flex-wrap">
                        <div className="flex gap-2.5 items-center flex-wrap">
                            <Select
                                value={region}
                                onChange={setRegion}
                                width={150}
                                placeholder="All regions"
                                options={regionOptions}
                            />
                            <Select
                                value={difficulty}
                                onChange={setDifficulty}
                                width={160}
                                placeholder="All difficulties"
                                options={DIFFICULTY_OPTIONS}
                            />
                        </div>
                        <div className="flex gap-3 items-center">
                            <span className="text-[11px] tracking-[0.14em] uppercase text-slate/80">
                                {filtered.length} peaks
                            </span>
                            <Select value={sort} onChange={setSort} width={150} options={SORT_OPTIONS} />
                        </div>
                    </div>

                    {/* Ranked list */}
                    <div className="bg-white border border-mist">
                        <div className="grid grid-cols-[36px_1.6fr_1fr_1.4fr_110px] items-center gap-4 px-5 py-3 border-b border-mist text-[10px] tracking-[0.16em] uppercase text-slate/70 font-medium">
                            <div>#</div>
                            <div>Mountain</div>
                            <div>Elevation</div>
                            <div>Relative height</div>
                            <div className="text-right">Grade</div>
                        </div>
                        {rest.map((m, i) => (
                            <RankedRow key={m.id} mountain={m} rank={i + 2} maxElev={maxElev} />
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <p className="text-slate text-center py-12">No mountains match your filters.</p>
                    )}
                </>
            )}
        </div>
    );
}
