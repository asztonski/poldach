import { OG_CONTENT_TYPE, OG_SIZE, ogAlt, ogImage } from '@/lib/og-image';

// The image of a shared link to this page (src/lib/og-image.tsx)
//   – "w" does not stay alone at the end of a line
const TITLE = 'Sprzedaż – salon w Kokoszkowych';

export const alt = ogAlt(TITLE);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
// Drawn once at build time (static export, like robots.ts)
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(TITLE);
}
