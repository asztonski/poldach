'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Panel, buttonClasses, quietLinkClasses } from '@/components/ui';
import { SITE, addressLine, mapsEmbedSrc, mapsHref } from '@/config/site';
import { useConsent } from '@/lib/consent';

/**
 * The shop on the map (docs/decyzje.md D-86, D-93, D-94). Google's map sets its own cookies, so it
 * loads only with consent – then at once, lazily as it comes near the screen. Without it, a card
 * with the address; "Pokaż mapę" loads it here only – it is not a consent to the statistics. The
 * link to Google Maps works always, also without JavaScript.
 */
export function MapCard({ className }: { className?: string }) {
  const consent = useConsent();
  const [shownOnce, setShownOnce] = useState(false);
  // The map takes the mouse (drag, Ctrl + wheel) – after a click on it, until the pointer leaves
  const [active, setActive] = useState(false);

  return (
    <div className={className}>
      <Panel theme="grey" className="relative aspect-4/3">
        {consent === 'accepted' || shownOnce ? (
          <div className="group absolute inset-0" onMouseLeave={() => setActive(false)}>
            <iframe
              src={mapsEmbedSrc}
              title={`Mapa: ${SITE.name}, ${addressLine}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="size-full border-0"
            />
            {/*
             * The wheel over the map goes to Google's frame, where smooth scrolling (SmoothScroll)
             * does not hear it: Google does not zoom without Ctrl and the browser scrolls the page
             * itself, in jumps, against Lenis. This layer keeps the wheel on the page – only where
             * Lenis runs (a mouse, motion allowed). A click takes it off for moving the map; it comes
             * back when the pointer leaves. Mouse only: the keyboard tabs into the map as before
             */}
            {!active && (
              <div
                aria-hidden="true"
                onClick={() => setActive(true)}
                className="absolute inset-0 hidden cursor-pointer pointer-fine:motion-safe:block"
              >
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-pd-navy-900 px-3 py-1 text-small whitespace-nowrap text-pd-white opacity-0 transition-opacity group-hover:opacity-100">
                  Kliknij, żeby poruszać mapą
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <MapPin aria-hidden="true" className="size-10 text-(--title)" strokeWidth={2.25} />
            <p className="font-bold">{addressLine}</p>
            {/* Not known yet in the static HTML – the button needs JavaScript anyway */}
            {consent !== 'pending' ? (
              <>
                <button
                  type="button"
                  onClick={() => setShownOnce(true)}
                  className={buttonClasses('min-h-11 px-5 text-lg')}
                >
                  Pokaż mapę
                </button>
                <p className="max-w-xs text-small">
                  Mapa Google zapisuje własne pliki cookie – wczytamy ją dopiero po kliknięciu.
                </p>
              </>
            ) : null}
          </div>
        )}
      </Panel>
      <a
        href={mapsHref}
        target="_blank"
        rel="noopener noreferrer"
        className={quietLinkClasses('mt-3 inline-flex min-h-11 items-center font-bold')}
      >
        Otwórz w Mapach Google
        <span className="sr-only"> (nowa karta)</span>
      </a>
    </div>
  );
}
