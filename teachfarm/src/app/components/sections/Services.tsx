"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FadeInSection from '../FadeInSection';
import Link from 'next/link';
import { BookOpen, Users, Briefcase, ArrowRight, Shield, Star, Heart, Rocket } from 'lucide-react';

const iconMap: Record<string, any> = {
  BookOpen,
  Users,
  Briefcase,
  Shield,
  Star,
  Heart,
  Rocket
};

interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function Services() {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/public/services`);
      return response.data;
    },
  });

  if (isLoading) return (
    <div className="py-20 bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  );

  if (error || !services || services.length === 0) return null;

  return (
    <FadeInSection>
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-black">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon || 'Star'] || Star;
              return (
                <div key={service.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col group hover:shadow-lg transition-shadow">
                  <IconComponent className="h-12 w-12 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="mb-6 text-gray-600 flex-1">{service.description}</p>
                  <Link href="/contact" className="text-green-600 font-medium hover:underline inline-flex items-center mt-auto">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}