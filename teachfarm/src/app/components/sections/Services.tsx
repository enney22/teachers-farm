// src/app/components/sections/Services.tsx

"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Star, BookOpen, Users, Globe, Award, Heart } from 'lucide-react'
import FadeInSection from '../FadeInSection'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const iconMap: Record<string, any> = {
  Star,
  BookOpen,
  Users,
  Globe,
  Award,
  Heart
};

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export default function Services() {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/public/services`);
      return response.data;
    },
    staleTime: 15 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });

  if (isLoading) return (
    <div className="py-20 bg-gray-100 flex items-center justify-center">
      <div className="animate-pulse text-green-600">Loading services...</div>
    </div>
  );

  if (error || !services || services.length === 0) return null;

  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4 text-black">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className={`flex overflow-x-auto pb-8 gap-8 scrollbar-hide ${services.length <= 2 ? 'justify-center' : 'justify-start lg:grid lg:grid-cols-3 lg:overflow-visible'
          }`}>
          {services.map((service) => {
            const IconComponent = iconMap[service.icon || 'Star'] || Star;
            return (
              <FadeInSection key={service.id} className="min-w-[300px] flex-shrink-0">
                <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 h-full border-b-4 border-transparent hover:border-green-600">
                  <div className="h-12 w-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </section>
  )
}