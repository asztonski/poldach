import type { MetadataRoute } from 'next';
import { ROUTES } from '@/config/routes';
import { SITE } from '@/config/site';

export const dynamic = 'force-static';

// Every path of ROUTES is a page (src/config/routes.ts)
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(ROUTES).map((path) => ({
    // Matches `trailingSlash: true` in next.config.ts
    url: `${SITE.url}${path === '/' ? '/' : `${path}/`}`,
    changeFrequency: 'monthly',
    priority: path === ROUTES.home ? 1 : 0.7,
  }));
}
