import { useRef, useState } from 'react';
import { uploadPhoto } from '../../api/mountains';
import { useAuth } from '../../context/AuthContext';

export default function PhotoGallery({ photos = [], mountainSlug, onUpload }) {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';
    const [lightbox, setLightbox] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const fileRef = useRef(null);

    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        setUploading(true);
        setUploadError(null);

        const formData = new FormData();
        formData.append('photo', file);

        try {
            await uploadPhoto(mountainSlug, formData);
            onUpload?.();
            e.target.value = '';
        } catch (err) {
            setUploadError(err.response?.data?.message || 'Upload failed.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            {photos.length === 0 ? (
                <p className="text-slate text-sm mb-4">No photos yet.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                    {photos.map((photo) => (
                        <button
                            key={photo.id}
                            onClick={() => setLightbox(photo)}
                            className="aspect-square overflow-hidden bg-mist focus:outline-none"
                        >
                            <img
                                src={photo.photo_url}
                                alt={photo.caption || 'Mountain photo'}
                                className="w-full h-full object-cover hover:scale-105 transition-transform"
                            />
                        </button>
                    ))}
                </div>
            )}

            {isAdmin && (
                <div className="mt-2">
                    <input
                        type="file"
                        ref={fileRef}
                        onChange={handleUpload}
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                    />
                    <button
                        onClick={() => fileRef.current?.click()}
                        disabled={uploading}
                        className="text-xs font-medium border border-forest text-forest px-3 py-1.5 hover:bg-forest hover:text-stone transition-colors disabled:opacity-50"
                    >
                        {uploading ? 'Uploading...' : 'Upload photo'}
                    </button>
                    {uploadError && <p className="text-red-600 text-xs mt-1">{uploadError}</p>}
                </div>
            )}

            {/* Lightbox */}
            {lightbox && (
                <div
                    className="fixed inset-0 bg-charcoal/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setLightbox(null)}
                >
                    <div className="max-w-3xl max-h-full" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={lightbox.photo_url}
                            alt={lightbox.caption || ''}
                            className="max-w-full max-h-[80vh] object-contain"
                        />
                        {lightbox.caption && (
                            <p className="text-stone/70 text-sm mt-2 text-center">{lightbox.caption}</p>
                        )}
                        <button
                            onClick={() => setLightbox(null)}
                            className="absolute top-4 right-4 text-stone text-2xl leading-none"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
