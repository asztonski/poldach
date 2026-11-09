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
  className?: string;
};

/**
 * The photo turns into its technical drawing while scrolling (docs/design-system.md#ruch): an
 * edge travels up from the bottom, below it the photo is gone and the drawing lies on the
 * section's own paper. CSS only (scroll-driven animations). Without support and with reduced
 * motion the photo stays – it is the content, the drawing is the extra.
 */
export function TracingReveal({ photo, drawing, ratio, className }: TracingRevealProps) {
  return (
    <div className={cn(styles.track, className)}>
      <div className={styles.frame} style={{ '--ratio': ratio } as CSSProperties}>
        <div className={styles.photoWindow}>
          <div className={styles.photo}>{photo}</div>
        </div>
        <div className={styles.drawingWindow} aria-hidden="true">
          <div className={styles.drawing}>{drawing}</div>
        </div>
      </div>
    </div>
  );
}
