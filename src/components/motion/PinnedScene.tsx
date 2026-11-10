import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './PinnedScene.module.css';

type PinnedSceneProps = {
  /** How much scrolling plays the scene, e.g. "360vh". */
  length: string;
  /** Class of the stage – the part that stands still. */
  className?: string;
  children: ReactNode;
};

/**
 * A scene pinned below the header: when it fills the screen, the page stops and the scroll plays
 * it. The mechanics only – the scene animates its own elements on the timeline `--pinned`
 * (PinnedScene.module.css). Where a pin does not fit, it is two plain boxes.
 */
export function PinnedScene({ length, className, children }: PinnedSceneProps) {
  return (
    <div className={styles.track} style={{ '--scene-length': length } as CSSProperties}>
      {/* data-pin: while it is stuck, a move up does not bring the header back (useHeaderScroll) */}
      <div data-pin className={cn(styles.stage, className)}>
        {children}
      </div>
    </div>
  );
}
