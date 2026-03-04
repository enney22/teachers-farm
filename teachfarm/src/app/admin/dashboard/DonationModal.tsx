"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface DonationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

export function DonationModal({ isOpen, onClose, onSubmit, initialData }: DonationModalProps) {
    const [name, setName] = useState(initialData?.name || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [currency, setCurrency] = useState(initialData?.currency || 'USD');
    const [orangeName, setOrangeName] = useState(initialData?.orangemoneyname || '');
    const [orangeNumber, setOrangeNumber] = useState(initialData?.orangemoneynumber || '');
    const [mtnName, setMtnName] = useState(initialData?.mtnmoneyname || '');
    const [mtnNumber, setMtnNumber] = useState(initialData?.mtnmoneynumber || '');

    // Sync state with initialData when it changes or modal opens
    useEffect(() => {
        if (isOpen) {
            setName(initialData?.name || '');
            setDescription(initialData?.description || '');
            setCurrency(initialData?.currency || 'USD');
            setOrangeName(initialData?.orangemoneyname || '');
            setOrangeNumber(initialData?.orangemoneynumber || '');
            setMtnName(initialData?.mtnmoneyname || '');
            setMtnNumber(initialData?.mtnmoneynumber || '');
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg w-full max-w-md my-8">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-green-800">
                        {initialData ? 'Edit Donation Option' : 'Add Donation Option'}
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit({
                        name,
                        description,
                        currency,
                        orangemoneyname: orangeName,
                        orangemoneynumber: orangeNumber,
                        mtnmoneyname: mtnName,
                        mtnmoneynumber: mtnNumber
                    });
                }} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full p-2 border rounded-md h-20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Currency</label>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="mt-1 block w-full p-2 border rounded-md"
                        >
                            <option value="USD">USD</option>
                            <option value="LRD">LRD</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Orange Money Name</label>
                            <input
                                type="text"
                                value={orangeName}
                                onChange={(e) => setOrangeName(e.target.value)}
                                className="mt-1 block w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Orange Money No.</label>
                            <input
                                type="text"
                                value={orangeNumber}
                                onChange={(e) => setOrangeNumber(e.target.value)}
                                className="mt-1 block w-full p-2 border rounded-md"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">MTN Money Name</label>
                            <input
                                type="text"
                                value={mtnName}
                                onChange={(e) => setMtnName(e.target.value)}
                                className="mt-1 block w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">MTN Money No.</label>
                            <input
                                type="text"
                                value={mtnNumber}
                                onChange={(e) => setMtnNumber(e.target.value)}
                                className="mt-1 block w-full p-2 border rounded-md"
                            />
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
