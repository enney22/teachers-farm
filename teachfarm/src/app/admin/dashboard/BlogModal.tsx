"use client";

import { useState, useEffect } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface BlogModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

export function BlogModal({ isOpen, onClose, onSubmit, initialData }: BlogModalProps) {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featured_image: '',
        author: "Teacher's Farm Team",
        is_featured: 0
    });
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                title: '',
                slug: '',
                excerpt: '',
                content: '',
                featured_image: '',
                author: "Teacher's Farm Team",
                is_featured: 0
            });
        }
    }, [initialData, isOpen]);

    // Auto-generate slug from title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        setFormData({ ...formData, title, slug });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);

        try {
            const token = localStorage.getItem('admin_token');
            const response = await axios.post(`${API_BASE_URL.replace('/api', '')}/upload`, formDataUpload, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            setFormData(prev => ({ ...prev, featured_image: response.data.url }));
            toast.success('Image uploaded!');
        } catch (error) {
            toast.error('Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-900">{initialData ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <form className="p-6 space-y-4 overflow-y-auto" onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                required
                                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                value={formData.title}
                                onChange={handleTitleChange}
                                placeholder="e.g., Training Session in Monrovia"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">URL Slug</label>
                            <input
                                type="text"
                                required
                                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none transition-all bg-gray-50"
                                value={formData.slug}
                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Author</label>
                            <input
                                type="text"
                                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                value={formData.author}
                                onChange={e => setFormData({ ...formData, author: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Featured Image</label>
                        <div className="flex items-center gap-4">
                            <label className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-all">
                                {isUploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                                <span className="text-sm font-medium">Upload Image</span>
                                <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                            </label>
                            {formData.featured_image && (
                                <div className="h-16 w-16 rounded border overflow-hidden">
                                    <img 
                                        src={formData.featured_image.startsWith('http') ? formData.featured_image : `${API_BASE_URL.replace('/api', '')}${formData.featured_image}`} 
                                        className="h-full w-full object-cover" 
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Excerpt (Short Preview)</label>
                        <textarea
                            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none transition-all h-20"
                            value={formData.excerpt}
                            onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                            placeholder="A brief summary for the blog list..."
                        />
                    </div>

                    <div className="flex-grow">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Full Content</label>
                        <textarea
                            required
                            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none transition-all h-48 font-serif"
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Write your story here..."
                        />
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <input
                            type="checkbox"
                            id="featured"
                            className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            checked={formData.is_featured === 1}
                            onChange={e => setFormData({ ...formData, is_featured: e.target.checked ? 1 : 0 })}
                        />
                        <label htmlFor="featured" className="text-sm font-bold text-green-800">
                            Feature this post on the homepage
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 transition-all shadow-lg active:scale-95"
                    >
                        Publish Post
                    </button>
                </form>
            </div>
        </div>
    );
}
