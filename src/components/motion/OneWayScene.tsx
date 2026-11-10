'use client';

import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import { isSmoothScrolling, moveScrollBy } from './SmoothScroll';

// Keys that scroll the page up
const UP_KEYS = new Set(['ArrowUp', 'PageUp', 'Home']);
// Without smoothing (touch, scrollbar, keys) the position is read directly; a move up counts from here
const MIN_UP = 4;

/** Keys typed into a field are not page moves. */
const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  Boolean(target.closest('input, textarea, select, [contenteditable]'));

/**
 * Wraps a PinnedScene and plays it one way (docs/decyzje.md D-63, D-64). Scrolling down plays it;
 * once complete it unpins for good and the page scrolls on as usual. A move up before that unpins
 * it at once: the page scrolls up, the scene stays where it got to. Coming back down, it pins again
 * at the same place and plays on from there; jumped far past it (End, the scrollbar), it completes
 * where it is.
 *
 * How: `--p` is the furthest progress so far (0–1); the scene's CSS draws every animation from it
 * under `[data-scrub]`. Unpinned = the pin gives its scroll length back (`data-released`,
 * PinnedScene.module.css) and the page moves by as much in the same frame, so nothing on the screen
 * moves. Pinned again = only the part still to play gets its length back. A move up: the wheel and
 * keys while the wheel is smoothed (Lenis also steps back by fractions of a pixel), otherwise the
 * scroll position. Only where the stage is pinned (sticky); elsewhere the final state stands.
 */
export function OneWayScene(props: ComponentPropsWithoutRef<'div'>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const stage = element?.querySelector<HTMLElement>('[data-pin]');
    const track = stage?.parentElement;
    if (!element || !stage || !track) return;
    const style = getComputedStyle(stage);
    // Not pinned here (small screen, reduced motion, no support): nothing to play, nothing to watch
    if (style.position !== 'sticky') return;
    element.dataset.scrub = '';
    const pinnedAt = parseFloat(style.top) || 0;
    const fullLength = track.style.getPropertyValue('--scene-length');
    let state: 'pinned' | 'free' | 'done' = 'pinned';
    // Progress when the current pin began, the furthest progress so far, the last scroll position
    let base = 0;
    let furthest = 0;
    let lastY = window.scrollY;

    const setProgress = (value: number) => {
      furthest = value;
      element.style.setProperty('--p', String(value));
    };

    const moveBy = (shift: number) => {
      moveScrollBy(shift);
      lastY = window.scrollY;
    };

    const unpin = () => {
      const root = document.documentElement;
      const before = stage.getBoundingClientRect().top;
      // Our correction only – the browser's scroll anchoring would add its own
      root.style.overflowAnchor = 'none';
      element.dataset.released = '';
      moveBy(stage.getBoundingClientRect().top - before);
      /*
       * Chrome may keep painting the page's other scroll-driven animations (CenterStage) as they
       * were before this change, until the next scroll – a 1 px nudge there and back, one frame
       * each, makes it repaint them. Native, not through Lenis, so a glide is not stopped; too
       * small for the header and for this scene to count as a move
       */
      const nudge = (top: number) => window.scrollBy({ top, behavior: 'instant' });
      requestAnimationFrame(() => {
        root.style.removeProperty('overflow-anchor');
        nudge(1);
        requestAnimationFrame(() => nudge(-1));
      });
    };

    /*
     * Back at the pinned place: only the part still to play gets its scroll length. The scroll may
     * have passed the place by a few pixels – the page goes back by as much first, so the stage
     * does not snap down into its pin
     */
    const repin = (top: number) => {
      moveBy(top - pinnedAt);
      state = 'pinned';
      base = furthest;
      track.style.setProperty('--scene-length', `calc(${fullLength} * ${1 - base})`);
      delete element.dataset.released;
    };

    const finish = () => {
      state = 'done';
      setProgress(1);
      stopListening();
    };

    // A move up in a started scene: let the page go, the scene keeps its progress
    const moveUp = () => {
      if (state !== 'pinned' || furthest <= 0) return;
      state = 'free';
      unpin();
    };

    const update = () => {
      const y = window.scrollY;
      const up = !isSmoothScrolling() && lastY - y >= MIN_UP;
      lastY = y;
      if (state === 'pinned') {
        if (up) return moveUp();
        const length = track.offsetHeight - stage.offsetHeight;
        if (length <= 0) return;
        const progress =
          base + ((1 - base) * (pinnedAt - track.getBoundingClientRect().top)) / length;
        if (progress > furthest) setProgress(Math.min(progress, 1));
        if (furthest >= 1) {
          unpin();
          finish();
        }
        return;
      }
      // Free: wait until the stage comes back up to its pinned place
      const top = stage.getBoundingClientRect().top;
      if (top >= pinnedAt - 1) return;
      if (pinnedAt - top > window.innerHeight / 2) finish();
      else repin(top);
    };

    const onWheel = (event: WheelEvent) => {
      // Ctrl + wheel zooms
      if (event.deltaY < 0 && !event.ctrlKey) moveUp();
    };
    const onKey = (event: KeyboardEvent) => {
      if (isTyping(event.target)) return;
      if (UP_KEYS.has(event.key) || (event.key === ' ' && event.shiftKey)) moveUp();
    };

    function stopListening() {
      window.removeEventListener('scroll', update);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKey);
    return stopListening;
  }, []);

  return <div ref={ref} {...props} />;
}
