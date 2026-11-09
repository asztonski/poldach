# metriccivil.ca – wnioski

Wzorzec wskazany przez właściciela projektu (06.11.2026): firma budowlana z Kanady (roboty ziemne,
drogi, sieci). Przegląd strony głównej 07.11.2026 na ekranie 1440 × 900, zrzuty co około 390 px
przewijania – `zrzuty/` (numeracja w kolejności strony).

## Technika

- Webflow + GSAP 3.15 (ScrollTrigger, SplitText), Lenis (płynne przewijanie), Swiper (slider
  realizacji), CountUp (liczniki).
- Kroje: Geom Graphic (szeroki, wersaliki – tytuły), Arial Nova (tekst), Azeret Mono (etykiety
  `[ 01/04 ]`).
- Barwy: kremowe tło `rgb(255 245 232)`, prawie czarny tekst, niebieski akcent `rgb(0 87 165)`
  (przyciski, stopka). Tytuły hero 78 px, wersaliki.

## Strona główna sekcja po sekcji

| #   | Sekcja                                  | Co pokazuje                                                                  | Efekt                                                                                       | Zrzut       |
| --- | --------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------- |
| 1   | Hero „We are the ground breakers.”      | zdjęcie koparki na całą stronę, hasło, jedno zdanie, miniatura wideo         | nagłówek przezroczysty nad zdjęciem                                                         | 01          |
| 2   | Przejście                               | zdjęcie zamienia się w rysunek konturowy tej samej koparki na kremowym tle   | przypięte; prosta krawędź jedzie od dołu (u nas: D-19, D-20)                                | 02          |
| 3   | „Our standard is higher.”               | tytuł po lewej, zdanie po prawej, linia, dwa zdjęcia z pracy                 | rysunek odjeżdża w górę, gdy wjeżdża tytuł                                                  | 03, 04      |
| 4   | „Trusted by top organizations”          | pasek logotypów klientów                                                     | przesuwa się w pętli                                                                        | 05          |
| 5   | „We're all in.”                         | zdjęcie na całą szerokość, 4 rozwijane pigułki: planowanie, wykonanie, …     | rozwijanie po kliknięciu                                                                    | 06, 07      |
| 6   | „Full-scope civil construction”         | 4 usługi po kolei: `[ 01/04 ]`, nazwa, jedno zdanie, duże zdjęcie + 2 małe   | przypięta sekwencja – zdjęcia i tekst zmieniają się przy przewijaniu, małe zdjęcia „płyną” | 08–11       |
| 7   | „First ones in / last ones out”         | tytuł rozdzielony zdjęciem z drona, zdanie, 4 liczby (realizacje, rok, m³, %) | liczniki odliczają przy pokazaniu                                                           | 12, 13      |
| 8   | „Our work”                              | karty realizacji: kategoria, miejscowość, klient, tagi usług, opis, link     | slider w poziomie `[ 01/05 ]` na rozmytym tle zdjęcia                                       | 14          |
| 9   | „Built on trust. Backed by results.”    | karty opinii z imieniem i firmą                                              | przesuwają się w pętli                                                                      | 15          |
| 10  | Kariera                                 | tytuł, zdanie, przycisk, stos kart wideo `[ 01/03 ]`                          | –                                                                                           | 16          |
| 11  | CTA „Start with METRIC.”                | zdjęcie z drona na całą szerokość, dwa przyciski: oferta, praca              | nazwa firmy konturem                                                                        | 17          |
| 12  | Stopka                                  | niebieska, kolumny `[01]…[04]`, zdjęcia zespołu, ogromny napis METRIC.       | –                                                                                           | 18          |

## Co bierzemy dla POLDACH

1. **Zdjęcie → rysunek** – już jest (D-19, D-20); u nich to przejście z hero do pierwszej sekcji, u
   nas otwiera realizacje.
2. **Numeracja w nawiasach** (`[ 01/04 ]`) – u nas „01 / 03” w nadtytułach (numeracja arkuszy,
   [design-system.md](../../../docs/design-system.md#tło-rysunek-techniczny)).
3. **Zakres usług po kolei** (sekcja 6) – wzór dla sekcji 2 „Czym się zajmujemy”: trzy grupy usług z
   menu, każda jako osobny arkusz z numerem, zdaniem, linkami i zdjęciem lub rysunkiem.
4. **Liczby z licznikiem** (sekcja 7) – nasza historia od 1992; tylko liczby potwierdzone (⚠ P-09).
5. **Karty realizacji** (sekcja 8) – miejscowość, rok, zakres jako tagi, opis, link; u nas bez
   nazwy klienta, dopóki nie ma zgody (⚠ P-21).
6. **Pasek logotypów i opinie** (sekcje 4 i 9) – producenci i certyfikaty (⚠ P-05), opinie Google
   tylko prawdziwe ([standardy.md](../../../docs/standardy.md#seo)).
7. **CTA na końcu z dwoma przyciskami** (sekcja 11) – u nas telefon oraz dwie ścieżki: dom i firma.
8. **Ogromna nazwa w stopce** – pasuje do naszej „tabliczki rysunkowej”.

## Czego nie bierzemy

- Ciemnego zdjęcia w hero – nasze hero jest żółte z logo z postacią (D-15).
- Zaokrąglonych rogów zdjęć – u nas ostre rogi rysunku technicznego.
- Sekcji kariery i wideo – brak materiału i potrzeby.
