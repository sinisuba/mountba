import { useEffect, useState } from 'react';
import { getRoutes } from '../api/routes';

export function useRoutes() {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRoutes()
            .then((res) => setRoutes(res.data.data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    return { routes, loading, error };
}
