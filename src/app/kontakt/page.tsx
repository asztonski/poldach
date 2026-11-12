import { CONTACT_SECTION_HREF, ROUTES } from '@/config/routes';
import { SITE, addressLine, mapsHref } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';
import { ContactSection, PageHero } from '@/sections/common';

export const metadata = pageMetadata({
  title: 'Kontakt',
  description: `Telefon ${SITE.contact.phone}, e-mail ${SITE.contact.email}, salon: ${addressLine}. Napisz, co jest do zrobienia – doradztwo i wycena bezpłatnie.`,
  path: ROUTES.contact,
});

/**
 * Contact (docs/mapa-strony.md, D-103), at the old site's address: the opening with the phone, then
 * the contact section – how to start, the form, the shop with the map. Opening hours – TODO(P-02).
 */
export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Zadzwoń, napisz albo przyjedź"
        lead={`Salon i biuro: ${addressLine}. Doradztwo i wycena są bezpłatne.`}
        // D-121: the title's three ways – call, write, come over
        actions={[
          'phone',
          { label: 'Napisz do nas', href: CONTACT_SECTION_HREF },
          { label: 'Dojazd do salonu', href: mapsHref },
        ]}
      />
      <ContactSection
        source="Kontakt"
        title="Napisz, co jest do zrobienia"
        lead="Formularz, telefon, e-mail i dojazd do salonu – wszystko w jednym miejscu."
      />
    </>
  );
}
