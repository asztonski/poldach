/**
 * Single source of truth for URL paths – use these instead of string literals (docs/mapa-strony.md,
 * docs/decyzje.md D-84, D-103). Every link of the menu leads to a page of its own; the home page
 * tells the whole story. Where the old WordPress site had a page on the topic, the new one keeps its
 * address – no ranking to lose (which ones: docs/mapa-strony.md#strony). Every path here has a
 * matching folder in src/app (e.g. '/sprzedaz' -> src/app/sprzedaz/page.tsx).
 */

/**
 * Ids of sections – the anchors of in-page links and the places GA names a click by
 * (lib/analytics.ts). The contact section closes every page that sells.
 */
export const SECTION_IDS = {
  offer: 'oferta',
  projects: 'realizacje',
  certificates: 'dokumenty',
  contact: 'kontakt',
} as const;

/** "Bezpłatna wycena": the contact section of the page the button is on */
export const CONTACT_SECTION_HREF = `#${SECTION_IDS.contact}`;

export const ROUTES = {
  home: '/',
  // The first pillar – the roof and fitting
  services: '/uslugi',
  // The landing page of the video campaign (D-02); short on purpose – "dachów płaskich" is in the
  // page's title and heading (D-90)
  leakDetection: '/wykrywanie-nieszczelnosci',
  // The second pillar – sales in the shop in Kokoszkowy, doors and floors first (D-58)
  shop: '/sprzedaz',
  projects: '/nasze-realizacje',
  certificates: '/certyfikaty-i-referencje',
  contact: '/kontakt',
  privacy: '/polityka-prywatnosci',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
