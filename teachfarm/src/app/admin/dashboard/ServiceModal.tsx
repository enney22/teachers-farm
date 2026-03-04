"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

const icons = ['BookOpen', 'Users', 'Briefcase', 'Shield', 'Star', 'Heart', 'Rocket'];

export const ServiceModal = ({ isOpen, onClose, onSubmit, initialData }: ServiceModalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('Star');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
            setIcon(initialData.icon || 'Star');
        } else {
            setTitle('');
            setDescription('');
            setIcon('Star');
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">{initialData ? 'Edit' : 'Add'} Service</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <form className="p-6 space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit({ title, description, icon });
                }}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                        <select value={icon} onChange={(e) => setIcon(e.target.value)} className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none">
                            {icons.map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                    </div>
                    <div className="flex justify-end space-x-3 pt-6 border-t">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                            {initialData ? 'Update' : 'Add'} Service
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
