import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMountains } from '../api/mountains';
import { createPeak, deletePeak, getPeaks, updatePeak } from '../api/peaks';
import ErrorMessage from '../components/ui/ErrorMessage';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

const emptyForm = {
    name: '',
    elevation_m: '',
    latitude: '',
    longitude: '',
    description: '',
};

export default function AdminPeaksPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [mountains, setMountains] = useState([]);
    const [selectedMountain, setSelectedMountain] = useState('');
    const [peaks, setPeaks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [peaksLoading, setPeaksLoading] = useState(false);
    const [error, setError] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState(null);
    const [editingDescriptionId, setEditingDescriptionId] = useState(null);
    const [editingDescription, setEditingDescription] = useState('');
    const [savingDescriptionId, setSavingDescriptionId] = useState(null);

    useEffect(() => {
        if (user && user.role !== 'admin') {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        getMountains()
            .then((res) => {
                const list = res.data.data;
                setMountains(list);
                if (list.length > 0) {
                    setSelectedMountain(list[0].slug);
                }
            })
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!selectedMountain) {
            return;
        }
        setPeaksLoading(true);
        getPeaks(selectedMountain)
            .then((res) => setPeaks(res.data.data))
            .catch(() => setPeaks([]))
            .finally(() => setPeaksLoading(false));
    }, [selectedMountain]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        setSubmitting(true);

        const data = { name: form.name };
        if (form.elevation_m) data.elevation_m = form.elevation_m;
        if (form.latitude) data.latitude = form.latitude;
        if (form.longitude) data.longitude = form.longitude;
        if (form.description) data.description = form.description;

        try {
            const res = await createPeak(selectedMountain, data);
            setPeaks((prev) => [...prev, res.data.data].sort((a, b) => (b.elevation_m ?? 0) - (a.elevation_m ?? 0)));
            setForm(emptyForm);
        } catch (err) {
            const msg = err.response?.data?.message ?? 'Failed to create peak.';
            setFormError(msg);
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditDescription = (peak) => {
        setEditingDescriptionId(peak.id);
        setEditingDescription(peak.description ?? '');
    };

    const handleCancelDescription = () => {
        setEditingDescriptionId(null);
        setEditingDescription('');
    };

    const handleSaveDescription = async (peak) => {
        setSavingDescriptionId(peak.id);
        try {
            const res = await updatePeak(peak.slug, { description: editingDescription });
            setPeaks((prev) => prev.map((p) => (p.id === peak.id ? res.data.data : p)));
            setEditingDescriptionId(null);
            setEditingDescription('');
        } catch {
            alert('Failed to update description.');
        } finally {
            setSavingDescriptionId(null);
        }
    };

    const handleDelete = async (peak) => {
        if (!window.confirm(`Delete "${peak.name}"? This cannot be undone.`)) {
            return;
        }
        try {
            await deletePeak(peak.slug);
            setPeaks((prev) => prev.filter((p) => p.id !== peak.id));
        } catch {
            alert('Failed to delete peak.');
        }
    };

    if (!user || user.role !== 'admin') {
        return null;
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="font-heading text-4xl font-semibold text-charcoal mb-8">Manage Peaks</h1>

            {loading && <LoadingSpinner className="py-12" />}
            {error && <ErrorMessage message="Failed to load mountains." />}

            {!loading && !error && (
                <>
                    {/* Mountain selector */}
                    <div className="mb-8">
                        <label className="block text-xs tracking-widest uppercase text-slate mb-2">
                            Mountain
                        </label>
                        <select
                            value={selectedMountain}
                            onChange={(e) => setSelectedMountain(e.target.value)}
                            className="border border-mist px-3 py-2 text-sm text-charcoal bg-white focus:outline-none focus:border-amber"
                        >
                            {mountains.map((m) => (
                                <option key={m.slug} value={m.slug}>
                                    {m.name} ({m.elevation_m?.toLocaleString()} m)
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Add peak form */}
                    <section className="bg-white border border-mist p-6 mb-10">
                        <h2 className="font-heading text-xl font-semibold text-charcoal mb-5">Add New Peak</h2>

                        {formError && <ErrorMessage message={formError} />}

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs tracking-widest uppercase text-slate mb-1.5">
                                    Peak Name *
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

                            <div>
                                <label className="block text-xs tracking-widest uppercase text-slate mb-1.5">
                                    Elevation (m) *
                                </label>
                                <input
                                    type="number"
                                    name="elevation_m"
                                    value={form.elevation_m}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full border border-mist px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-amber"
                                />
                            </div>

                            <div>
                                <label className="block text-xs tracking-widest uppercase text-slate mb-1.5">
                                    Latitude *
                                </label>
                                <input
                                    type="number"
                                    name="latitude"
                                    value={form.latitude}
                                    onChange={handleChange}
                                    required
                                    step="any"
                                    className="w-full border border-mist px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-amber"
                                />
                            </div>

                            <div>
                                <label className="block text-xs tracking-widest uppercase text-slate mb-1.5">
                                    Longitude *
                                </label>
                                <input
                                    type="number"
                                    name="longitude"
                                    value={form.longitude}
                                    onChange={handleChange}
                                    required
                                    step="any"
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

                            <div className="md:col-span-2 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="bg-amber text-charcoal text-sm font-medium px-6 py-2 hover:bg-amber-light transition-colors disabled:opacity-50"
                                >
                                    {submitting ? 'Saving…' : 'Add Peak'}
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Peaks list for selected mountain */}
                    {peaksLoading && <LoadingSpinner className="py-8" />}

                    {!peaksLoading && (
                        <section>
                            <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">
                                Peaks ({peaks.length})
                            </h2>

                            {peaks.length === 0 && (
                                <p className="text-slate text-sm">No peaks yet for this mountain.</p>
                            )}

                            {peaks.length > 0 && (
                                <div className="bg-white border border-mist divide-y divide-mist">
                                    <div className="grid grid-cols-[1.5fr_80px_2fr_80px] items-center gap-3 px-5 py-3 text-[10px] tracking-[0.16em] uppercase text-slate/70 font-medium">
                                        <div>Peak</div>
                                        <div>Elevation</div>
                                        <div>Description</div>
                                        <div />
                                    </div>
                                    {peaks.map((peak) => (
                                        <div key={peak.id} className="px-5 py-3">
                                            <div className="grid grid-cols-[1.5fr_80px_2fr_80px] items-start gap-3">
                                                <div className="text-sm font-medium text-charcoal">{peak.name}</div>
                                                <div className="text-sm text-slate">
                                                    {peak.elevation_m ? `${peak.elevation_m.toLocaleString()} m` : '—'}
                                                </div>
                                                <div>
                                                    {editingDescriptionId === peak.id ? (
                                                        <div className="flex flex-col gap-2">
                                                            <textarea
                                                                value={editingDescription}
                                                                onChange={(e) => setEditingDescription(e.target.value)}
                                                                rows={3}
                                                                className="w-full border border-mist px-2 py-1.5 text-sm text-charcoal focus:outline-none focus:border-amber resize-none"
                                                            />
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => handleSaveDescription(peak)}
                                                                    disabled={savingDescriptionId === peak.id}
                                                                    className="text-xs bg-amber text-charcoal font-medium px-3 py-1 hover:bg-amber-light transition-colors disabled:opacity-50"
                                                                >
                                                                    {savingDescriptionId === peak.id ? 'Saving…' : 'Save'}
                                                                </button>
                                                                <button
                                                                    onClick={handleCancelDescription}
                                                                    className="text-xs text-slate/60 hover:text-charcoal transition-colors"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleEditDescription(peak)}
                                                            className="text-left w-full group"
                                                        >
                                                            {peak.description ? (
                                                                <span className="text-xs text-slate line-clamp-2 group-hover:text-charcoal transition-colors">
                                                                    {peak.description}
                                                                </span>
                                                            ) : (
                                                                <span className="text-xs text-slate/40 italic group-hover:text-slate transition-colors">
                                                                    Add description…
                                                                </span>
                                                            )}
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() => handleDelete(peak)}
                                                        className="text-xs text-slate/60 hover:text-red-600 transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}
                </>
            )}
        </div>
    );
}
