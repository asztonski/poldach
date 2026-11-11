import Image from 'next/image';
import Link from 'next/link';
import { CenterStage } from '@/components/motion/CenterStage';
import { Section, SectionHeading, quietLinkClasses } from '@/components/ui';
import { ROUTES, SECTION_IDS } from '@/config/routes';
import { OFFER, PILLAR_LABEL, offerOf, type OfferItem } from '@/data/offer';
import { sheetNumber } from '@/lib/format';

/** "Usługi · 02 / 04" – the place of an item among those of its pillar */
function sheetLabel(item: OfferItem) {
  const ofPillar = offerOf(item.pillar);
  return `${PILLAR_LABEL[item.pillar]} · ${sheetNumber(ofPillar.indexOf(item) + 1, ofPillar.length)}`;
}

/**
 * Section 2 – what POLDACH does, "Czym się zajmujemy" (docs/mapa-strony.md#strona-główna,
 * docs/decyzje.md D-29, D-37, D-44–D-46, D-79): the services, then the shop's sales, pass
 * through the centre on desktop (CenterStage), each as a large photo over its own blurred backdrop
 * (D-65). No band: the heading is the scene's intro, a white sheet on its first screen (D-66).
 * The menu's "Usługi" links here (D-84).
 */
export function OfferSection() {
  return (
    <Section
      id={SECTION_IDS.offer}
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
            // page is behind the link in the text
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
              {/* At the bottom of the sheet (a column on the pinned stage), right after the text
                  elsewhere. An item with a page links to it, the rest to the contact form (D-84) */}
              <Link
                href={item.href ?? ROUTES.contact}
                className={quietLinkClasses('mt-auto self-start pt-4 text-eyebrow uppercase')}
              >
                <span aria-hidden="true">[ </span>
                {item.href ? 'zobacz' : 'zapytaj o wycenę'}
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
