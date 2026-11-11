'use client';

import Link from 'next/link';
import { Panel, buttonClasses, outlineButtonClasses, textLinkClasses } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import { setConsent, useConsent } from '@/lib/consent';

/**
 * Asks once about Google's cookies – the only ones the site lets in, with the statistics and the
 * map (docs/decyzje.md D-93, D-94). Not a wall: the page works behind it, and both answers weigh
 * the same. Over the bottom of the screen, on phones above the call bar; it does not move focus to
 * itself.
 */
export function CookieBanner() {
  const consent = useConsent();
  // Answered, or not known yet (static HTML) – nothing to ask
  if (consent !== null) return null;

  return (
    <section
      aria-labelledby="cookie-title"
      className="fixed inset-x-0 bottom-[calc(var(--call-bar-h)+env(safe-area-inset-bottom)+0.75rem)] z-50 px-3 lg:bottom-6 lg:px-6"
    >
      <Panel
        theme="blue"
        className="mx-auto flex max-w-3xl flex-col gap-4 p-5 sm:p-6 md:flex-row md:items-center md:gap-6"
      >
        <div className="text-small sm:text-body">
          <h2 id="cookie-title" className="font-bold">
            Pliki cookie
          </h2>
          <p className="mt-1">
            Za Twoją zgodą włączymy statystyki odwiedzin Google Analytics i mapę Google w sekcji
            kontaktu – obie zapisują pliki cookie Google.{' '}
            <Link href={ROUTES.privacy} className={textLinkClasses()}>
              Polityka prywatności
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => setConsent('rejected')}
            className={outlineButtonClasses('min-h-11 flex-1 px-5 text-lg whitespace-nowrap')}
          >
            Odrzucam
          </button>
          <button
            type="button"
            onClick={() => setConsent('accepted')}
            className={buttonClasses('min-h-11 flex-1 px-5 text-lg whitespace-nowrap')}
          >
            Zgadzam się
          </button>
        </div>
      </Panel>
    </section>
  );
}
