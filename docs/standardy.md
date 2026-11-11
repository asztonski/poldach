# Standardy jakości

Wymagania, które musi spełnić każda strona przed publikacją. Jak je realizujemy w kodzie –
[architektura.md](architektura.md).

## Wydajność

- **Core Web Vitals** (75% wizyt): LCP < 2,5 s, INP < 200 ms, CLS < 0,1.
- **Lighthouse, profil mobilny:** Performance ≥ 90, Accessibility ≥ 95.
- **JavaScript:** First Load JS strony głównej < 150 kB gzip.
- Testujemy na średnim telefonie z Androidem i spowolnionym internecie, nie tylko na komputerze.
- Bez ekranu ładowania. Fonty hostowane lokalnie. Obrazy w AVIF lub WebP, poniżej linii zgięcia
  ładowane leniwie.

## Dostępność

Cel: **WCAG 2.2 AA**. Firma jako mikroprzedsiębiorca jest najpewniej zwolniona z ustawy o dostępności
(nie jest to porada prawna), ale standard spełniamy i tak – klienci instytucjonalni go sprawdzają.

- Kontrast wyłącznie według [design-system.md](design-system.md#kontrast).
- **Cała treść czytelna i działająca bez JavaScriptu i bez animacji.** HTML zawiera stan końcowy
  (rysunek gotowy, tekst widoczny); animacja to dodatek.
- **`prefers-reduced-motion: reduce`:** rysunki od razu w stanie końcowym, bez rysowania linii, bez
  przypinania sekcji.
- Interaktywne rysunki obsługiwane klawiaturą, a każda usługa dostępna też jako zwykły link pod
  rysunkiem.
- Widoczny fokus. Cele dotykowe co najmniej 44 × 44 px.
- Ilustracje informacyjne mają tytuł lub opis dla czytników ekranu, dekoracyjne są ukryte
  (`aria-hidden`).
- `lang="pl"`, polskie znaki wszędzie. Powiększanie strony nie jest blokowane.
- Formularz działa z klawiatury i z czytnikiem ekranu; komunikaty błędów powiązane z polami.

## SEO

Dotyczy Google i wyszukiwarek AI.

- Każda strona ma unikalny tytuł, opis, adres kanoniczny i obraz Open Graph.
- Dane strukturalne JSON-LD: `Organization` + `RoofingContractor` na każdej stronie, `Service` na
  podstronach usług. `Review` / `AggregateRating` tylko dla opinii faktycznie pokazanych na stronie.
- **Dane firmy (nazwa, adres, telefon, godziny) identyczne** na stronie, w JSON-LD i w Wizytówce Google.
- Sekcje pytań i odpowiedzi piszemy dla ludzi (Google nie pokazuje już rozszerzonych wyników FAQ, ale
  treść pomaga wyszukiwarkom AI).
- Mapa witryny i `robots.txt` generowane automatycznie; przekierowania 301 ze starych adresów
  ([mapa-strony.md](mapa-strony.md#przekierowania-301-ze-starej-strony)).

## Prywatność

- Analityka: Google Analytics 4 – tylko po zgodzie w banerze cookies, wyłączona w trybie deweloperskim; po wycofaniu zgody od razu się wyłącza i usuwa swoje pliki cookie ([decyzje.md](decyzje.md) D-94).
- Zasoby innych, które zapisują pliki cookie (Google Analytics i mapa Google), wczytujemy wyłącznie po zgodzie: baner z równorzędnymi „Odrzucam” i „Zgadzam się”, zmiana zdania – „Ustawienia plików cookie” w stopce; bez zgody strona nie łączy się z Google ([decyzje.md](decyzje.md) D-93).
- Żadnych zasobów z zewnętrznych CDN (fonty, skrypty) poza wybranymi usługami formularza i analityki.
- Formularz z krótką klauzulą RODO i linkiem do polityki prywatności.

## Konwersja

- Telefon klikalny na każdym ekranie (na telefonie przyklejony pasek u dołu).
- Zaufanie widoczne od razu: od 1992, PSD, ocena i liczba opinii Google, prawdziwe zdjęcia.
- Osobne ścieżki: klient indywidualny oraz firma, zarządca, deweloper.
- Realizacje maksymalnie dwa kliknięcia od strony głównej, każda z opisem.
- Formularz: maksymalnie 4–5 pól (imię, telefon, krótki opis, opcjonalnie e-mail i zdjęcie dachu,
  zgoda) + pole-pułapka przeciw spamowi.
- Obietnica czasu reakcji, ceny „od” i nazwana gwarancja – po ustaleniu z klientem (⚠ P-11, P-12,
  P-13).

## Przed publikacją

- [ ] `npm run check` i `npm run build` przechodzą, eksport w `out/` bez ostrzeżeń.
- [ ] Testy automatyczne dostępności: 0 naruszeń poziomu serious i critical.
- [ ] Progi Lighthouse i rozmiaru JS z sekcji [Wydajność](#wydajność) spełnione.
- [ ] Strona sprawdzona myszą, palcem, klawiaturą, z reduced motion i z wyłączonym JS.
- [ ] Żadnych danych oznaczonych ⚠ ani `TODO` na publikowanych stronach.
- [ ] Strony testowe (np. `/playground`) usunięte albo oznaczone `noindex`.
