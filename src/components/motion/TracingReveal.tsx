import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './TracingReveal.module.css';

type TracingRevealProps = {
  /** The photo (an <img>); it is cropped like `object-fit: cover`, anchored to the top. */
  photo: ReactNode;
  /**
   * A drawing in the photo's coordinates with `preserveAspectRatio="xMidYMin slice"` – the same
   * crop as the photo, so the two match 1:1 at any frame size.
   */
  drawing: ReactNode;
  /** Width / height of the photo and the drawing. */
  ratio: number;
  /**
   * Caption shown on the frame where it is pinned (the figure's own caption would be covered by
   * the next section there) – decorative, the figcaption says it to screen readers.
   */
  label?: ReactNode;
  className?: string;
};

/**
 * The photo uncovers its technical drawing while scrolling (docs/design-system.md#ruch): the drawing
 * lies right under the photo and stays, the photo is cut away from the bottom up. CSS only
 * (scroll-driven animations). Without support and with reduced motion the photo stays – it is the
 * content, the drawing is the extra.
 */
export function TracingReveal({ photo, drawing, ratio, label, className }: TracingRevealProps) {
  return (
    <div className={cn(styles.track, className)}>
      {/* data-pin="full": while it is stuck, the header stays hidden in both directions (useHeaderScroll) */}
      <div data-pin="full" className={styles.frame} style={{ '--ratio': ratio } as CSSProperties}>
        <div className={styles.photoWindow}>
          <div className={styles.photo}>{photo}</div>
        </div>
        <div className={styles.drawingWindow} aria-hidden="true">
          <div className={styles.drawing}>{drawing}</div>
        </div>
        {label ? (
          <div className={styles.label} aria-hidden="true">
            {label}
          </div>
        ) : null}
      </div>
    </div>
  );
}
