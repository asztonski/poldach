import type { Metadata } from 'next';
import type { RoutePath } from '@/config/routes';
import { SITE } from '@/config/site';

type PageMetadataOptions = {
  title: string;
  description: string;
  path: RoutePath;
};

/** Per-page metadata with matching Open Graph tags and a canonical URL. */
export function pageMetadata({ title, description, path }: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: path,
    },
  };
}
