import Image from 'next/image';
import { Section } from '@/components/ui';
import { offerOf } from '@/data/offer';

/**
 * What the shop sells (docs/firma.md#salon-w-kokoszkowych, D-58, D-84): the shop's items of the
 * offer (src/data/offer.ts), the same as on the home page, as cards with a photo.
 */
export function AssortmentSection() {
  return (
    <Section
      theme="white"
      heading={{
        id: 'assortment-title',
        title: 'Co znajdziesz w salonie',
        lead: 'Drzwi i podłogi przede wszystkim – a także okna, parapety, blaty, deski tarasowe i materiały dachowe. Doradzimy, dostarczymy i zamontujemy.',
      }}
    >
      <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {offerOf('shop').map((item) => (
          <li key={item.id}>
            <div className="overflow-hidden rounded-box">
              {/* TODO(P-22): photos from the old site, licences unknown */}
              <Image src={item.photo} alt="" className="aspect-4/3 h-auto w-full object-cover" />
            </div>
            <h3 className="mt-4 text-h3">{item.title}</h3>
            <p className="mt-2">{item.details}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
