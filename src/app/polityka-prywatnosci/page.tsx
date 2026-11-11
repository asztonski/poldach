import type { ReactNode } from 'react';
import { Section, textLinkClasses } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import { SITE, addressLine, emailHref, phoneHref } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Polityka prywatności',
  description: `Jakie dane zbiera strona ${SITE.name}, w jakim celu i jakie prawa przysługują osobom, których dotyczą.`,
  path: ROUTES.privacy,
});

const link = textLinkClasses('font-bold');

function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-h3 text-(--title)">{title}</h2>
      {children}
    </section>
  );
}

/**
 * Privacy policy (docs/standardy.md#prywatność, D-84): what the site itself does – the form
 * (D-85), Google Analytics and the map with consent (D-93, D-94), no cookies of its own. A
 * document, not a pitch: no opening, the text on a plain white sheet over the grid (D-92).
 * TODO(P-24): a draft – to be checked by the client or a lawyer before publishing
 */
export default function PrivacyPage() {
  return (
    <Section theme="white" aria-labelledby="privacy-title">
      {/* Centred sheet with a thin frame, like the footer's title block (D-92) */}
      <article className="mx-auto max-w-3xl space-y-12 rounded-box border border-pd-navy-900/20 bg-pd-white p-6 sm:p-10">
        <header>
          <h1 id="privacy-title" className="text-h1 text-(--title)">
            Polityka prywatności
          </h1>
          <p className="mt-4 text-lead">Jakie dane zbiera ta strona, po co i jakie masz prawa.</p>
        </header>
        <Part title="Administrator danych">
          <p>
            {SITE.legalName}, {addressLine}, NIP {SITE.nip}, REGON {SITE.regon}.
          </p>
          <p>
            W sprawach danych osobowych:{' '}
            <a href={emailHref} className={link}>
              {SITE.contact.email}
            </a>{' '}
            lub tel.{' '}
            <a href={phoneHref} className={link}>
              {SITE.contact.phone}
            </a>
            .
          </p>
        </Part>

        <Part title="Formularz kontaktowy">
          <p>
            Wysyłając formularz, podajesz imię, numer telefonu, treść wiadomości i – jeśli chcesz –
            adres e-mail. Wykorzystujemy je tylko po to, żeby odpowiedzieć na zapytanie i
            przygotować wycenę.
          </p>
          <p>
            Podstawa: działania na Twoje żądanie przed zawarciem umowy (art. 6 ust. 1 lit. b RODO)
            oraz nasz prawnie uzasadniony interes – odpowiedź na wiadomość (art. 6 ust. 1 lit. f
            RODO). Podanie danych jest dobrowolne, ale bez nich nie odpowiemy.
          </p>
          <p>
            Wiadomość przekazuje na naszą skrzynkę e-mail usługa Web3Forms. Dane przechowujemy do
            zakończenia sprawy, a jeśli zawrzemy umowę – tak długo, jak wymagają tego przepisy.
          </p>
        </Part>

        <Part title="Statystyki odwiedzin – Google Analytics">
          <p>
            Jeśli się zgodzisz, korzystamy z Google Analytics – usługi Google Ireland Limited
            (Gordon House, Barrow Street, Dublin 4, Irlandia). Dzięki niej wiemy, ile osób odwiedza
            stronę, skąd trafiają i które podstrony czytają. Google zbiera przy tym dane o Twojej
            przeglądarce i urządzeniu, odwiedzanych podstronach i przybliżonej lokalizacji oraz
            zapisuje pliki cookie (_ga, _ga_…). Nie łączymy tych danych z danymi z formularza.
          </p>
          <p>
            Podstawa: Twoja zgoda (art. 6 ust. 1 lit. a RODO) – bez niej Google Analytics się nie
            wczytuje. Dane mogą trafiać do Google LLC w USA; Google uczestniczy w
            unijno-amerykańskich ramach ochrony danych (EU-US Data Privacy Framework). Google
            przechowuje je przez czas ustawiony na naszym koncie Google Analytics.
            {/* TODO(P-26): the retention set in the GA property (2 or 14 months) */}
          </p>
        </Part>

        <Part title="Mapa Google">
          <p>
            W sekcji kontaktu pokazujemy mapę Google z dojazdem do salonu – po Twojej zgodzie w
            okienku o plikach cookie albo, jednorazowo, po kliknięciu „Pokaż mapę”. Gdy mapa się
            wczytuje, Twoja przeglądarka łączy się z Google, a Google może zbierać dane o niej i
            zapisywać pliki cookie.
          </p>
          <p>
            Zasady Google:{' '}
            <a
              href="https://policies.google.com/privacy?hl=pl"
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              polityka prywatności Google
              <span className="sr-only"> (nowa karta)</span>
            </a>
            .
          </p>
        </Part>

        <Part title="Pliki cookie i Twój wybór">
          <p>
            Sama strona nie zapisuje plików cookie. Zapisują je tylko Google Analytics i mapa Google
            – i tylko po Twojej zgodzie. Twój wybór strona zapamiętuje w pamięci Twojej
            przeglądarki, żeby nie pytać przy każdej wizycie.
          </p>
          <p>
            Zdanie możesz zmienić w każdej chwili: „Ustawienia plików cookie” na dole każdej strony.
            Po wycofaniu zgody statystyki od razu się wyłączają, a pliki cookie Google Analytics
            usuwamy; mapa nie wczyta się ponownie. Pozostałe pliki cookie Google usuniesz w
            ustawieniach przeglądarki.
          </p>
        </Part>

        <Part title="Twoje prawa">
          <p>
            Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia
            przetwarzania i przeniesienia, a także prawo sprzeciwu. Możesz też złożyć skargę do
            Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).
          </p>
        </Part>
      </article>
    </Section>
  );
}
