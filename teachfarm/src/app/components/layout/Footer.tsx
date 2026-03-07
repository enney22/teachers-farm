// src/app/components/layout/Footer.tsx

"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Facebook, Instagram, Linkedin, Twitter, MessageCircle } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface FooterSettings {
  facebook_url?: string;
  instagram_url?: string;
  linkedin_url?: string;
  whatsapp_url?: string;
  twitter_url?: string;
  copyright_text: string;
}

export default function Footer() {
  const { data: settings, isLoading } = useQuery<FooterSettings>({
    queryKey: ['footer-settings'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/public/footer-settings`);
      return response.data;
    },
    staleTime: 30 * 60 * 1000,
    gcTime: 35 * 60 * 1000,
  });

  if (isLoading) return null;

  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-8">
          {settings?.facebook_url && <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors"><Facebook size={24} /></a>}
          {settings?.instagram_url && <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors"><Instagram size={24} /></a>}
          {settings?.linkedin_url && <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors"><Linkedin size={24} /></a>}
          {settings?.whatsapp_url && <a href={settings.whatsapp_url} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors"><MessageCircle size={24} /></a>}
          {settings?.twitter_url && <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors"><Twitter size={24} /></a>}
        </div>
        <div className="border-t border-green-800 pt-8 mt-8">
          <p className="text-green-100 opacity-80 decoration-transparent">
            © {new Date().getFullYear()} {settings?.copyright_text || "Teacher's Farm. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
