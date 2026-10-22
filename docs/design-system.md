# Design system

Jak strona wygląda i się porusza. Wymagania dostępności, które ten system realizuje, są w
[standardy.md](standardy.md#dostępność).

## Zasada nadrzędna

- Strona przejmuje **styl graficzny reklamy wideo** (dwa kolory marki, siatka rysunku technicznego,
  płaskie ilustracje), ale nie jej przekaz ([decyzje.md](decyzje.md), D-02).
- **Strona i reklama to jedna marka.** Tokeny (barwy, krój, siatka) muszą być identyczne z projektem
  reklamy w Remotion (`src/theme.ts` w paczce `poldach-reklama.zip`). Rozbieżności zgłaszamy,
  projektu reklamy nie zmieniamy.

## Kolory

Tylko te barwy. Żadnego trzeciego koloru akcentu. Wartości HEX:
[`src/styles/globals.css`](../src/styles/globals.css) (`--color-pd-*`, w Tailwind np. `bg-pd-yellow-500`).

| Token           | Rola                                                                                           |
| --------------- | ---------------------------------------------------------------------------------------------- |
| `pd-yellow-50`  | „papier” dla długich tekstów (polityka prywatności, poradniki) – oszczędnie                    |
| `pd-yellow-300` | jasny środek winiety w motywie żółtym                                                          |
| `pd-yellow-500` | **kolor marki** – tło motywu żółtego, tytuły na niebieskim                                     |
| `pd-yellow-600` | brzeg winiety w motywie żółtym                                                                 |
| `pd-blue-400`   | tylko w ilustracjach (na stronie nie jako tło pod tekstem)                                     |
| `pd-blue-500`   | **kolor marki** – logo, tytuły na żółtym, przycisk główny, środek winiety w motywie niebieskim |
| `pd-blue-600`   | tło sekcji niebieskiej                                                                         |
| `pd-blue-700`   | wypełnienia ilustracji, karty i panele na niebieskim                                           |
| `pd-navy-900`   | „atrament”: tekst na żółtym, etykiety, urządzenia na ilustracjach, tło stopki                  |
| `pd-white`      | tekst na niebieskim i granacie                                                                 |
| `pd-red-500`    | wyłącznie znacznik problemu ✗                                                                  |

⚠ P-16: zgoda klienta na odcienie `blue-600` i `blue-700` w tłach z tekstem. ⚠ P-17: potwierdzenie
odcienia `blue-500`.

## Motywy sekcji

Sekcja ma motyw żółty (domyślny) albo niebieski. Komponenty korzystają z ról, nie z tokenów
bezpośrednio, więc same zmieniają kolor w zależności od motywu. Wdrożone jako klasy `theme-yellow`,
`theme-blue` i `blueprint` w [`src/styles/globals.css`](../src/styles/globals.css), sekcja –
`Section` w `src/components/ui/`.

| Rola           | Żółty                 | Niebieski          |
| -------------- | --------------------- | ------------------ |
| `--bg`         | `yellow-500`          | `blue-600`         |
| `--bg-glow`    | `yellow-300`          | `blue-500`         |
| `--bg-edge`    | `yellow-600`          | `blue-600`         |
| `--title`      | `blue-500`            | `yellow-500`       |
| `--text`       | `navy-900`            | `white`            |
| `--label`      | `navy-900`            | `white`            |
| `--icon-ok-bg` | `blue-500`            | `yellow-500`       |
| `--icon-ok-fg` | `white`               | `navy-900`         |
| `--grid-line`  | `navy-900`, krycie 8% | `white`, krycie 8% |
| `--btn-bg`     | `blue-500`            | `yellow-500`       |
| `--btn-fg`     | `white`               | `navy-900`         |

- **Stopka:** tło `navy-900`, tytuły `yellow-500`, tekst `white`.
- **Tylko tryb jasny** (`color-scheme: light`), bez osobnego trybu ciemnego.
- **Rytm:** hero niebieskie → pierwsza sekcja po hero żółta → dalej na zmianę; sekcja kontaktu żółta.

## Kontrast

Tabela wiążąca dla każdego tekstu na stronie (WCAG AA). „Duży tekst” = co najmniej 24 px albo 19 px
pogrubione.

| Tekst na tle           | Kontrast | Zasada                                       |
| ---------------------- | -------- | -------------------------------------------- |
| navy na yellow-500     | 8,2      | ✅ każdy tekst                               |
| navy na yellow-600     | 7,4      | ✅ każdy tekst                               |
| navy na yellow-50      | 10,5     | ✅ każdy tekst                               |
| white na navy          | 11,3     | ✅ każdy tekst                               |
| yellow-500 na navy     | 8,2      | ✅ każdy tekst, mocne CTA                    |
| white na blue-700      | 7,1      | ✅ każdy tekst                               |
| yellow-500 na blue-700 | 5,2      | ✅ każdy tekst                               |
| white na blue-600      | 4,8      | ✅ każdy tekst                               |
| yellow-500 na blue-600 | 3,5      | ⚠️ tylko duży tekst                          |
| white na blue-500      | 3,4      | ⚠️ tylko duży tekst                          |
| navy na blue-500       | 3,3      | ⚠️ tylko duży tekst                          |
| white na blue-400      | 3,0      | ⚠️ tylko bardzo duży tekst                   |
| blue-500 na yellow-500 | 2,5      | ❌ tylko logo i tytuły od 40 px jako grafika |
| yellow-500 na blue-500 | 2,5      | ❌ tylko tytuły od 40 px                     |

W praktyce:

1. Tekst ciągły, listy i nawigacja: na żółtym zawsze granat, na niebieskim zawsze biel.
2. Tytuły w kolorach marki (niebieski na żółtym, żółty na niebieskim) – co najmniej 40 px, także na
   telefonie.
3. Przycisk na żółtym: pigułka `blue-500` z białym tekstem co najmniej 20 px bold. Na niebieskim:
   pigułka `yellow-500` z granatowym tekstem.
4. Link w tekście ma kolor tekstu i podkreślenie – nigdy nie odróżniamy go samym kolorem.

## Tło „rysunek techniczny”

Podpis graficzny marki – każda sekcja ma siatkę i winietę, tło nigdy nie jest płaskie.

```css
background-color: var(--bg);
background-image:
  linear-gradient(var(--grid-line) 1px, transparent 1px),
  linear-gradient(90deg, var(--grid-line) 1px, transparent 1px),
  radial-gradient(ellipse 80% 60% at 50% 30%, var(--bg-glow), var(--bg-edge));
background-size:
  54px 54px,
  54px 54px,
  100% 100%;
```

- Siatka co **54 px** (na telefonie 40 px), linie 1 px. Jeden krok siatki w całej stronie.
- Winieta: jaśniejszy środek w górnej części sekcji (tam, gdzie tytuł), różnica jasności około 6% –
  ma być wyczuwalna, nie widoczna.
- Siatka jest statyczna, bez paralaksy.
- **Dwa „papiery”:** sekcja niebieska to cyjanotypia (białe linie rysunku), żółta to kalka (granatowe
  linie). Oba kolory mają ten sam sens – rysunek techniczny.
- **Ozdobniki z rysunku technicznego:** znaczniki narożne („L” w rogach paneli), linie wymiarowe ze
  strzałkami i liczbą, linie odniesienia z opisem, numeracja arkuszy w nadtytułach („ARKUSZ 03 / 09”).

## Typografia

**Roboto Condensed** (licencja OFL) – tym samym krojem złożone jest logo. Odmiany 400, 500, 700, 800.
Podzbiory `latin` i `latin-ext` (polskie znaki), `font-display: swap`, hostowany lokalnie. Skala
wdrożona jako tokeny `--text-*` w [`src/styles/globals.css`](../src/styles/globals.css) (klasy
`text-display`, `text-h1`, …, płynnie między 375 a 1200 px).

| Token     | Telefon → komputer              | Odmiana | Interlinia | Zastosowanie                    |
| --------- | ------------------------------- | ------- | ---------- | ------------------------------- |
| `display` | 56 → 112 px                     | 700     | 1,0        | logo i hasło w hero oraz stopce |
| `h1`      | 40 → 72 px                      | 800     | 1,05       | tytuł strony, hero              |
| `h2`      | 32 → 56 px                      | 700     | 1,1        | tytuł sekcji                    |
| `h3`      | 24 → 32 px                      | 700     | 1,15       | tytuł karty, metody             |
| `eyebrow` | 13 → 15 px, wersaliki, +0,15 em | 700     | 1,2        | nadtytuł („METODA 01 / 03”)     |
| `lead`    | 20 → 24 px                      | 500     | 1,4        | zdanie pod tytułem              |
| `body`    | 17 → 18 px                      | 400     | 1,55       | tekst ciągły                    |
| `list`    | 18 → 22 px                      | 500     | 1,35       | punkty z ikonami ✓ ✗            |
| `small`   | 14 px                           | 400     | 1,4        | stopka, lokalizacja             |

Wyrównanie do lewej we wszystkich sekcjach treści. Wyśrodkowany jest tylko blok kontaktowy.

## Układ

- Kontener maksymalnie **1200 px**, tekst ciągły maksymalnie około 720 px, margines boczny na
  telefonie 20–24 px.
- Jednostka odstępu **8 px**. Duże odstępy pionowe między sekcjami to wielokrotności 54 px (108,
  162 px) – elementy „siadają” na liniach siatki.
- Kolejność w sekcji: nadtytuł → 8 px → tytuł → około 1 krok siatki → ilustracja → około 2 kroki →
  lista. Na komputerze tekst po lewej, ilustracja po prawej; na telefonie ilustracja na około 80%
  szerokości, wyśrodkowana.

## Kształty

- **Ostre rogi** paneli, ilustracji i zdjęć. Pełne zaokrąglenie mają tylko pigułki (CTA, telefon,
  statusy). Urządzenia na ilustracjach i liczniki – zaokrąglenie około 6 px.
- **Bez obrysów i cieni** na ilustracjach. Jedyny cień w systemie: przycisk-telefon
  (`0 8px 24px`, `navy-900` z kryciem 25%).
- Bez gradientów na przyciskach i tekstach.

## Logo

Napis „POLDACH” w Roboto Condensed Bold. Jedyne źródło kształtu i kolorów:
[`src/brand/Logo.tsx`](../src/brand/Logo.tsx) – geometria 1:1 z pliku od klienta, bez marginesów wokół
napisu. Link do strony głównej z logo: `LogoLink` w `src/components/common/`.

| Wariant  | Kolor        | Tło                         |
| -------- | ------------ | --------------------------- |
| `blue`   | `blue-500`   | żółte i białe               |
| `yellow` | `yellow-500` | niebieskie i granatowe      |
| `white`  | `white`      | zdjęcia i inne ciemne tła   |
| `title`  | `--title`    | nadtytuł w sekcji z motywem |

- Rozmiar ustawiamy wysokością (np. `h-8 w-auto`), szerokość wynika z proporcji.
- Hasło „Dach – to nasz fach” jako podpis pod logo.
- Stare logo z parasolem i postacią jest wycofane ([decyzje.md](decyzje.md), D-01).

## Komponenty

| Komponent        | Specyfikacja                                                                                                                                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Nadtytuł         | logo w kolorze `--title` + pionowa kreska 2 px (krycie 40%) + etykieta `eyebrow` w kolorze `--label`. W każdej sekcji treści – to on spina stronę z reklamą                                                                                            |
| Tytuł sekcji     | `h2` w kolorze `--title`; zasady treści – [komunikacja.md](komunikacja.md#zasady-pisania)                                                                                                                                                              |
| Lista z ikonami  | pełne kółko około 1,1 em. ✓ korzyść: `--icon-ok-bg` / `--icon-ok-fg`. ✗ problem: zawsze `red-500` z białym znakiem                                                                                                                                     |
| Pigułka statusu  | `blue-500`, biała ikona ✓ i tekst 14–15 px bold, np. „Pokrycie nienaruszone”, „Od 1992”                                                                                                                                                                |
| Przycisk-telefon | główne CTA. Pigułka `--btn-bg`, numer 700 co najmniej 20 px, po lewej kółko ze słuchawką, wysokość co najmniej 48 px, zawsze link `tel:`. Na telefonie przyklejony pasek u dołu ekranu, na komputerze w nagłówku. Numer – [firma.md](firma.md#kontakt) |
| Przycisk główny  | ta sama pigułka bez ikony, np. „Bezpłatna wycena”                                                                                                                                                                                                      |
| Panel ilustracji | ostre rogi, bez obrysu i cienia – patrz [Ilustracje](#ilustracje)                                                                                                                                                                                      |
| Celownik         | okrąg + 4 kreski na zewnątrz; granatowy na żółtym, żółty na niebieskim; opcjonalna etykieta w granatowej pigułce („± 1 cm”). Znak precyzji: favicon, punkty na interaktywnych rysunkach, „tu jest przeciek”                                            |
| Licznik          | granatowy prostokąt (zaokrąglenie około 6 px), duża biała liczba 700 + mała jednostka („m²/dzień”)                                                                                                                                                     |
| Linia wymiarowa  | linia ze strzałkami na końcach i liczbą pośrodku, np. „1992 ↔ dziś”                                                                                                                                                                                    |
| Separator        | kreska około 80 × 2 px, `blue-500` z kryciem około 50%, wyśrodkowana                                                                                                                                                                                   |
| Blok kontaktowy  | wyśrodkowany, tło żółte z siatką: nadtytuł → duże logo → hasło → separator → przycisk-telefon → e-mail i www (granat, bold) → lokalizacja (granat, mniejsza)                                                                                           |
| Nagłówek         | żółty pasek z siatką: logo `blue-500` po lewej, nawigacja granatowa 500, przycisk-telefon po prawej. Po przewinięciu jednolity (bez winiety), z cienką granatową linią u dołu                                                                          |
| Stopka           | „tabliczka rysunkowa” jak w rogu rysunku technicznego: Wykonawca · Adres · Telefon · Od 1992 · członek PSD · „Arkusz 01 / 01 · Skala 1:1 · Rew. 2027”. Dane – [firma.md](firma.md)                                                                     |

## Ilustracje

- **Płaskie, techniczne:** płaskie kolory (odcienie niebieskiego, granat, biel), ostre rogi, bez
  obrysów i cieni, linie konturowe białe (na niebieskim) lub granatowe (na żółtym), 1,5–2 px.
- **Dwa etapy – „szkic → gotowe”:** kontur rysuje się kreską, potem wypełnia kolorem. Przekaz bez
  słów: najpierw rozumiemy dach, potem go robimy.
- **Dach płaski** (wzór z reklamy), warstwy od góry: żwir (owalne „kamyki” jasnoniebieskie i białe)
  → membrana (cienki pas granatu) → izolacja (`blue-700` z jaśniejszymi szwami) → strop (granat z
  drobnymi kropkami). Etykiety warstw: bardzo małe białe wersaliki z rozstrzeleniem.
- **Urządzenia:** proste granatowe bryły z żółtą diodą. Woda, mgła i iskra – białe lub jasnoniebieskie,
  mgła jako rozmyte koła.
- **Do narysowania w tym stylu:** dom z dachem skośnym w aksonometrii i przekroju (krokwie,
  ocieplenie, membrana, kontrłaty, łaty, dachówka lub blachodachówka, obróbki, rynna, okno dachowe) –
  główny bohater strony; hala z dachem płaskim; drzwi zewnętrzne i wewnętrzne; przekrój podłogi;
  parapet; demontaż płyt eternitowych.
- **Źródło:** istniejące rysunki eksportujemy z projektu reklamy (te same kształty).

## Zdjęcia

- Naturalne kolory, **bez filtrów**, ostre rogi.
- Zdjęcie stoi na polu w kolorze przeciwnym do sekcji (na żółtej sekcji – granatowe lub niebieskie
  pole), z podpisem w stylu nadtytułu: „REALIZACJA · TCZEW · 2026”.
- Można nakładać celownik i pigułki statusu – to łączy fotografię z ilustracjami.
- **Bez zdjęć stockowych i grafik AI** ([decyzje.md](decyzje.md), D-06).

Potrzebne ujęcia:

| Do czego                                                                 | Ujęcia                                                                                                                                                                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Realizacje, O nas                                                        | dachy przed i po, bracia Supińscy i ekipa przy pracy, siedziba                                                                                                                                                      |
| Diagnostyka i reklama (pionowo, 5–10 s, bez mówienia, bez logo klientów) | zadymianie – mgła z dachu (najważniejsze); próbnik iskrowy na membranie; urządzenie elektroakustyczne na żwirze lub zieleni; kapiąca woda w hali; zaznaczone miejsce przecieku; szeroki kadr dużego dachu płaskiego |

## Ruch

Każda animacja coś tłumaczy, a nie tylko się rusza. Momenty popisowe opisuje
[mapa-strony.md](mapa-strony.md), wymagania (reduced motion, działanie bez JS) –
[standardy.md](standardy.md#dostępność).

| Efekt                         | Parametry                                                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Tytuł sekcji                  | wjeżdża od dołu spod maski, raz przy wejściu w widok, 400–500 ms, `ease-out`                                                   |
| Punkty listy                  | pojawiają się kolejno co około 120 ms                                                                                          |
| Ikony ✓, celownik             | sprężyste pojawienie: skala 0,6 → 1 z lekkim przestrzeleniem, 300 ms                                                           |
| Licznik                       | odlicza od zera raz, przy pierwszym pokazaniu                                                                                  |
| Rysunek                       | kontur rysuje się linią, potem wypełnienie kolorem                                                                             |
| Zmiana koloru sekcji („wipe”) | ostra pionowa lub ukośna krawędź albo komórki siatki 54 px odsłaniające nowy kolor; 2–3 razy na stronę, nie przy każdej sekcji |
| Mgła, iskra, kapanie          | małe zapętlone animacje SVG, tylko w ilustracjach metod diagnostyki                                                            |

Animacja tylko przy pierwszym pojawieniu się; nic nie miga w pętli obok tekstu.

## Czego unikać

- Trzeciego koloru akcentu, gradientów na przyciskach i tekstach, cieni na ilustracjach, zaokrąglonych
  paneli.
- Tekstu ciągłego `blue-500` na żółtym i żółtego na `blue-500`.
- Wyśrodkowanego tekstu w sekcjach treści.
- Slidera lub karuzeli w hero – hero to jeden komunikat.
- Ekranu ładowania, przejmowania przewijania (scroll-jacking), 3D, animowania długiego tekstu litera po
  literze, dźwięku włączającego się samoczynnie.
- Starego logo z parasolem.

## Meta przeglądarki

- `theme-color`: `pd-yellow-500`.
- Favicon: celownik `blue-500` na żółtym (SVG i PNG).
