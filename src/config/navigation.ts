import type { NavGroup, NavLink } from '@/types';
import { ROUTES } from './routes';

/*
 * The menu (docs/decyzje.md D-84, D-90): the services and the campaign's one, the sales, the
 * projects and the contact. Plain links: the services, the projects and the contact are sections of
 * the home page, the other two pages of their own. TODO(P-10): the final menu
 */
export const MAIN_NAV: NavLink[] = [
  { label: 'Usługi', href: ROUTES.offer },
  { label: 'Nieszczelności', href: ROUTES.leakDetection },
  { label: 'Sprzedaż', href: ROUTES.shop },
  { label: 'Realizacje', href: ROUTES.projects },
  { label: 'Kontakt', href: ROUTES.contact },
];

/**
 * The footer (D-89): every address of the site in two groups – what POLDACH offers, then the
 * company – with names that say a little more than the menu's
 */
export const FOOTER_NAV: NavGroup[] = [
  {
    title: 'Oferta',
    links: [
      { label: 'Usługi dekarskie i montaż', href: ROUTES.offer },
      { label: 'Wykrywanie nieszczelności dachów płaskich', href: ROUTES.leakDetection },
      { label: 'Sprzedaż – salon w Kokoszkowych', href: ROUTES.shop },
    ],
  },
  {
    title: 'Firma',
    links: [
      { label: 'Realizacje', href: ROUTES.projects },
      { label: 'Kontakt', href: ROUTES.contact },
      { label: 'Polityka prywatności', href: ROUTES.privacy },
    ],
  },
];
