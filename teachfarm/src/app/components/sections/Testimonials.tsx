"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import FadeInSection from "../FadeInSection";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image_url?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const getImageUrl = (path: string) => {
  if (path.startsWith('http')) return path;
  return path;
};

export default function Testimonials() {
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/public/testimonials`);
      return response.data;
    },
  });

  if (isLoading) return (
    <div className="py-20 bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  );

  if (error || !testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl font-bold text-center mb-12">What People Say About Us</h2>
        </FadeInSection>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <FadeInSection key={testimonial.id}>
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="relative w-12 h-12 mr-4 flex-shrink-0">
                    {testimonial.image_url ? (
                      <Image
                        src={getImageUrl(testimonial.image_url)}
                        alt={testimonial.name}
                        fill
                        className="rounded-full object-cover"
                        unoptimized={process.env.NODE_ENV !== 'production'}
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-green-600 text-sm font-medium">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
