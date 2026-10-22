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

/** Top-level menu entry; with `groups` it opens a panel instead of navigating. */
export type NavItem = NavLink & {
  groups?: NavGroup[];
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
