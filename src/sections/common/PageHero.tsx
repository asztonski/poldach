import type { ReactNode } from 'react';
import { ButtonLink, PhoneButton, Section } from '@/components/ui';
import { CONTACT_SECTION_HREF } from '@/config/routes';
import { cn } from '@/lib/cn';

export type PageHeroProps = {
  eyebrow: string;
  /** The page's h1 */
  title: ReactNode;
  lead: ReactNode;
  /** The first button: the phone by default; on a page with a gallery – a link down to it (D-116) */
  action?: { href: `#${string}`; label: string };
  /** A photo, a video or the logo next to the text, from lg */
  visual?: ReactNode;
  /** More under the buttons, e.g. the home hero's marker notes */
  children?: ReactNode;
  className?: string;
};

/**
 * The yellow opening of a page (docs/mapa-strony.md#podstrony): eyebrow, the page's h1, the lead,
 * the phone and "Bezpłatna wycena" to the page's own contact section. It starts under the header,
 * which has no background of its own until the page scrolls (`under-header`, globals.css), so the
 * grid and the vignette run through both without a seam. The home hero (HeroSection) is this one
 * with the logo and the motion.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  action,
  visual,
  children,
  className,
}: PageHeroProps) {
  return (
    <Section
      theme="yellow"
      aria-labelledby="page-title"
      data-analytics-area="hero"
      // Pulled up under the header; the usual space above the content starts below it
      className={cn(
        'under-header -mt-(--header-h) pt-[calc(var(--header-h)+var(--section-space))]',
        className,
      )}
      containerClassName={cn(
        'grid grid-cols-1 items-center gap-12',
        visual && 'lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16',
      )}
    >
      <div>
        <p className="text-eyebrow text-(--label) uppercase">{eyebrow}</p>
        <h1 id="page-title" className="mt-3 text-h1 text-(--title)">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-lead">{lead}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          {action ? (
            <ButtonLink href={action.href} className="w-full sm:w-auto">
              {action.label}
            </ButtonLink>
          ) : (
            <PhoneButton className="w-full sm:w-auto" />
          )}
          <ButtonLink href={CONTACT_SECTION_HREF} className="w-full sm:w-auto">
            Bezpłatna wycena
          </ButtonLink>
        </div>
        {children}
      </div>
      {visual}
    </Section>
  );
}
