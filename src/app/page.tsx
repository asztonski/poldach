import type { Metadata } from 'next';
import { SECTION_IDS } from '@/config/routes';
import { ContactSection } from '@/sections/common';
import {
  AboutSection,
  HeroSection,
  OfferSection,
  PROJECTS,
  ProjectSection,
  TestimonialsSection,
} from '@/sections/home';

// Title and description come from the defaults in layout.tsx
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

// Order: docs/mapa-strony.md#strona-główna (D-29, D-84)
export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* The project up close, right under the hero (D-50) – the menu's "Realizacje" */}
      <ProjectSection project={PROJECTS.tenement} id={SECTION_IDS.projects} />
      <AboutSection />
      <OfferSection />
      {/* Opinions of clients (D-74) – in place of the documents */}
      <TestimonialsSection />
      {/* A second project up close, the same way (D-81) */}
      <ProjectSection project={PROJECTS.dormers} />
      <ContactSection source="Strona główna" />
    </>
  );
}
