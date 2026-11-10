import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { PinnedScene } from './PinnedScene';
import { SceneAnchor } from './SceneAnchor';
import { ThumbnailJump } from './ThumbnailJump';
import styles from './CenterStage.module.css';

/*
 * Units of the lead-in before the items, in a scene with an intro (docs/decyzje.md D-72): the intro
 * alone, then the first text in and the intro out, three times as slow as a text change
 * (CenterStage.module.css). One item is 34 units
 */
const INTRO_LEAD = 36;

type CenterStageItem = {
  id: string;
  /** What passes through the centre: a scan, a photo – portrait, about 5:7 */
  visual: ReactNode;
  /** The description next to it – shown while its visual stands in the centre */
  text: ReactNode;
  /**
   * Optional background of the whole screen while this item is in the centre – e.g. its photo again;
   * the stage blurs it (prototype, docs/decyzje.md D-65). Decorative
   */
  backdrop?: ReactNode;
};

type CenterStageProps = {
  items: CenterStageItem[];
  /**
   * The section's heading inside the scene (prototype, docs/decyzje.md D-66): on the pinned stage a
   * white sheet left of the first visual, gone when the first change starts; elsewhere a plain
   * heading above the list
   */
  intro?: ReactNode;
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
export function CenterStage({ items, intro, vhPerItem = 100, className }: CenterStageProps) {
  const lead = intro ? INTRO_LEAD : 0;
  const units = items.length * 34 - 2 + lead;
  // The scene's units in CSS: the number of items and the lead-in
  const timing = { '--n': items.length, '--lead': lead } as CSSProperties;

  return (
    // The lead-in gets its share of scrolling at the same pace as the items
    <PinnedScene length={`${(items.length + lead / 34) * vhPerItem}vh`} className={styles.stage}>
      {intro ? (
        <>
          <div className={styles.intro} style={timing}>
            {intro}
          </div>
          {/* A stop on the way up until the second item has almost arrived glides back to the intro */}
          <SceneAnchor units={units} until={lead + 44} />
        </>
      ) : null}
      {/* A click on a small visual brings its item to the centre */}
      <ThumbnailJump units={units} lead={lead} />
      <ol className={cn(styles.list, className)} style={timing}>
        {items.map(({ id, visual, text, backdrop }, i) => (
          <li key={id} data-index={i} className={styles.item} style={{ '--i': i } as CSSProperties}>
            {backdrop ? (
              <div className={styles.backdrop} aria-hidden="true">
                {backdrop}
              </div>
            ) : null}
            <div data-visual className={styles.visual}>
              {visual}
            </div>
            <div className={cn(styles.text, 'mt-3')}>{text}</div>
          </li>
        ))}
      </ol>
    </PinnedScene>
  );
}
