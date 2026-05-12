import client from './client';

export const getMountains = () => client.get('/mountains');

export const getMountain = (slug) => client.get(`/mountains/${slug}`);

export const createMountain = (data) => client.post('/admin/mountains', data);

export const updateMountain = (id, data) => client.put(`/admin/mountains/${id}`, data);

export const uploadPhoto = (slug, formData) =>
    client.post(`/admin/mountains/${slug}/photos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const uploadGpx = (slug, formData) =>
    client.post(`/mountains/${slug}/gpx`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const approvePhoto = (id) => client.patch(`/admin/photos/${id}/approve`);

export const approveGpx = (id) => client.patch(`/admin/gpx/${id}/approve`);
