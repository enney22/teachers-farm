// src/app/components/sections/TeamMembers.tsx

"use client";

import Image from 'next/image';
import FadeInSection from '../FadeInSection';
import { useEffect, useState } from 'react';

interface TeamMemberImage {
  id: number;
  url: string;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
  width: number;
  height: number;
}

interface TeamMember {
  id: number;
  attributes: {
    Name: string;
    Role?: string;
    Bio?: string;
    Image?: TeamMemberImage;
  };
}

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function TeamMembers() {
  const { data: teamMembers, isLoading, error } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/public/team-members`);
      return response.data;
    },
  });

  // Helper function to get image URL
  const getImageUrl = (url?: string) => {
    if (!url) return '/placeholder-avatar.jpg';
    if (url.startsWith('http')) return url;
    // Strip /api from the end of the base URL to get the server root
    const serverRoot = API_BASE_URL.endsWith('/api') ? API_BASE_URL.slice(0, -4) : API_BASE_URL;
    return `${serverRoot}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  if (isLoading) return <div className="text-center py-20">Loading team members...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load team members</div>;
  if (!teamMembers || teamMembers.length === 0) {
    return <div className="text-center py-20">No team members found.</div>;
  }

  // Helper function to get the best available image URL and dimensions
  const getImageProps = (image: any) => {
    if (!image) return null;

    // Handle Strapi v4 format with data attribute
    if (image.data?.attributes) {
      return getImageProps(image.data.attributes);
    }

    // Handle direct URL
    if (image.url) {
      return {
        src: getImageUrl(image.url),
        width: image.width || 400,
        height: image.height || 400,
      };
    }

    return null;
  };

  if (isLoading) return <div className="text-center py-20">Loading team members...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load team members</div>;
  if (!Array.isArray(teamMembers) || teamMembers.length === 0) {
    return <div className="text-center py-20">No team members found.</div>;
  }

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        </FadeInSection>
        <div className="flex overflow-x-auto pb-10 gap-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex-shrink-0 w-[300px] snap-center">
              <FadeInSection>
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out h-full flex flex-col">
                  <div className="relative group h-64 bg-gray-200">
                    {member.image_url ? (
                      <Image
                        src={getImageUrl(member.image_url)}
                        alt={member.name || 'Team member'}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover object-top transition-transform transform group-hover:scale-110 duration-300 ease-in-out"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/placeholder-avatar.jpg';
                        }}
                        unoptimized={process.env.NODE_ENV !== 'production'}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-1">{member.name || 'Team Member'}</h3>
                    {member.role && <p className="text-green-600 mb-2">{member.role}</p>}
                    {member.bio && <p className="text-gray-600 text-sm mb-4">{member.bio}</p>}
                  </div>
                </div>
              </FadeInSection>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}