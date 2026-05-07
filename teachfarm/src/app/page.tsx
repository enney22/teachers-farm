// src/app/page.tsx
"use client";

import SecondaryLayout from './components/SecondaryLayout';

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Teacher's Farm",
    "url": "https://www.teachersfarm.com",
    "logo": "https://www.teachersfarm.com/logo/logo2.jpeg",
    "description": "Empowering Liberian teachers through innovative training and sustainable agricultural practices.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "LR"
    }
  };

  return (
    <SecondaryLayout showHomeSections={true}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </SecondaryLayout>
  );
}