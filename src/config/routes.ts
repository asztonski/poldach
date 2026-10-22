/**
 * Single source of truth for URL paths – use these instead of string literals.
 * Planned pages (docs/mapa-strony.md) are listed too, so navigation can link to them before
 * they exist. A path with a page has a matching folder in src/app (e.g. '/uslugi' ->
 * src/app/uslugi/page.tsx) and an entry in LIVE_ROUTES.
 */
export const ROUTES = {
  home: '/',
  services: '/uslugi',
  roofing: '/pokrycia-dachowe',
  flashingGutters: '/obrobki-blacharskie-i-rynny',
  insulation: '/docieplenia',
  leakDetection: '/wykrywanie-nieszczelnosci-dachow-plaskich',
  asbestosRemoval: '/usuwanie-eternitu',
  doorsFloors: '/drzwi-i-podlogi',
  business: '/dla-firm',
  projects: '/realizacje',
  about: '/o-nas',
  contact: '/kontakt',
  privacy: '/polityka-prywatnosci',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

/** Paths that already have a page – the sitemap lists only these. */
export const LIVE_ROUTES: RoutePath[] = [ROUTES.home];
