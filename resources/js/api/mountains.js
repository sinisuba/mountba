import client from './client';

export const getMountains = () => client.get('/mountains');

export const getMountain = (slug) => client.get(`/mountains/${slug}`);

export const createMountain = (data) => client.post('/admin/mountains', data);

export const updateMountain = (id, data) => client.put(`/admin/mountains/${id}`, data);

export const uploadPhoto = (slug, formData) =>
    client.post(`/mountains/${slug}/photos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const uploadGpx = (slug, formData) =>
    client.post(`/mountains/${slug}/gpx`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const approvePhoto = (id) => client.patch(`/admin/photos/${id}/approve`);

export const approveGpx = (id) => client.patch(`/admin/gpx/${id}/approve`);

export const downloadGpx = async (slug, trackId, title) => {
    const response = await client.get(`/mountains/${slug}/gpx/${trackId}/download`, {
        responseType: 'blob',
    });
    const url = URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.gpx`;
    link.click();
    URL.revokeObjectURL(url);
};
