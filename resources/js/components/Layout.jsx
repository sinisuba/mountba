import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-stone">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <footer className="bg-charcoal text-stone/50 text-xs py-4 px-4 text-center">
                <p>
                    &copy; {new Date().getFullYear()} <a href="/">mount.ba</a> - Map tiles by{' '}
                    <a
                        href="https://mapy.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-stone/80"
                    >
                        Mapy.com
                    </a>
                </p>
            </footer>
        </div>
    );
}
