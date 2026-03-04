// src/app/components/sections/HeroSection.tsx

import FadeInSection from '../FadeInSection';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <FadeInSection>
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
    </FadeInSection>
  );
}
