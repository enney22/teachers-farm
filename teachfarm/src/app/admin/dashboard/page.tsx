"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Plus, Trash2, Edit2, LogOut, Loader2 } from 'lucide-react';
import { TeamMemberModal } from './TeamMemberModal';
import { ProgramModal } from './ProgramModal';
import { DonationModal } from './DonationModal';
import { DonorModal } from './DonorModal';
import { ActivityModal } from './ActivityModal';
import { ServiceModal } from './ServiceModal';
import { TestimonialModal } from './TestimonialModal';
import { CorePillarModal } from './CorePillarModal';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

type TabType = 'team' | 'programs' | 'payment-settings' | 'donors' | 'activities' | 'services' | 'testimonials' | 'pillars';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<TabType>('team');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const router = useRouter();
    const queryClient = useQueryClient();

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            router.push('/admin');
        }
    }, [router]);

    const getHeaders = () => ({
        Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
    });

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        router.push('/admin');
    };

    // Queries
    const { data: teamMembers, isLoading: loadingTeam } = useQuery({
        queryKey: ['admin-team'],
        queryFn: async () => {
            const resp = await axios.get(`${API_BASE_URL}/public/team-members`);
            return resp.data;
        }
    });

    const { data: programs, isLoading: loadingPrograms } = useQuery({
        queryKey: ['admin-programs'],
        queryFn: async () => {
            const resp = await axios.get(`${API_BASE_URL}/public/programs`);
            return resp.data;
        }
    });

    const { data: paymentSettings, isLoading: loadingPayment } = useQuery({
        queryKey: ['admin-payment'],
        queryFn: async () => {
            const resp = await axios.get(`${API_BASE_URL}/public/donations`);
            return resp.data;
        }
    });

    const { data: donors, isLoading: loadingDonors } = useQuery({
        queryKey: ['admin-donors'],
        queryFn: async () => {
            const resp = await axios.get(`${API_BASE_URL}/admin/donor-infos`, { headers: getHeaders() });
            return resp.data;
        }
    });

    const { data: activities, isLoading: loadingActivities } = useQuery({
        queryKey: ['admin-activities'],
        queryFn: async () => {
            const resp = await axios.get(`${API_BASE_URL}/public/activities`);
            return resp.data;
        }
    });

    const { data: services, isLoading: loadingServices } = useQuery({
        queryKey: ['admin-services'],
        queryFn: async () => {
            const resp = await axios.get(`${API_BASE_URL}/public/services`);
            return resp.data;
        }
    });

    const { data: testimonials, isLoading: loadingTestimonials } = useQuery({
        queryKey: ['admin-testimonials'],
        queryFn: async () => {
            const resp = await axios.get(`${API_BASE_URL}/public/testimonials`);
            return resp.data;
        }
    });

    const { data: pillars, isLoading: loadingPillars } = useQuery({
        queryKey: ['admin-pillars'],
        queryFn: async () => {
            const resp = await axios.get(`${API_BASE_URL}/public/core-pillars`);
            return resp.data;
        }
    });

    // Mutations
    const mutationOptions = (key: string) => ({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key] });
            setIsModalOpen(false);
            setEditingItem(null);
        },
        onError: (error: any) => {
            alert(error.response?.data?.detail || 'Operation failed');
        }
    });

    const teamMutation = useMutation({
        mutationFn: (data: any) => {
            if (editingItem) return axios.put(`${API_BASE_URL}/admin/team-members/${editingItem.id}`, data, { headers: getHeaders() });
            return axios.post(`${API_BASE_URL}/admin/team-members`, data, { headers: getHeaders() });
        },
        ...mutationOptions('admin-team')
    });
    const programMutation = useMutation({
        mutationFn: (data: any) => {
            if (editingItem) return axios.put(`${API_BASE_URL}/admin/programs/${editingItem.id}`, data, { headers: getHeaders() });
            return axios.post(`${API_BASE_URL}/admin/programs`, data, { headers: getHeaders() });
        },
        ...mutationOptions('admin-programs')
    });
    const paymentMutation = useMutation({
        mutationFn: (data: any) => {
            if (editingItem) return axios.put(`${API_BASE_URL}/admin/donations/${editingItem.id}`, data, { headers: getHeaders() });
            return axios.post(`${API_BASE_URL}/admin/donations`, data, { headers: getHeaders() });
        },
        ...mutationOptions('admin-payment')
    });
    const donorMutation = useMutation({
        mutationFn: (data: any) => {
            if (editingItem) return axios.put(`${API_BASE_URL}/admin/donor-infos/${editingItem.id}`, data, { headers: getHeaders() });
            return axios.post(`${API_BASE_URL}/admin/donor-infos`, data, { headers: getHeaders() });
        },
        ...mutationOptions('admin-donors')
    });
    const activityMutation = useMutation({
        mutationFn: (data: any) => {
            if (editingItem) return axios.put(`${API_BASE_URL}/admin/activities/${editingItem.id}`, data, { headers: getHeaders() });
            return axios.post(`${API_BASE_URL}/admin/activities`, data, { headers: getHeaders() });
        },
        ...mutationOptions('admin-activities')
    });
    const serviceMutation = useMutation({
        mutationFn: (data: any) => {
            if (editingItem) return axios.put(`${API_BASE_URL}/admin/services/${editingItem.id}`, data, { headers: getHeaders() });
            return axios.post(`${API_BASE_URL}/admin/services`, data, { headers: getHeaders() });
        },
        ...mutationOptions('admin-services')
    });
    const testimonialMutation = useMutation({
        mutationFn: (data: any) => {
            if (editingItem) return axios.put(`${API_BASE_URL}/admin/testimonials/${editingItem.id}`, data, { headers: getHeaders() });
            return axios.post(`${API_BASE_URL}/admin/testimonials`, data, { headers: getHeaders() });
        },
        ...mutationOptions('admin-testimonials')
    });
    const pillarMutation = useMutation({
        mutationFn: (data: any) => {
            if (editingItem) return axios.put(`${API_BASE_URL}/admin/core-pillars/${editingItem.id}`, data, { headers: getHeaders() });
            return axios.post(`${API_BASE_URL}/admin/core-pillars`, data, { headers: getHeaders() });
        },
        ...mutationOptions('admin-pillars')
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => {
            const endpointMap: Record<TabType, string> = {
                team: 'team-members',
                programs: 'programs',
                'payment-settings': 'donations',
                donors: 'donor-infos',
                activities: 'activities',
                services: 'services',
                testimonials: 'testimonials',
                pillars: 'core-pillars'
            };
            return axios.delete(`${API_BASE_URL}/admin/${endpointMap[activeTab]}/${id}`, { headers: getHeaders() });
        },
        onSuccess: () => {
            const keyMap: Record<TabType, string> = {
                team: 'admin-team',
                programs: 'admin-programs',
                'payment-settings': 'admin-payment',
                donors: 'admin-donors',
                activities: 'admin-activities',
                services: 'admin-services',
                testimonials: 'admin-testimonials',
                pillars: 'admin-pillars'
            };
            queryClient.invalidateQueries({ queryKey: [keyMap[activeTab]] });
        }
    });

    const handleFormSubmit = (data: any) => {
        const mutations: Record<TabType, any> = {
            team: teamMutation,
            programs: programMutation,
            'payment-settings': paymentMutation,
            donors: donorMutation,
            activities: activityMutation,
            services: serviceMutation,
            testimonials: testimonialMutation,
            pillars: pillarMutation
        };
        mutations[activeTab].mutate(data);
    };

    const isLoading = loadingTeam || loadingPrograms || loadingPayment || loadingDonors || loadingActivities || loadingServices || loadingTestimonials || loadingPillars;

    const tabs: { id: TabType, label: string }[] = [
        { id: 'team', label: 'Team Members' },
        { id: 'programs', label: 'Our Programs' },
        { id: 'activities', label: 'Activities' },
        { id: 'services', label: 'Services' },
        { id: 'testimonials', label: 'Testimonials' },
        { id: 'pillars', label: 'Core Pillars' },
        { id: 'payment-settings', label: 'Payment Settings' },
        { id: 'donors', label: 'Donor Records' }
    ];

    const getCurrentData = () => {
        const dataMap: Record<TabType, any> = {
            team: teamMembers,
            programs: programs,
            'payment-settings': paymentSettings,
            donors: donors,
            activities: activities,
            services: services,
            testimonials: testimonials,
            pillars: pillars
        };
        return dataMap[activeTab];
    };

    const getLabel = (item: any) => {
        if (activeTab === 'testimonials') return item.name;
        if (activeTab === 'donors') return item.donorsname;
        return item.name || item.title;
    };

    const getDetails = (item: any) => {
        if (activeTab === 'team') return item.role;
        if (activeTab === 'payment-settings') return item.currency;
        if (activeTab === 'donors') return `USD ${item.donorsamount} - ${item.dornorsnumber}`;
        if (activeTab === 'testimonials') return item.role;
        return item.description?.substring(0, 30) + '...';
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-green-900 text-white p-6 flex flex-col fixed h-full">
                <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
                <nav className="flex-1 space-y-1 overflow-y-auto pr-2 scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full text-left p-2 rounded transition-colors text-sm ${activeTab === tab.id ? 'bg-green-700' : 'hover:bg-green-800'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
                <button
                    onClick={handleLogout}
                    className="mt-6 flex items-center text-red-300 hover:text-red-100 p-2"
                >
                    <LogOut size={18} className="mr-2" /> Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 ml-64 overflow-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold capitalize">
                        {tabs.find(t => t.id === activeTab)?.label} Management
                    </h1>
                    <button
                        onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
                        className="bg-green-600 text-white px-4 py-2 rounded flex items-center hover:bg-green-700 transition-colors shadow-sm"
                    >
                        <Plus size={18} className="mr-2" /> Add New
                    </button>
                </header>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="animate-spin text-green-600" size={48} />
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name/Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {getCurrentData()?.map((item: any) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{getLabel(item)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {getDetails(item)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => { setEditingItem(item); setIsModalOpen(true); }}
                                                className="text-blue-600 hover:text-blue-900 mr-4 transition-colors"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => confirm('Are you sure you want to delete this?') && deleteMutation.mutate(item.id)}
                                                className="text-red-400 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {getCurrentData()?.length === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                No items found. Click "Add New" to get started.
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modals */}
            {activeTab === 'team' && (
                <TeamMemberModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleFormSubmit}
                    initialData={editingItem}
                />
            )}
            {activeTab === 'programs' && (
                <ProgramModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleFormSubmit}
                    initialData={editingItem}
                />
            )}
            {activeTab === 'payment-settings' && (
                <DonationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleFormSubmit}
                    initialData={editingItem}
                />
            )}
            {activeTab === 'donors' && (
                <DonorModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleFormSubmit}
                    initialData={editingItem}
                />
            )}
            {activeTab === 'activities' && (
                <ActivityModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleFormSubmit}
                    initialData={editingItem}
                />
            )}
            {activeTab === 'services' && (
                <ServiceModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleFormSubmit}
                    initialData={editingItem}
                />
            )}
            {activeTab === 'testimonials' && (
                <TestimonialModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleFormSubmit}
                    initialData={editingItem}
                />
            )}
            {activeTab === 'pillars' && (
                <CorePillarModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleFormSubmit}
                    initialData={editingItem}
                />
            )}
        </div>
    );
}
