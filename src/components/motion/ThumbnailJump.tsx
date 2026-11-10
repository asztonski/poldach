'use client';

import { useEffect, useRef } from 'react';
import { glideTo } from './SmoothScroll';

type ThumbnailJumpProps = {
  /** Length of the scene in its units (CenterStage: 34n − 2 + lead). */
  units: number;
  /** Units of the lead-in before the first item. */
  lead: number;
};

/**
 * A click on a visual of a pinned CenterStage – the small previous or next one – glides the page to
 * where that item stands in the centre (docs/decyzje.md D-71). Visuals that are links themselves
 * (the scans in Autoryzacje) keep their own click. Placed inside the stage; only where it is pinned.
 */
export function ThumbnailJump({ units, lead }: ThumbnailJumpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = ref.current?.parentElement;
    const track = stage?.parentElement;
    if (!stage || !track) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element;
      if (target.closest('a, button')) return;
      const item = target.closest<HTMLElement>('[data-index]');
      const style = getComputedStyle(stage);
      if (!item || !target.closest('[data-visual]') || style.position !== 'sticky') return;
      const start =
        track.getBoundingClientRect().top + window.scrollY - (parseFloat(style.top) || 0);
      const unit = (track.offsetHeight - stage.offsetHeight) / units;
      // An item stands in the centre at unit lead + 34i + 12 (CenterStage.module.css)
      glideTo(start + unit * (lead + 34 * Number(item.dataset.index) + 12), 0.9);
    };

    stage.addEventListener('click', onClick);
    return () => stage.removeEventListener('click', onClick);
  }, [units, lead]);

  return <span ref={ref} hidden />;
}
