"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import FadeInSection from "./FadeInSection";

interface Activity {
  id: number;
  title: string;
  description: string;
  image_url?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const getImageUrl = (path: string) => {
  if (path.startsWith('http')) return path;
  return path;
};

export default function ActivitiesSection() {
  const { data: activities, isLoading, error } = useQuery<Activity[]>({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/public/activities`);
      return response.data;
    },
  });

  if (isLoading) return (
    <div className="py-20 bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  );

  if (error || !activities || activities.length === 0) return null;

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl font-bold text-center mb-12">Our Activities</h2>
        </FadeInSection>

        <div className="flex overflow-x-auto pb-10 gap-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex-shrink-0 w-[320px] snap-center">
              <FadeInSection>
                <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col group">
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    {activity.image_url ? (
                      <Image
                        src={getImageUrl(activity.image_url)}
                        alt={activity.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        unoptimized={process.env.NODE_ENV !== 'production'}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-green-50 text-green-200">
                        <span className="text-4xl">📚</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-green-600 transition-colors">
                      {activity.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {activity.description}
                    </p>
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
