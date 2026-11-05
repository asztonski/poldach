import { Kalam } from 'next/font/google';
import Image from 'next/image';
import psdSign from '@/assets/images/logotypy/psd-znak.png';
import { LogoWithFigure } from '@/brand/LogoWithFigure';
import { LogoEntrance } from '@/components/motion/LogoEntrance';
import { ButtonLink, PhoneButton, Section } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import { cn } from '@/lib/cn';

// Felt-tip handwriting – only for the proof notes (docs/design-system.md#typografia).
// latin-ext for "ł"; declared here, so only the home page downloads it
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
 * Yellow hero with the logo with the figure (docs/decyzje.md D-15, D-16). It starts under the header,
 * which has no background of its own until the page scrolls (`under-header`, globals.css), so
 * the grid and the vignette run through both without a seam.
 */
export function HeroSection() {
  return (
    <Section
      theme="yellow"
      aria-labelledby="hero-title"
      // Pulled up by the header height (h-16, lg:h-20); content starts 3 grid steps from the top
      className="under-header -mt-16 pt-[calc(var(--grid-step)*3)] lg:-mt-20 lg:pt-[calc(var(--grid-step)*3)]"
      containerClassName="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16"
    >
      <div>
        {/* No wordmark in the eyebrow – the logo next to it already says POLDACH */}
        <p className="text-eyebrow text-(--label) uppercase">
          Rodzinna firma dekarska · od&nbsp;1992
        </p>
        {/* TODO(P-07): option 4 (D-15) – waiting for the client's confirmation */}
        <h1 id="hero-title" className="mt-3 text-h1 text-(--title)">
          Dach nad głową i&nbsp;spokój na lata
        </h1>
        {/* The headline carries the feeling, the lead the differentiator (roof to floor) */}
        <p className="mt-6 max-w-xl text-lead">
          Nowe dachy i remonty – a w domu także drzwi i podłogi. Doradzamy, wyceniamy i montujemy z
          materiału własnego lub powierzonego.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <PhoneButton className="w-full sm:w-auto" />
          <ButtonLink href={ROUTES.contact} className="w-full sm:w-auto">
            Bezpłatna wycena
          </ButtonLink>
        </div>

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
      </div>

      {/* Inline SVG, so its parts can animate; plays once on every page load (D-16) */}
      <LogoEntrance className="mx-auto w-3/4 max-w-sm lg:w-[85%] lg:max-w-none">
        <LogoWithFigure decorative className="h-auto w-full" />
      </LogoEntrance>
    </Section>
  );
}
