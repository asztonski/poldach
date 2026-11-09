import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';
import { type SectionTheme, themeClass } from './theme';

/** Top edge cut at the roof pitch, read from left to right: rising = /, falling = \ */
export type SectionSlant = 'rising' | 'falling';

type SectionProps = ComponentPropsWithoutRef<'section'> & {
  /** Colour theme – docs/design-system.md#motywy-sekcji. */
  theme?: SectionTheme;
  /**
   * Slanted top edge over the previous section – docs/design-system.md#przejścia-między-sekcjami.
   * Inside <main> it alternates by position on its own (globals.css); set it only to override.
   */
  slant?: SectionSlant;
  /** false: children span the full width (e.g. an edge-to-edge photo) and place their own Container. */
  contained?: boolean;
  containerClassName?: string;
};

const slantClasses: Record<SectionSlant, string> = {
  rising: 'slant-rising',
  falling: 'slant-falling',
};

/**
 * Page section: its own colour and vignette on the screen grid (`paper`, globals.css). The same
 * space above and below the content (--section-space, docs/decyzje.md D-42): the next section
 * slides over the bottom by --slant-rise, so the bottom gets that much more, as the top gets it from
 * its slanted edge. A transform on it would pin its grid to it (D-27).
 */
export function Section({
  theme = 'yellow',
  slant,
  contained = true,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        themeClass(theme),
        'paper pt-(--section-space) pb-[calc(var(--section-space)+var(--slant-rise))]',
        slant && slantClasses[slant],
        className,
      )}
      {...props}
    >
      {contained ? <Container className={containerClassName}>{children}</Container> : children}
    </section>
  );
}
