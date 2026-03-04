// src/app/about/page.tsx
import FadeInSection from '../components/FadeInSection';
import BasicLayout from '../components/BasicLayout';
import Image from 'next/image'
import { Target, Eye, Flag } from 'lucide-react'

export default function About() {
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
              <div className="text-center">
                <Target className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p>
                  Given the decrease of high-performing teachers in schools, we are on a mission to have over 500 trained teachers in Liberia and provide them with a place to grow.
                </p>
              </div>
              
              <div className="text-center">
                <Eye className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                <p>
                  We envision providing teachers with opportunities to develop into high-performing professionals through a cohesive, comprehensive approach to teaching and learning.
                </p>
              </div>
              
              <div className="text-center">
                <Flag className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-4">Our Goal</h2>
                <p>
                  To offer institutions access to well-trained professionals, and to deliver one-on-one consulting, training, and hiring services through high-quality educational programs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <Image 
                  src="/teachers-farm.jpeg" 
                  alt="Teachers at Teacher's Farm" 
                  width={600} 
                  height={400} 
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-md text-black">
                <h2 className="text-3xl font-bold mb-6">Our Commitment</h2>
                <p className="text-lg mb-4">
                  At Teacher's Farm, we are committed to revolutionizing education in Liberia by investing in our most valuable resource: teachers. We believe that by empowering educators with the right skills, knowledge, and support, we can create a ripple effect that positively impacts students, schools, and communities.
                </p>
                <p className="text-lg">
                  Our comprehensive approach combines professional development, strategic hiring services, and expert consultancy to create a holistic ecosystem that nurtures educational excellence. Join us in our journey to transform Liberian education and build a brighter future for all.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
    </BasicLayout>
  )
}

