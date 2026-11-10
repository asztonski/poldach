import type { Metadata } from 'next';
import {
  AboutSection,
  HeroSection,
  OfferSection,
  PathChoiceSection,
  PROJECTS,
  ProjectSection,
  TestimonialsSection,
} from '@/sections/home';

// Title and description come from the defaults in layout.tsx
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

// Order: docs/mapa-strony.md#strona-główna (D-29) – contact is still to come
export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* The project up close, right under the hero (D-50) */}
      <ProjectSection project={PROJECTS.tenement} />
      <AboutSection />
      <OfferSection />
      {/* Opinions of clients (D-74) – in place of the documents */}
      <TestimonialsSection />
      {/* A second project up close, the same way (D-81) */}
      <ProjectSection project={PROJECTS.dormers} />
      <PathChoiceSection />
    </>
  );
}
