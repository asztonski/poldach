import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import roofs from '@/assets/images/oferta/dachy.webp';
import doors from '@/assets/images/oferta/drzwi.webp';
import asbestosRemoval from '@/assets/images/oferta/eternit.webp';
import leakDetection from '@/assets/images/oferta/nieszczelnosci.webp';
import windows from '@/assets/images/oferta/okna.webp';
import sillsWorktops from '@/assets/images/oferta/parapety-blaty.webp';
import floors from '@/assets/images/oferta/podlogi.webp';
import terraces from '@/assets/images/oferta/tarasy.webp';
import { CenterStage } from '@/components/motion/CenterStage';
import { Section } from '@/components/ui';
import { SERVICE_NAV, SHOP_NAV } from '@/config/navigation';
import { ROUTES } from '@/config/routes';
import { sheetNumber } from '@/lib/format';

// Both pillars, as in the menu – one source (src/config/navigation.ts): services, then the shop
const OFFER = [...SERVICE_NAV, ...SHOP_NAV].flatMap((group) => group.links);

// TODO(P-22): all from the old poldach.eu, licences and permissions unknown. Roofs, windows, doors,
// floors and decking look like stock or producers' photos; windows, doors, floors and decking exist
// only as 380 × 511 tiles (enlarged in the file). Asbestos removal – a stand-in (a site).
const PHOTOS: Record<string, StaticImageData> = {
  [ROUTES.roofs]: roofs,
  [ROUTES.leakDetection]: leakDetection,
  [ROUTES.asbestosRemoval]: asbestosRemoval,
  [ROUTES.windows]: windows,
  [ROUTES.doors]: doors,
  [ROUTES.floors]: floors,
  [ROUTES.sillsWorktops]: sillsWorktops,
  [ROUTES.terraces]: terraces,
};

/**
 * Section 2 – the offer at a glance, the old site's "Czym się zajmujemy" categories and photos
 * (docs/mapa-strony.md#strona-główna, docs/decyzje.md D-29, D-37, D-44–D-47): the blue band with
 * the heading, and below it the categories pass through the centre on desktop (CenterStage), each as
 * a large photo; the slanted edge over the yellow hero comes from its position.
 */
export function OfferSection() {
  return (
    <Section
      theme="white"
      // Yellow band, after the all-blue "O nas" (D-53)
      bandTheme="yellow"
      heading={{
        id: 'offer-title',
        title: 'Czym się zajmujemy',
        lead: 'Dach od pokrycia po rynnę i montaż w domu, a w naszym salonie w Kokoszkowych – drzwi i podłogi.',
      }}
    >
      <CenterStage
        // 50 % faster than the default on request: an item a screen was too long
        vhPerItem={67}
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
