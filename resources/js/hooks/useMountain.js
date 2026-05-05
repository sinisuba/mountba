import { useCallback, useEffect, useState } from 'react';
import { getMountain } from '../api/mountains';

export function useMountain(slug) {
    const [mountain, setMountain] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetch = useCallback(() => {
        if (!slug) {
            return;
        }
        setLoading(true);
        getMountain(slug)
            .then((res) => setMountain(res.data.data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [slug]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { mountain, loading, error, refetch: fetch };
}
