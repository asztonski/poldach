import type { Metadata } from 'next';
import {
  AboutSection,
  DocumentsSection,
  HeroSection,
  OfferSection,
  PathChoiceSection,
  ProjectSection,
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
      <OfferSection />
      <AboutSection />
      <DocumentsSection />
      <ProjectSection />
      <PathChoiceSection />
    </>
  );
}
