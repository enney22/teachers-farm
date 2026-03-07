// src/app/about/page.tsx

"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BasicLayout from '../components/BasicLayout'
import FadeInSection from '../components/FadeInSection'
import Image from 'next/image'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface AboutSettings {
  mission_title: string;
  mission_text: string;
  vision_title: string;
  vision_text: string;
  goal_title: string;
  goal_text: string;
  commitment_title: string;
  commitment_text: string;
  image_url: string;
}

export default function AboutPage() {
  const { data: settings, isLoading } = useQuery<AboutSettings>({
    queryKey: ['about-settings'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/public/about-settings`);
      return response.data;
    },
    staleTime: 30 * 60 * 1000,
    gcTime: 35 * 60 * 1000,
  });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse text-green-600 font-bold text-2xl">Loading About...</div>
    </div>
  );

  return (
    <BasicLayout>
      <div className="bg-white min-h-screen">
        {/* Banner */}
        <div className="bg-green-600 py-20 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center">About Teacher's Farm</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-green-700 mb-4">{settings?.mission_title || "Our Mission"}</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {settings?.mission_text}
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-700 mb-4">{settings?.vision_title || "Our Vision"}</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {settings?.vision_text}
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-700 mb-4">{settings?.goal_title || "Our Goal"}</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {settings?.goal_text}
                  </p>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={settings?.image_url || "/about-v3.jpg"}
                  alt="Teacher's Farm Educators"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeInSection>
          </div>

          <FadeInSection>
            <div className="mt-20 bg-green-50 p-8 md:p-12 rounded-3xl border border-green-100">
              <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">{settings?.commitment_title || "Our Commitment"}</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-gray-700 text-center text-xl italic leading-relaxed">
                  "{settings?.commitment_text}"
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </BasicLayout>
  )
}
