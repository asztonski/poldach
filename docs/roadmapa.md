# Roadmapa

Kolejność prac i stan projektu. Zakres każdej strony – [mapa-strony.md](mapa-strony.md).

## Stan na 22.10.2026

**Zrobione:** szkielet Next.js ze statycznym eksportem, mapa witryny i `robots.txt`, narzędzia
jakości (TS strict, ESLint, Prettier), dokumentacja, tokeny (kolory, typografia, kontener, cień),
motywy sekcji i tło „rysunek techniczny”, Roboto Condensed, favicon (parasol na biurku, D-14) i `theme-color`, dane
firmy w `src/config/site.ts`, nagłówek z nawigacją (panel usług, menu mobilne w `<dialog>`, pasek z
telefonem na telefonie), hero z logo z postacią (D-15), jedna siatka dla całej strony (D-17), motyw
biały i skośne przejścia (D-18), układ strony głównej według KISS (D-23, D-29): oferta ze
zdjęciami usług (prototyp, D-44), „O firmie” (linia wymiarowa, licznik lat, siedziba), autoryzacje i nagroda (D-26,
D-28), realizacja, której zdjęcie zamienia się w rysunek (D-19, D-20), tymczasowo karty dom /
firma; strona 404, skany certyfikatów z opisem
(`src/data/certificates.ts`). Tymczasowe podstrony i stopka usunięte (D-11).

**Do uzupełnienia przed publikacją:**

- menu linkuje do stron, których jeszcze nie ma (404) – przed publikacją strony powstają albo
  znikają z menu,
- brak stopki; to ona ma dawać pełną listę linków także bez JavaScriptu (panel usług i menu mobilne
  wymagają JS),
- wartości oznaczone `TODO` w hero i w danych firmy (P-01, P-07, P-19, ocena Google),
- do zbudowania: sekcja 6 „Kontakt”, stopka (D-23, D-29),
- teksty sekcji „Oferta”, „O firmie” i realizacji – propozycja do akceptacji klienta; zakres oferty
  – P-04, P-10, kamienie milowe – P-09, podpis i opisy realizacji – P-21, dokumenty – P-05.

## Fazy

| Faza                     | Zakres                                                                                                                                                                                                                                                                    | Gotowe, gdy                                                                                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Fundamenty techniczne | tokeny i motywy, tło „rysunek techniczny”, Roboto Condensed, `src/brand/` (tokeny, logo, ikony), dane firmy, infrastruktura animacji, komponenty design systemu, obrazy, SEO (JSON-LD, Open Graph), formularz, analityka, testy; strona testowa `/playground` (`noindex`) | `/playground` spełnia [standardy.md](standardy.md) (mysz, dotyk, klawiatura, reduced motion, bez JS); tokeny identyczne z reklamą; tabele wartości w docs zastąpione odnośnikami do kodu |
| 2. Prototyp kierunku     | strona główna według D-23: hero, O firmie, Oferta, Realizacje, Kontakt                                                                                                                                                                                                    | klient mówi „tak” lub „nie” dla kierunku, zanim powstaną podstrony                                                                                                                       |
| 3. Wersja 1.0            | strona główna (wszystkie sekcje), podstrona diagnostyki, kontakt, polityka prywatności, przekierowania 301; momenty WOW: hero, składający się dach, linia wymiarowa, przejścia kolorów                                                                                    | lista „Przed publikacją” ze [standardy.md](standardy.md#przed-publikacją)                                                                                                                |
| 4. Wersja 1.1            | od dachu po podłogę, realizacje „rysunek → zdjęcie”, podstrony usług, B2B, lokalne, O nas                                                                                                                                                                                 | j.w.                                                                                                                                                                                     |
| 5. Wersja 1.2            | mini-gra „Znajdź przeciek”, przejścia między podstronami (View Transitions), poradniki                                                                                                                                                                                    | j.w.                                                                                                                                                                                     |

## Materiały do zebrania

- [ ] Odpowiedzi na otwarte pytania – [decyzje.md](decyzje.md#otwarte-pytania-do-klienta).
- [ ] Zdjęcia według listy ujęć – [design-system.md](design-system.md#zdjęcia). Stara strona
      (`/nasze-realizacje/`, przegląd 06.11.2026): 47 plików, w tym 9 kwadratowych wycinków
      pozostałych, około 10 obiektów, bez opisów, najwyżej 1920 px. Daty z EXIF: Kodak 2002–2006
      (zegar aparatu błędny – data wtopiona w zdjęcie), Panasonic 2008–2009, Samsung 2015–2016.
      Najlepsze: `02_P1010796`, `09_P1000142`, `01_P1010803`, `07_P1000151`,
      `23_20150508_123833`, `10_P1000137` – do każdego potrzebne miejscowość, zakres prac i zgoda na
      publikację. `02_P1010796` jest już w sekcji „Realizacje” (D-19, ⚠ P-21).
- [ ] Certyfikaty: oryginały lub skany z opisem (wystawca, czego dotyczy, rok, ważność).
- [ ] Projekt reklamy Remotion (`poldach-reklama.zip` – brak w przekazanych materiałach): tokeny do
      porównania i ilustracje do eksportu jako SVG.
- [ ] Wersja reklamy 16:9 z planszą tytułową na podstronę diagnostyki.
- [ ] Logo PSD: aktualny znak (PNG 87 × 87 px z [dekarz.com.pl](https://www.dekarz.com.pl/), pobrany
      05.11.2026) jest w `src/assets/images/logotypy/psd-znak.png`; brak wersji wektorowej. Na
      stronie tylko po potwierdzeniu członkostwa (P-19).
- [ ] Aktualna ocena i liczba opinii Google, sprawdzone bezpośrednio w Google Maps.
