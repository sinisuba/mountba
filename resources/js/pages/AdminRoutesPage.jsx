import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMountains } from '../api/mountains';
import { createRoute, deleteRoute, getAdminRoutes } from '../api/routes';
import ErrorMessage from '../components/ui/ErrorMessage';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

const emptyForm = {
    mountain_id: '',
    name: '',
    description: '',
    distance_km: '',
    duration_minutes: '',
    is_published: false,
    file: null,
};

export default function AdminRoutesPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [routes, setRoutes] = useState([]);
    const [mountains, setMountains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState(null);
    const fileRef = useRef(null);

    useEffect(() => {
        if (user && user.role !== 'admin') {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        Promise.all([getAdminRoutes(), getMountains()])
            .then(([routesRes, mountainsRes]) => {
                setRoutes(routesRes.data.data);
                setMountains(mountainsRes.data.data);
            })
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            setForm((f) => ({ ...f, file: files[0] ?? null }));
        } else if (type === 'checkbox') {
            setForm((f) => ({ ...f, [name]: checked }));
        } else {
            setForm((f) => ({ ...f, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        setSubmitting(true);

        const data = new FormData();
        data.append('mountain_id', form.mountain_id);
        data.append('name', form.name);
        if (form.description) data.append('description', form.description);
        if (form.distance_km) data.append('distance_km', form.distance_km);
        if (form.duration_minutes) data.append('duration_minutes', form.duration_minutes);
        data.append('is_published', form.is_published ? '1' : '0');
        if (form.file) data.append('file', form.file);

        try {
            const res = await createRoute(data);
            setRoutes((prev) => [res.data.data, ...prev]);
            setForm(emptyForm);
            if (fileRef.current) fileRef.current.value = '';
        } catch (err) {
            const msg = err.response?.data?.message ?? 'Failed to create route.';
            setFormError(msg);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (route) => {
        if (!window.confirm(`Delete "${route.name}"? This cannot be undone.`)) return;
        try {
            await deleteRoute(route.id);
            setRoutes((prev) => prev.filter((r) => r.id !== route.id));
        } catch {
            alert('Failed to delete route.');
        }
    };

    if (!user || user.role !== 'admin') return null;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="font-heading text-4xl font-semibold text-charcoal mb-8">Manage Routes</h1>

            {/* Upload form */}
            <section className="bg-white border border-mist p-6 mb-10">
                <h2 className="font-heading text-xl font-semibold text-charcoal mb-5">Add New Route</h2>

                {formError && <ErrorMessage message={formError} />}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs tracking-widest uppercase text-slate mb-1.5">
                            Mountain *
                        </label>
                        <select
                            name="mountain_id"
                            value={form.mountain_id}
                            onChange={handleChange}
                            required
                            className="w-full border border-mist px-3 py-2 text-sm text-charcoal bg-white focus:outline-none focus:border-amber"
                        >
                            <option value="">Select a mountain</option>
                            {mountains.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs tracking-widest uppercase text-slate mb-1.5">
                            Route Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-mist px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-amber"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-xs tracking-widest uppercase text-slate mb-1.5">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={2}
                            className="w-full border border-mist px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-amber resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs tracking-widest uppercase text-slate mb-1.5">
                            Distance (km)
                        </label>
                        <input
                            type="number"
                            name="distance_km"
                            value={form.distance_km}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            className="w-full border border-mist px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-amber"
                        />
                    </div>

                    <div>
                        <label className="block text-xs tracking-widest uppercase text-slate mb-1.5">
                            Duration (minutes)
                        </label>
                        <input
                            type="number"
                            name="duration_minutes"
                            value={form.duration_minutes}
                            onChange={handleChange}
                            min="0"
                            className="w-full border border-mist px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-amber"
                        />
                    </div>

                    <div>
                        <label className="block text-xs tracking-widest uppercase text-slate mb-1.5">
                            GPX File *
                        </label>
                        <input
                            ref={fileRef}
                            type="file"
                            name="file"
                            accept=".gpx,application/gpx+xml,text/xml,application/xml"
                            onChange={handleChange}
                            required
                            className="w-full text-sm text-slate file:mr-3 file:border-0 file:bg-mist file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-charcoal hover:file:bg-amber/20"
                        />
                    </div>

                    <div className="flex items-center gap-2 self-end pb-1">
                        <input
                            type="checkbox"
                            id="is_published"
                            name="is_published"
                            checked={form.is_published}
                            onChange={handleChange}
                            className="accent-amber"
                        />
                        <label htmlFor="is_published" className="text-sm text-charcoal">
                            Publish immediately
                        </label>
                    </div>

                    <div className="md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-amber text-charcoal text-sm font-medium px-6 py-2 hover:bg-amber-light transition-colors disabled:opacity-50"
                        >
                            {submitting ? 'Uploading…' : 'Upload Route'}
                        </button>
                    </div>
                </form>
            </section>

            {/* Routes list */}
            {loading && <LoadingSpinner className="py-12" />}
            {error && <ErrorMessage message="Failed to load routes." />}

            {!loading && !error && (
                <section>
                    <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">
                        All Routes ({routes.length})
                    </h2>

                    {routes.length === 0 && (
                        <p className="text-slate text-sm">No routes yet. Upload one above.</p>
                    )}

                    {routes.length > 0 && (
                        <div className="bg-white border border-mist">
                            <div className="grid grid-cols-[1.4fr_1fr_80px_80px_80px_60px] items-center gap-3 px-5 py-3 border-b border-mist text-[10px] tracking-[0.16em] uppercase text-slate/70 font-medium">
                                <div>Route</div>
                                <div>Mountain</div>
                                <div>Distance</div>
                                <div>Duration</div>
                                <div>Status</div>
                                <div />
                            </div>
                            {routes.map((route) => (
                                <div
                                    key={route.id}
                                    className="grid grid-cols-[1.4fr_1fr_80px_80px_80px_60px] items-center gap-3 px-5 py-3 border-b border-mist last:border-b-0"
                                >
                                    <div className="text-sm font-medium text-charcoal">{route.name}</div>
                                    <div className="text-sm text-slate">{route.mountain_name}</div>
                                    <div className="text-sm text-slate">
                                        {route.distance_km ? `${route.distance_km} km` : '—'}
                                    </div>
                                    <div className="text-sm text-slate">
                                        {route.duration_minutes ? `${route.duration_minutes}m` : '—'}
                                    </div>
                                    <div>
                                        <span
                                            className={`text-xs px-2 py-0.5 ${route.is_published
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            {route.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => handleDelete(route)}
                                            className="text-xs text-slate/60 hover:text-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            )}
        </div>
    );
}
