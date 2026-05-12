import client from './client';

export const getPeaks = (mountainSlug) => client.get(`/mountains/${mountainSlug}/peaks`);

export const getPeak = (mountainSlug, peakSlug) =>
    client.get(`/mountains/${mountainSlug}/peaks/${peakSlug}`);

export const createPeak = (mountainSlug, data) =>
    client.post(`/admin/mountains/${mountainSlug}/peaks`, data);

export const updatePeak = (id, data) => client.put(`/admin/peaks/${id}`, data);

export const deletePeak = (id) => client.delete(`/admin/peaks/${id}`);
