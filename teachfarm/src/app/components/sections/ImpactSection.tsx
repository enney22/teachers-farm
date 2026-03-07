// src/app/components/sections/ImpactSection.tsx

"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Star, TrendingUp, Award, Users, BookOpen, GraduationCap } from 'lucide-react'
import FadeInSection from '../FadeInSection'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const ICON_MAP: Record<string, any> = {
  Star,
  TrendingUp,
  Award,
  Users,
  BookOpen,
  GraduationCap
};

interface ImpactStat {
  id: number;
  stat: string;
  label: string;
  icon: string;
}

export default function Impact() {
  const { data: impactData = [], isLoading } = useQuery<ImpactStat[]>({
    queryKey: ['impact-stats'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/public/impact-stats`);
      return response.data;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });

  if (isLoading) return (
    <div className="py-20 bg-green-600 flex items-center justify-center">
      <div className="animate-pulse text-white">Loading impact stats...</div>
    </div>
  );

  if (impactData.length === 0) return null;

  return (
    <section className="py-20 bg-green-600 text-white">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
        </FadeInSection>
        <div className={`grid gap-8 justify-center ${impactData.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' :
          impactData.length === 2 ? 'md:grid-cols-2 max-w-2xl mx-auto' :
            'md:grid-cols-3'
          }`}>
          {impactData.map((impact) => {
            const IconComponent = ICON_MAP[impact.icon] || Star;
            return (
              <FadeInSection key={impact.id}>
                <div className="text-center group p-6 rounded-xl hover:bg-white/10 transition-colors">
                  <IconComponent className="h-12 w-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-3xl font-bold mb-2">{impact.stat}</h3>
                  <p className="text-green-100">{impact.label}</p>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </section>
  )
}
