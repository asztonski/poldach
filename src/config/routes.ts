/**
 * Single source of truth for URL paths – use these instead of string literals.
 * Planned pages (docs/mapa-strony.md) are listed too, so navigation can link to them before
 * they exist. A path with a page has a matching folder in src/app (e.g. '/uslugi' ->
 * src/app/uslugi/page.tsx) and an entry in LIVE_ROUTES.
 */
export const ROUTES = {
  home: '/',
  services: '/uslugi',
  // Offer categories at the old site's addresses (docs/mapa-strony.md#przekierowania-301-ze-starej-strony)
  roofs: '/dachy',
  leakDetection: '/wykrywanie-nieszczelnosci-dachow-plaskich',
  asbestosRemoval: '/usuwanie-eternitu',
  windows: '/okna',
  doors: '/drzwi',
  floors: '/podlogi',
  sillsWorktops: '/parapety-i-blaty',
  terraces: '/tarasy-balkony-elewacje',
  // The second pillar – sales in the shop in Kokoszkowy, doors and floors first (docs/decyzje.md D-58, D-59)
  shop: '/sprzedaz',
  // Not in the menu (D-59); the home page's "Dom / Firma" cards still link here
  business: '/dla-firm',
  projects: '/realizacje',
  contact: '/kontakt',
  privacy: '/polityka-prywatnosci',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

/** Paths that already have a page – the sitemap lists only these. */
export const LIVE_ROUTES: RoutePath[] = [ROUTES.home];
