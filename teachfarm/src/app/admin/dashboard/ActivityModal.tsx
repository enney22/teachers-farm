"use client";

import { useState, useEffect } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';

interface ActivityModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

export const ActivityModal = ({ isOpen, onClose, onSubmit, initialData }: ActivityModalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
            setImageUrl(initialData.image_url || '');
        } else {
            setTitle('');
            setDescription('');
            setImageUrl('');
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
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">{initialData ? 'Edit' : 'Add'} Activity</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <form className="p-6 space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit({ title, description, image_url: imageUrl });
                }}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <div className="flex items-center space-x-4">
                            <label className="cursor-pointer bg-green-50 text-green-700 px-4 py-2 rounded border border-green-200 hover:bg-green-100 transition-colors flex items-center">
                                <Upload size={18} className="mr-2" />
                                {uploading ? 'Uploading...' : 'Choose File'}
                                <input type="file" className="hidden" onChange={handleFileChange} />
                            </label>
                            {imageUrl && <span className="text-xs text-gray-500 truncate max-w-[200px]">{imageUrl}</span>}
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 pt-6 border-t">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center">
                            {initialData ? 'Update' : 'Add'} Activity
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
