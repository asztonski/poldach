import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './PinnedScene.module.css';

type PinnedSceneProps = {
  /** How much scrolling plays the scene, e.g. "360vh". */
  length: string;
  /**
   * The same on small screens – given, the scene pins there too, by the bottom edge of its stage
   * (PinnedScene.module.css). Without it, small screens get two plain boxes.
   */
  smallLength?: string;
  /**
   * The content sets the stage's height, which on a low screen is more than the screen: it then
   * pins by its bottom edge, so the end of the scene stays on the screen (PinnedScene.module.css).
   */
  tall?: boolean;
  /** Class of the stage – the part that stands still. */
  className?: string;
  children: ReactNode;
};

/**
 * A scene pinned below the header: when it fills the screen, the page stops and the scroll plays
 * it. The mechanics only – the scene animates its own elements on the timeline `--pinned`
 * (PinnedScene.module.css). Where a pin does not fit, it is two plain boxes.
 */
export function PinnedScene({ length, smallLength, tall, className, children }: PinnedSceneProps) {
  return (
    <div
      className={cn(styles.track, smallLength && styles.trackSmall, tall && styles.trackTall)}
      style={{ '--scene-length': length, '--scene-length-small': smallLength } as CSSProperties}
    >
      {/* data-pin: while it is stuck, a move up does not bring the header back (useHeaderScroll) */}
      <div data-pin className={cn(styles.stage, className)}>
        {children}
      </div>
    </div>
  );
}
