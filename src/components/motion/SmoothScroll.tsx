'use client';

import { useEffect } from 'react';
import type Lenis from 'lenis';

// The feel of metriccivil.ca (docs/decyzje.md D-35): the page glides to where the wheel sent it.
// Wheel: 0.65 × 1.75 – the owner asked for a more sensitive scroll (D-55)
const OPTIONS = { autoRaf: true, lerp: 0.1, wheelMultiplier: 0.65 * 1.75 };

// Mouse and touchpad only: a finger already scrolls smoothly
const WANTED = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

/** Sent right after the page has moved its own scroll position (moveScrollBy) – not a user's move. */
export const SCROLL_JUMP_EVENT = 'poldach:scroll-jump';

/** Sent when the page starts a glide of its own (glideTo) – the moves until it stops are not the user's. */
export const GLIDE_EVENT = 'poldach:glide';

let instance: Lenis | undefined;

/** True while the wheel is smoothed – the scroll position then also moves in sub-pixel steps back. */
export const isSmoothScrolling = () => Boolean(instance);

/**
 * Moves the scroll position by `shift` px at once, as the page's own correction, not a move of the
 * user (OneWayScene): Lenis takes the new position over too, so its glide does not pull the page
 * back, and listeners (the header) hear SCROLL_JUMP_EVENT once the position is there.
 */
export function moveScrollBy(shift: number) {
  if (!shift) return;
  if (instance) instance.scrollTo(window.scrollY + shift, { immediate: true, force: true });
  else window.scrollBy({ top: shift, behavior: 'instant' });
  window.dispatchEvent(new Event(SCROLL_JUMP_EVENT));
}

/**
 * Glides the page to `top` in `duration` seconds – through Lenis when it runs, so the glide feels the
 * same (SceneAnchor, ThumbnailJump)
 */
export function glideTo(top: number, duration = 0.6) {
  window.dispatchEvent(new Event(GLIDE_EVENT));
  if (instance) instance.scrollTo(top, { duration });
  else window.scrollTo({ top, behavior: 'smooth' });
}

/**
 * Smooth wheel scrolling (Lenis). It still moves the real scroll position, so sticky elements and
 * scroll-driven animations follow it as usual. Without JS or support – ordinary scrolling.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia(WANTED).matches) return;

    let lenis: Lenis | undefined;
    let unmounted = false;
    // Imported here – it runs only after the page has loaded, and only where it is wanted
    void import('lenis').then(({ default: Lenis }) => {
      if (!unmounted) instance = lenis = new Lenis(OPTIONS);
    });

    return () => {
      unmounted = true;
      lenis?.destroy();
      instance = undefined;
    };
  }, []);

  return null;
}
