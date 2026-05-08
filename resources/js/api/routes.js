import client from './client';

export const getRoutes = () => client.get('/routes');

export const getRoute = (id) => client.get(`/routes/${id}`);

export const getAdminRoutes = () => client.get('/admin/routes');

export const createRoute = (formData) =>
    client.post('/admin/routes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const deleteRoute = (id) => client.delete(`/admin/routes/${id}`);
