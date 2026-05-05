import { useEffect, useState } from 'react';
import { getMountains } from '../api/mountains';

export function useMountains() {
    const [mountains, setMountains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getMountains()
            .then((res) => setMountains(res.data.data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    return { mountains, loading, error };
}
