import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '', passwordConfirmation: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
        try {
            await register(form.name, form.email, form.password, form.passwordConfirmation);
            navigate('/');
        } catch (err) {
            setErrors(err.response?.data?.errors || { general: ['Registration failed.'] });
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        'w-full border border-mist bg-white px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-amber';

    const fieldError = (field) =>
        errors[field]?.[0] ? <p className="text-red-600 text-xs mt-1">{errors[field][0]}</p> : null;

    return (
        <div className="min-h-screen bg-stone flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <h1 className="font-heading text-3xl font-semibold text-charcoal mb-8">Create account</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-slate mb-1 uppercase tracking-wide">
                            Name
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={set('name')}
                            className={inputClass}
                            required
                            autoComplete="name"
                        />
                        {fieldError('name')}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate mb-1 uppercase tracking-wide">
                            Email
                        </label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={set('email')}
                            className={inputClass}
                            required
                            autoComplete="email"
                        />
                        {fieldError('email')}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate mb-1 uppercase tracking-wide">
                            Password
                        </label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={set('password')}
                            className={inputClass}
                            required
                            autoComplete="new-password"
                        />
                        {fieldError('password')}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate mb-1 uppercase tracking-wide">
                            Confirm password
                        </label>
                        <input
                            type="password"
                            value={form.passwordConfirmation}
                            onChange={set('passwordConfirmation')}
                            className={inputClass}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    {errors.general && <p className="text-red-600 text-sm">{errors.general[0]}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-charcoal text-stone text-sm font-medium py-2.5 hover:bg-slate transition-colors disabled:opacity-60"
                    >
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </form>

                <p className="mt-6 text-sm text-slate text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-amber hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
