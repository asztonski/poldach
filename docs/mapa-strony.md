# Mapa strony

Jakie strony istnieją, co jest na każdej z nich i jak przenosimy ruch ze starej strony. Wygląd
elementów opisuje [design-system.md](design-system.md), teksty – [komunikacja.md](komunikacja.md).

## Strony

Adresy z ukośnikiem na końcu (statyczny eksport, [decyzje.md](decyzje.md) D-03). Adresy są
propozycją – zatwierdzamy je przed wdrożeniem danej strony. Wersje – [roadmapa.md](roadmapa.md).

| Adres                                         | Strona                                    | Cel                                                           | Wersja |
| --------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------- | ------ |
| `/`                                           | Strona główna                             | pierwsze wrażenie, przegląd oferty, kontakt                   | 1.0    |
| `/wykrywanie-nieszczelnosci-dachow-plaskich/` | Wykrywanie nieszczelności dachów płaskich | strona docelowa kampanii wideo                                | 1.0    |
| `/kontakt/`                                   | Kontakt                                   | telefon, formularz, mapa                                      | 1.0    |
| `/polityka-prywatnosci/`                      | Polityka prywatności                      | wymagana przez formularz i analitykę                          | 1.0    |
| `/uslugi/`                                    | Usługi                                    | przegląd wszystkich usług, ten sam adres co na starej stronie | 1.1    |
| `/pokrycia-dachowe/`                          | Pokrycia i remonty dachów                 | usługa                                                        | 1.1    |
| `/obrobki-blacharskie-i-rynny/`               | Obróbki blacharskie i rynny               | usługa                                                        | 1.1    |
| `/docieplenia/`                               | Docieplenia dachów i poddaszy             | usługa                                                        | 1.1    |
| `/usuwanie-eternitu/`                         | Usuwanie eternitu                         | usługa + dotacje                                              | 1.1    |
| `/drzwi-i-podlogi/`                           | Drzwi i podłogi                           | montaż wykończeniowy                                          | 1.1    |
| `/dla-firm/`                                  | Dla firm, zarządców i deweloperów         | ścieżka B2B                                                   | 1.1    |
| `/realizacje/`, `/realizacje/[slug]/`         | Realizacje                                | dowód; każda realizacja jako osobna podstrona                 | 1.1    |
| `/o-nas/`                                     | O nas                                     | historia rodziny, zespół, certyfikaty                         | 1.1    |
| `/dekarz-starogard-gdanski/` i podobne        | Podstrony lokalne                         | lokalne SEO; lista miejscowości – ⚠ P-03                      | 1.1    |
| `/poradniki/`                                 | Poradniki                                 | treści pod frazy z długiego ogona                             | 1.2    |

**Nawigacja:** żadna usługa nie przytłacza pozostałych. Menu – `src/config/navigation.ts`:
„Usługi” otwiera panel z trzema równymi grupami (Dachy · Usługi specjalistyczne · Wykończenia), dalej
Dla firm · Realizacje · O nas · Kontakt; logo prowadzi na stronę główną (⚠ P-10, decyzje.md D-11).

**Kampanie** kierują na podstronę swojej usługi, nigdy na stronę główną. Dopóki podstrony nie ma,
wezwaniem do działania jest telefon.

## Strona główna

| #   | Sekcja                                                                                                                                                  | Motyw                                  | Moment WOW                                | Cel                                    |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ----------------------------------------- | -------------------------------------- |
| 0   | Nagłówek: logo, menu, przycisk-telefon                                                                                                                  | żółty                                  | zmniejsza się przy przewijaniu            | kontakt zawsze pod ręką                |
| 1   | Hero: nadtytuł „RODZINNA FIRMA DEKARSKA · OD 1992”, tytuł (⚠ P-07), telefon, „Bezpłatna wycena”, notatki pisakiem (od 1992 · PSD ⚠ P-19 · ocena Google) | żółty, wspólne tło z nagłówkiem (D-15) | logo z postacią i parasolem               | pierwsze wrażenie, zaufanie            |
| 2   | Wybór ścieżki: „Dom” / „Firma, zarządca, deweloper”                                                                                                     | żółty                                  | –                                         | segmentacja odbiorców                  |
| 3   | Usługi dekarskie                                                                                                                                        | niebieski                              | dach składa się przy przewijaniu          | pełna oferta dekarska                  |
| 4   | Od dachu po podłogę: drzwi, podłogi, parapety                                                                                                           | żółty                                  | interaktywny przekrój domu                | wyróżnik „wszystko z jednej ręki”      |
| 5   | Usługi specjalistyczne: diagnostyka dachów płaskich i usuwanie eternitu – dwie karty z linkami                                                          | niebieski                              | celownik                                  | dowód fachowości, wejście na podstrony |
| 6   | Jak pracujemy: doradztwo → bezpłatny kosztorys → materiał własny lub powierzony → montaż → odbiór i gwarancja                                           | żółty                                  | linia procesu rysuje się przy przewijaniu | usuwa niepewność                       |
| 7   | Rodzinna firma od 1992: oś czasu i liczby                                                                                                               | niebieski                              | historia jako linia wymiarowa             | doświadczenie                          |
| 8   | Realizacje: 3–6 najlepszych                                                                                                                             | żółty                                  | rysunek → zdjęcie                         | dowód                                  |
| 9   | Opinie, PSD, certyfikaty producentów                                                                                                                    | niebieski                              | –                                         | zaufanie                               |
| 10  | Kontakt: telefon, krótki formularz, mapa                                                                                                                | żółty                                  | –                                         | konwersja                              |
| 11  | Stopka – tabliczka rysunkowa                                                                                                                            | granat                                 | –                                         | wiarygodność                           |

### Momenty WOW

- **Logo z postacią (hero, D-15, D-16):** obok tytułu, bez ekranu ładowania. Raz przy każdym
  wejściu: postać wygląda zza biurka, chowa się i wyskakuje, parasol wysuwa się i otwiera, litery
  POLDACH pojawiają się po kolei, na końcu hasło na biurku – około 5,2 s. Parametry –
  [design-system.md](design-system.md#ruch).
  Rysujący się dom (`HouseIllustration` + `DrawOnLoad`) zszedł z hero i czeka na nowe miejsce.
- **Dach składa się przy przewijaniu (główny efekt, ⚠ P-08):** przekrój buduje się warstwami: więźba
  → ocieplenie → membrana → kontrłaty i łaty → pokrycie → obróbki i okno dachowe → rynny. Każdy etap
  ma nadtytuł „ETAP 03 / 07”, jedno zdanie i link do usługi. Na końcu podsumowanie: „Tak robimy dachy
  od 1992 roku – kompleksowo, z materiałów własnych lub powierzonych”. Na telefonie krótsza sekwencja
  bez długiego przypinania.
- **Od dachu po podłogę:** przekrój domu z celownikami (dach, okno dachowe, rynny, drzwi zewnętrzne i
  wewnętrzne, podłoga, parapet). Kliknięcie otwiera kartę usługi, przy przewijaniu punkty zapalają się
  po kolei.
- **Historia jako linia wymiarowa:** 1992 → 2003 → dziś; strzałki rozciągają się przy przewijaniu,
  liczba lat liczy się sama. Obok liczby (lata, opinie, obszar) w formie wymiarów.
- **Rysunek → zdjęcie:** karta realizacji pokazuje kontur budynku, maska odsłania zdjęcie (najechanie
  na komputerze, przewinięcie na telefonie). Wariant „przed/po” jako suwak z linią wymiarową jako
  uchwytem. Wymaga prawdziwych zdjęć.

## Podstrony

| Podstrona                 | Zawartość                                                                                                                 | Moment WOW                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Wykrywanie nieszczelności | wideo 16:9 na górze; scenariusz reklamy jako przewijana opowieść (tabela niżej); dla kogo; jak wygląda zlecenie; telefon  | przypięta sekcja z trzema metodami; w 1.2 mini-gra „Znajdź przeciek” z celownikiem i współrzędnymi jak w CAD |
| Dla firm                  | referencje, realizacje, PSD, od 1992, pełen zakres usług, pakiet „dach + drzwi + podłogi”                                 | dach płaski hali składający się przy przewijaniu; pakiet na przekroju budynku wielorodzinnego                |
| Usuwanie eternitu         | proces, dotacje gminne (argument – [komunikacja.md](komunikacja.md#wyróżniki-na-tle-konkurencji)), oferta nowego pokrycia | suwak „przed/po”: eternit → nowe pokrycie; ścieżka dotacji jako rysująca się linia procesu                   |
| Drzwi i podłogi           | zakres montażu, galeria realizacji                                                                                        | przekrój podłogi i ościeżnicy rysujący się linią                                                             |
| O nas                     | rozbudowana oś czasu rodziny, zdjęcia braci i ekipy, certyfikaty                                                          | –                                                                                                            |
| Realizacje                | karta: miejscowość, rok, typ obiektu, zakres                                                                              | rysunek → zdjęcie                                                                                            |
| Kontakt                   | telefon, formularz, mapa po kliknięciu, dane firmy                                                                        | –                                                                                                            |
| Podstrony lokalne         | lokalne realizacje i opinie                                                                                               | –                                                                                                            |

### Scenariusz podstrony diagnostyki

Według reklamy wideo (36,9 s) – podstronę można zbudować dosłownie według tej tabeli.

| Sekcja             | Motyw     | Treść                                                                                                |
| ------------------ | --------- | ---------------------------------------------------------------------------------------------------- |
| Problem (początek) | niebieski | „Przeciek na dachu płaskim? Tylko skąd kapie?” – hala, kapiąca kropla                                |
| Problem            | niebieski | „Szukanie na ślepo?” – zrywane płyty, ✗ przestój, ✗ koszty                                           |
| Rozwiązanie        | żółty     | „Lokalizujemy nieszczelność bez naruszania pokrycia”, pigułka „Pokrycie nienaruszone”                |
| Metoda 01 / 03     | żółty     | elektroakustyka, celownik „± 1 cm”                                                                   |
| Metoda 02 / 03     | niebieski | zadymianie, mgła, deszcz                                                                             |
| Metoda 03 / 03     | żółty     | próbnik iskrowy, licznik m²/dzień                                                                    |
| Co dostajesz       | niebieski | „Po diagnozie – wskazujemy miejsce i sposób naprawy”                                                 |
| Kontakt            | żółty     | nadtytuł „WYKRYWANIE NIESZCZELNOŚCI DACHÓW PŁASKICH”, logo, hasło, telefon, e-mail, www, lokalizacja |

## Przekierowania 301 ze starej strony

Stara strona to WordPress (10 podstron). Przekierowania chronią to, co Google już zaindeksował. Plik
przekierowań zależy od hostingu (⚠ P-15) – [architektura.md](architektura.md#wdrożenie).

| Stary adres                  | Nowy adres                                   |
| ---------------------------- | -------------------------------------------- |
| `/dachy/`                    | `/pokrycia-dachowe/`                         |
| `/drzwi/`                    | `/drzwi-i-podlogi/`                          |
| `/podlogi/`                  | `/drzwi-i-podlogi/`                          |
| `/okna/`                     | ⚠ P-04 (okna dachowe → `/pokrycia-dachowe/`) |
| `/parapety-i-blaty/`         | ⚠ P-04 (→ `/drzwi-i-podlogi/`)               |
| `/tarasy-balkony-eleawacje/` | ⚠ P-04                                       |
| `/uslugi/`                   | bez zmian                                    |
| `/certyfikaty-i-referencje/` | `/o-nas/`                                    |
| `/nasze-realizacje/`         | `/realizacje/`                               |
| `/kontakt/`                  | bez zmian                                    |
