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

  return (
    <div className={className}>
      <Panel theme="grey" className="relative aspect-4/3">
        {consent === 'accepted' || shownOnce ? (
          <iframe
            src={mapsEmbedSrc}
            title={`Mapa: ${SITE.name}, ${addressLine}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
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
