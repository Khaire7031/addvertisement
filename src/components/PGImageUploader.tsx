import React, { useState } from 'react';

const PGImageUploader = ({ onImagesChange }) => {
    const [images, setImages] = useState([]); // array of { id, url, loading, error }
    const [uploading, setUploading] = useState(false);

    const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    const MAX_IMAGES = 10;
    const canUploadMore = images.length < MAX_IMAGES;
    /**
     * Upload image to Telegram and get HD file URL
    */
    const uploadImageToTelegram = async (file) => {
        try {
            if (!BOT_TOKEN || !CHAT_ID) {
                throw new Error('Telegram credentials not configured. Set VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in .env');
            }

            // Step 1: Upload photo to Telegram
            const formData = new FormData();
            formData.append('chat_id', CHAT_ID);
            formData.append('photo', file);

            const uploadUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
            const uploadResponse = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error(`Telegram upload failed: ${uploadResponse.statusText}`);
            }

            const uploadData = await uploadResponse.json();

            if (!uploadData.ok || !uploadData.result?.photo) {
                throw new Error(uploadData.description || 'Failed to upload photo to Telegram');
            }

            // Step 2: Pick HD image (highest resolution)
            const photos = uploadData.result.photo;
            const hdPhoto = photos[photos.length - 1];
            const fileId = hdPhoto.file_id;

            // Step 3: Get file path
            const fileUrl = `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`;
            const fileResponse = await fetch(fileUrl);

            console.log('Current images:', images);
            console.log('File URL:', fileUrl);
            if (!fileResponse.ok) {
                throw new Error(`Failed to get file info: ${fileResponse.statusText}`);
            }

            const fileData = await fileResponse.json();

            if (!fileData.ok || !fileData.result?.file_path) {
                throw new Error(fileData.description || 'Failed to retrieve file path');
            }

            // Step 4: Construct HD download URL
            const filePath = fileData.result.file_path;
            const imageUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;

            return { imageUrl, fileId };
        } catch (error) {
            console.error('Error uploading to Telegram:', error);
            throw error;
        }
    };

    /**
     * Handle file selection and upload
     */
    const handleFileSelect = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Reset input
        event.target.value = '';

        // Validate file is image
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file');
            return;
        }

        // Create temporary image entry with loading state
        const tempId = Date.now();
        const tempEntry = {
            id: tempId,
            url: null,
            fileId: null,
            loading: true,
            error: null,
        };

        setImages((prev) => [...prev, tempEntry]);
        setUploading(true);

        try {
            // Upload to Telegram
            const { imageUrl, fileId } = await uploadImageToTelegram(file);

            // Update with successful URL
            setImages((prev) =>
                prev.map((img) =>
                    img.id === tempId ? { ...img, url: imageUrl, fileId: fileId, loading: false, error: null } : img
                )
            );
        } catch (error) {
            // Update with error
            setImages((prev) =>
                prev.map((img) =>
                    img.id === tempId
                        ? { ...img, loading: false, error: error.message || 'Upload failed' }
                        : img
                )
            );
        } finally {
            setUploading(false);
        }
    };

    /**
     * Remove image from list
     */
    const handleRemoveImage = (id) => {
        setImages((prev) => prev.filter((img) => img.id !== id));
    };

    /**
     * Notify parent whenever images update
     */
    React.useEffect(() => {
        const validImages = images.filter((img) => img.url); // Only include successfully uploaded images

        const imageUrls = validImages.map((img) => img.url).join(',');
        const imageIds = validImages.map((img) => img.fileId).join(',');

        if (onImagesChange) {
            onImagesChange(imageUrls, imageIds);
        }
    }, [images, onImagesChange]);

    return (
        <div className="w-full my-2">
            <h3>Add Images</h3>
            <div className="p-1 bg-gray-50 rounded-lg border border-gray-300">
                <div className="flex flex-wrap gap-2 mb-2 items-center">
                    {/* Display uploaded images */}
                    {images.map((img) => (
                        <div key={img.id} className="relative bg-white overflow-hidden border border-gray-300 rounded-full flex items-center justify-center" style={{ width: '5rem', height: '5rem' }}>
                            {img.loading && (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-600 gap-2 text-xs">
                                    <div className="w-4 h-4 border-2 border-gray-300 border-t-accent rounded-full animate-spin" />
                                    <p>Uploading...</p>
                                </div>
                            )}

                            {img.error && (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-red-100 text-red-600 gap-1 text-xs">
                                    <p className="font-bold">Error</p>
                                    <small className="text-center px-1">{img.error}</small>
                                    <button
                                        type="button"
                                        className="mt-1 px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-800 transition"
                                        onClick={() => handleRemoveImage(img.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}

                            {img.url && !img.loading && !img.error && (
                                <div className="relative w-full h-full cursor-pointer" onClick={() => window.open(img.url, '_blank')} title="Open full image">
                                    <img src={img.url} alt="PG" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        className="absolute -top-1 -right-1 w-4 h-4 bg-black bg-opacity-60 text-white rounded-full flex items-center justify-center text-xs hover:bg-opacity-80 transition"
                                        onClick={(e) => { e.stopPropagation(); handleRemoveImage(img.id); }}
                                        aria-label="Remove image"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Upload button */}
                    {canUploadMore && (
                        <label className="flex items-center justify-center bg-white border-2 border-dashed border-gray-400 rounded-full cursor-pointer hover:border-accent hover:bg-orange-50 transition" style={{ width: '5rem', height: '5rem' }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                disabled={uploading}
                                className="hidden"
                            />
                            <div className="text-center pointer-events-none">
                                <span className="block text-4xl text-accent font-bold">+</span>
                                <p className="text-xs text-gray-500 mt-1">{images.length}/{MAX_IMAGES}</p>
                            </div>
                        </label>
                    )}
                </div>

                {/* Status message */}
                {images.length === MAX_IMAGES && (
                    <p className="text-xs text-gray-600 text-center">Maximum 10 images uploaded</p>
                )}

                {uploading && <p className="text-xs text-accent text-center font-medium">Uploading image...</p>}
            </div>
        </div>
    );
};

export default PGImageUploader;
