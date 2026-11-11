import type { ReactNode } from 'react';
import { FadeInOnce } from '@/components/motion/FadeInOnce';
import { cn } from '@/lib/cn';

export type SectionHeadingProps = {
  /** Id of the h2 – the section is labelled by it. */
  id: string;
  title: ReactNode;
  /** The description next to the title */
  lead?: ReactNode;
  /** Title above the description, one column on every screen (the "O nas" stage, D-53). */
  stacked?: boolean;
  /**
   * false – there from the start, no fade: a heading on its own sheet that may be on the first
   * screen already (the photo stage's intro, D-111)
   */
  fade?: boolean;
  /** More text under the description, e.g. a second paragraph; it sets its own spacing. */
  children?: ReactNode;
};

/**
 * Title and description of a section (docs/design-system.md#układ, docs/decyzje.md D-47): in its
 * band, on desktop the title on the left, the description on the right, level with its last line.
 * Fades in once, when the section covers half of the screen, and stays (D-36).
 */
export function SectionHeading({
  id,
  title,
  lead,
  stacked = false,
  fade = true,
  children,
}: SectionHeadingProps) {
  const Wrapper = fade ? FadeInOnce : 'div';

  return (
    <Wrapper className={cn('grid gap-6', !stacked && 'lg:grid-cols-2 lg:items-end lg:gap-16')}>
      <h2 id={id} className="text-h1 text-(--title)">
        {title}
      </h2>
      {lead || children ? (
        <div>
          {lead ? <p className="max-w-xl text-lead">{lead}</p> : null}
          {children}
        </div>
      ) : null}
    </Wrapper>
  );
}
