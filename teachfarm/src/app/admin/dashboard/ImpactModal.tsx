"use client";

import { useState, useEffect } from 'react';
import { X, Star, TrendingUp, Award, Users, BookOpen, GraduationCap } from 'lucide-react';

interface ImpactModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

const ICONS = ['Star', 'TrendingUp', 'Award', 'Users', 'BookOpen', 'GraduationCap'];
const ICON_MAP: Record<string, any> = { Star, TrendingUp, Award, Users, BookOpen, GraduationCap };

export function ImpactModal({ isOpen, onClose, onSubmit, initialData }: ImpactModalProps) {
    const [stat, setStat] = useState(initialData?.stat || '');
    const [label, setLabel] = useState(initialData?.label || '');
    const [icon, setIcon] = useState(initialData?.icon || 'Star');

    useEffect(() => {
        if (isOpen) {
            setStat(initialData?.stat || '');
            setLabel(initialData?.label || '');
            setIcon(initialData?.icon || 'Star');
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl">
                <div className="flex justify-between items-center p-4 border-b bg-green-50">
                    <h3 className="text-xl font-bold text-green-800">
                        {initialData ? 'Edit Impact Stat' : 'Add Impact Stat'}
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit({ stat, label, icon });
                }} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Statistic (e.g. 700+, 30%)</label>
                        <input type="text" value={stat} onChange={(e) => setStat(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Label (e.g. Teachers Trained)</label>
                        <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                        <div className="grid grid-cols-6 gap-2">
                            {ICONS.map(i => {
                                const IconComp = ICON_MAP[i];
                                return (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setIcon(i)}
                                        className={`p-2 border rounded-md flex items-center justify-center transition-colors ${i === icon ? 'bg-green-100 border-green-500 text-green-700' : 'hover:bg-gray-50 text-gray-400'}`}
                                        title={i}
                                    >
                                        <IconComp size={20} />
                                    </button>
                                );
                            })}
                        </div>
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
