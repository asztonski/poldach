import { SECTION_IDS, type RoutePath } from '@/config/routes';
import { OFFER, PILLAR_LABEL, offerOf, type OfferItem, type Pillar } from '@/data/offer';
import { sheetNumber } from '@/lib/format';
import { PhotoStage } from './PhotoStage';

/** "Usługi · 02 / 04" – the place of an item among those of its pillar */
function sheetLabel(item: OfferItem) {
  const ofPillar = offerOf(item.pillar);
  return `${PILLAR_LABEL[item.pillar]} · ${sheetNumber(ofPillar.indexOf(item) + 1, ofPillar.length)}`;
}

type OfferSectionProps = {
  /** One pillar only – the services page, the shop's page; both on the home page */
  pillar?: Pillar;
  /** The page it is on: an item of this very page gets no link */
  here: RoutePath;
  title: string;
  lead: string;
};

/**
 * What POLDACH does (docs/mapa-strony.md, docs/decyzje.md D-29, D-44–D-46, D-79, D-103): the items
 * of the offer on the photo stage. The home page shows both pillars – the services, then the shop's
 * sales – the services page and the shop's page one each. Every item links to its page – the
 * services page, its own page, the shop – unless it is on that page already (D-106).
 */
export function OfferSection({ pillar, here, title, lead }: OfferSectionProps) {
  const items = pillar ? offerOf(pillar) : OFFER;

  return (
    <PhotoStage
      id={SECTION_IDS.offer}
      title={title}
      lead={lead}
      items={items.map((item) => ({
        id: item.id,
        label: sheetLabel(item),
        title: item.title,
        details: item.details,
        photo: item.photo,
        href: item.href !== here ? item.href : undefined,
      }))}
    />
  );
}
