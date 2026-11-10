import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import roofingCloseUp from '@/assets/images/oferta/dachy.webp';
import doors from '@/assets/images/oferta/drzwi.webp';
import asbestosRemoval from '@/assets/images/oferta/eternit.webp';
import leakDetection from '@/assets/images/oferta/nieszczelnosci.webp';
import standingSeamRoof from '@/assets/images/oferta/obrobki.webp';
import windows from '@/assets/images/oferta/okna.webp';
import sillsWorktops from '@/assets/images/oferta/parapety-blaty.webp';
import floors from '@/assets/images/oferta/podlogi.webp';
import terraces from '@/assets/images/oferta/tarasy.webp';
import { CenterStage } from '@/components/motion/CenterStage';
import { Section, SectionHeading } from '@/components/ui';
import { ROUTES, type RoutePath } from '@/config/routes';
import { sheetNumber } from '@/lib/format';

type Pillar = 'service' | 'shop';

type OfferItem = {
  id: string;
  pillar: Pillar;
  title: string;
  /** A few sentences – facts from docs/firma.md#oferta and the old site only, no brands */
  details: string;
  /** The subpage behind [ zobacz ] */
  href: RoutePath;
  photo: StaticImageData;
};

const PILLAR_LABEL: Record<Pillar, string> = { service: 'Usługi', shop: 'Sprzedaż' };

/*
 * What POLDACH does – both pillars (docs/decyzje.md D-58, D-79): first the services – the roof and
 * fitting, as on the old site's "Usługi" page – then the retail of the shop in Kokoszkowy, doors and
 * floors first (docs/firma.md#salon-w-kokoszkowych). Advice and the estimate are in the intro. A
 * proposal for the client's acceptance (docs/roadmapa.md). TODO(P-22): photos from the old
 * poldach.eu, licences unknown; windows, doors, floors and the roofing close-up look like stock or
 * producers' photos
 */
const OFFER: OfferItem[] = [
  {
    id: 'pokrycia-i-remonty',
    pillar: 'service',
    title: 'Pokrycia i remonty dachów',
    details:
      'Nowe pokrycia – dachówka ceramiczna i betonowa, blachodachówka, blacha trapezowa i na rąbek stojący, papa, membrany, gonty – oraz remonty, obróbki blacharskie, rynny i docieplenia poddaszy i dachów płaskich.',
    href: ROUTES.roofs,
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
    href: ROUTES.asbestosRemoval,
    photo: asbestosRemoval,
  },
  {
    id: 'montaz-w-domu',
    pillar: 'service',
    title: 'Montaż w domu',
    details:
      'Montujemy okna dachowe i elewacyjne, drzwi wewnętrzne i zewnętrzne, bramy garażowe, podłogi laminowane i drewniane oraz parapety – z materiału naszego albo powierzonego.',
    href: ROUTES.services,
    photo: windows,
  },
  {
    id: 'drzwi-i-bramy',
    pillar: 'shop',
    title: 'Drzwi i bramy garażowe',
    details:
      'Drzwi wewnętrzne i zewnętrzne oraz bramy garażowe – do wyboru w naszym salonie w Kokoszkowych, z dostawą i montażem.',
    href: ROUTES.doors,
    photo: doors,
  },
  {
    id: 'podlogi',
    pillar: 'shop',
    title: 'Podłogi',
    details:
      'Podłogi drewniane i laminowane z listwami przypodłogowymi – do obejrzenia w salonie w Kokoszkowych. Doradzimy, dostarczymy i ułożymy.',
    href: ROUTES.floors,
    photo: floors,
  },
  {
    id: 'okna-parapety-blaty',
    pillar: 'shop',
    title: 'Okna, parapety i blaty',
    details:
      'Okna, parapety wewnętrzne i zewnętrzne oraz blaty – w sprzedaży w naszym salonie, także z montażem.',
    href: ROUTES.sillsWorktops,
    photo: sillsWorktops,
  },
  {
    id: 'tarasy-i-elewacje',
    pillar: 'shop',
    title: 'Deski tarasowe i okładziny',
    details:
      'Deski z kompozytu drewna na tarasy i balkony oraz okładziny elewacyjne – w sprzedaży w salonie w Kokoszkowych.',
    href: ROUTES.terraces,
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

/** "Usługi · 02 / 04" – the place of an item among those of its pillar */
function sheetLabel(item: OfferItem) {
  const ofPillar = OFFER.filter((other) => other.pillar === item.pillar);
  return `${PILLAR_LABEL[item.pillar]} · ${sheetNumber(ofPillar.indexOf(item) + 1, ofPillar.length)}`;
}

/**
 * Section 2 – what POLDACH does, "Czym się zajmujemy" (docs/mapa-strony.md#strona-główna,
 * docs/decyzje.md D-29, D-37, D-44–D-46, D-79): the services, then the shop's sales, pass
 * through the centre on desktop (CenterStage), each as a large photo over its own blurred backdrop
 * (D-65). No band: the heading is the scene's intro, a white sheet on its first screen (D-66).
 */
export function OfferSection() {
  return (
    <Section
      theme="white"
      aria-labelledby="offer-title"
      // The backdrop spans 100vw, which counts the scrollbar too – no sideways page scroll
      className="overflow-x-clip"
    >
      <CenterStage
        intro={
          <SectionHeading
            id="offer-title"
            title="Czym się zajmujemy"
            lead="Usługi dekarskie i montaż w domu, a w naszym salonie w Kokoszkowych – drzwi, podłogi i materiały. Doradzamy bezpłatnie i przygotowujemy kosztorys."
            stacked
          />
        }
        // 50 % faster than the default on request: an item a screen was too long
        vhPerItem={67}
        className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        items={OFFER.map((item) => ({
          id: item.id,
          visual: (
            // Not a link: on the stage a click on a small photo brings it to the centre (D-71); the
            // subpage is behind [ zobacz ] in the text
            <div className="overflow-hidden rounded-box">
              <Image src={item.photo} alt="" className="h-auto w-full" />
            </div>
          ),
          // The same file again, blurred behind the stage (prototype, D-65) – already loaded
          backdrop: <Image src={item.photo} alt="" />,
          text: (
            <>
              <p className="text-eyebrow uppercase">[ {sheetLabel(item)} ]</p>
              {/* Title colour from lg (large text, docs/design-system.md#kontrast); h2 size only from
                  110rem – the sheet has a fixed height and holds the longer description too */}
              <h3 className="mt-3 text-h3 lg:text-(--title) min-[110rem]:text-h2">{item.title}</h3>
              <p className="mt-3 text-small xl:text-body">{item.details}</p>
              {/* At the bottom of the sheet (a column on the pinned stage), right after the text elsewhere */}
              <Link
                href={item.href}
                className="mt-auto self-start pt-4 text-eyebrow uppercase underline-offset-4 hover:underline"
              >
                <span aria-hidden="true">[ </span>
                zobacz
                <span className="sr-only">: {item.title}</span>
                <span aria-hidden="true"> ]</span>
              </Link>
            </>
          ),
        }))}
      />
    </Section>
  );
}
