import type { NavGroup, NavItem } from '@/types';
import { ROUTES } from './routes';

/*
 * Two pillars (docs/firma.md#oferta, docs/decyzje.md D-58, D-59): services – the roof and fitting –
 * and sales in the shop in Kokoszkowy, doors and floors first. Each pillar is a menu panel; the old site's
 * categories (D-46) keep their addresses. TODO(P-10): the final menu
 */
export const SERVICE_NAV: NavGroup[] = [
  {
    label: 'Dach',
    links: [
      {
        label: 'Dachy',
        href: ROUTES.roofs,
        description: 'Pokrycia, remonty, obróbki, rynny, docieplenia',
      },
      {
        label: 'Wykrywanie nieszczelności dachów płaskich',
        href: ROUTES.leakDetection,
        description: 'Trzy metody, bez naruszania pokrycia',
      },
      {
        label: 'Usuwanie eternitu',
        href: ROUTES.asbestosRemoval,
        description: 'Legalny demontaż i utylizacja',
      },
    ],
  },
  {
    label: 'Dom',
    links: [
      {
        label: 'Okna',
        href: ROUTES.windows,
        description: 'Okna i okna dachowe',
      },
      {
        label: 'Parapety i blaty',
        href: ROUTES.sillsWorktops,
        description: 'Parapety wewnętrzne i zewnętrzne, blaty',
      },
      {
        label: 'Tarasy, balkony, elewacje',
        href: ROUTES.terraces,
        description: 'Deski z kompozytu drewna',
      },
    ],
  },
];

// Retail in the shop at the head office; it also sells windows, sills, worktops, decking,
// cladding and roofing materials (docs/firma.md#salon-w-kokoszkowych)
export const SHOP_NAV: NavGroup[] = [
  {
    label: 'Salon w Kokoszkowych',
    links: [
      {
        label: 'Drzwi',
        href: ROUTES.doors,
        description: 'Wewnętrzne, zewnętrzne, bramy garażowe – sprzedaż i montaż',
      },
      {
        label: 'Podłogi',
        href: ROUTES.floors,
        description: 'Drewniane i laminowane – sprzedaż i montaż',
      },
    ],
  },
];

// Header and footer (docs/decyzje.md D-59): the two pillars, then proof and contact. No "O nas" –
// the home page tells it; no "Dla firm" in the menu
export const MAIN_NAV: NavItem[] = [
  { label: 'Usługi', href: ROUTES.services, groups: SERVICE_NAV, allLabel: 'Wszystkie usługi' },
  { label: 'Sprzedaż', href: ROUTES.shop, groups: SHOP_NAV, allLabel: 'Cały salon' },
  { label: 'Realizacje', href: ROUTES.projects },
  { label: 'Kontakt', href: ROUTES.contact },
];
