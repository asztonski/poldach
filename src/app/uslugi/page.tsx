import Image from 'next/image';
import { ROUTES } from '@/config/routes';
import { PROJECT_INFO } from '@/data/projects';
import { pageMetadata } from '@/lib/metadata';
import { ContactSection, OfferSection, PageHero } from '@/sections/common';

export const metadata = pageMetadata({
  title: 'Usługi dekarskie i montaż',
  description:
    'Pokrycia i remonty dachów, wykrywanie nieszczelności dachów płaskich, legalne usuwanie eternitu, montaż okien, drzwi, bram i podłóg. Doradztwo i wycena bezpłatnie – POLDACH, Kokoszkowy.',
  path: ROUTES.services,
});

/**
 * The first pillar – the services (docs/mapa-strony.md, D-103), at the old site's address: the
 * scene of the offer with the services only, then the contact.
 */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Usługi · dach i montaż w domu"
        title="Dach od pokrycia po rynny – i montaż w domu"
        lead="Nowe pokrycia i remonty, wykrywanie nieszczelności dachów płaskich, usuwanie eternitu, a w domu – okna, drzwi, bramy i podłogi. Doradzamy bezpłatnie i przygotowujemy kosztorys."
        visual={
          <div className="overflow-hidden rounded-box">
            {/* One of the projects (src/data/projects.ts) – the photo and its alt from there */}
            <Image
              src={PROJECT_INFO.tiledBlocks.photo}
              alt={PROJECT_INFO.tiledBlocks.alt}
              loading="eager"
              className="h-auto w-full"
            />
          </div>
        }
      />
      <OfferSection
        pillar="service"
        here={ROUTES.services}
        title="Co dla Ciebie zrobimy"
        lead="Cztery rodzaje prac – od nowego dachu po montaż w domu, z materiału naszego albo powierzonego."
      />
      <ContactSection source="Usługi" />
    </>
  );
}
