import type { ReactNode } from 'react';
import { FadeInOnce } from '@/components/motion/FadeInOnce';
import { cn } from '@/lib/cn';
import { Eyebrow } from './Eyebrow';

type SectionHeadingProps = {
  /** Id of the h2 – pass it to the section's `aria-labelledby`. */
  id: string;
  /** The label above the title; the photo sections go without it (docs/decyzje.md D-44) */
  eyebrow?: ReactNode;
  title: ReactNode;
  /** The sentence under the title */
  lead?: ReactNode;
  /**
   * The big centred heading above a CenterStage (docs/decyzje.md D-26, D-37) – an exception to
   * left-aligned content sections (docs/design-system.md#typografia).
   */
  centered?: boolean;
  className?: string;
  /** More description under the lead – it appears together with the heading */
  children?: ReactNode;
};

/**
 * Eyebrow → 8 px → section title → lead (docs/design-system.md#układ). Fades in once, when the
 * section covers half of the screen, and stays (docs/decyzje.md D-36).
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  centered = false,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <FadeInOnce className={cn(centered && 'text-center', className)}>
      {eyebrow ? (
        <Eyebrow className={cn('mb-2', centered && 'justify-center')}>{eyebrow}</Eyebrow>
      ) : null}
      <h2 id={id} className={cn('text-(--title)', centered ? 'text-h1' : 'text-h2')}>
        {title}
      </h2>
      {lead ? (
        <p className={cn('mt-6 text-lead', centered ? 'mx-auto max-w-3xl' : 'max-w-xl')}>{lead}</p>
      ) : null}
      {children}
    </FadeInOnce>
  );
}
