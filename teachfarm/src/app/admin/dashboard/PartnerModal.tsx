"use client";

import { useState, useEffect } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface PartnerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

export function PartnerModal({ isOpen, onClose, onSubmit, initialData }: PartnerModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        logo_url: '',
        website_url: '',
        order: 0
    });
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({ name: '', logo_url: '', website_url: '', order: 0 });
        }
    }, [initialData, isOpen]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        try {
            const response = await fetch(`/api/upload?filename=${file.name}`, {
                method: 'POST',
                body: file,
            });

            if (!response.ok) throw new Error('Upload failed');

            const blob = await response.json();
            setFormData(prev => ({ ...prev, logo_url: blob.url }));
            toast.success('Logo uploaded!');
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-900">{initialData ? 'Edit Partner' : 'Add New Partner'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Partner Name</label>
                        <input
                            type="text"
                            required
                            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none transition-all"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Logo</label>
                        <div className="flex items-center gap-4">
                            <label className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-all">
                                {isUploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                                <span className="text-sm font-medium">{formData.logo_url ? 'Change Logo' : 'Upload Logo'}</span>
                                <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                            </label>
                            {formData.logo_url && (
                                <div className="h-12 w-12 rounded border p-1">
                                    <img 
                                        src={formData.logo_url.startsWith('http') ? formData.logo_url : `${API_BASE_URL.replace('/api', '')}${formData.logo_url}`} 
                                        className="h-full w-full object-contain" 
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Website URL (Optional)</label>
                        <input
                            type="url"
                            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none transition-all"
                            value={formData.website_url}
                            onChange={e => setFormData({ ...formData, website_url: e.target.value })}
                            placeholder="https://..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Display Order</label>
                        <input
                            type="number"
                            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none transition-all"
                            value={formData.order}
                            onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-all shadow-lg active:scale-95"
                    >
                        Save Partner
                    </button>
                </form>
            </div>
        </div>
    );
}
