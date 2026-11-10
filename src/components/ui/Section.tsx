import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';
import { SectionHeading, type SectionHeadingProps } from './SectionHeading';
import { type SectionTheme, themeClass } from './theme';

/** Top edge cut at the roof pitch, read from left to right: rising = /, falling = \ */
export type SectionSlant = 'rising' | 'falling';

type SectionProps = ComponentPropsWithoutRef<'section'> & {
  /** Colour theme – docs/design-system.md#motywy-sekcji. Every section after the hero is white. */
  theme?: SectionTheme;
  /**
   * The section starts with a blue band across the full width – its title and description
   * (docs/decyzje.md D-47); the section is labelled by the title.
   */
  heading?: SectionHeadingProps;
  /** Colour of the heading band – blue unless the section asks for another (Offer: yellow, D-53). */
  bandTheme?: Exclude<SectionTheme, 'white'>;
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
 * Page section: its own colour on the screen grid (`paper`, globals.css). The same space above and
 * below the content (--section-space, docs/decyzje.md D-42): the next section slides over the
 * bottom by --slant-rise, so the bottom gets that much more. With a heading, the band takes the place
 * of the space above.
 */
export function Section({
  theme = 'yellow',
  heading,
  bandTheme = 'blue',
  slant,
  contained = true,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      aria-labelledby={heading?.id}
      className={cn(
        themeClass(theme),
        'paper pb-[calc(var(--section-space)+var(--slant-rise))]',
        !heading && 'pt-(--section-space)',
        slant && slantClasses[slant],
        className,
      )}
      {...props}
    >
      {heading ? (
        /*
         * Flat colour, no grid. Its top is the section's slanted edge (it reaches up into the slant,
         * --slant-edge); its bottom slants the other way – one bottom corner raised by the same pitch
         */
        <div
          className={cn(
            'mt-[calc(-1*var(--slant-edge,0px))] mb-(--section-space) bg-(--bg) pt-[calc(var(--grid-step)+var(--slant-edge,0px))] pb-[calc(var(--grid-step)+var(--slant-edge,0px))] [clip-path:polygon(0_0,100%_0,100%_calc(100%-var(--band-cut-right,0px)),0_calc(100%-var(--band-cut-left,0px)))]',
            themeClass(bandTheme),
          )}
        >
          <Container>
            <SectionHeading {...heading} />
          </Container>
        </div>
      ) : null}
      {contained ? <Container className={containerClassName}>{children}</Container> : children}
    </section>
  );
}
