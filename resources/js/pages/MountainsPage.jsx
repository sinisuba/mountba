import { useMemo, useState } from 'react';
import MountainCard from '../components/ui/MountainCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import { useMountains } from '../hooks/useMountains';

const SORT_OPTIONS = [
    { value: 'elevation_desc', label: 'Highest first' },
    { value: 'elevation_asc', label: 'Lowest first' },
    { value: 'name_asc', label: 'Name A-Z' },
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
        if (region) {
            result = result.filter((m) => m.region === region);
        }
        if (difficulty) {
            result = result.filter((m) => m.difficulty === difficulty);
        }
        const [field, dir] = sort.split('_');
        result = [...result].sort((a, b) => {
            if (field === 'elevation') {
                return dir === 'desc' ? b.elevation_m - a.elevation_m : a.elevation_m - b.elevation_m;
            }
            return a.name.localeCompare(b.name);
        });
        return result;
    }, [mountains, region, difficulty, sort]);

    const selectClass =
        'text-sm border border-mist bg-white text-charcoal px-3 py-1.5 focus:outline-none focus:border-amber';

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="font-heading text-4xl font-semibold text-charcoal mb-2">Mountains</h1>
            <p className="text-slate text-sm mb-8">Bosnia and Herzegovina's peaks</p>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
                <select value={region} onChange={(e) => setRegion(e.target.value)} className={selectClass}>
                    <option value="">All regions</option>
                    {regions.map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>

                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className={selectClass}>
                    <option value="">All difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="hard">Hard</option>
                    <option value="technical">Technical</option>
                </select>

                <select value={sort} onChange={(e) => setSort(e.target.value)} className={selectClass}>
                    {SORT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
            </div>

            {loading && <LoadingSpinner className="py-16" />}
            {error && <ErrorMessage message="Failed to load mountains." />}

            {!loading && !error && (
                <>
                    <p className="text-slate text-xs mb-4">{filtered.length} peaks</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map((mountain) => (
                            <MountainCard key={mountain.id} mountain={mountain} />
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
