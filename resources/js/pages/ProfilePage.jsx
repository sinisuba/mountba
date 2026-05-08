import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function StatusBadge({ approved }) {
    return (
        <span
            className={`inline-block text-xs px-2 py-0.5 ${
                approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}
        >
            {approved ? 'Approved' : 'Pending'}
        </span>
    );
}

export default function ProfilePage() {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="font-heading text-4xl font-semibold text-charcoal mb-2">{user.name}</h1>
            <p className="text-slate text-sm mb-1">{user.email}</p>
            <p className="text-xs tracking-wide uppercase text-amber font-medium mb-10">{user.role}</p>

            {user.role === 'admin' && (
                <section className="mb-10 p-5 border border-amber/30 bg-amber/5">
                    <h2 className="font-heading text-xl font-semibold text-charcoal mb-1">Admin Panel</h2>
                    <p className="text-slate text-sm mb-4">Manage content visible to all users.</p>
                    <Link
                        to="/admin/routes"
                        className="inline-block text-sm font-medium bg-amber text-charcoal px-4 py-2 hover:bg-amber-light transition-colors"
                    >
                        Manage Routes
                    </Link>
                </section>
            )}

            <section className="mb-10">
                <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">Your photos</h2>
                <p className="text-slate text-sm">
                    Photos you upload will appear here after review. Visit a mountain page to upload.
                </p>
            </section>

            <section>
                <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">Your GPX tracks</h2>
                <p className="text-slate text-sm">
                    GPX tracks you upload will appear here after review. Visit a mountain page to upload.
                </p>
            </section>
        </div>
    );
}
