import axios from 'axios';

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api/v1',
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false;

client.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 419 && !isRefreshing) {
            isRefreshing = true;
            try {
                await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
                isRefreshing = false;
                return client.request(error.config);
            } catch {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    },
);

export default client;
