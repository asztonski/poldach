import { useSyncExternalStore } from 'react';

/*
 * The visitor's choice about cookies of others – Google Analytics and Google's map (docs/decyzje.md
 * D-93, D-94), one choice for both. Kept in the browser's storage, not in a cookie; the banner, the
 * map, GA and the footer's "Ustawienia plików cookie" read and change it here.
 */

export type Consent = 'accepted' | 'rejected';

const KEY = 'poldach-cookies';
const EVENT = 'poldach:consent';

// Where storage is blocked (private mode, settings) the choice lasts until the page is left
let memory: Consent | null = null;

function read(): Consent | null {
  try {
    const value = window.localStorage.getItem(KEY);
    return value === 'accepted' || value === 'rejected' ? value : memory;
  } catch {
    return memory;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  // The same choice made in another tab
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

/** Saves the choice; `null` forgets it, so the banner asks again. */
export function setConsent(value: Consent | null) {
  memory = value;
  try {
    if (value) window.localStorage.setItem(KEY, value);
    else window.localStorage.removeItem(KEY);
  } catch {
    // Not saved – `memory` holds it
  }
  window.dispatchEvent(new Event(EVENT));
}

/**
 * The choice: 'accepted', 'rejected', null – not made yet; 'pending' in the static HTML and while
 * it hydrates, when it cannot be known yet (nothing of others loads, no banner flashes).
 */
export function useConsent(): Consent | null | 'pending' {
  return useSyncExternalStore(subscribe, read, () => 'pending');
}
