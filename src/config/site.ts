/**
 * Company details (NAP) – the only place for them in code. Facts and open questions:
 * docs/firma.md.
 */
export const SITE = {
  name: 'POLDACH',
  legalName: 'P.H.U. „POLDACH” S.C. Jacek Supiński i Piotr Supiński',
  url: 'https://poldach.eu',
  tagline: 'Dach – to nasz fach',
  description:
    'Rodzinna firma dekarska z Kokoszkowych. Od 1992 roku robimy dachy kompleksowo – od doradztwa i materiału po montaż – a w domu także drzwi i podłogi.',
  contact: {
    phone: '503 005 234', // TODO(P-01): number from the video ad; the old site lists others
    email: 'poldachpk@wp.pl',
    address: {
      street: 'ul. Gdańska 1B',
      postalCode: '83-207',
      city: 'Kokoszkowy',
    },
  },
} as const;

export const phoneHref = `tel:+48${SITE.contact.phone.replace(/\s/g, '')}`;
export const emailHref = `mailto:${SITE.contact.email}`;
