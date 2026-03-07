"use client";

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
  button_text: string;
  button_link: string;
  order: number;
}

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: slides = [], isLoading } = useQuery<HeroSlide[]>({
    queryKey: ['hero-slides'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/public/hero-slides`);
      return response.data;
    },
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (slides.length > 1) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [slides.length]);

  if (isLoading) {
    return (
      <div className="h-screen bg-green-900 flex items-center justify-center">
        <div className="animate-pulse text-white text-2xl font-bold">Cultivating Excellence...</div>
      </div>
    );
  }

  // Fallback if no slides are found
  if (slides.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Cultivating Excellence in Education</h1>
          <p className="text-xl mb-8">
            Teacher's Farm is revolutionizing education in Liberia by developing high-performing teachers.
          </p>
          <Link href="/about" className="inline-flex items-center bg-white text-green-800 font-bold py-3 px-6 rounded-full hover:bg-green-100 transition duration-300">
            Learn More <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    );
  }

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] scale-110"
            style={{
              backgroundImage: `url(${slide.image_url.startsWith('http') ? slide.image_url : `${API_BASE_URL.replace('/api', '')}${slide.image_url}`})`,
            }}
          />
          <div className="absolute inset-0 bg-black/50" />

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center text-white">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl md:text-7xl font-bold mb-6 max-w-4xl"
            >
              {slide.title}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg md:text-2xl mb-10 max-w-2xl text-gray-200"
            >
              {slide.subtitle}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <Link
                href={slide.button_link}
                className="inline-flex items-center bg-green-600 text-white font-bold py-4 px-8 rounded-full hover:bg-green-700 transition duration-300 shadow-lg hover:shadow-green-900/40"
              >
                {slide.button_text} <ArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
          >
            <ChevronRight size={32} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-green-500 w-8' : 'bg-white/40 hover:bg-white/60'
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
