"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface FooterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

export function FooterModal({ isOpen, onClose, onSubmit, initialData }: FooterModalProps) {
    const [facebookUrl, setFacebookUrl] = useState(initialData?.facebook_url || '');
    const [instagramUrl, setInstagramUrl] = useState(initialData?.instagram_url || '');
    const [linkedinUrl, setLinkedinUrl] = useState(initialData?.linkedin_url || '');
    const [whatsappUrl, setWhatsappUrl] = useState(initialData?.whatsapp_url || '');
    const [twitterUrl, setTwitterUrl] = useState(initialData?.twitter_url || '');
    const [copyrightText, setCopyrightText] = useState(initialData?.copyright_text || "Teacher's Farm. All rights reserved.");

    useEffect(() => {
        if (isOpen) {
            setFacebookUrl(initialData?.facebook_url || '');
            setInstagramUrl(initialData?.instagram_url || '');
            setLinkedinUrl(initialData?.linkedin_url || '');
            setWhatsappUrl(initialData?.whatsapp_url || '');
            setTwitterUrl(initialData?.twitter_url || '');
            setCopyrightText(initialData?.copyright_text || "Teacher's Farm. All rights reserved.");
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl">
                <div className="flex justify-between items-center p-4 border-b bg-green-50">
                    <h3 className="text-xl font-bold text-green-800">Edit Footer Settings</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit({
                        facebook_url: facebookUrl, instagram_url: instagramUrl,
                        linkedin_url: linkedinUrl, whatsapp_url: whatsappUrl,
                        twitter_url: twitterUrl, copyright_text: copyrightText
                    });
                }} className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Facebook URL</label>
                        <input type="text" value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Instagram URL</label>
                        <input type="text" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                        <input type="text" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">WhatsApp URL</label>
                        <input type="text" value={whatsappUrl} onChange={(e) => setWhatsappUrl(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Twitter URL</label>
                        <input type="text" value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Copyright Text</label>
                        <input type="text" value={copyrightText} onChange={(e) => setCopyrightText(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required />
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
