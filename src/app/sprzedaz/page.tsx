import Image from 'next/image';
import headquarters from '@/assets/images/firma/siedziba-kokoszkowy.webp';
import { ROUTES } from '@/config/routes';
import { addressLine } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';
import { ContactSection, OfferSection, PageHero } from '@/sections/common';

export const metadata = pageMetadata({
  title: 'Sprzedaż – salon w Kokoszkowych',
  description:
    'Drzwi, podłogi, okna, parapety, blaty, deski tarasowe i materiały dachowe w salonie POLDACH w Kokoszkowych – z doradztwem, dostawą i montażem.',
  path: ROUTES.shop,
});

/**
 * The second pillar – sales in the shop (docs/mapa-strony.md, D-58, D-84, D-103): what it sells –
 * the scene of the offer with the shop's items only – then the contact with the map. Opening hours – TODO(P-02).
 */
export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Sprzedaż · salon w Kokoszkowych"
        title="Drzwi, podłogi i materiały – w naszym salonie"
        lead={`Sprzedaż detaliczna w naszej siedzibie: ${addressLine}. Wybierzesz na miejscu, a my doradzimy, dostarczymy i zamontujemy.`}
        visual={
          <div className="overflow-hidden rounded-box">
            <Image
              src={headquarters}
              alt="Siedziba i salon POLDACH w Kokoszkowych – budynek z łukowym dachem i szyldem POLDACH"
              loading="eager"
              className="h-auto w-full"
            />
          </div>
        }
      />
      <OfferSection
        pillar="shop"
        here={ROUTES.shop}
        title="Co znajdziesz w salonie"
        lead="Drzwi i podłogi przede wszystkim – a także okna, parapety, blaty, deski tarasowe i materiały dachowe. Doradzimy, dostarczymy i zamontujemy."
      />
      <ContactSection
        source="Sprzedaż"
        title="Przyjedź do salonu albo napisz"
        lead="Zapytaj o wybór, wycenę albo montaż – zadzwoń, napisz albo odwiedź nas w Kokoszkowych."
      />
    </>
  );
}
