/**
 * Single source of truth for URL paths – use these instead of string literals (docs/mapa-strony.md,
 * docs/decyzje.md D-84). Four pages: the home page tells the whole story, the other three answer
 * one need each – the campaign's service, the shop, the privacy policy. Everything else is a
 * section of the home page, linked by its id. A page has a matching folder in src/app (e.g.
 * '/sprzedaz' -> src/app/sprzedaz/page.tsx) and an entry in LIVE_ROUTES.
 */

/** Ids of the home page's sections the menu and the buttons link to */
export const SECTION_IDS = {
  offer: 'oferta',
  projects: 'realizacje',
  contact: 'kontakt',
} as const;

export const ROUTES = {
  home: '/',
  // The landing page of the video campaign (D-02); short on purpose – "dachów płaskich" is in the
  // page's title and heading (D-90)
  leakDetection: '/wykrywanie-nieszczelnosci',
  // The second pillar – sales in the shop in Kokoszkowy, doors and floors first (D-58)
  shop: '/sprzedaz',
  privacy: '/polityka-prywatnosci',
  // Sections of the home page
  offer: `/#${SECTION_IDS.offer}`,
  projects: `/#${SECTION_IDS.projects}`,
  contact: `/#${SECTION_IDS.contact}`,
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

/** Paths that have a page – the sitemap lists only these. */
export const LIVE_ROUTES: RoutePath[] = [
  ROUTES.home,
  ROUTES.leakDetection,
  ROUTES.shop,
  ROUTES.privacy,
];
