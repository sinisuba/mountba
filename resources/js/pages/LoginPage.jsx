import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            const msg =
                err.response?.data?.errors?.email?.[0] ||
                err.response?.data?.message ||
                'Login failed.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        'w-full border border-mist bg-white px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-amber';

    return (
        <div className="min-h-screen bg-stone flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <h1 className="font-heading text-3xl font-semibold text-charcoal mb-8">Sign in</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-slate mb-1 uppercase tracking-wide">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputClass}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate mb-1 uppercase tracking-wide">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={inputClass}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-charcoal text-stone text-sm font-medium py-2.5 hover:bg-slate transition-colors disabled:opacity-60"
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <p className="mt-6 text-sm text-slate text-center">
                    No account?{' '}
                    <Link to="/register" className="text-amber hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
