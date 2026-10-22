import type { NavGroup, NavItem } from '@/types';
import { ROUTES } from './routes';

// TODO(P-10): menu proposal from 22.10.2026 – final items depend on the client
export const SERVICE_NAV: NavGroup[] = [
  {
    label: 'Dachy',
    links: [
      {
        label: 'Pokrycia i remonty dachów',
        href: ROUTES.roofing,
        description: 'Dachówka, blacha, papa, okna dachowe',
      },
      {
        label: 'Obróbki blacharskie i rynny',
        href: ROUTES.flashingGutters,
        description: 'Obróbki, orynnowanie, rury spustowe',
      },
      {
        label: 'Docieplenia',
        href: ROUTES.insulation,
        description: 'Poddasza i dachy płaskie',
      },
    ],
  },
  {
    label: 'Usługi specjalistyczne',
    links: [
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
    label: 'Wykończenia',
    links: [
      {
        label: 'Drzwi i podłogi',
        href: ROUTES.doorsFloors,
        description: 'Montaż drzwi, podłóg i parapetów',
      },
    ],
  },
];

export const MAIN_NAV: NavItem[] = [
  { label: 'Usługi', href: ROUTES.services, groups: SERVICE_NAV },
  { label: 'Dla firm', href: ROUTES.business },
  { label: 'Realizacje', href: ROUTES.projects },
  { label: 'O nas', href: ROUTES.about },
  { label: 'Kontakt', href: ROUTES.contact },
];
