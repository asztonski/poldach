import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import doorsFloors from '@/assets/images/oferta/drzwi-podlogi.webp';
import asbestosRemoval from '@/assets/images/oferta/eternit.webp';
import insulation from '@/assets/images/oferta/docieplenia.webp';
import leakDetection from '@/assets/images/oferta/nieszczelnosci.webp';
import flashingGutters from '@/assets/images/oferta/obrobki.webp';
import roofing from '@/assets/images/oferta/pokrycia.webp';
import { CenterStage } from '@/components/motion/CenterStage';
import { Section, SectionHeading } from '@/components/ui';
import { SERVICE_NAV } from '@/config/navigation';
import { ROUTES } from '@/config/routes';
import { sheetNumber } from '@/lib/format';

// The same services as the "Usługi" menu – one source (src/config/navigation.ts).
// TODO(P-04): windows, decking and worktops from the old site wait for the client's answer
// TODO(P-10): the weight of doors and floors against roofs
const OFFER = SERVICE_NAV.flatMap((group) => group.links);

// TODO(P-22): all from the old site's gallery, waiting for permissions. Stand-ins until the client's
// photos: insulation (scaffolding on a facade), asbestos removal (a site, no asbestos in the old
// gallery), doors and floors (the showroom, 700 px wide in the source)
const PHOTOS: Record<string, StaticImageData> = {
  [ROUTES.roofing]: roofing,
  [ROUTES.flashingGutters]: flashingGutters,
  [ROUTES.insulation]: insulation,
  [ROUTES.leakDetection]: leakDetection,
  [ROUTES.asbestosRemoval]: asbestosRemoval,
  [ROUTES.doorsFloors]: doorsFloors,
};

/**
 * Section 2 – the offer at a glance, like the old site's "Czym się zajmujemy" tiles
 * (docs/mapa-strony.md#strona-główna, docs/decyzje.md D-29, D-37, D-44): a big centred heading, and
 * below it the services pass through the centre on desktop (CenterStage), each as a large photo on
 * calm cream paper; the slanted edge comes from its position (D-24).
 */
export function OfferSection() {
  return (
    <Section theme="cream" aria-labelledby="offer-title">
      <CenterStage
        heading={
          <SectionHeading
            id="offer-title"
            title="Czym się zajmujemy"
            lead="Dach od pokrycia po rynnę – i to, co w domu pod nim: drzwi, podłogi i parapety."
            centered
          />
        }
        // 50 % faster than the default on request: six items at one screen each were too long
        vhPerItem={67}
        fullScreen
        className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        items={OFFER.map((item, i) => ({
          id: item.href,
          visual: (
            <Link href={item.href} aria-label={item.label} className="group block overflow-hidden">
              <Image
                src={PHOTOS[item.href]}
                alt=""
                className="h-auto w-full group-hover:scale-105 group-focus-visible:scale-105 motion-safe:transition-transform motion-safe:duration-500"
              />
            </Link>
          ),
          text: (
            <>
              <p className="text-eyebrow">[ {sheetNumber(i + 1, OFFER.length)} ]</p>
              {/* The title colour only from h2 size up (docs/design-system.md#kontrast) */}
              <h3 className="mt-3 text-h3 lg:text-h2 lg:text-(--title)">{item.label}</h3>
              <p className="mt-3 text-list">{item.description}</p>
            </>
          ),
        }))}
      />
    </Section>
  );
}
