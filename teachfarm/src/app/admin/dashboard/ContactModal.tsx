"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

export function ContactModal({ isOpen, onClose, onSubmit, initialData }: ContactModalProps) {
    const [email, setEmail] = useState(initialData?.email || '');
    const [phone, setPhone] = useState(initialData?.phone || '');
    const [address, setAddress] = useState(initialData?.address || '');
    const [mapUrl, setMapUrl] = useState(initialData?.map_url || '');

    useEffect(() => {
        if (isOpen) {
            setEmail(initialData?.email || '');
            setPhone(initialData?.phone || '');
            setAddress(initialData?.address || '');
            setMapUrl(initialData?.map_url || '');
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl">
                <div className="flex justify-between items-center p-4 border-b bg-green-50">
                    <h3 className="text-xl font-bold text-green-800">Edit Contact Settings</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit({ email, phone, address, map_url: mapUrl });
                }} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Physical Address</label>
                        <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 block w-full p-2 border rounded-md h-20" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Google Maps Embed URL (Optional)</label>
                        <input type="text" value={mapUrl} onChange={(e) => setMapUrl(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" />
                    </div>
                    <div className="flex justify-end pt-4 space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Update Settings</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
