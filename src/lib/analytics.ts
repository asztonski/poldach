import { SECTION_IDS } from '@/config/routes';

/*
 * The site's own GA4 events (docs/decyzje.md D-96) – the one list of their names. GA's enhanced
 * measurement adds page views, scrolls and outbound clicks by itself. Sent only with consent:
 * Analytics.tsx defines `gtag` when it is given and removes it when it is withdrawn; without it a
 * call does nothing.
 */

export type AnalyticsEvent =
  /** The contact form sent successfully – the site's main goal (a key event in GA) */
  | 'generate_lead'
  /** A phone number clicked (`tel:`) – a key event */
  | 'click_phone'
  /** The e-mail address clicked (`mailto:`) – a key event */
  | 'click_email'
  /** A link to the contact form: "Bezpłatna wycena", "zapytaj o wycenę", "Kontakt" */
  | 'click_quote'
  /** The campaign video: sound on, full screen, watched to the end (once per page) */
  | 'video_unmute'
  | 'video_fullscreen'
  | 'video_complete';

type Params = Record<string, string | number>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, params: Params = {}) {
  window.gtag?.('event', event, params);
}

/**
 * Where on the page a click was: the nearest `data-analytics-area` (header, hero, call_bar,
 * footer…), else the id of the section, else "page".
 */
function areaOf(element: Element) {
  const area = element.closest<HTMLElement>('[data-analytics-area]')?.dataset.analyticsArea;
  return area ?? (element.closest('section[id]')?.id || 'page');
}

/**
 * The contact clicks, for one listener on the whole document (Analytics.tsx): every phone number,
 * e-mail address and link to the contact form, wherever it is – with the place it was clicked in.
 */
export function trackContactClick(event: MouseEvent) {
  const link = (event.target as Element | null)?.closest?.('a[href]');
  if (!link) return;
  const href = link.getAttribute('href') ?? '';
  const where = { link_location: areaOf(link) };
  if (href.startsWith('tel:')) track('click_phone', where);
  else if (href.startsWith('mailto:')) track('click_email', where);
  else if (href.endsWith(`#${SECTION_IDS.contact}`))
    track('click_quote', { ...where, link_text: link.textContent?.trim().slice(0, 100) ?? '' });
}
