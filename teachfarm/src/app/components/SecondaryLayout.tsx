// src/app/components/SecondaryLayout.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Main from './layout/Main';
import HeroSection from './sections/HeroSection';
import CorePillars from './sections/CorePillars';
import Services from './sections/Services';
import JoinUs from './sections/JoinUs';
import TeamMembers from './sections/TeamMembers';
import Impact from './sections/ImpactSection';
import Testimonials from './sections/Testimonials';
import FadeInSection from './FadeInSection';
import Card from './ActivitiesCard'
import ProgramsSection from './ProgramsSection'
import Image from 'next/image';

export default function SecondaryLayout({ children }: { children: React.ReactNode }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // Smooth scroll progress for the bar
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Array of background images
  const backgroundImages = [
    { src: "/images/image1.jpeg", alt: "Hero Section background" },
    { src: "/images/image2.jpeg", alt: "Core Pillars background" },
    { src: "/images/image3.jpeg", alt: "Services background" },
    { src: "/images/image4.jpeg", alt: "Join Us background" },
  ];

  // Section tracking only
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      let activeSectionIndex = 0;
      sectionsRef.current.forEach((section, index) => {
        if (!section) return;
        const sectionTop = section.offsetTop - 100; // Offset for better detection
        const sectionBottom = sectionTop + section.offsetHeight;
        if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
          activeSectionIndex = index;
        }
      });
      // Limit state updates to when the index actually changes
      setCurrentSectionIndex((prev) => {
          // Normalize indices since we have gaps in sectionsRef assignments
          const mappedIndex = activeSectionIndex >= 4 ? 3 : activeSectionIndex;
          if (prev !== mappedIndex) return mappedIndex;
          return prev;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* <LoadingSpinner /> */}

      <Header />

      {/* Background image handling */}
      <AnimatePresence>
        {backgroundImages[currentSectionIndex] && (
          <motion.div
            key={currentSectionIndex}
            className="fixed inset-0 z-[-1] bg-cover bg-center bg-fixed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }} // Smooth transition
          >
            <Image
              src={backgroundImages[currentSectionIndex].src}
              alt={backgroundImages[currentSectionIndex].alt}
              fill
              className="object-cover"
              priority={currentSectionIndex === 0} // Only prioritize the first image
              sizes="100vw"
              loading={currentSectionIndex === 0 ? 'eager' : 'lazy'} // Lazy load subsequent images
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <Main>
        <FadeInSection>
          <section ref={(el) => { sectionsRef.current[0] = el; }} aria-label="Hero Section">
            <HeroSection />
          </section>
        </FadeInSection>
        <FadeInSection>
          <section ref={(el) => { sectionsRef.current[8] = el; }} aria-label="Our Programs">
            <ProgramsSection />
          </section>
        </FadeInSection>
        <FadeInSection>
          <section ref={(el) => { sectionsRef.current[1] = el; }} aria-label="Core Pillars">
            <CorePillars />
          </section>
        </FadeInSection>
        <FadeInSection>
          <section ref={(el) => { sectionsRef.current[2] = el; }} aria-label="Services">
            <Services />
          </section>
        </FadeInSection>
        <FadeInSection>
          <section ref={(el) => { sectionsRef.current[6] = el; }} aria-label="Activities">
            <Card />
          </section>
        </FadeInSection>
        <FadeInSection>
          <section ref={(el) => { sectionsRef.current[3] = el; }} aria-label="Team Members">
            <TeamMembers /> {/* Added Team Members section */}
          </section>
        </FadeInSection>
        <FadeInSection>
          <section ref={(el) => { sectionsRef.current[4] = el; }} aria-label="Impact">
            <Impact /> {/* Added Impact section */}
          </section>
        </FadeInSection>
        <FadeInSection>
          <section ref={(el) => { sectionsRef.current[5] = el; }} aria-label="Testimonials">
            <Testimonials /> {/* Added Testimonials section */}
          </section>
        </FadeInSection>
        <FadeInSection>
          <section ref={(el) => { sectionsRef.current[7] = el; }} aria-label="Join Us">
            <JoinUs />
          </section>
        </FadeInSection>
      </Main>

      <Footer />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-green-500 z-50 origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
