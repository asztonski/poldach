'use client';

import { setConsent } from '@/lib/consent';

/** Forgets the cookie choice, so the banner asks again (docs/decyzje.md D-93). */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => setConsent(null)} className={className}>
      Ustawienia plików cookie
    </button>
  );
}
