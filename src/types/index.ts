import type { StaticImageData } from 'next/image';
import type { RoutePath } from '@/config/routes';

/** A link of the menu or the footer */
export type NavLink = {
  label: string;
  href: RoutePath;
};

/** A titled list of links in the footer */
export type NavGroup = {
  title: string;
  links: NavLink[];
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
