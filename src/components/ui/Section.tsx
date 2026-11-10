import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';
import { SectionHeading, type SectionHeadingProps } from './SectionHeading';
import { type SectionTheme, themeClass } from './theme';

type SectionProps = ComponentPropsWithoutRef<'section'> & {
  /** Colour theme – docs/design-system.md#motywy-sekcji. Every section after the hero is white. */
  theme?: SectionTheme;
  /**
   * The section starts with a blue band across the full width – its title and description
   * (docs/decyzje.md D-47); the section is labelled by the title.
   */
  heading?: SectionHeadingProps;
  /** false: children span the full width (e.g. an edge-to-edge photo) and place their own Container. */
  contained?: boolean;
  containerClassName?: string;
};

/**
 * Page section: its own colour on the screen grid (`paper`, globals.css), straight edges
 * (docs/decyzje.md D-67). The same space above and below the content (--section-space, D-42); with
 * a heading, the band takes the place of the space above.
 */
export function Section({
  theme = 'yellow',
  heading,
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
        'paper pb-(--section-space)',
        !heading && 'pt-(--section-space)',
        className,
      )}
      {...props}
    >
      {heading ? (
        // Flat blue, no grid
        <div className="mb-(--section-space) bg-(--bg) py-(--grid-step) theme-blue">
          <Container>
            <SectionHeading {...heading} />
          </Container>
        </div>
      ) : null}
      {contained ? <Container className={containerClassName}>{children}</Container> : children}
    </section>
  );
}
