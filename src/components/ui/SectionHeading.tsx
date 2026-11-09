import type { ReactNode } from 'react';
import { FadeInOnce } from '@/components/motion/FadeInOnce';
import { cn } from '@/lib/cn';
import { Eyebrow } from './Eyebrow';

type SectionHeadingProps = {
  /** Id of the h2 – pass it to the section's `aria-labelledby`. */
  id: string;
  eyebrow: ReactNode;
  title: ReactNode;
  /** The sentence under the title */
  lead?: ReactNode;
  /** Centred – only where docs/design-system.md#typografia allows it */
  centered?: boolean;
  className?: string;
  titleClassName?: string;
  leadClassName?: string;
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
  titleClassName,
  leadClassName,
  children,
}: SectionHeadingProps) {
  return (
    <FadeInOnce className={cn(centered && 'text-center', className)}>
      <Eyebrow className={centered ? 'justify-center' : undefined}>{eyebrow}</Eyebrow>
      <h2 id={id} className={cn('mt-2 text-h2 text-(--title)', titleClassName)}>
        {title}
      </h2>
      {lead ? (
        <p className={cn('mt-6 max-w-xl text-lead', centered && 'mx-auto', leadClassName)}>
          {lead}
        </p>
      ) : null}
      {children}
    </FadeInOnce>
  );
}
