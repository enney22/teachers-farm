"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

export function AboutModal({ isOpen, onClose, onSubmit, initialData }: AboutModalProps) {
    const [missionTitle, setMissionTitle] = useState(initialData?.mission_title || 'Our Mission');
    const [missionText, setMissionText] = useState(initialData?.mission_text || '');
    const [visionTitle, setVisionTitle] = useState(initialData?.vision_title || 'Our Vision');
    const [visionText, setVisionText] = useState(initialData?.vision_text || '');
    const [goalTitle, setGoalTitle] = useState(initialData?.goal_title || 'Our Goal');
    const [goalText, setGoalText] = useState(initialData?.goal_text || '');
    const [commitmentTitle, setCommitmentTitle] = useState(initialData?.commitment_title || 'Our Commitment');
    const [commitmentText, setCommitmentText] = useState(initialData?.commitment_text || '');
    const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setMissionTitle(initialData?.mission_title || 'Our Mission');
            setMissionText(initialData?.mission_text || '');
            setVisionTitle(initialData?.vision_title || 'Our Vision');
            setVisionText(initialData?.vision_text || '');
            setGoalTitle(initialData?.goal_title || 'Our Goal');
            setGoalText(initialData?.goal_text || '');
            setCommitmentTitle(initialData?.commitment_title || 'Our Commitment');
            setCommitmentText(initialData?.commitment_text || '');
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
            <div className="bg-white rounded-lg w-full max-w-2xl overflow-hidden shadow-xl">
                <div className="flex justify-between items-center p-4 border-b bg-green-50">
                    <h3 className="text-xl font-bold text-green-800">Edit About Page Settings</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit({
                        mission_title: missionTitle, mission_text: missionText,
                        vision_title: visionTitle, vision_text: visionText,
                        goal_title: goalTitle, goal_text: goalText,
                        commitment_title: commitmentTitle, commitment_text: commitmentText,
                        image_url: imageUrl
                    });
                }} className="p-6 space-y-6 max-h-[85vh] overflow-y-auto">

                    <div className="grid md:grid-cols-2 gap-6">
                        <section className="space-y-4">
                            <h4 className="font-bold text-green-700 border-b pb-1">Mission Section</h4>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Title</label>
                                <input type="text" value={missionTitle} onChange={(e) => setMissionTitle(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Description</label>
                                <textarea value={missionText} onChange={(e) => setMissionText(e.target.value)} className="mt-1 block w-full p-2 border rounded-md h-24" required />
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h4 className="font-bold text-green-700 border-b pb-1">Vision Section</h4>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Title</label>
                                <input type="text" value={visionTitle} onChange={(e) => setVisionTitle(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Description</label>
                                <textarea value={visionText} onChange={(e) => setVisionText(e.target.value)} className="mt-1 block w-full p-2 border rounded-md h-24" required />
                            </div>
                        </section>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 border-t pt-6">
                        <section className="space-y-4">
                            <h4 className="font-bold text-green-700 border-b pb-1">Goal Section</h4>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Title</label>
                                <input type="text" value={goalTitle} onChange={(e) => setGoalTitle(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Description</label>
                                <textarea value={goalText} onChange={(e) => setGoalText(e.target.value)} className="mt-1 block w-full p-2 border rounded-md h-24" required />
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h4 className="font-bold text-green-700 border-b pb-1">Commitment Section</h4>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Title</label>
                                <input type="text" value={commitmentTitle} onChange={(e) => setCommitmentTitle(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Full Text</label>
                                <textarea value={commitmentText} onChange={(e) => setCommitmentText(e.target.value)} className="mt-1 block w-full p-2 border rounded-md h-24" required />
                            </div>
                        </section>
                    </div>

                    <div className="border-t pt-6">
                        <label className="block text-sm font-medium text-gray-700">About Section Image</label>
                        <div className="mt-1 space-y-2">
                            {imageUrl && <img src={imageUrl} alt="Preview" className="w-full h-40 object-cover rounded-md border" />}
                            <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
                            {uploading && <p className="text-xs text-green-600 animate-pulse">Uploading...</p>}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 space-x-2 border-t">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors shadow-md">Update Settings</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
