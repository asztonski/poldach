import type { Metadata } from 'next';
import { ROUTES, SECTION_IDS } from '@/config/routes';
import {
  ContactSection,
  HeroSection,
  OfferSection,
  PROJECTS,
  ProjectSection,
} from '@/sections/common';
import { AboutSection, TestimonialsSection } from '@/sections/home';

// Title and description come from the defaults in layout.tsx
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

// Order: docs/mapa-strony.md#strona-główna (D-29, D-84, D-103) – the whole story; the menu's links
// lead to the pages of each topic
export default function HomePage() {
  return (
    <>
      <HeroSection
        eyebrow="Rodzinna firma dekarska · od&nbsp;1992"
        // TODO(P-07): option 4 (D-15) – waiting for the client's confirmation
        title="Dach nad głową i&nbsp;spokój na lata"
        // The headline carries the feeling, the lead the differentiator (roof to floor)
        lead="Nowe dachy i remonty – a w domu także drzwi i podłogi. Doradzamy, wyceniamy i montujemy z materiału własnego lub powierzonego."
      />
      {/* The project up close, right under the hero (D-50) */}
      <ProjectSection project={PROJECTS.tenement} id={SECTION_IDS.projects} />
      <AboutSection />
      <OfferSection
        here={ROUTES.home}
        title="Czym się zajmujemy"
        lead="Usługi dekarskie i montaż w domu, a w naszym salonie w Kokoszkowych – drzwi, podłogi i materiały. Doradzamy bezpłatnie i przygotowujemy kosztorys."
      />
      {/* Opinions of clients (D-74) – in place of the documents */}
      <TestimonialsSection />
      {/* A second project up close, the same way (D-81) */}
      <ProjectSection project={PROJECTS.dormers} />
      <ContactSection source="Strona główna" />
    </>
  );
}
