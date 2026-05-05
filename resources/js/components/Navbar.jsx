import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const navLinkClass = ({ isActive }) =>
        `text-sm font-medium tracking-wide transition-colors ${
            isActive ? 'text-amber' : 'text-stone/70 hover:text-stone'
        }`;

    return (
        <nav className="bg-charcoal border-b border-white/10">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
                <Link to="/" className="font-heading text-xl font-semibold text-stone tracking-tight">
                    mount.ba
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLink to="/mountains" className={navLinkClass}>
                        Mountains
                    </NavLink>

                    {user ? (
                        <>
                            <NavLink to="/profile" className={navLinkClass}>
                                Profile
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium text-stone/70 hover:text-stone transition-colors"
                            >
                                Sign out
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={navLinkClass}>
                                Sign in
                            </NavLink>
                            <Link
                                to="/register"
                                className="text-sm font-medium bg-amber text-charcoal px-4 py-1.5 hover:bg-amber-light transition-colors"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-stone p-1"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className="block w-5 h-0.5 bg-current mb-1" />
                    <span className="block w-5 h-0.5 bg-current mb-1" />
                    <span className="block w-5 h-0.5 bg-current" />
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-charcoal border-t border-white/10 px-4 py-4 flex flex-col gap-4">
                    <NavLink to="/mountains" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                        Mountains
                    </NavLink>
                    {user ? (
                        <>
                            <NavLink to="/profile" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                                Profile
                            </NavLink>
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    handleLogout();
                                }}
                                className="text-left text-sm font-medium text-stone/70"
                            >
                                Sign out
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                                Sign in
                            </NavLink>
                            <NavLink to="/register" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
