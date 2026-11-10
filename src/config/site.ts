/**
 * Company details (NAP) – the only place for them in code. Facts and open questions:
 * docs/firma.md.
 */
export const SITE = {
  name: 'POLDACH',
  legalName: 'P.H.U. „POLDACH” S.C. Jacek Supiński i Piotr Supiński',
  /** The partnership's numbers only, not the partners' own (docs/firma.md#dane-rejestrowe) */
  nip: '5922015403',
  regon: '192821185',
  url: 'https://poldach.eu',
  tagline: 'Dach – to nasz fach',
  /** Jacek Supiński starts the business (docs/firma.md#historia) */
  foundingYear: 1992,
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

/**
 * The year the site was built – counted at build time (static export), so the site has to be
 * rebuilt at least once a year ("34 lata" in "O nas", the footer's revision).
 */
export const BUILD_YEAR = new Date().getFullYear();

export const phoneHref = `tel:+48${SITE.contact.phone.replace(/\s/g, '')}`;
export const emailHref = `mailto:${SITE.contact.email}`;
