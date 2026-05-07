"use client";

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import Image from 'next/image';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface Partner {
  id: number;
  name: string;
  logo_url: string;
  website_url?: string;
}

export default function Partners() {
  const { data: partners = [], isLoading } = useQuery<Partner[]>({
    queryKey: ['partners'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/public/partners`);
      return response.data;
    },
    staleTime: 10 * 60 * 1000,
  });

  if (isLoading || partners.length === 0) return null;

  // Duplicate partners for infinite scroll effect if there are enough
  const displayPartners = partners.length > 4 ? [...partners, ...partners] : partners;

  return (
    <section className="py-24 bg-white/40 backdrop-blur-sm overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-4xl font-bold text-center text-green-900">Our Trusted Partners</h2>
        <div className="w-24 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <motion.div 
          className="flex whitespace-nowrap gap-16 md:gap-32 items-center py-4"
          animate={partners.length > 4 ? {
            x: [0, -1000],
          } : {}}
          transition={partners.length > 4 ? {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          } : {}}
        >
          {displayPartners.map((partner, index) => (
            <motion.a
              key={`${partner.id}-${index}`}
              href={partner.website_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, filter: "grayscale(0%)" }}
              className="flex-shrink-0 grayscale opacity-70 hover:opacity-100 transition-all duration-300"
            >
              <div className="relative h-24 md:h-32 w-48 md:w-64">
                <Image
                  src={partner.logo_url.startsWith('http') ? partner.logo_url : `${API_BASE_URL.replace('/api', '')}${partner.logo_url}`}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.a>
          ))}
          
          {/* If few partners, just show them centered without scroll */}
          {partners.length <= 4 && partners.map((partner, index) => (
             <div key={`placeholder-${index}`} className="w-0 md:w-10"></div> 
          ))}
        </motion.div>

        {/* Gradient overlays for smooth fade on edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50/50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50/50 to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
}
