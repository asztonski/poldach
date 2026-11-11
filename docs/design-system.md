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

| Token           | Rola                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------ |
| `pd-yellow-50`  | „papier” dla długich tekstów (polityka prywatności, poradniki) – oszczędnie                      |
| `pd-yellow-300` | jasny środek winiety w motywie żółtym                                                            |
| `pd-yellow-500` | **kolor marki** – tło motywu żółtego, tytuły na niebieskim                                       |
| `pd-yellow-600` | brzeg winiety w motywie żółtym                                                                   |
| `pd-blue-400`   | tylko w ilustracjach (na stronie nie jako tło pod tekstem)                                       |
| `pd-blue-500`   | **kolor marki** – logo, tytuły na żółtym, przycisk główny, środek winiety w motywie niebieskim   |
| `pd-blue-600`   | tło sekcji niebieskiej                                                                           |
| `pd-blue-700`   | wypełnienia ilustracji, karty i panele na niebieskim                                             |
| `pd-navy-900`   | „atrament”: tekst na żółtym, etykiety, urządzenia na ilustracjach                                |
| `pd-white`      | tekst na niebieskim i granacie, tło motywu białego                                               |
| `pd-grey-50`    | bardzo jasna chłodna szarość – motyw szary pod białymi kartami (opinie, D-77)                    |
| `pd-red-500`    | wyłącznie znacznik problemu ✗                                                                    |
| `pd-red-nav`    | wyłącznie linki menu w nagłówku – czerwień menu ze starej strony ([decyzje.md](decyzje.md) D-22) |

Wyjątek: tokeny `pd-logo-*` to barwy z pliku projektanta (postać, kredki, ciemna czerwień biurka) –
wyłącznie w [logo z postacią](#logo-z-postacią), nigdzie poza nim ([decyzje.md](decyzje.md) D-16).

⚠ P-16: zgoda klienta na odcienie `blue-600` i `blue-700` w tłach z tekstem. ⚠ P-17: potwierdzenie
odcienia `blue-500`.

## Motywy sekcji

Sekcja ma motyw żółty (domyślny), niebieski albo biały ([decyzje.md](decyzje.md) D-18, D-47);
stopka – niebieski (D-80); sekcja z opiniami – szary (`theme-grey`, D-77). Komponenty korzystają z ról, nie z tokenów bezpośrednio, więc same zmieniają kolor w
zależności od motywu. Wdrożone jako klasy `theme-yellow`, `theme-blue`, `theme-white`, `theme-grey` i `paper` w
[`src/styles/globals.css`](../src/styles/globals.css), sekcja – `Section` w `src/components/ui/`.

| Rola           | Żółty                 | Niebieski          | Biały                 |
| -------------- | --------------------- | ------------------ | --------------------- |
| `--bg`         | `yellow-500`          | `blue-600`         | `white`               |
| `--bg-glow`    | `yellow-300`          | `blue-500`         | `white`               |
| `--bg-edge`    | `yellow-600`          | `blue-600`         | `white` (bez winiety) |
| `--title`      | `blue-500`            | `yellow-500`       | `blue-500`            |
| `--text`       | `navy-900`            | `white`            | `navy-900`            |
| `--label`      | `navy-900`            | `white`            | `navy-900`            |
| `--icon-ok-bg` | `blue-500`            | `yellow-500`       | `blue-500`            |
| `--icon-ok-fg` | `white`               | `navy-900`         | `white`               |
| `--grid-line`  | `navy-900`, krycie 8% | `white`, krycie 8% | `navy-900`, krycie 8% |
| `--btn-bg`     | `blue-500`            | `yellow-500`       | `blue-500`            |
| `--btn-fg`     | `white`               | `navy-900`         | `white`               |

- **Stopka (`theme-blue`, D-80):** ten sam niebieski co reszta strony; małe etykiety białe (żółty na `blue-600` – tylko duży tekst), hasło i duży napis POLDACH żółte.
- **Tylko tryb jasny** (`color-scheme: light`), bez osobnego trybu ciemnego.
- **Rytm:** hero żółte (D-15) → sekcje białe z siatką, każda z pasem nagłówka (D-47): niebieskim,
  w Ofercie żółtym; „O nas” w całości niebieskie (D-53) → stopka niebieska
  ([mapa-strony.md](mapa-strony.md#strona-główna)). Kolor marki niosą hero, pasy, „O nas” i stopka.
- **Panel** (`Panel`) – arkusz w innym motywie wewnątrz sekcji, np. żółta i niebieska karta na
  białej sekcji; leży na tej samej siatce co strona.

## Kontrast

Tabela wiążąca dla każdego tekstu na stronie (WCAG AA). „Duży tekst” = co najmniej 24 px albo 19 px
pogrubione.

| Tekst na tle           | Kontrast | Zasada                                           |
| ---------------------- | -------- | ------------------------------------------------ |
| navy na yellow-500     | 8,2      | ✅ każdy tekst                                   |
| navy na yellow-600     | 7,4      | ✅ każdy tekst                                   |
| navy na yellow-50      | 10,5     | ✅ każdy tekst                                   |
| navy na white          | 11,3     | ✅ każdy tekst                                   |
| white na navy          | 11,3     | ✅ każdy tekst                                   |
| yellow-500 na navy     | 8,2      | ✅ każdy tekst, mocne CTA                        |
| white na blue-700      | 7,1      | ✅ każdy tekst                                   |
| yellow-500 na blue-700 | 5,2      | ✅ każdy tekst                                   |
| white na blue-600      | 4,8      | ✅ każdy tekst                                   |
| yellow-500 na blue-600 | 3,5      | ⚠️ tylko duży tekst                              |
| white na blue-500      | 3,4      | ⚠️ tylko duży tekst                              |
| blue-500 na white      | 3,4      | ⚠️ tylko duży tekst                              |
| blue-500 na yellow-50  | 3,2      | ⚠️ tylko duży tekst                              |
| navy na blue-500       | 3,3      | ⚠️ tylko duży tekst                              |
| white na blue-400      | 3,0      | ⚠️ tylko bardzo duży tekst                       |
| blue-500 na yellow-500 | 2,5      | ❌ tylko logo i tytuły od 40 px jako grafika     |
| yellow-500 na blue-500 | 2,5      | ❌ tylko tytuły od 40 px                         |
| red-nav na yellow-500  | 3,5      | ⚠️ tylko duży tekst – menu 18 px to wyjątek D-22 |

W praktyce:

1. Tekst ciągły, listy i nawigacja: na żółtym i białym zawsze granat, na niebieskim zawsze biel.
2. Tytuły w kolorach marki (niebieski na żółtym, żółty na niebieskim) – co najmniej 40 px, także na
   telefonie. Niebieski na białym – jak duży tekst (od 24 px albo 19 px pogrubione). Tytuły kart
   (`h3`) mają kolor tekstu.
3. Przycisk na żółtym i białym: pigułka `blue-500` z białym tekstem co najmniej 20 px bold. Na
   niebieskim: pigułka `yellow-500` z granatowym tekstem.
4. Link w tekście ma kolor tekstu i podkreślenie – nigdy nie odróżniamy go samym kolorem.

## Tło „rysunek techniczny”

Podpis graficzny marki – każda sekcja ma siatkę i winietę, tło nigdy nie jest płaskie. Wdrożone w
[`src/styles/globals.css`](../src/styles/globals.css) (`grid-lines`, `paper`, `blueprint`, `body`).

- **Siatka należy do ekranu, kolor do sekcji** ([decyzje.md](decyzje.md) D-17, D-27, D-33). Siatka
  stoi w miejscu, a treść przewija się nad nią – w przypiętych scenach nic się nie rusza. Jedna
  siatka przez wszystkie sekcje i miejsce pod nimi, bez szwów. Sekcja (`paper`) daje kolor i winietę,
  a siatkę tylko przerysowuje w kolorze swoich linii (`--grid-line`). Zawsze jako warstwa `fixed`
  (`screen-grid`), nigdy `background-attachment: fixed` – to przerysowuje tło przy każdej klatce. Tło `body` poza sekcjami –
  `yellow-600` (krawędź żółtej winiety), więc żółta sekcja przechodzi w nie bez szwu.
- Sekcja i panel przycinają wszystko, co z nich wystaje. `transform` na przodku sekcji przypiąłby
  jej siatkę do tego przodka (tak jest tylko w hero, gdy stoi w miejscu – D-21).
- Elementy, które przesuwają się względem strony (nagłówek, menu mobilne, pasek telefonu na
  telefonie), mają własną siatkę od swojej górnej krawędzi (`blueprint`).
- Siatka co **54 px** (na telefonie 40 px), linie 1 px. Jeden krok siatki w całej stronie.
- Winieta: jaśniejszy środek w górnej części sekcji (tam, gdzie tytuł), różnica jasności około 6% –
  ma być wyczuwalna, nie widoczna.
- Siatka jest statyczna – nie przewija się i nie ma paralaksy. Hero zostaje w miejscu, a sekcja 2
  nasuwa się na nie ([decyzje.md](decyzje.md) D-21, [Ruch](#ruch)).
- **Trzy „papiery”:** sekcja niebieska to cyjanotypia (białe linie rysunku), żółta to kalka (granatowe
  linie), biała to papier kreślarski (granatowe linie, opcjonalnie). Wszystkie mają ten sam sens –
  rysunek techniczny.
- **Ozdobniki z rysunku technicznego:** znaczniki narożne („L” w rogach paneli), linie wymiarowe ze
  strzałkami i liczbą, linie odniesienia z opisem, numeracja arkuszy w nadtytułach („ARKUSZ 03 / 09”).

## Przejścia między sekcjami

Proste krawędzie: sekcja kończy się poziomo, następna zaczyna się tuż pod nią, bez skosów
([decyzje.md](decyzje.md) D-67, zastępuje skosy z D-18 i D-24). Linie siatki biegną przez granicę
bez przerwy – zmienia się tylko kolor papieru. Na górze i na dole ten sam odstęp `--section-space`
(D-42). Animowana zmiana koloru („wipe”) – [Ruch](#ruch).

## Typografia

**Roboto Condensed** (licencja OFL) – tym samym krojem złożone jest logo. Odmiany 400, 500, 700, 800.
Podzbiory `latin` i `latin-ext` (polskie znaki), `font-display: swap`, hostowany lokalnie. Skala
wdrożona jako tokeny `--text-*` w [`src/styles/globals.css`](../src/styles/globals.css) (klasy
`text-display`, `text-h1`, …, płynnie między 375 a 1200 px).

**Kalam 700** (OFL) – wyłącznie notatki pisakiem (dowody w hero, [decyzje.md](decyzje.md) D-15).
Podzbiory `latin` i `latin-ext`, ładowany w
[`HeroSection`](../src/sections/common/HeroSection.tsx), więc pobierają go tylko strony z tym hero – główna, realizacje i certyfikaty (D-116).

| Token     | Telefon → komputer              | Odmiana | Interlinia | Zastosowanie                                                       |
| --------- | ------------------------------- | ------- | ---------- | ------------------------------------------------------------------ |
| `display` | 56 → 112 px                     | 700     | 1,0        | logo i hasło w hero oraz stopce                                    |
| `h1`      | 40 → 72 px                      | 800     | 1,05       | tytuł strony, hero                                                 |
| `h2`      | 32 → 56 px                      | 700     | 1,1        | tytuł sekcji                                                       |
| `h3`      | 24 → 32 px                      | 700     | 1,15       | tytuł karty, metody                                                |
| `eyebrow` | 13 → 15 px, wersaliki, +0,15 em | 700     | 1,2        | nadtytuł („METODA 01 / 03”)                                        |
| `lead`    | 20 → 24 px                      | 500     | 1,4        | zdanie pod tytułem                                                 |
| `body`    | 17 → 18 px                      | 400     | 1,55       | tekst ciągły                                                       |
| `list`    | 18 → 22 px                      | 500     | 1,35       | punkty z ikonami ✓ ✗; opis przy elemencie w przejściu przez środek |
| `small`   | 14 px                           | 400     | 1,4        | stopka, lokalizacja                                                |

Wyrównanie do lewej we wszystkich sekcjach treści. Wyśrodkowany jest tylko blok kontaktowy i
duży nagłówek nad przejściem przez środek – Oferta ([decyzje.md](decyzje.md) D-37).

## Układ

- Kontener maksymalnie **1200 px**, tekst ciągły maksymalnie około 720 px, margines boczny na
  telefonie 20–24 px.
- Jednostka odstępu **8 px**. Każda sekcja ma ten sam odstęp nad i pod treścią – `--section-space`
  w [`src/styles/globals.css`](../src/styles/globals.css): 108 px, na telefonie 54 px (D-42). W hero
  liczony od dołu nagłówka strony. Przypięte sceny odmierzają go od krawędzi ekranu, na niskich
  ekranach najwyżej 10% wysokości ekranu; gdy treść sceny jest niższa, stoi na środku, więc odstęp
  nad nią i pod nią jest równy.
- Kolejność w sekcji: nadtytuł → 8 px → tytuł → około 1 krok siatki → ilustracja → około 2 kroki →
  lista. Na komputerze tekst po lewej, ilustracja po prawej; na telefonie ilustracja na około 80%
  szerokości, wyśrodkowana.

## Kształty

- **Lekkie zaokrąglenie 8 px** (`--radius-box` w [globals.css](../src/styles/globals.css), D-73) każdego
  „pudełka”: panele, białe arkusze w scenach, zdjęcia, skany, tabliczka w stopce. Pełne zaokrąglenie
  mają tylko pigułki (CTA, telefon, statusy). Urządzenia na ilustracjach i liczniki – zaokrąglenie
  około 6 px. Pasy z nagłówkiem i sekcje – na całą szerokość, bez zaokrągleń.
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
- Stare logo z parasolem i postacią (sprzed D-01) jest wycofane ([decyzje.md](decyzje.md), D-01).
  Logo z postacią niżej to jego nowa wersja.

### Logo z postacią

Napis POLDACH w łuku, parasol i postać za biurkiem z hasłem –
[`src/brand/LogoWithFigure.tsx`](../src/brand/LogoWithFigure.tsx), geometria 1:1 z
`design/logo/poldach-logo.svg` (D-15, D-16). Barwy z tokenów, w tym `pd-logo-*`. Animację wejścia
dodaje `LogoEntrance` ([Ruch](#ruch)). Tylko na tle żółtym lub białym – niebieski napis w łuku znika
na niebieskim. Teraz w hero; rola poza hero – ⚠ P-20.

## Komponenty

| Komponent        | Specyfikacja                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nadtytuł         | logo w kolorze `--title` + pionowa kreska 2 px (krycie 40%) + etykieta `eyebrow` w kolorze `--label`. W każdej sekcji treści – to on spina stronę z reklamą. Wyjątek: hero – sama etykieta, bo obok jest logo z postacią                                                                                                                                                                                                                  |
| Tytuł sekcji     | `h2` w kolorze `--title`, nad nim nadtytuł, pod nim opcjonalny lead i dalszy opis – `SectionHeading` (pojawia się raz, [Ruch](#ruch)); zasady treści – [komunikacja.md](komunikacja.md#zasady-pisania)                                                                                                                                                                                                                                    |
| Lista z ikonami  | pełne kółko około 1,1 em. ✓ korzyść: `--icon-ok-bg` / `--icon-ok-fg` (`CheckList`). ✗ problem: zawsze `red-500` z białym znakiem                                                                                                                                                                                                                                                                                                          |
| Pigułka statusu  | `blue-500`, biała ikona ✓ i tekst 14–15 px bold, np. „Pokrycie nienaruszone”, „Od 1992”                                                                                                                                                                                                                                                                                                                                                   |
| Notatka pisakiem | Kalam 700 w rozmiarze `list`, granat; po lewej pole 36 px z odręcznym ptaszkiem `blue-500` albo ze znakiem (np. PSD); obrót −1…−2°; notatki jedna pod drugą. Dowody w hero zamiast pigułek statusu                                                                                                                                                                                                                                        |
| Przycisk-telefon | główne CTA. Pigułka `--btn-bg`, numer 700 co najmniej 20 px, po lewej kółko ze słuchawką, wysokość co najmniej 48 px, zawsze link `tel:`. Na telefonie przyklejony pasek u dołu ekranu, na komputerze w nagłówku. Numer – [firma.md](firma.md#kontakt)                                                                                                                                                                                    |
| Przycisk główny  | ta sama pigułka bez ikony, np. „Bezpłatna wycena”                                                                                                                                                                                                                                                                                                                                                                                         |
| Panel ilustracji | ostre rogi, bez obrysu i cienia – patrz [Ilustracje](#ilustracje).                                                                                                                                                                                                                                                                                                                                                                        |
| Celownik         | okrąg + 4 kreski na zewnątrz; granatowy na żółtym, żółty na niebieskim; opcjonalna etykieta w granatowej pigułce („± 1 cm”). Znak precyzji: punkty na interaktywnych rysunkach, „tu jest przeciek”                                                                                                                                                                                                                                        |
| Licznik          | granatowy prostokąt (zaokrąglenie około 6 px), duża biała liczba 700 + mała jednostka („m²/dzień”)                                                                                                                                                                                                                                                                                                                                        |
| Linia wymiarowa  | linia ze strzałkami na końcach i liczbą pośrodku, np. „1992 ↔ dziś”                                                                                                                                                                                                                                                                                                                                                                       |
| Separator        | kreska około 80 × 2 px, `blue-500` z kryciem około 50%, wyśrodkowana                                                                                                                                                                                                                                                                                                                                                                      |
| Blok kontaktowy  | wyśrodkowany, tło żółte z siatką: nadtytuł → duże logo → hasło → separator → przycisk-telefon → e-mail i www (granat, bold) → lokalizacja (granat, mniejsza)                                                                                                                                                                                                                                                                              |
| Pole formularza  | białe pole na szarym arkuszu (`Panel` `grey`), obramowanie 1 px granat 70% (4,7:1 na białym), zaokrąglenie `--radius-box`, etykieta bold nad polem; pole nieobowiązkowe ma dopisek „(nieobowiązkowo)”. Fokus – wspólny obrys `--focus`. [`ContactForm`](../src/components/common/ContactForm.tsx)                                                                                                                                         |
| Karta mapy       | szary arkusz 4 : 3, zaokrąglenie `--radius-box`. Ze zgodą na cookies – mapa Google od razu; bez niej – pinezka `--title`, adres, przycisk „Pokaż mapę” (wczytuje ją tylko na tej stronie, nie jest zgodą na statystyki) i zdanie o plikach cookie Google (D-93). Pod kartą link „Otwórz w Mapach Google” (D-86). [`MapCard`](../src/components/common/MapCard.tsx)                                                                        |
| Baner cookies    | niebieski arkusz (`Panel` `blue`) przy dolnej krawędzi ekranu, na telefonie nad paskiem z telefonem, do 768 px szerokości: tytuł „Pliki cookie”, jedno zdanie o statystykach Google Analytics i mapie Google, link do polityki prywatności; dwa przyciski tej samej wielkości – „Odrzucam” (obrys) i „Zgadzam się” (pigułka). Nie blokuje strony i nie zabiera fokusu (D-93). [`CookieBanner`](../src/components/common/CookieBanner.tsx) |
| Wideo            | ramka `rounded-box` na granacie, plakat – pierwsza klatka; w lewym dolnym rogu okrągłe przyciski 44 px, biała ikona na granacie 80%: odtwórz / wstrzymaj, dźwięk, pełny ekran. Na pełnym ekranie wideo wyśrodkowane na granacie (D-88). [`VideoPlayer`](../src/components/common/VideoPlayer.tsx)                                                                                                                                         |
| Nagłówek         | żółty pasek z siatką: logo `blue-500` po lewej, nawigacja `pd-red-nav` 500 (D-22), przycisk-telefon po prawej. Po przewinięciu jednolity (bez winiety), bez linii u dołu. Przy przewijaniu w dół chowa się, przy ruchu w górę wraca (D-41). Nad hero strony głównej do pierwszego przewinięcia bez własnego tła (`under-header`), więc siatka przechodzi bez szwu                                                                         |
| Stopka           | hasło, opis, przycisk-telefon i e-mail; linki w dwóch grupach „Oferta” i „Firma” (`FOOTER_NAV`); „tabliczka rysunkowa” jak w rogu rysunku technicznego: Wykonawca · Siedziba i salon · Na rynku · NIP · REGON · Członek ze znakiem PSD (D-89); duży napis POLDACH, pod nim © z pełną nazwą. Dane – [firma.md](firma.md)                                                                                                                   |

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
- Wyjątek: zdjęcia oferty stoją wprost na białym papierze, pionowo (5:7), bez pola i podpisu (D-44, D-47).
- Można nakładać celownik i pigułki statusu – to łączy fotografię z ilustracjami.
- **Bez zdjęć stockowych i grafik AI** ([decyzje.md](decyzje.md), D-06). Wyjątek do odpowiedzi na ⚠ P-22: zdjęcia Oferty ze starej strony, część wygląda na stockowe (D-46).

Potrzebne ujęcia:

| Do czego                                                                 | Ujęcia                                                                                                                                                                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Realizacje, O nas                                                        | dachy przed i po, bracia Supińscy i ekipa przy pracy, siedziba                                                                                                                                                      |
| Oferta (pionowo, 5:7) – teraz ze starej strony ⚠ P-22                    | każda kategoria z własnej realizacji: dach w trakcie i po, usuwanie eternitu, okna, drzwi i podłogi po montażu, parapety, taras                                                                                     |
| Diagnostyka i reklama (pionowo, 5–10 s, bez mówienia, bez logo klientów) | zadymianie – mgła z dachu (najważniejsze); próbnik iskrowy na membranie; urządzenie elektroakustyczne na żwirze lub zieleni; kapiąca woda w hali; zaznaczone miejsce przecieku; szeroki kadr dużego dachu płaskiego |

## Ruch

Każda animacja coś tłumaczy, a nie tylko się rusza. Momenty popisowe opisuje
[mapa-strony.md](mapa-strony.md), wymagania (reduced motion, działanie bez JS) –
[standardy.md](standardy.md#dostępność).

| Efekt                         | Parametry                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Nagłówek sekcji               | nadtytuł, tytuł i opis pojawiają się razem, łagodnie (`opacity`, 600 ms, `ease-out`), raz – gdy sekcja zajmuje połowę ekranu, czyli jej górna krawędź dochodzi do środka ekranu (D-36). Potem zostają, także przy przewijaniu w górę. Bez JS i przy reduced motion – widoczne od razu; gdy skrypt się nie załaduje – po 3 s. Bez hero: jego tytuł widać od pierwszej klatki. Bez nagłówka sceny zdjęć (oferta, realizacje) – stoi na własnym białym arkuszu, który bywa już na pierwszym ekranie, więc jest od razu (D-111). [`FadeInOnce`](../src/components/motion/FadeInOnce.tsx), używa go `SectionHeading`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Punkty listy                  | pojawiają się kolejno co około 120 ms                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Ikony ✓, celownik             | sprężyste pojawienie: skala 0,6 → 1 z lekkim przestrzeleniem, 300 ms                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Licznik                       | odlicza od zera raz, przy pierwszym pokazaniu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Rysunek                       | kontur rysuje się linią, potem wypełnienie kolorem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Zdjęcie oferty – najechanie   | zdjęcie powiększa się do 105% w 500 ms, także przy fokusie klawiatury; przy reduced motion bez przejścia (D-44). [`OfferSection`](../src/sections/home/OfferSection.tsx)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Logo z postacią (hero)        | raz przy każdym wejściu na stronę, około 5,2 s: postać wygląda zza biurka, chowa się i wyskakuje → parasol wysuwa się i otwiera → litery POLDACH co 64 ms → hasło wjeżdża od dołu. Sam CSS – [`LogoEntrance`](../src/components/motion/LogoEntrance.module.css) (czasy z makiety `design/makiety/animacja-spod-biurka/` × 0,8, czyli 1,25× szybciej)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Zmiana koloru sekcji („wipe”) | ostra pionowa lub ukośna krawędź albo komórki siatki 54 px odsłaniające nowy kolor; 2–3 razy na stronę, nie przy każdej sekcji                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Zdjęcie → rysunek             | sterowana przewijaniem (D-20): prosta krawędź jedzie od dołu, pod nią zdjęcia już nie ma, a rysunek leży na papierze sekcji z siatką strony; zdjęcie i rysunek się nie przesuwają. Zdjęcie na całą szerokość, na komputerze przypięte na wysokość ekranu pod nagłówkiem. Linie `navy-900`, ukryta konstrukcja przerywana `blue-600`, opisy na końcu (od 1024 px; węższe ekrany – lista pod zdjęciem). Bez obsługi i przy reduced motion – samo zdjęcie. Sam CSS – [`TracingReveal`](../src/components/motion/TracingReveal.module.css)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Nagłówek przy przewijaniu     | przy przewijaniu w dół wysuwa się poza ekran, przy pierwszym ruchu w górę wraca (300 ms, `transform`), jak na metriccivil.ca (D-41). U góry strony zawsze widoczny; zostaje przy fokusie klawiatury w nagłówku. Po przejściu linkiem do sekcji zostaje nad nią do następnego ruchu w dół (D-100). Przypięte sceny mają u góry i u dołu ten sam odstęp, przed przypięciem i po nim; miejsce nagłówka (`--header-pinned`) mieści się w górnym, więc wracający pasek ich nie zasłania (D-104). Pasek z telefonem na telefonie nie chowa się. [`useHeaderScroll`](../src/hooks/useHeaderScroll.ts)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Płynne przewijanie            | kółko myszy i touchpad (D-35): strona dopływa do celu z wygaszaniem zamiast przeskakiwać – jak na metriccivil.ca (Lenis, `lerp` 0,1, `wheelMultiplier` 0,65). Dotyk, klawiatura, reduced motion i brak JS – zwykłe przewijanie. Przewijane elementy na wierzchu strony (menu mobilne) mają `data-lenis-prevent`. [`SmoothScroll`](../src/components/motion/SmoothScroll.tsx)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Hero zostaje w miejscu        | sterowana przewijaniem (D-21): gdy dół hero dojdzie do dołu ekranu, hero przesuwa się w dół tak szybko, jak strona w górę, więc stoi, a sekcja 2 je przykrywa. Bez obsługi, przy reduced motion i przy fokusie w hero – zwykłe przewijanie. Sam CSS – [`StayInPlace`](../src/components/motion/StayInPlace.module.css)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| O firmie – sekwencja          | sterowana przewijaniem, w jedną stronę (D-25, D-63). Od 1024 px i przy ekranie od około 740 px wysokości scena przypina się u góry ekranu (z odstępem na nagłówek) na około 4 ekrany przewijania (`390vh`): zdjęcie siedziby wjeżdża z prawej, potem linia wymiarowa rośnie w prawo od krótkiego odcinka z samym 1992, lata liczą się od 0, kamienie milowe pojawiają się, gdy linia dojdzie do ich kolumny, „lata” na końcu. Przewijanie w górę nie cofa animacji; po 100% scena się odpina i dalej przewija się jak zwykła sekcja. Na telefonie, bez JS i przy reduced motion – stan końcowy. [`OneWayScene`](../src/components/motion/OneWayScene.tsx), [`AboutSection.module.css`](../src/sections/home/AboutSection.module.css)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Przejście przez środek        | Oferta i realizacje (`PhotoStage`, D-37, D-107; Autoryzacje usunięte – D-74), zdjęcia kadrowane do pionu 5 : 7; realizacje poza środkiem jako kalka (rysunek z krawędzi zdjęcia, linie 2 px, na białym arkuszu z kratką strony – D-112), w drodze na środek zdjęcie zjeżdża na nią z góry, w drodze na bok zjeżdża dalej w dół, ostatnia zostaje zdjęciem (D-108), sterowane przewijaniem, wzorzec „Full-scope” z metriccivil.ca. Wyśrodkowany nagłówek z opisem jest częścią sceny i stoi nad elementami na tym samym ekranie (D-40); rozmiar elementu dopasowuje się do wysokości, która zostaje pod nagłówkiem. Wyjątek – Oferta (`fullScreen`, D-45): nagłówek stoi nad przypiętą sceną i odjeżdża, a zdjęcie zajmuje 80% wysokości ekranu (mniej tylko tam, gdzie brakuje szerokości). Scena przypina się na czas zależny od liczby elementów (Autoryzacje `300vh`, po ekranie na element; Oferta `402vh`, po około 2/3 ekranu – D-38): pierwszy element od razu stoi na środku w pełnym rozmiarze, potem maleje do lewego górnego rogu, a z miniatury w prawym dolnym rogu rośnie następny; opis obok (numer, nazwa, tekst) widać tylko, gdy jego element stoi na środku. Elementy pojawiają się i znikają wyłącznie przez rozmiar (od i do 0 × 0 px), bez przenikania; opisy przenikają wraz z przewijaniem – pojawiają się pod koniec dojazdu elementu na środek, a znikają na samym początku jego odjazdu, gdy żaden ruszający się element nie wchodzi na ich kolumnę. Przejście zajmuje około 70% czasu między elementami, postój – około 30% (D-39). Elementy jadą jak łańcuch – wszystkie naraz, ze stałym odstępem między sąsiadami (10% szerokości), więc nic na nic nie nachodzi. Fokus klawiatury pokazuje sam element z fokusem, na środku. Warunki jak w sekwencji „O firmie”; poza nimi – zwykła lista bez ruchu (siatka). Sam CSS – [`CenterStage`](../src/components/motion/CenterStage.module.css) |
| Mgła, iskra, kapanie          | małe zapętlone animacje SVG, tylko w ilustracjach metod diagnostyki                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

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
- Favicon: parasol stołowy na biurku – [`src/app/icon.svg`](../src/app/icon.svg), wariant 1 z
  makiety `design/makiety/favicon-parasol-stolowy/` ([decyzje.md](decyzje.md) D-14). Źródłem jest
  SVG; PNG renderujemy z niego (po każdej zmianie SVG – ponownie):
  - [`src/app/icon.png`](../src/app/icon.png) – 32×32, dla przeglądarek bez favicon SVG,
  - [`src/app/apple-icon.png`](../src/app/apple-icon.png) – 180×180, kwadratowe tło bez
    przezroczystości (iOS sam zaokrągla rogi).
