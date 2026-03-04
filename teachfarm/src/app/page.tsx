// src/app/page.tsx

import SecondaryLayout from './components/SecondaryLayout';
import HeroSection from './components/sections/HeroSection';
import CorePillars from './components/sections/CorePillars';
import Services from './components/sections/Services';
import TeamMembers from './components/sections/TeamMembers';
import Impact from './components/sections/ImpactSection';
import Testimonials from './components/sections/Testimonials';
import JoinUs from './components/sections/JoinUs';
import FadeInSection from './components/FadeInSection';
import Card from './components/ActivitiesCard'
import ProgramsSection from './components/ProgramsSection'

export default function Home() {
  return (
    <SecondaryLayout>
      <FadeInSection>
        <HeroSection />
      </FadeInSection>
      <FadeInSection>
        <ProgramsSection />
      </FadeInSection>
      <FadeInSection>
        <CorePillars />
      </FadeInSection>
      <FadeInSection>
        <Services />
      </FadeInSection>
      <FadeInSection>
        <Card />
      </FadeInSection>
      <FadeInSection>
        <TeamMembers />
      </FadeInSection>
      <FadeInSection>
        <Impact />
      </FadeInSection>
      <FadeInSection>
        <Testimonials /> 
      </FadeInSection>
      <FadeInSection>
        <JoinUs /> 
      </FadeInSection>
    </SecondaryLayout>
  );
}