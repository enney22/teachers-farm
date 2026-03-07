// src/app/admin/dashboard/page.tsx

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import {
    Plus, Trash2, Edit2, LogOut, Loader2, Menu, X, Settings,
    Image as ImageIcon, Info, Phone, MessageSquare, Layout,
    GraduationCap, TrendingUp, AlertCircle, CheckCircle
} from 'lucide-react';

import { TeamMemberModal } from './TeamMemberModal';
import { ProgramModal } from './ProgramModal';
import { DonationModal } from './DonationModal';
import { DonorModal } from './DonorModal';
import { ActivityModal } from './ActivityModal';
import { ServiceModal } from './ServiceModal';
import { TestimonialModal } from './TestimonialModal';
import { CorePillarModal } from './CorePillarModal';
import { HeroSlideModal } from './HeroSlideModal';
import { AboutModal } from './AboutModal';
import { ContactModal } from './ContactModal';
import { FooterModal } from './FooterModal';
import { ImpactModal } from './ImpactModal';
import { ConfirmationModal } from './ConfirmationModal';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

type TabType = 'team' | 'programs' | 'activities' | 'impact' | 'hero' | 'services' | 'testimonials' | 'pillars' | 'messages' | 'about' | 'contact' | 'footer' | 'payment-settings' | 'donors';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<TabType>('team');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Confirmation Modal State (Only for Delete now)
    const [confirmConfig, setConfirmConfig] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
        type?: 'danger' | 'warning' | 'info';
    }>({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
    });

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
        toast.info('Logged out successfully');
    };

    // Queries with Caching Optimization
    const createQuery = (key: string, path: string, isAdmin = false) => useQuery({
        queryKey: [key],
        queryFn: async () => {
            const resp = await axios.get(`${API_BASE_URL}/${isAdmin ? 'admin' : 'public'}/${path}`, isAdmin ? { headers: getHeaders() } : {});
            return resp.data;
        },
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: 1,
    });

    const { data: teamMembers, isLoading: loadingTeam } = createQuery('admin-team', 'team-members');
    const { data: programs, isLoading: loadingPrograms } = createQuery('admin-programs', 'programs');
    const { data: paymentSettings, isLoading: loadingPayment } = createQuery('admin-payment', 'donations');
    const { data: donors, isLoading: loadingDonors } = createQuery('admin-donors', 'donor-infos', true);
    const { data: activities, isLoading: loadingActivities } = createQuery('admin-activities', 'activities');
    const { data: services, isLoading: loadingServices } = createQuery('admin-services', 'services');
    const { data: testimonials, isLoading: loadingTestimonials } = createQuery('admin-testimonials', 'testimonials');
    const { data: pillars, isLoading: loadingPillars } = createQuery('admin-pillars', 'core-pillars');

    const { data: heroSlides, isLoading: loadingHero } = createQuery('admin-hero', 'hero-slides', true);
    const { data: aboutSettings, isLoading: loadingAbout } = createQuery('admin-about', 'about-settings', true);
    const { data: contactSettings, isLoading: loadingContact } = createQuery('admin-contact', 'contact-settings', true);
    const { data: footerSettings, isLoading: loadingFooter } = createQuery('admin-footer', 'footer-settings', true);
    const { data: impactStats, isLoading: loadingImpact } = createQuery('admin-impact', 'impact-stats', true);
    const { data: contactMessages, isLoading: loadingMessages } = createQuery('admin-messages', 'contact-messages', true);

    // Mutations
    const mutationOptions = (key: string) => ({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key] });
            setIsModalOpen(false);
            setEditingItem(null);
            toast.success('Successfully saved!');
        },
        onError: (err: any) => {
            const detail = err.response?.data?.detail || err.message || 'Operation failed';
            toast.error(`Error: ${detail}`);
        }
    });

    const createMutation = (key: string, path: string) => useMutation({
        mutationFn: (data: any) => {
            // For settings, id: 0 is a placeholder for 'not yet in DB' or 'has default but need to update'
            // We want to use PUT if we have a real ID (> 0) or if we want to hit the alias
            if (editingItem && (editingItem.id > 0 || (isSettingsTab && editingItem.id !== undefined))) {
                return axios.put(`${API_BASE_URL}/admin/${path}/${editingItem.id}`, data, { headers: getHeaders() });
            }
            return axios.post(`${API_BASE_URL}/admin/${path}`, data, { headers: getHeaders() });
        },
        ...mutationOptions(key)
    });

    const teamMutation = createMutation('admin-team', 'team-members');
    const programMutation = createMutation('admin-programs', 'programs');
    const paymentMutation = createMutation('admin-payment', 'donations');
    const donorMutation = createMutation('admin-donors', 'donor-infos');
    const activityMutation = createMutation('admin-activities', 'activities');
    const serviceMutation = createMutation('admin-services', 'services');
    const testimonialMutation = createMutation('admin-testimonials', 'testimonials');
    const pillarMutation = createMutation('admin-pillars', 'core-pillars');
    const heroMutation = createMutation('admin-hero', 'hero-slides');
    const aboutMutation = createMutation('admin-about', 'about-settings');
    const contactMutation = createMutation('admin-contact', 'contact-settings');
    const footerMutation = createMutation('admin-footer', 'footer-settings');
    const impactMutation = createMutation('admin-impact', 'impact-stats');

    const deleteMutation = useMutation({
        mutationFn: (id: number) => {
            const endpointMap: Record<string, string> = {
                team: 'team-members',
                programs: 'programs',
                'payment-settings': 'donations',
                donors: 'donor-infos',
                activities: 'activities',
                services: 'services',
                testimonials: 'testimonials',
                pillars: 'core-pillars',
                hero: 'hero-slides',
                impact: 'impact-stats'
            };
            return axios.delete(`${API_BASE_URL}/admin/${endpointMap[activeTab]}/${id}`, { headers: getHeaders() });
        },
        onSuccess: () => {
            const keyMap: Record<string, string> = {
                team: 'admin-team',
                programs: 'admin-programs',
                'payment-settings': 'admin-payment',
                donors: 'admin-donors',
                activities: 'admin-activities',
                services: 'admin-services',
                testimonials: 'admin-testimonials',
                pillars: 'admin-pillars',
                hero: 'admin-hero',
                impact: 'admin-impact'
            };
            queryClient.invalidateQueries({ queryKey: [keyMap[activeTab]] });
            toast.success('Item deleted successfully');
        },
        onError: (err: any) => {
            toast.error(`Delete failed: ${err.response?.data?.detail || err.message}`);
        }
    });

    const openConfirm = (title: string, message: string, onConfirm: () => void, type: 'danger' | 'warning' | 'info' = 'danger') => {
        setConfirmConfig({
            isOpen: true,
            title,
            message,
            onConfirm: () => {
                onConfirm();
                setConfirmConfig(prev => ({ ...prev, isOpen: false }));
            },
            type
        });
    };

    const handleFormSubmit = (data: any) => {
        const mutations: Record<TabType, any> = {
            team: teamMutation,
            programs: programMutation,
            'payment-settings': paymentMutation,
            donors: donorMutation,
            activities: activityMutation,
            services: serviceMutation,
            testimonials: testimonialMutation,
            pillars: pillarMutation,
            hero: heroMutation,
            about: aboutMutation,
            contact: contactMutation,
            footer: footerMutation,
            impact: impactMutation,
            messages: null as any
        };

        // No confirmation modal for Create/Update, just Save
        mutations[activeTab].mutate(data);
    };

    const handleDelete = (id: number) => {
        openConfirm(
            'Confirm Delete',
            'This action cannot be undone. Are you sure you want to delete this item?',
            () => deleteMutation.mutate(id),
            'danger'
        );
    };

    const isLoading = loadingTeam || loadingPrograms || loadingPayment || loadingDonors ||
        loadingActivities || loadingServices || loadingTestimonials ||
        loadingPillars || loadingHero || loadingAbout || loadingContact ||
        loadingFooter || loadingImpact;

    const tabs: { id: TabType, label: string, icon: any }[] = [
        { id: 'team', label: 'Team', icon: <Info size={18} /> },
        { id: 'programs', label: 'Programs', icon: <GraduationCap size={18} /> },
        { id: 'activities', label: 'Activities', icon: <ImageIcon size={18} /> },
        { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare size={18} /> },
        { id: 'pillars', label: 'Core Pillars', icon: <Layout size={18} /> },
        { id: 'impact', label: 'Impact Stats', icon: <TrendingUp size={18} /> },
        { id: 'hero', label: 'Hero Slides', icon: <ImageIcon size={18} /> },
        { id: 'services', label: 'Services', icon: <Settings size={18} /> },
        { id: 'messages', label: 'Contact Messages', icon: <MessageSquare size={18} /> },
        { id: 'about', label: 'About Page', icon: <Info size={18} /> },
        { id: 'contact', label: 'Contact Info', icon: <Phone size={18} /> },
        { id: 'footer', label: 'Footer Settings', icon: <Settings size={18} /> },
        { id: 'payment-settings', label: 'Donations', icon: <Settings size={18} /> },
        { id: 'donors', label: 'Donors', icon: <Settings size={18} /> },
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
            pillars: pillars,
            hero: heroSlides,
            about: aboutSettings ? [aboutSettings] : [],
            contact: contactSettings ? [contactSettings] : [],
            footer: footerSettings ? [footerSettings] : [],
            impact: impactStats,
            messages: contactMessages
        };
        return dataMap[activeTab];
    };

    const getLabel = (item: any) => {
        if (activeTab === 'testimonials') return item.name;
        if (activeTab === 'donors') return item.donorsname;
        if (activeTab === 'about') return item.mission_title || "Main Content";
        if (activeTab === 'contact') return item.email || "Contact Details";
        if (activeTab === 'footer') return item.copyright_text || "Footer Links & Text";
        if (activeTab === 'impact') return item.stat;
        if (activeTab === 'messages') return item.name;
        return item.name || item.title;
    };

    const getDetails = (item: any) => {
        if (activeTab === 'messages') return item.message;
        if (activeTab === 'team') return item.role;
        if (activeTab === 'payment-settings') return item.currency;
        if (activeTab === 'donors') return `USD ${item.donorsamount}`;
        if (activeTab === 'testimonials') return item.role;
        if (activeTab === 'impact') return item.label;
        if (activeTab === 'about') return "Configure Mission, Vision, etc.";
        if (activeTab === 'contact') return item.phone || "Email: " + item.email;
        if (activeTab === 'footer') return item.copyright_text;
        return item.description?.substring(0, 30) + (item.description?.length > 30 ? '...' : '');
    };

    const isSettingsTab = ['about', 'contact', 'footer'].includes(activeTab);
    const dataEmpty = !getCurrentData() || getCurrentData().length === 0;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden bg-green-900 p-4 flex justify-between items-center text-white sticky top-0 z-50 shadow-lg">
                <span className="font-bold">Admin Panel</span>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`
                w-64 bg-green-900 text-white p-6 flex flex-col fixed h-full z-40 transition-transform duration-300 md:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <h2 className="hidden md:block text-xl font-bold mb-8">Admin Panel</h2>
                <nav className="flex-1 space-y-1 overflow-y-auto pr-2 mt-1 flow-root md:mt-0 font-medium">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
                            className={`w-full flex items-center p-3 rounded transition-all text-sm ${activeTab === tab.id ? 'bg-green-700 shadow-inner' : 'hover:bg-green-800'}`}
                        >
                            <span className="mr-3 text-green-300 opacity-80">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </nav>
                <button
                    onClick={handleLogout}
                    className="mt-6 flex items-center text-red-300 hover:text-red-100 p-2 border-t border-green-800 pt-6 transition-colors"
                >
                    <LogOut size={18} className="mr-2" /> Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8 md:ml-64 w-full">
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h1 className="text-2xl font-bold capitalize text-gray-800">
                        {tabs.find(t => t.id === activeTab)?.label} Management
                    </h1>
                    {((!isSettingsTab && activeTab !== 'donors' && activeTab !== 'messages') || (isSettingsTab && dataEmpty)) && (
                        <button
                            onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
                            className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-green-700 transition-all shadow-md active:scale-95 font-semibold"
                        >
                            <Plus size={18} className="mr-2" /> Add New
                        </button>
                    )}
                </header>

                {isLoading ? (
                    <div className="flex flex-col justify-center items-center h-64 space-y-4">
                        <Loader2 className="animate-spin text-green-600" size={48} />
                        <p className="text-gray-400 animate-pulse">Loading data...</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                        {/* Desktop Table View */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name/Title</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {getCurrentData()?.map((item: any) => (
                                        <tr key={item.id} className="hover:bg-green-50/30 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">
                                                {isSettingsTab ? 'SYSTEM' : (item.id || '-')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 group-hover:text-green-700 transition-colors">{getLabel(item)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {getDetails(item)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                                <button
                                                    onClick={() => { setEditingItem(item); setIsModalOpen(true); }}
                                                    className="text-blue-600 hover:text-blue-900 mr-4 p-2 hover:bg-blue-50 rounded-full transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                {!isSettingsTab && activeTab !== 'donors' && (
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-all"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile/Tablet Card View */}
                        <div className="lg:hidden divide-y divide-gray-200">
                            {getCurrentData()?.map((item: any) => (
                                <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-mono mb-1">UUID: {item.id || '-'}</p>
                                            <h3 className="font-bold text-gray-900">{getLabel(item)}</h3>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => { setEditingItem(item); setIsModalOpen(true); }}
                                                className="p-3 bg-blue-50 text-blue-600 rounded-lg active:scale-95 transition-transform"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            {!isSettingsTab && activeTab !== 'donors' && (
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-3 bg-red-50 text-red-400 rounded-lg active:scale-95 transition-transform"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">{getDetails(item)}</p>
                                </div>
                            ))}
                        </div>

                        {dataEmpty && (
                            <div className="text-center py-24 text-gray-300">
                                <ImageIcon size={64} className="mx-auto mb-4 opacity-10" />
                                <p className="text-lg">No items found for this section.</p>
                                <p className="text-sm">Click "Add New" to populate your content.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Confirmation Modal (Delete only) */}
            <ConfirmationModal
                isOpen={confirmConfig.isOpen}
                title={confirmConfig.title}
                message={confirmConfig.message}
                onConfirm={confirmConfig.onConfirm}
                onCancel={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))}
                type={confirmConfig.type}
            />

            {/* Modals Container */}
            <div id="modals">
                {isModalOpen && (
                    <>
                        {activeTab === 'team' && <TeamMemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleFormSubmit} initialData={editingItem} />}
                        {activeTab === 'programs' && <ProgramModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleFormSubmit} initialData={editingItem} />}
                        {activeTab === 'payment-settings' && <DonationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleFormSubmit} initialData={editingItem} />}
                        {activeTab === 'donors' && <DonorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleFormSubmit} initialData={editingItem} />}
                        {activeTab === 'activities' && <ActivityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleFormSubmit} initialData={editingItem} />}
                        {activeTab === 'services' && <ServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleFormSubmit} initialData={editingItem} />}
                        {activeTab === 'testimonials' && <TestimonialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleFormSubmit} initialData={editingItem} />}
                        {activeTab === 'pillars' && <CorePillarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleFormSubmit} initialData={editingItem} />}
                        {activeTab === 'hero' && <HeroSlideModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleFormSubmit} initialData={editingItem} />}
                        {activeTab === 'about' && <AboutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleFormSubmit} initialData={editingItem} />}
                        {activeTab === 'contact' && <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleFormSubmit} initialData={editingItem} />}
                        {activeTab === 'footer' && <FooterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleFormSubmit} initialData={editingItem} />}
                        {activeTab === 'impact' && <ImpactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleFormSubmit} initialData={editingItem} />}
                    </>
                )}
            </div>
        </div>
    );
}
