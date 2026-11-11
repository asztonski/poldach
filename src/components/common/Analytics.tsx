'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { trackContactClick } from '@/lib/analytics';
import { useConsent } from '@/lib/consent';

/*
 * Google Analytics 4 (docs/decyzje.md D-94, D-95) – its life on the page: switched on with consent,
 * off when it is withdrawn. The measurement ID comes from the build – .env.production; without it
 * nothing loads. Only in a production build. GA counts the moves between pages itself (history
 * changes, on by default in the property's enhanced measurement); the site's own events –
 * lib/analytics.ts (D-96).
 */
const GA_ID = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_GA_ID : undefined;

/** Removes GA's cookies (_ga, _ga_…) – set on the site's domain and on its parent */
function removeGaCookies() {
  const host = window.location.hostname;
  const domains = ['', host, `.${host.replace(/^www\./, '')}`];
  for (const cookie of document.cookie.split('; ')) {
    const name = cookie.split('=')[0];
    if (!name.startsWith('_ga')) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
    }
  }
}

// The page's GA set up once – a consent given again after a withdrawal does not count the page twice
let configured = false;

/**
 * GA's queue and `gtag`, at the moment of consent: events from then on wait in `dataLayer` until
 * gtag.js has loaded and sends them – none is lost to a click right after "Zgadzam się".
 */
function startGtag(id: string) {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    // gtag.js reads the `arguments` object itself, not an array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  if (configured) return;
  configured = true;
  window.gtag('js', new Date());
  window.gtag('config', id);
}

export function Analytics() {
  const consent = useConsent();
  const allowed = consent === 'accepted';

  useEffect(() => {
    // Not known yet (static HTML) – nothing to switch on or off
    if (!GA_ID || consent === 'pending') return;
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = !allowed;
    if (allowed) {
      startGtag(GA_ID);
      return;
    }
    // Withdrawn after GA loaded on this page: it stops at once, the site's events too, its cookies go
    delete window.gtag;
    removeGaCookies();
  }, [consent, allowed]);

  useEffect(() => {
    if (!GA_ID || !allowed) return;
    // Capture: the click is counted before a link's own handler (Next's router) moves on
    document.addEventListener('click', trackContactClick, { capture: true });
    return () => document.removeEventListener('click', trackContactClick, { capture: true });
  }, [allowed]);

  if (!GA_ID || !allowed) return null;

  // The queue is set up by startGtag – this only brings the library that empties it
  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      strategy="afterInteractive"
    />
  );
}
