'use client';

import { useEffect } from 'react';
import { normalizePath } from '@/lib/path';
import { glideToElement } from './SmoothScroll';

/**
 * A link to a section of the page it is on – the menu's "Usługi", "Realizacje", "Kontakt",
 * "Bezpłatna wycena", the skip link – glides there instead of jumping (docs/decyzje.md D-97). From
 * another page it stays a jump (Next's router): the page changes anyway. Modified clicks (a new tab)
 * and links to another site are left alone. The address gets the section's #, and focus moves to it
 * as a jump would move it, so the keyboard goes on from there.
 */
function onClick(event: MouseEvent) {
  if (event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = (event.target as Element | null)?.closest?.('a[href*="#"]');
  if (!(link instanceof HTMLAnchorElement) || (link.target && link.target !== '_self')) return;
  const url = new URL(link.href);
  if (url.origin !== window.location.origin || !url.hash) return;
  if (normalizePath(url.pathname) !== normalizePath(window.location.pathname)) return;
  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  if (!target) return;

  // Next's Link leaves a prevented click alone; the link's own handler (closing the menu) still runs
  event.preventDefault();
  if (url.hash !== window.location.hash) window.history.pushState(null, '', url.hash);
  // After the mobile menu has closed: while it is open the page cannot scroll, and closing gives
  // focus back to its button – the section takes it from there
  requestAnimationFrame(() => {
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    void glideToElement(target);
  });
}

export function AnchorGlide() {
  useEffect(() => {
    // Capture: before React's own click handling on the document, so Next's Link sees it prevented
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);
  return null;
}
