import type { MetadataRoute } from 'next';
import { LIVE_ROUTES, ROUTES } from '@/config/routes';
import { SITE } from '@/config/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return LIVE_ROUTES.map((path) => ({
    // Matches `trailingSlash: true` in next.config.ts
    url: `${SITE.url}${path === '/' ? '/' : `${path}/`}`,
    changeFrequency: 'monthly',
    priority: path === ROUTES.home ? 1 : 0.7,
  }));
}
