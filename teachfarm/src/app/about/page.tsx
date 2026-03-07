"use client";

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import FadeInSection from '../components/FadeInSection';
import BasicLayout from '../components/BasicLayout';
import Image from 'next/image'
import { Target, Eye, Flag, ShieldCheck } from 'lucide-react'

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
  image_url?: string;
}

export default function About() {
  const { data: settings, isLoading } = useQuery<AboutSettings>({
    queryKey: ['about-settings'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/public/about-settings`);
      return response.data;
    },
  });

  if (isLoading) return (
    <BasicLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-green-600 text-2xl font-bold">Loading About Us...</div>
      </div>
    </BasicLayout>
  );

  return (
    <BasicLayout>
      <FadeInSection>
        <section className="bg-green-600 text-white py-20 -mt-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-6 text-center">About Teacher's Farm</h1>
            <p className="text-xl max-w-3xl mx-auto text-center">
              We are dedicated to nurturing educational excellence and empowering teachers to create transformative learning experiences.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center group p-6 rounded-xl hover:bg-gray-50 transition-colors">
                <Target className="h-16 w-16 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h2 className="text-2xl font-semibold mb-4">{settings?.mission_title || "Our Mission"}</h2>
                <p className="text-gray-600">
                  {settings?.mission_text || "Given the decrease of high-performing teachers in schools, we are on a mission to have over 500 trained teachers in Liberia and provide them with a place to grow."}
                </p>
              </div>

              <div className="text-center group p-6 rounded-xl hover:bg-gray-50 transition-colors">
                <Eye className="h-16 w-16 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h2 className="text-2xl font-semibold mb-4">{settings?.vision_title || "Our Vision"}</h2>
                <p className="text-gray-600">
                  {settings?.vision_text || "We envision providing teachers with opportunities to develop into high-performing professionals through a cohesive, comprehensive approach to teaching and learning."}
                </p>
              </div>

              <div className="text-center group p-6 rounded-xl hover:bg-gray-50 transition-colors">
                <Flag className="h-16 w-16 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h2 className="text-2xl font-semibold mb-4">{settings?.goal_title || "Our Goal"}</h2>
                <p className="text-gray-600">
                  {settings?.goal_text || "To offer institutions access to well-trained professionals, and to deliver one-on-one consulting, training, and hiring services through high-quality educational programs."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={settings?.image_url || "/teachers-farm.jpeg"}
                  alt="Teachers at Teacher's Farm"
                  width={600}
                  height={400}
                  className="w-full h-auto hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="md:w-1/2 bg-white p-10 rounded-2xl shadow-xl text-black border-l-8 border-green-600">
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="h-8 w-8 text-green-600" />
                  <h2 className="text-3xl font-bold">{settings?.commitment_title || "Our Commitment"}</h2>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  {settings?.commitment_text ? (
                    <div className="whitespace-pre-wrap">{settings.commitment_text}</div>
                  ) : (
                    <>
                      <p className="text-lg">
                        At Teacher's Farm, we are committed to revolutionizing education in Liberia by investing in our most valuable resource: teachers. We believe that by empowering educators with the right skills, knowledge, and support, we can create a ripple effect that positively impacts students, schools, and communities.
                      </p>
                      <p className="text-lg">
                        Our comprehensive approach combines professional development, strategic hiring services, and expert consultancy to create a holistic ecosystem that nurtures educational excellence. Join us in our journey to transform Liberian education and build a brighter future for all.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
    </BasicLayout>
  )
}

