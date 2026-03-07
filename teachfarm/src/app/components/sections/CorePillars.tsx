"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FadeInSection from '../FadeInSection';

interface CorePillar {
  id: number;
  title: string;
  description: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function CorePillars() {
  const { data: pillars, isLoading, error } = useQuery<CorePillar[]>({
    queryKey: ['core-pillars'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/public/core-pillars`);
      return response.data;
    },
  });

  if (isLoading) return (
    <div className="py-20 bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  );

  if (error || !pillars || pillars.length === 0) return null;

  return (
    <FadeInSection>
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-black">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Pillars</h2>
          <div className={`grid gap-8 justify-center ${pillars.length === 1 ? 'grid-cols-1 max-w-xl mx-auto' :
              'md:grid-cols-2'
            }`}>
            {pillars.map((pillar) => (
              <div key={pillar.id} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-green-600">
                <h3 className="text-xl font-bold mb-4 text-gray-800">{pillar.title}</h3>
                <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}

