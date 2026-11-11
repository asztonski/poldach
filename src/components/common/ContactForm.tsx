'use client';

import { useId, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { buttonClasses, textLinkClasses } from '@/components/ui';
import { ROUTES } from '@/config/routes';
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
 * hidden field catches bots. The browser checks the fields itself and names the wrong one. With
 * JavaScript the form is sent in the background and answers in place; without it, the browser
 * posts it and the service shows its own confirmation page.
 */
export function ContactForm({ source }: ContactFormProps) {
  const id = useId();
  const [status, setStatus] = useState<Status>('idle');

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
      form.reset();
      setStatus('sent');
      // Only a message that reached the inbox counts (D-96)
      track('generate_lead', { form_source: source });
    } catch {
      setStatus('failed');
    }
  }

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
              maxLength={80}
              className={fieldClass}
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
              minLength={9}
              maxLength={20}
              className={fieldClass}
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
            maxLength={120}
            className={fieldClass}
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
            maxLength={2000}
            className={fieldClass}
          />
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

/** What the status line says – read out by screen readers when it changes */
function StatusText({ status }: { status: Status }) {
  const phone = (
    <a href={phoneHref} className={inlineLink}>
      {SITE.contact.phone}
    </a>
  );

  if (status === 'sent')
    return 'Dziękujemy – wiadomość dotarła. Odpowiemy telefonicznie lub e-mailem.';
  if (status === 'failed')
    return (
      <>
        Nie udało się wysłać wiadomości. Zadzwoń: {phone} albo napisz:{' '}
        <a href={emailHref} className={inlineLink}>
          {SITE.contact.email}
        </a>
      </>
    );
  return null;
}
