"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import FadeInSection from "./FadeInSection";

interface Program {
  id: number;
  title: string;
  description: string;
  image_url?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const getImageUrl = (path: string) => {
  if (path.startsWith('http')) return path;
  return path; // Assuming Vercel Blob URLs are full URLs
};

export default function ProgramsSection() {
  const { data: programs, isLoading, error } = useQuery<Program[]>({
    queryKey: ['programs'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/public/programs`);
      return response.data;
    },
  });

  if (isLoading) return (
    <div className="py-20 bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  );

  if (error || !programs) return null;

  return (
    <section className="py-20 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl font-bold text-center mb-12">Our Programs</h2>
        </FadeInSection>

        <div className="flex overflow-x-auto pb-10 gap-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {programs.map((program) => (
            <div key={program.id} className="flex-shrink-0 w-[320px] snap-center">
              <FadeInSection>
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col group">
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    {program.image_url ? (
                      <Image
                        src={getImageUrl(program.image_url)}
                        alt={program.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        unoptimized={process.env.NODE_ENV !== 'production'}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-green-50 text-green-200">
                        <span className="text-4xl">🌱</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-green-600 transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {program.description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-50">
                      <button className="text-green-600 font-semibold text-sm hover:underline flex items-center">
                        Learn More <span className="ml-1">→</span>
                      </button>
                    </div>
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
