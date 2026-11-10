import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { PinnedScene } from './PinnedScene';
import styles from './CenterStage.module.css';

type CenterStageItem = {
  id: string;
  /** What passes through the centre: a scan, a photo – portrait, about 5:7 */
  visual: ReactNode;
  /** The description next to it – shown while its visual stands in the centre */
  text: ReactNode;
};

type CenterStageProps = {
  items: CenterStageItem[];
  /** Scrolling per item, in vh – the pace of the scene. By default one screen. */
  vhPerItem?: number;
  /** Layout of the plain list, where a pin does not fit (a grid) */
  className?: string;
};

/**
 * Items pass through the centre of a pinned scene, one after another, like "Full-scope" on
 * metriccivil.ca (docs/design-system.md#ruch, docs/decyzje.md D-26, D-37, D-47): the section's
 * heading stays in its band above, the items get the whole screen; the first item stands in the
 * centre from the start, then shrinks to the upper left while the next grows from the lower right;
 * the text next to it changes. Below that, without support and with reduced motion: a plain list.
 */
export function CenterStage({ items, vhPerItem = 100, className }: CenterStageProps) {
  return (
    <PinnedScene length={`${items.length * vhPerItem}vh`} className={styles.stage}>
      <ol className={cn(styles.list, className)} style={{ '--n': items.length } as CSSProperties}>
        {items.map(({ id, visual, text }, i) => (
          <li key={id} className={styles.item} style={{ '--i': i } as CSSProperties}>
            <div className={styles.visual}>{visual}</div>
            <div className={cn(styles.text, 'mt-3')}>{text}</div>
          </li>
        ))}
      </ol>
    </PinnedScene>
  );
}
