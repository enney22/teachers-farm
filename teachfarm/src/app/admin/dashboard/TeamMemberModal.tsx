"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface TeamMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

export function TeamMemberModal({ isOpen, onClose, onSubmit, initialData }: TeamMemberModalProps) {
    const [name, setName] = useState(initialData?.name || '');
    const [role, setRole] = useState(initialData?.role || '');
    const [bio, setBio] = useState(initialData?.bio || '');
    const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
    const [uploading, setUploading] = useState(false);

    // Sync state with initialData when it changes or modal opens
    useEffect(() => {
        if (isOpen) {
            setName(initialData?.name || '');
            setRole(initialData?.role || '');
            setBio(initialData?.bio || '');
            setImageUrl(initialData?.image_url || '');
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

            if (!response.ok) {
                throw new Error(result.error || 'Upload failed');
            }

            setImageUrl(result.url);
        } catch (error: any) {
            console.error('Upload failed:', error);
            alert(`Upload failed: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-green-800">
                        {initialData ? 'Edit Team Member' : 'Add Team Member'}
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit({ name, role, bio, image_url: imageUrl });
                }} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-1 block w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="mt-1 block w-full p-2 border rounded-md h-24"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <div className="mt-1 space-y-2">
                            {imageUrl && (
                                <img src={imageUrl} alt="Preview" className="w-20 h-20 object-cover rounded-md border" />
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
                    <div className="flex justify-end pt-4 space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                            {initialData ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
