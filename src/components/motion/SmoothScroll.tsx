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

/**
 * Sent when a link takes the page to a section (glideToElement), with where the glide ends and how
 * long it takes: the header stays, in its place above the section, until the visitor moves on –
 * hidden, it would leave that place showing the section before (useHeaderScroll, D-100).
 */
export const REVEAL_HEADER_EVENT = 'poldach:reveal-header';

export type RevealHeaderDetail = { top: number; ms: number };

/**
 * Sent before a glide to a section (glideToElement), with the target as `detail`: a scene that
 * would stop the glide on its way – the one-way "O nas" – gets out of it first (OneWayScene).
 */
export const GLIDE_TARGET_EVENT = 'poldach:glide-target';

let instance: Lenis | undefined;

/*
 * Lenis clamps every target to the page's height as it last measured it, and it measures late (on a
 * resize of the content) – right after going to another page it still knows the old one's. The
 * page's own moves measure it first, so they are not cut short (a menu link from a shorter page).
 */
function fresh(lenis: Lenis) {
  lenis.resize();
  return lenis;
}

/** True while the wheel is smoothed – the scroll position then also moves in sub-pixel steps back. */
export const isSmoothScrolling = () => Boolean(instance);

/**
 * Moves the scroll position by `shift` px at once, as the page's own correction, not a move of the
 * user (OneWayScene): Lenis takes the new position over too, so its glide does not pull the page
 * back, and listeners (the header) hear SCROLL_JUMP_EVENT once the position is there.
 */
export function moveScrollBy(shift: number) {
  if (!shift) return;
  if (instance) fresh(instance).scrollTo(window.scrollY + shift, { immediate: true, force: true });
  else window.scrollBy({ top: shift, behavior: 'instant' });
  window.dispatchEvent(new Event(SCROLL_JUMP_EVENT));
}

/**
 * Glides the page to `top` in `duration` seconds – through Lenis when it runs, so the glide feels the
 * same (SceneAnchor, ThumbnailJump)
 */
export function glideTo(top: number, duration = 0.6) {
  window.dispatchEvent(new Event(GLIDE_EVENT));
  if (instance) fresh(instance).scrollTo(top, { duration });
  else window.scrollTo({ top, behavior: 'smooth' });
}

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));

/**
 * Glides to a section, its top under the header's place (scroll-padding-top) – the links to the
 * home page's sections (AnchorGlide, docs/decyzje.md D-97). The time grows with the distance, 0.6
 * to 1.6 s; with reduced motion – a jump.
 */
export async function glideToElement(target: Element) {
  window.dispatchEvent(new CustomEvent(GLIDE_TARGET_EVENT, { detail: target }));
  // A scene let go nudges the page for two frames (OneWayScene) – that would stop a native glide
  await nextFrame();
  await nextFrame();
  const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  const jump = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = jump ? 0 : Math.min(1.6, Math.max(0.6, Math.abs(top - window.scrollY) / 5000));
  const detail: RevealHeaderDetail = { top, ms: duration * 1000 };
  window.dispatchEvent(new CustomEvent(REVEAL_HEADER_EVENT, { detail }));
  if (jump) window.scrollTo({ top, behavior: 'instant' });
  else glideTo(top, duration);
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
