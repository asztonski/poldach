'use client';

import { useEffect } from 'react';
import type Lenis from 'lenis';

// The feel of metriccivil.ca (docs/decyzje.md D-35): the page glides to where the wheel sent it
const OPTIONS = { autoRaf: true, lerp: 0.1, wheelMultiplier: 0.65 };

// Mouse and touchpad only: a finger already scrolls smoothly
const WANTED = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

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
      if (!unmounted) lenis = new Lenis(OPTIONS);
    });

    return () => {
      unmounted = true;
      lenis?.destroy();
    };
  }, []);

  return null;
}
