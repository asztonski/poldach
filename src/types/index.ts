import type { StaticImageData } from 'next/image';
import type { RoutePath } from '@/config/routes';

export type NavLink = {
  label: string;
  href: RoutePath;
  description?: string;
};

export type NavGroup = {
  label: string;
  links: NavLink[];
};

/**
 * Top-level menu entry. `groups` – the pages it covers, listed in the footer and the mobile menu;
 * in the desktop header the entry is a plain link to `href` (docs/decyzje.md D-60).
 */
export type NavItem = NavLink & {
  groups?: NavGroup[];
  /** The link to `href` below its groups in the mobile menu, e.g. "Wszystkie usługi". */
  allLabel?: string;
};

export type CertificateKind =
  'authorization' | 'qualification' | 'training' | 'reference' | 'award';

export type Certificate = {
  id: string;
  kind: CertificateKind;
  issuer: string;
  title: string;
  holder: string;
  /** null when the scan has no date */
  year: number | null;
  image: StaticImageData;
};
