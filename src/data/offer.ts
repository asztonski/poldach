import type { StaticImageData } from 'next/image';
import roofingCloseUp from '@/assets/images/oferta/dachy.webp';
import doors from '@/assets/images/oferta/drzwi.webp';
import asbestosRemoval from '@/assets/images/oferta/eternit.webp';
import leakDetection from '@/assets/images/oferta/nieszczelnosci.webp';
import standingSeamRoof from '@/assets/images/oferta/obrobki.webp';
import windows from '@/assets/images/oferta/okna.webp';
import sillsWorktops from '@/assets/images/oferta/parapety-blaty.webp';
import floors from '@/assets/images/oferta/podlogi.webp';
import terraces from '@/assets/images/oferta/tarasy.webp';
import { ROUTES, type RoutePath } from '@/config/routes';

export type Pillar = 'service' | 'shop';

export type OfferItem = {
  id: string;
  pillar: Pillar;
  title: string;
  /** A few sentences – facts from docs/firma.md#oferta and the old site only, no brands */
  details: string;
  /** The page that tells more (D-84); without one the item asks for an estimate */
  href?: RoutePath;
  photo: StaticImageData;
};

export const PILLAR_LABEL: Record<Pillar, string> = { service: 'Usługi', shop: 'Sprzedaż' };

/*
 * What POLDACH does – both pillars (docs/decyzje.md D-58, D-79): first the services – the roof and
 * fitting, as on the old site's "Usługi" page – then the retail of the shop in Kokoszkowy, doors and
 * floors first (docs/firma.md#salon-w-kokoszkowych). A proposal for the client's acceptance
 * (docs/roadmapa.md). TODO(P-22): photos from the old poldach.eu, licences unknown; windows, doors,
 * floors and the roofing close-up look like stock or producers' photos
 */
export const OFFER: OfferItem[] = [
  {
    id: 'pokrycia-i-remonty',
    pillar: 'service',
    title: 'Pokrycia i remonty dachów',
    details:
      'Nowe pokrycia – dachówka ceramiczna i betonowa, blachodachówka, blacha trapezowa i na rąbek stojący, papa, membrany, gonty – oraz remonty, obróbki blacharskie, rynny i docieplenia poddaszy i dachów płaskich.',
    photo: standingSeamRoof,
  },
  {
    id: 'wykrywanie-nieszczelnosci',
    pillar: 'service',
    title: 'Wykrywanie nieszczelności dachów płaskich',
    details:
      'Trzy metody, bez naruszania pokrycia: elektroakustyczna – z dokładnością do 1 cm, bez zdejmowania żwiru i zieleni; zadymianie – także w deszczu; próbnik iskrowy – do 2000 m² dziennie. Wskazujemy miejsce i sposób naprawy, a naprawę wykonujemy sami.',
    href: ROUTES.leakDetection,
    photo: leakDetection,
  },
  {
    id: 'usuwanie-eternitu',
    pillar: 'service',
    title: 'Usuwanie eternitu',
    details:
      'Legalny demontaż i utylizacja eternitu – mamy uprawnienia do odpadów niebezpiecznych. Gminne programy i NFOŚiGW dofinansowują do 100% demontażu, transportu i utylizacji. Po demontażu położymy też nowe pokrycie.',
    photo: asbestosRemoval,
  },
  {
    id: 'montaz-w-domu',
    pillar: 'service',
    title: 'Montaż w domu',
    details:
      'Montujemy okna dachowe i elewacyjne, drzwi wewnętrzne i zewnętrzne, bramy garażowe, podłogi laminowane i drewniane oraz parapety – z materiału naszego albo powierzonego.',
    photo: windows,
  },
  {
    id: 'drzwi-i-bramy',
    pillar: 'shop',
    title: 'Drzwi i bramy garażowe',
    details:
      'Drzwi wewnętrzne i zewnętrzne oraz bramy garażowe – do wyboru w naszym salonie w Kokoszkowych, z dostawą i montażem.',
    href: ROUTES.shop,
    photo: doors,
  },
  {
    id: 'podlogi',
    pillar: 'shop',
    title: 'Podłogi',
    details:
      'Podłogi drewniane i laminowane z listwami przypodłogowymi – do obejrzenia w salonie w Kokoszkowych. Doradzimy, dostarczymy i ułożymy.',
    href: ROUTES.shop,
    photo: floors,
  },
  {
    id: 'okna-parapety-blaty',
    pillar: 'shop',
    title: 'Okna, parapety i blaty',
    details:
      'Okna, parapety wewnętrzne i zewnętrzne oraz blaty – w sprzedaży w naszym salonie, także z montażem.',
    href: ROUTES.shop,
    photo: sillsWorktops,
  },
  {
    id: 'tarasy-i-elewacje',
    pillar: 'shop',
    title: 'Deski tarasowe i okładziny',
    details:
      'Deski z kompozytu drewna na tarasy i balkony oraz okładziny elewacyjne – w sprzedaży w salonie w Kokoszkowych.',
    href: ROUTES.shop,
    photo: terraces,
  },
  {
    id: 'materialy-dachowe',
    pillar: 'shop',
    title: 'Materiały dachowe',
    details:
      'Pokrycia dachowe, papy, folie i membrany, gonty, rynny i akcesoria dekarskie – w sprzedaży w salonie w Kokoszkowych, także bez naszego montażu.',
    href: ROUTES.shop,
    photo: roofingCloseUp,
  },
];

/** The items of one pillar, in order */
export const offerOf = (pillar: Pillar) => OFFER.filter((item) => item.pillar === pillar);
