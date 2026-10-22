import type { Metadata } from 'next';
import { HeroSection } from '@/sections/home';

// Title and description come from the defaults in layout.tsx
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <HeroSection />;
}
