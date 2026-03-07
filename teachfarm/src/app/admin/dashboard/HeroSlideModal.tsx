"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface HeroSlideModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

export function HeroSlideModal({ isOpen, onClose, onSubmit, initialData }: HeroSlideModalProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [subtitle, setSubtitle] = useState(initialData?.subtitle || '');
    const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
    const [buttonText, setButtonText] = useState(initialData?.button_text || 'Learn More');
    const [buttonLink, setButtonLink] = useState(initialData?.button_link || '/about');
    const [order, setOrder] = useState(initialData?.order || 0);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTitle(initialData?.title || '');
            setSubtitle(initialData?.subtitle || '');
            setImageUrl(initialData?.image_url || '');
            setButtonText(initialData?.button_text || 'Learn More');
            setButtonLink(initialData?.button_link || '/about');
            setOrder(initialData?.order || 0);
        }
    }, [initialData, isOpen]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
                method: 'POST',
                body: file,
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Upload failed');
            setImageUrl(result.url);
        } catch (error: any) {
            alert(`Upload failed: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl">
                <div className="flex justify-between items-center p-4 border-b bg-green-50">
                    <h3 className="text-xl font-bold text-green-800">
                        {initialData ? 'Edit Hero Slide' : 'Add Hero Slide'}
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit({ title, subtitle, image_url: imageUrl, button_text: buttonText, button_link: buttonLink, order: parseInt(order as any) });
                }} className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Slide Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subtitle/Description</label>
                        <textarea
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            className="mt-1 block w-full p-2 border rounded-md h-24"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <div className="mt-1 space-y-2">
                            {imageUrl && (
                                <img src={imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-md border" />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                            />
                            {uploading && <p className="text-xs text-green-600 animate-pulse">Uploading...</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Button Text</label>
                            <input
                                type="text"
                                value={buttonText}
                                onChange={(e) => setButtonText(e.target.value)}
                                className="mt-1 block w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Button Link</label>
                            <input
                                type="text"
                                value={buttonLink}
                                onChange={(e) => setButtonLink(e.target.value)}
                                className="mt-1 block w-full p-2 border rounded-md"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Display Order</label>
                        <input
                            type="number"
                            value={order}
                            onChange={(e) => setOrder(parseInt(e.target.value))}
                            className="mt-1 block w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="flex justify-end pt-4 space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                            {initialData ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
