import { createContext, useContext, useEffect, useState } from 'react';
import { getCsrfCookie, getUser, login as apiLogin, logout as apiLogout, register as apiRegister } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser()
            .then((res) => setUser(res.data.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = async (email, password) => {
        await getCsrfCookie();
        const res = await apiLogin({ email, password });
        setUser(res.data.data);
        return res.data.data;
    };

    const register = async (name, email, password, passwordConfirmation) => {
        await getCsrfCookie();
        const res = await apiRegister({ name, email, password, password_confirmation: passwordConfirmation });
        setUser(res.data.data);
        return res.data.data;
    };

    const logout = async () => {
        await apiLogout();
        setUser(null);
    };

    const isAdmin = user?.role === 'admin';

    return (
        <AuthContext.Provider value={{ user, isAdmin, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return ctx;
};
