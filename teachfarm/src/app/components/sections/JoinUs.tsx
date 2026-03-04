// src/app/components/sections/JoinUs.tsx

import FadeInSection from '../FadeInSection';
import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';

export default function JoinUs() {
  return (
    <FadeInSection>
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Join Us in Transforming Education</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of our mission to develop 700 high-performing teachers in Liberia and create a brighter future for students across the nation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/contact" className="inline-flex items-center bg-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-700 transition duration-300">
              Get Involved <ArrowRight className="ml-2" />
            </Link>
            <Link href="/donate" className="inline-flex items-center bg-white text-green-600 font-bold py-3 px-6 rounded-full hover:bg-green-100 transition duration-300 border border-green-600">
              Donate Now <Heart className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
