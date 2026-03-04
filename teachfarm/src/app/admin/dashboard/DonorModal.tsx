"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface DonorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

export const DonorModal = ({ isOpen, onClose, onSubmit, initialData }: DonorModalProps) => {
    const [donorsname, setDonorsname] = useState('');
    const [donorsamount, setDonorsamount] = useState<number | ''>('');
    const [dornorsnumber, setDornorsnumber] = useState('');

    useEffect(() => {
        if (initialData) {
            setDonorsname(initialData.donorsname || '');
            setDonorsamount(initialData.donorsamount || '');
            setDornorsnumber(initialData.dornorsnumber || '');
        } else {
            setDonorsname('');
            setDonorsamount('');
            setDornorsnumber('');
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">{initialData ? 'Edit' : 'Add'} Donor Record</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <form className="p-6 space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit({ donorsname, donorsamount: Number(donorsamount), dornorsnumber });
                }}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Donor's Name</label>
                        <input
                            type="text"
                            value={donorsname}
                            onChange={(e) => setDonorsname(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Donation Amount</label>
                        <input
                            type="number"
                            value={donorsamount}
                            onChange={(e) => setDonorsamount(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                        <input
                            type="text"
                            value={dornorsnumber}
                            onChange={(e) => setDornorsnumber(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="e.g. 0777777777"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-3 pt-6 border-t">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                            {initialData ? 'Update' : 'Add'} Record
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
