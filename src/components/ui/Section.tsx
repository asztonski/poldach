import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

export type SectionTheme = 'yellow' | 'blue';

type SectionProps = ComponentPropsWithoutRef<'section'> & {
  /** Colour theme – docs/design-system.md#motywy-sekcji. */
  theme?: SectionTheme;
  containerClassName?: string;
};

const themeClasses: Record<SectionTheme, string> = {
  yellow: 'theme-yellow',
  blue: 'theme-blue',
};

/** Page section on the "technical drawing" background; padding sits on the 54 px grid. */
export function Section({
  theme = 'yellow',
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(themeClasses[theme], 'blueprint py-13.5 lg:py-27', className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
