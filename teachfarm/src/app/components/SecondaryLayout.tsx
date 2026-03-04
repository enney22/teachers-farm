// src/app/components/SecondaryLayout.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Main from './layout/Main';
import HeroSection from './sections/HeroSection';
import CorePillars from './sections/CorePillars';
import Services from './sections/Services';
import JoinUs from './sections/JoinUs';
import TeamMembers from './sections/TeamMembers'; // Import the new TeamMembers section
import Impact from './sections/ImpactSection';     // Import the new Impact section
import Testimonials from './sections/Testimonials'; // Import the new Testimonials section
import FadeInSection from './FadeInSection';
import Card from './ActivitiesCard'
import ProgramsSection from './ProgramsSection'
import Image from 'next/image';
// import LoadingSpinner from './LoadingSpinner';

export default function SecondaryLayout({ children }: { children: React.ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [backgroundPosition, setBackgroundPosition] = useState(0);

  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // Array of background images
  const backgroundImages = [
    { src: "/images/image1.jpeg", alt: "Hero Section" },
    { src: "/images/image2.jpeg", alt: "Core Pillars" },
    { src: "/images/image3.jpeg", alt: "Services" },
    { src: "/images/image4.jpeg", alt: "Join Us" },
  ];

  // Scroll handling for section tracking and parallax background effect
  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY;
    let activeSectionIndex = 0;

    // Track which section is in view
    sectionsRef.current.forEach((section, index) => {
      if (!section) return;
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
        activeSectionIndex = index;
      }
    });

    setCurrentSectionIndex(activeSectionIndex);

    // Parallax effect: move background image slower than the content
    const parallaxSpeed = 0.3;
    setBackgroundPosition(currentScroll * parallaxSpeed);

    // Update scroll progress bar
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (currentScroll / totalScroll) * 100;
    setScrollProgress(progress);
  }, []);

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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
          <section ref={(el) => { sectionsRef.current[8] = el; }} aria-label="Hero Section">
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
        className="fixed top-0 left-0 h-1 bg-green-500 z-50"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ ease: "easeOut", duration: 0.3 }}
      />
    </div>
  );
}
