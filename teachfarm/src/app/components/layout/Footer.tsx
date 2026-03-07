"use client";

import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const FaFacebookF = dynamic(() => import('react-icons/fa').then(mod => mod.FaFacebookF));
const FaTwitter = dynamic(() => import('react-icons/fa').then(mod => mod.FaTwitter));
const FaInstagram = dynamic(() => import('react-icons/fa').then(mod => mod.FaInstagram));
const FaLinkedinIn = dynamic(() => import('react-icons/fa').then(mod => mod.FaLinkedinIn));
const FaWhatsapp = dynamic(() => import('react-icons/fa').then(mod => mod.FaWhatsapp));

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
  });

  if (isLoading) return null;

  const socialLinks = [
    { Icon: FaFacebookF, href: settings?.facebook_url, label: 'Facebook' },
    { Icon: FaInstagram, href: settings?.instagram_url, label: 'Instagram' },
    { Icon: FaLinkedinIn, href: settings?.linkedin_url, label: 'LinkedIn' },
    { Icon: FaWhatsapp, href: settings?.whatsapp_url, label: 'WhatsApp' },
    { Icon: FaTwitter, href: settings?.twitter_url, label: 'Twitter' },
  ].filter(link => link.href);

  return (
    <footer className="bg-green-700 bg-opacity-80 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          {/* Social Icons */}
          <div className="flex space-x-4">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="hover:text-green-200 transition-colors"
                aria-label={label}
              >
                <Icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          {/* Footer Text */}
          <p className="text-center">
            &copy; {new Date().getFullYear()} {settings?.copyright_text || "Teacher's Farm. All rights reserved."}
          </p>
          <b className="text-sm text-green-200">
            Made with passion by Zayzay Jarboi Yennego
          </b>
        </div>
      </div>
    </footer>
  );
}
