import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoutesPage from './pages/AdminRoutesPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MountainDetailPage from './pages/MountainDetailPage';
import MountainsPage from './pages/MountainsPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import RoutesPage from './pages/RoutesPage';

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="mountains" element={<MountainsPage />} />
                        <Route path="mountains/:slug" element={<MountainDetailPage />} />
                        <Route path="routes" element={<RoutesPage />} />
                        <Route
                            path="admin/routes"
                            element={
                                <ProtectedRoute>
                                    <AdminRoutesPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route
                            path="profile"
                            element={
                                <ProtectedRoute>
                                    <ProfilePage />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
