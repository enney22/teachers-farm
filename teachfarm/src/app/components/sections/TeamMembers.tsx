// src/app/components/sections/TeamMembers.tsx

"use client";

import Image from 'next/image';
import FadeInSection from '../FadeInSection';
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
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });

  const getImageUrl = (url?: string) => {
    if (!url) return '/placeholder-avatar.jpg';
    if (url.startsWith('http')) return url;
    const serverRoot = API_BASE_URL.endsWith('/api') ? API_BASE_URL.slice(0, -4) : API_BASE_URL;
    return `${serverRoot}${url.startsWith('/') ? '' : '/'}${url}`;
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
        <div className={`grid gap-8 justify-center ${teamMembers.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' :
            teamMembers.length === 2 ? 'md:grid-cols-2 max-w-2xl mx-auto' :
              'md:grid-cols-3 lg:grid-cols-4'
          }`}>
          {teamMembers.map((member) => (
            <FadeInSection key={member.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all transform hover:scale-105 duration-300 ease-in-out h-full flex flex-col hover:shadow-xl">
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
          ))}
        </div>
      </div>
    </section>
  );
}