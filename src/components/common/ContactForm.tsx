'use client';

import { useEffect, useId, useRef, useState, type FormEvent, type Ref } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { buttonClasses, textLinkClasses } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import { cn } from '@/lib/cn';
import { SITE, emailHref, phoneHref } from '@/config/site';
import { track } from '@/lib/analytics';

/*
 * Web3Forms (docs/decyzje.md D-85): a static page posts the form straight to the service, which
 * mails it to the inbox the key was made for. The key is public by design – it only names that
 * inbox – poldachpk@wp.pl, key in .env.production (D-98).
 */
const ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

/*
 * The fields' names are the labels in the e-mail Web3Forms sends – in Polish, for the one who reads
 * it (D-99). Web3Forms takes the reply-to address only from a field named "email", so the visitor's
 * address goes also as `replyto` (send, below)
 */
const FIELD = {
  name: 'Imię klienta',
  phone: 'Telefon klienta',
  email: 'Adres e-mail klienta',
  message: 'Wiadomość od klienta',
  // Hidden, last in the e-mail: which page the message came from, and when (set on sending)
  source: 'Wysłano ze strony',
  sentAt: 'Data wysłania',
} as const;

// "11 listopada 2026 14:32" – Polish time wherever the visitor is
const sentAtFormat = new Intl.DateTimeFormat('pl-PL', {
  dateStyle: 'long',
  timeStyle: 'short',
  timeZone: 'Europe/Warsaw',
});

const SUBJECT = 'Nowa wiadomość od klienta';

type Status = 'idle' | 'sending' | 'sent' | 'failed';

/*
 * One message per visit (anti-spam): once a message gets through, every form on the site shows the
 * thanks instead of the fields – also after moving to another page, as client-side navigation keeps
 * this module. Only reloading the page brings the form back. Never true while prerendering, so the
 * first render always matches the static HTML
 */
let sentThisVisit = false;

/*
 * What the browser lets through (D-131). `pattern` is matched against the whole value, with the
 * `v` flag – hence the escapes inside [ ].
 * - Phone: a Polish number – 9 digits, the first not 0 (no trunk 0 since 2005), +48 / 0048 in front
 *   if wanted; spaces, dashes and brackets anywhere between the digits: "503 005 234",
 *   "+48 503-005-234", "(58) 562 56 05". The operator's prefixes are not checked – they change
 * - E-mail: on top of type="email" (which takes "jan@wp") – a domain with a dot and a 2+ letter ending
 * - Name: only what names are made of (D-136) – letters of any alphabet (with accents as separate
 *   marks too), spaces, hyphens, apostrophes and dots, starting with a letter: "Jan Kowalski",
 *   "Anna Nowak-Kowalska", "D'Arcy", "Jan K."; no digits, "!", "@", "_" or commas
 */
const PATTERN = {
  phone: String.raw`\s*(?:(?:\+|00)\s*48)?[\s\-]*\(?[1-9](?:[\s\-\(\)]*\d){8}\s*`,
  email: String.raw`[^@\s]+@[^@\s]+\.[^@\s]{2,}`,
  name: String.raw`\s*\p{L}[\p{L}\p{M}\s'’.\-]*`,
};

type Field = HTMLInputElement | HTMLTextAreaElement;

// The browser's bubble in Polish whatever its language, saying how to put it right
const HINT: Record<string, { missing?: string; wrong?: string }> = {
  [FIELD.name]: {
    missing: 'Wpisz swoje imię',
    wrong: 'Wpisz imię samymi literami – bez cyfr i znaków specjalnych',
  },
  [FIELD.phone]: {
    missing: 'Wpisz numer telefonu – oddzwonimy',
    wrong: 'Wpisz polski numer: 9 cyfr, z +48 lub bez',
  },
  [FIELD.email]: { wrong: 'Sprawdź adres e-mail – powinien wyglądać jak nazwa@domena.pl' },
  [FIELD.message]: { missing: 'Napisz w kilku słowach, co jest do zrobienia' },
};

/** On a failed check: our message instead of the browser's */
function explain(event: FormEvent<Field>) {
  const field = event.currentTarget;
  const hint = HINT[field.name];
  const message = field.value.trim() === '' ? hint?.missing : hint?.wrong;
  if (message) field.setCustomValidity(message);
}

/** On typing: clear the message; spaces alone do not fill a required field (`required` takes them) */
function recheck(event: FormEvent<Field>) {
  const field = event.currentTarget;
  const blank = field.required && field.value !== '' && field.value.trim() === '';
  field.setCustomValidity(blank ? (HINT[field.name]?.missing ?? '') : '');
}

const check = { onInvalid: explain, onInput: recheck };

/*
 * The message's limit. At it the browser stops taking keys and cuts a longer paste without a word,
 * so a counter under the field shows how much is used, from the first key (D-133, D-134)
 */
const MESSAGE_MAX = 2000;

/** What a screen reader hears – only on crossing these steps, not on every key */
function lengthNotice(length: number) {
  const left = MESSAGE_MAX - length;
  if (left <= 0) return `Osiągnięto limit ${MESSAGE_MAX} znaków`;
  if (left <= 100) return 'Zostało mniej niż 100 znaków';
  if (left <= 500) return 'Zostało mniej niż 500 znaków';
  return '';
}

// White fields on the grey panel; the border keeps 4.5:1 on both (docs/design-system.md#kontrast)
const fieldClass =
  'mt-2 block w-full rounded-box border border-pd-navy-900/70 bg-pd-white px-4 py-3 text-body text-pd-navy-900';
const labelClass = 'font-bold';
const inlineLink = textLinkClasses();

type ContactFormProps = {
  /** The page the form is on – the e-mail's last line, e.g. "Sprzedaż" */
  source: string;
};

/**
 * The short form (docs/standardy.md#konwersja): name, phone and the job; the e-mail is optional, a
 * hidden field catches bots. The browser checks the fields itself (PATTERN) and names the wrong one,
 * in our words (HINT). With
 * JavaScript the form is sent in the background and, once sent, gives way to a thank-you note until
 * the page is reloaded (sentThisVisit); without it, the browser posts it and the service shows its
 * own confirmation page.
 */
export function ContactForm({ source }: ContactFormProps) {
  const id = useId();
  const [status, setStatus] = useState<Status>(() => (sentThisVisit ? 'sent' : 'idle'));
  // Focus goes to the note only right after sending – the button that had it is gone
  const justSent = useRef(false);
  const noteRef = useRef<HTMLDivElement>(null);
  const [messageLength, setMessageLength] = useState(0);

  useEffect(() => {
    if (status !== 'sent' || !justSent.current) return;
    justSent.current = false;
    noteRef.current?.focus();
  }, [status]);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    // No key in this build: nothing to send to – the visitor gets the phone and the e-mail at once
    if (!ACCESS_KEY) return setStatus('failed');
    setStatus('sending');
    // Empty fields are left out – the e-mail shows only what the visitor wrote
    const data = Object.fromEntries(
      [...new FormData(form)].filter(([, value]) => String(value).trim() !== ''),
    );
    const email = data[FIELD.email];
    if (email) data.replyto = email;
    data[FIELD.sentAt] = sentAtFormat.format(new Date());
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { success?: boolean };
      if (!result.success) throw new Error('Not sent');
      sentThisVisit = true;
      justSent.current = true;
      setStatus('sent');
      // Only a message that reached the inbox counts (D-96)
      track('generate_lead', { form_source: source });
    } catch {
      setStatus('failed');
    }
  }

  if (status === 'sent') return <SentNote ref={noteRef} />;

  return (
    <form
      action={ACCESS_KEY ? ENDPOINT : undefined}
      method="post"
      onSubmit={send}
      className="space-y-5"
    >
      <input type="hidden" name="access_key" value={ACCESS_KEY ?? ''} />
      <input type="hidden" name="subject" value={SUBJECT} />
      <input type="hidden" name="from_name" value="poldach.eu" />
      {/* Bots tick every box – a ticked one makes the service drop the message */}
      <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" className="hidden" />

      <fieldset disabled={status === 'sending'} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-name`} className={labelClass}>
              Imię
            </label>
            <input
              id={`${id}-name`}
              name={FIELD.name}
              autoComplete="name"
              required
              pattern={PATTERN.name}
              maxLength={80}
              className={fieldClass}
              {...check}
            />
          </div>
          <div>
            <label htmlFor={`${id}-phone`} className={labelClass}>
              Telefon
            </label>
            <input
              id={`${id}-phone`}
              name={FIELD.phone}
              type="tel"
              autoComplete="tel"
              required
              pattern={PATTERN.phone}
              maxLength={20}
              className={fieldClass}
              {...check}
            />
          </div>
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={labelClass}>
            E-mail <span className="font-normal">(nieobowiązkowo)</span>
          </label>
          <input
            id={`${id}-email`}
            name={FIELD.email}
            type="email"
            autoComplete="email"
            pattern={PATTERN.email}
            maxLength={120}
            className={fieldClass}
            {...check}
          />
        </div>
        <div>
          <label htmlFor={`${id}-message`} className={labelClass}>
            Co jest do zrobienia?
          </label>
          <textarea
            id={`${id}-message`}
            name={FIELD.message}
            required
            rows={5}
            maxLength={MESSAGE_MAX}
            className={fieldClass}
            // A long message scrolls inside the field – smooth scrolling (SmoothScroll) stays out of it
            data-lenis-prevent
            onInvalid={explain}
            onInput={(event) => {
              recheck(event);
              setMessageLength(event.currentTarget.value.length);
            }}
          />
          <p
            aria-hidden="true"
            className={cn(
              'mt-1 text-right text-small',
              messageLength >= MESSAGE_MAX && 'font-bold',
            )}
          >
            {messageLength} / {MESSAGE_MAX}
          </p>
          <p aria-live="polite" className="sr-only">
            {lengthNotice(messageLength)}
          </p>
        </div>

        <p className="text-small">
          Dane z formularza wykorzystamy tylko po to, żeby odpowiedzieć na zapytanie. Więcej –{' '}
          <Link href={ROUTES.privacy} className={inlineLink}>
            polityka prywatności
          </Link>
          .
        </p>

        <button type="submit" className={buttonClasses('w-full disabled:opacity-60 sm:w-auto')}>
          {status === 'sending' ? 'Wysyłanie…' : 'Wyślij zapytanie'}
        </button>
      </fieldset>
      {/* After the visible fields, so it is the last line of the e-mail */}
      <input type="hidden" name={FIELD.source} value={`${SITE.name} – ${source}`} />

      <p role="status" className="font-bold empty:hidden">
        <StatusText status={status} />
      </p>
    </form>
  );
}

const phoneLink = (
  <a href={phoneHref} className={inlineLink}>
    {SITE.contact.phone}
  </a>
);

/**
 * In place of the form once the message is sent. Focused right after sending, so a screen reader
 * reads it out; the ✓ circle as in CheckList
 */
function SentNote({ ref }: { ref: Ref<HTMLDivElement> }) {
  return (
    <div ref={ref} tabIndex={-1} className="flex items-start gap-4 outline-none">
      <span
        aria-hidden="true"
        className="grid size-12 shrink-0 place-items-center rounded-full bg-(--icon-ok-bg) text-(--icon-ok-fg)"
      >
        <Check className="size-7" strokeWidth={3} />
      </span>
      <div>
        <p className="text-h3 text-(--title)">Dziękujemy za wiadomość</p>
        <p className="mt-2">
          Dotarła do nas – odpowiemy telefonicznie lub e-mailem. W pilnej sprawie zadzwoń:{' '}
          {phoneLink}.
        </p>
      </div>
    </div>
  );
}

/** What the status line says – read out by screen readers when it changes */
function StatusText({ status }: { status: Status }) {
  if (status === 'failed')
    return (
      <>
        Nie udało się wysłać wiadomości. Zadzwoń: {phoneLink} albo napisz:{' '}
        <a href={emailHref} className={inlineLink}>
          {SITE.contact.email}
        </a>
      </>
    );
  return null;
}
