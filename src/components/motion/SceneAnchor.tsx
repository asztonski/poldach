'use client';

import { useEffect, useRef } from 'react';
import { GLIDE_EVENT, SCROLL_JUMP_EVENT, glideTo } from './SmoothScroll';

// The scroll counts as stopped after this long without a scroll event (a smooth glide emits one
// every frame)
const IDLE_MS = 150;
// Smaller moves do not change the direction (sub-pixel steps of the smooth scroll)
const MIN_MOVE = 2;

type SceneAnchorProps = {
  /** Length of the scene in its units (CenterStage: 34n − 2 + lead). */
  units: number;
  /** Up to this unit a stop on the way up is pulled back to the start. */
  until: number;
};

/**
 * A light anchor at the start of a pinned scene (docs/decyzje.md D-70): when the page stops on the
 * way up a little past the start (up to `until`), it glides back to the start – the scene's first
 * screen, with the section's heading, does not get skipped by a fast scroll up. Placed inside the
 * stage (the sticky element); only where it is pinned.
 */
export function SceneAnchor({ units, until }: SceneAnchorProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = ref.current?.parentElement;
    const track = stage?.parentElement;
    if (!stage || !track) return;
    let lastY = window.scrollY;
    let up = false;
    let timer: number | undefined;
    // A glide of the page (a click on a thumbnail, this anchor): no anchoring until it has stopped
    let gliding = false;

    const settle = () => {
      if (gliding) {
        gliding = false;
        lastY = window.scrollY;
        up = false;
        return;
      }
      const style = getComputedStyle(stage);
      if (!up || style.position !== 'sticky') return;
      const start =
        track.getBoundingClientRect().top + window.scrollY - (parseFloat(style.top) || 0);
      const unit = (track.offsetHeight - stage.offsetHeight) / units;
      const past = window.scrollY - start;
      if (past <= MIN_MOVE || past > until * unit) return;
      glideTo(start, 0.8);
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) >= MIN_MOVE) {
        up = y < lastY;
        lastY = y;
      }
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, IDLE_MS);
    };

    // The page moving its own position (a scene unpinning) is not a move up of the user
    const onJump = () => {
      lastY = window.scrollY;
      up = false;
    };
    const onGlide = () => {
      gliding = true;
      // Cleared at the next stop – also when the glide has nowhere to go
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, IDLE_MS);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener(SCROLL_JUMP_EVENT, onJump);
    window.addEventListener(GLIDE_EVENT, onGlide);
    return () => {
      window.removeEventListener(GLIDE_EVENT, onGlide);
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener(SCROLL_JUMP_EVENT, onJump);
    };
  }, [units, until]);

  return <span ref={ref} hidden />;
}
