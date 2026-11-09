import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { PinnedScene } from './PinnedScene';
import styles from './CenterStage.module.css';

type CenterStageItem = {
  id: string;
  /** What passes through the centre: a scan, a drawing */
  visual: ReactNode;
  /** The description next to it – shown while its visual stands in the centre */
  text: ReactNode;
};

type CenterStageProps = {
  /** The section's heading – it stands above the items, on the same screen */
  heading: ReactNode;
  items: CenterStageItem[];
  /** Scrolling per item, in vh – the pace of the scene. By default one screen. */
  vhPerItem?: number;
  /** Layout of the plain list, where a pin does not fit (a grid); slot overrides – CSS module */
  className?: string;
};

/**
 * Items pass through the centre of a pinned scene, one after another, like "Full-scope" on
 * metriccivil.ca (docs/design-system.md#ruch, docs/decyzje.md D-26, D-37, D-40): the heading stands
 * above them; the first item stands in the centre from the start, then shrinks to the upper left
 * while the next grows from the lower right; the text next to it changes. Below that, without
 * support and with reduced motion: the heading and the plain list.
 */
export function CenterStage({ heading, items, vhPerItem = 100, className }: CenterStageProps) {
  return (
    <PinnedScene length={`${items.length * vhPerItem}vh`} className={styles.stage}>
      {heading}
      <div
        aria-hidden="true"
        className={cn(styles.divider, 'mt-(--grid-step) h-0.5 bg-current opacity-20')}
      />
      <ol
        className={cn(styles.list, 'mt-8', className)}
        style={{ '--n': items.length } as CSSProperties}
      >
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
