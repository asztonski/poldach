import { Kalam } from 'next/font/google';
import Image from 'next/image';
import psdSign from '@/assets/images/logotypy/psd-znak.png';
import { LogoWithFigure } from '@/brand/LogoWithFigure';
import { LogoEntrance } from '@/components/motion/LogoEntrance';
import stayInPlace from '@/components/motion/StayInPlace.module.css';
import { cn } from '@/lib/cn';
import { PageHero, type PageHeroProps } from './PageHero';

// Felt-tip handwriting – only for the proof notes (docs/design-system.md#typografia).
// latin-ext for "ł"; declared here, so only the pages with this hero download it
const marker = Kalam({ weight: '700', subsets: ['latin', 'latin-ext'], display: 'swap' });

/** Hand-drawn tick, like a marker check on a technical drawing. */
function MarkerTick() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-7 shrink-0 text-pd-blue-500"
    >
      <path d="M3 12.6c2 1.3 3.7 3.1 5.2 6C11.2 11.6 15.3 6.6 21 3.6" />
    </svg>
  );
}

/**
 * The home hero (docs/decyzje.md D-15, D-16): the page's opening (PageHero) with the logo with the
 * figure and the proof as marker notes. While scrolling it stays in place and section 2 slides over
 * it (`StayInPlace`, D-21). The projects, the certificates and the contact pages open with it too,
 * in their own words and with their own buttons (D-116, D-117, D-127). No wordmark
 * in the eyebrow – the logo next to it already says POLDACH.
 */
export function HeroSection(props: Omit<PageHeroProps, 'visual' | 'children' | 'className'>) {
  return (
    <PageHero
      {...props}
      className={stayInPlace.root}
      visual={
        // Inline SVG, so its parts can animate; plays once on every page load (D-16)
        <LogoEntrance className="mx-auto w-3/4 max-w-sm lg:w-[85%] lg:max-w-none">
          <LogoWithFigure decorative className="h-auto w-full" />
        </LogoEntrance>
      }
    >
      {/* Proof as marker notes (docs/design-system.md#komponenty) */}
      <ul
        aria-label="Dlaczego POLDACH"
        className={cn(
          marker.className,
          'mt-10 flex flex-col items-start gap-3 text-list font-bold text-pd-navy-900',
        )}
      >
        {/* Icon slots share one width (size-9), so both lines of text start at the same x */}
        <li className="flex -rotate-2 items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center">
            <MarkerTick />
          </span>
          Istniejemy od 1992
        </li>
        {/* TODO(P-19): keep only if PSD membership is confirmed – the logo states membership */}
        <li className="flex -rotate-1 items-center gap-3">
          <Image src={psdSign} alt="" className="size-9 shrink-0" />
          Polskie Stowarzyszenie Dekarzy
        </li>
        {/* TODO: Google rating note – rating and count verified in Google Maps (docs/firma.md) */}
      </ul>
    </PageHero>
  );
}
