# Mapa strony

Jakie strony istnieją, co jest na każdej z nich i jak przenosimy ruch ze starej strony. Wygląd
elementów opisuje [design-system.md](design-system.md), teksty – [komunikacja.md](komunikacja.md).

## Strony

Adresy z ukośnikiem na końcu (statyczny eksport, [decyzje.md](decyzje.md) D-03). Adresy są
propozycją – zatwierdzamy je przed wdrożeniem danej strony. Wersje – [roadmapa.md](roadmapa.md).

| Adres                                         | Strona                                    | Cel                                                                                                                                                         | Wersja |
| --------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `/`                                           | Strona główna                             | pierwsze wrażenie, przegląd oferty, kontakt                                                                                                                 | 1.0    |
| `/wykrywanie-nieszczelnosci-dachow-plaskich/` | Wykrywanie nieszczelności dachów płaskich | strona docelowa kampanii wideo                                                                                                                              | 1.0    |
| `/kontakt/`                                   | Kontakt                                   | telefon, formularz, mapa                                                                                                                                    | 1.0    |
| `/polityka-prywatnosci/`                      | Polityka prywatności                      | wymagana przez formularz i analitykę                                                                                                                        | 1.0    |
| `/uslugi/`                                    | Usługi                                    | przegląd wszystkich usług, ten sam adres co na starej stronie                                                                                               | 1.1    |
| `/dachy/`                                     | Dachy                                     | pokrycia, remonty, obróbki, rynny, docieplenia; ten sam adres co na starej stronie                                                                          | 1.1    |
| `/usuwanie-eternitu/`                         | Usuwanie eternitu                         | usługa + dotacje                                                                                                                                            | 1.1    |
| `/okna/`                                      | Okna                                      | okna i okna dachowe                                                                                                                                         | 1.1    |
| `/drzwi/`                                     | Drzwi                                     | drzwi wewnętrzne i zewnętrzne, bramy garażowe – sprzedaż w salonie i montaż                                                                                 | 1.1    |
| `/podlogi/`                                   | Podłogi                                   | podłogi drewniane i laminowane – sprzedaż w salonie i montaż                                                                                                | 1.1    |
| `/sprzedaz/`                                  | Sprzedaż – salon w Kokoszkowych           | drugi filar (D-58, D-59): salon w siedzibie, drzwi i podłogi, a także okna, parapety, blaty, deski tarasowe, okładziny, materiały dachowe; godziny – ⚠ P-02 | 1.1    |
| `/parapety-i-blaty/`                          | Parapety i blaty                          | parapety wewnętrzne i zewnętrzne, blaty                                                                                                                     | 1.1    |
| `/tarasy-balkony-elewacje/`                   | Tarasy, balkony, elewacje                 | deski z kompozytu drewna                                                                                                                                    | 1.1    |
| `/dla-firm/`                                  | Dla firm, zarządców i deweloperów         | ścieżka B2B; poza menu, wchodzi się z kart „Dom / Firma” (D-59)                                                                                             | 1.1    |
| `/realizacje/`, `/realizacje/[slug]/`         | Realizacje                                | dowód; każda realizacja jako osobna podstrona                                                                                                               | 1.1    |
| `/dekarz-starogard-gdanski/` i podobne        | Podstrony lokalne                         | lokalne SEO; lista miejscowości – ⚠ P-03                                                                                                                    | 1.1    |
| `/poradniki/`                                 | Poradniki                                 | treści pod frazy z długiego ogona                                                                                                                           | 1.2    |

**Nawigacja:** żadna usługa nie przytłacza pozostałych. Menu – `src/config/navigation.ts`:
dwa filary – „Usługi” (Dach · Dom, kategorie starej strony, D-46) i „Sprzedaż” (Salon w
Kokoszkowych: drzwi, podłogi; D-58, D-59) – dalej Realizacje · Kontakt; bez „O nas” i „Dla firm”;
logo prowadzi na stronę główną (⚠ P-10). W nagłówku na komputerze filary to zwykłe linki do stron
przeglądowych, bez paneli (D-60); podstrony grup wymieniają stopka (D-57) i menu mobilne.

**Kampanie** kierują na podstronę swojej usługi, nigdy na stronę główną. Dopóki podstrony nie ma,
wezwaniem do działania jest telefon.

## Strona główna

| #   | Sekcja                                                                                                                                                                                                                            | Motyw                                         | Moment WOW                                                                                                  | Cel                                                                           |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 0   | Nagłówek: logo, menu, przycisk-telefon                                                                                                                                                                                            | żółty                                         | chowa się przy przewijaniu w dół, wraca przy ruchu w górę (D-41); w przypiętych scenach – D-56              | nawigacja i telefon po ruchu w górę; na telefonie numer zawsze w dolnym pasku |
| 1   | Hero: nadtytuł „RODZINNA FIRMA DEKARSKA · OD 1992”, tytuł (⚠ P-07), telefon, „Bezpłatna wycena”, notatki pisakiem (od 1992 · PSD ⚠ P-19 · ocena Google)                                                                           | żółty, wspólne tło z nagłówkiem (D-15)        | logo z postacią i parasolem                                                                                 | pierwsze wrażenie, zaufanie                                                   |
| 2   | Realizacja z bliska: zdjęcie kamienicy na cały ekran, pod nim rysunek techniczny; bez nagłówka (D-19, D-20, D-50)                                                                                                                 | biały                                         | zdjęcie stoi, potem skraca się od dołu i odsłania rysunek; następna sekcja najeżdża na rysunek (D-51, D-54) | najmocniejszy obraz, fachowość                                                |
| 3   | O firmie „Dachy robimy od 1992 roku”: rodzinnie, model pracy, siedziba w Kokoszkowych, kamienie milowe (D-23, D-53)                                                                                                               | niebieski w całości, nagłówek w scenie (D-53) | linia wymiarowa 1992 ↔ dziś, licznik lat                                                                    | zaufanie, doświadczenie                                                       |
| 4   | Oferta „Czym się zajmujemy”: pas z nagłówkiem, pod nim oba filary z menu – usługi, potem salon (drzwi, podłogi) – po kolei przez środek ekranu: zdjęcie, nazwa, opis; zdjęcie prowadzi do podstrony (D-29, D-37, D-44–D-46, D-58) | biały, żółty pas z nagłówkiem (D-53)          | zdjęcia po kolei przez środek ekranu                                                                        | co robimy i sprzedajemy, wejście na podstrony                                 |
| 5   | Autoryzacje i nagroda: trzy skany z opisem (D-26, D-28)                                                                                                                                                                           | biały, niebieski pas (D-47)                   | skany po kolei przez środek ekranu                                                                          | dowód kwalifikacji                                                            |
| 6   | Tymczasowo: karty „Dom / Firma”                                                                                                                                                                                                   | biały, niebieski pas (D-47)                   | –                                                                                                           | wybór ścieżki                                                                 |
| 7   | Kontakt (do zbudowania): jak zacząć (doradztwo → kosztorys → materiał → montaż), telefon, krótki formularz, mapa po kliknięciu, dom i firma                                                                                       | –                                             | –                                                                                                           | konwersja                                                                     |
| 8   | Stopka na każdej stronie – linki obu filarów i firmy, tabliczka rysunkowa, duży napis POLDACH (D-57)                                                                                                                              | granat                                        | –                                                                                                           | wiarygodność, linki bez JS                                                    |

Skosy między sekcjami – na zmianę według kolejności (D-24); stopka dalej w tym rytmie (D-57).
Realizacje z kartami – po odpowiedzi na P-21.

### Momenty WOW

- **Logo z postacią (hero, D-15, D-16):** obok tytułu, bez ekranu ładowania. Raz przy każdym
  wejściu: postać wygląda zza biurka, chowa się i wyskakuje, parasol wysuwa się i otwiera, litery
  POLDACH pojawiają się po kolei, na końcu hasło na biurku – około 5,2 s. Parametry –
  [design-system.md](design-system.md#ruch).
- **Hero zostaje w miejscu (D-21):** przy przewijaniu hero stoi, a sekcja 2 nasuwa się na nie
  skośną krawędzią jak arkusz kładziony na arkusz.
- **Oferta (sekcja 2, D-29, D-37, D-45):** duży wyśrodkowany nagłówek odjeżdża przy przewijaniu, a
  potem osiem kategorii (jak na starej stronie, D-46) przechodzi po kolei przez środek całego ekranu,
  każda jako pionowe zdjęcie na 80% jego wysokości, na białym tle (D-44, D-47; zdjęcia ze starej
  strony – ⚠ P-22) – rośnie z
  miniatury, potem maleje do rogu,
  a obok zmienia się opis. Ten sam ruch co w Autoryzacjach (`CenterStage`).
- **Historia jako linia wymiarowa (sekcja 3, D-25):** gdy sekcja wypełni ekran, staje, a
  przewijanie odtwarza ją: kolumny wjeżdżają z boków, liczba lat od 1992 rośnie razem z linią
  wymiarową, która z krótkiego odcinka rozciąga się w prawo, a kamienie milowe (1992, 2003, 2005,
  2006, dziś – ⚠ P-09) pojawiają się pod nią po kolei.
- **Autoryzacje i nagroda (sekcja 4, D-26, D-28):** pod dużym wyśrodkowanym nagłówkiem trzy skany
  przechodzą po kolei przez środek ekranu – rosną z miniatury, potem maleją do rogu, a obok
  zmienia się opis (wzorzec „Full-scope” z metriccivil.ca).
- **Zdjęcie → rysunek (sekcja 5, D-19, D-20; wzorzec: metriccivil.ca):** zdjęcie kamienicy na całą
  szerokość; przy przewijaniu od dołu zamienia się w rysunek techniczny tego budynku na papierze
  sekcji – na niebieskim białe linie jak cyjanotypia. Na końcu opisy: więźba, pokrycie, obróbki,
  rynny, okno dachowe (⚠ P-21). Na komputerze zdjęcie przypięte na wysokość ekranu, na telefonie
  bez przypinania. Parametry – [design-system.md](design-system.md#ruch).

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

## Treści starej strony

Nowa strona mówi to samo co stara, ale pokazuje zamiast wyliczać: stara to katalog kategorii
(„firma handlowo-usługowa”), nowa – opowieść o jednej firmie od dachu po podłogę. Treści starej
strony dosłownie: [design/stara-strona/](../design/stara-strona/tresci.md).

| Stara strona                                                                                 | Nowe miejsce                                                                                                                     | Na miarę 2026 – WOW lub „aha”                                                                                                     |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Slider „Dachy · Drzwi · Podłogi · Okna · Tarasy” (zdjęcie sklepu)                            | hero – lead „Nowe dachy i remonty – a w domu także drzwi…”                                                                       | logo z postacią, hero zostaje w miejscu (D-16, D-21); zdjęcie zamkniętego sklepu znika ([firma.md](firma.md))                     |
| Pasek „Świadczymy usługi na najwyższym poziomie!”                                            | sekcja 5 – realizacja zamiast przymiotnika                                                                                       | aha: zdjęcie realizacji zamienia się w rysunek techniczny (D-19, D-20)                                                            |
| „O nas”: od 1992, z ojca na syna, doszkalanie, PSD, Rzetelna Firma                           | sekcja 3 „O firmie”                                                                                                              | linia wymiarowa 1992 ↔ dziś, lata liczą się same; ⚠ P-06, P-19                                                                    |
| „O nas”: bezpłatne doradztwo → wycena → materiał → wykonanie                                 | sekcja 3 (zdanie) i sekcja 6 – „jak zacząć”                                                                                      | cztery kroki nad formularzem                                                                                                      |
| „Czym się zajmujemy” – 8 kafli ze zdjęciami (okna, parapety, tarasy, drzwi, …)               | sekcja 4 „Oferta” – oba filary jak w menu: kategorie starej strony i dwie usługi specjalistyczne, potem salon (D-29, D-46, D-58) | te same zdjęcia po kolei przez środek ekranu                                                                                      |
| `/dachy/`: dachówki, blachodachówka, trapez, rąbek, papa, membrana                           | `/dachy/` – ten sam adres, także obróbki, rynny i docieplenia                                                                    | rodzaje pokryć własnymi słowami na podstronie                                                                                     |
| „Sprzedaż” w menu (materiały)                                                                | „Sprzedaż” w menu – salon w Kokoszkowych (D-58, D-59)                                                                            | sprzedaż i montaż na jednej podstronie kategorii; zakres – [firma.md](firma.md#salon-w-kokoszkowych)                              |
| `/okna/` (okna, okna dachowe), `/parapety-i-blaty/`                                          | te same adresy                                                                                                                   | –                                                                                                                                 |
| `/tarasy-balkony-eleawacje/` (deski kompozytowe)                                             | `/tarasy-balkony-elewacje/` – bez literówki                                                                                      | ⚠ P-04                                                                                                                            |
| `/drzwi/`, `/podlogi/`                                                                       | te same adresy                                                                                                                   | –                                                                                                                                 |
| `/uslugi/` – lista usług                                                                     | `/uslugi/` – „Usługi” w menu                                                                                                     | trzy grupy zamiast jednej listy (D-11, D-46)                                                                                      |
| `/certyfikaty-i-referencje/` – 24 skany bez opisu                                            | sekcja Autoryzacje na stronie głównej (`src/data/certificates.ts`, D-59)                                                         | każdy skan z wystawcą i rokiem; ⚠ P-05                                                                                            |
| `/nasze-realizacje/` – 38 zdjęć bez opisów                                                   | sekcja 5, `/realizacje/`                                                                                                         | zdjęcie → rysunek, każda realizacja z opisem (⚠ P-21)                                                                             |
| Mapa Google na całą szerokość; `/kontakt/`: siedziba z godzinami, sklep na Zaspie, formularz | sekcja 6 „Kontakt”, `/kontakt/`                                                                                                  | mapa dopiero po kliknięciu ([standardy.md](standardy.md#prywatność)); sklep zamknięty – bez niego; godziny ⚠ P-02, telefon ⚠ P-01 |

Opisy producentów ze starej strony (Sonarol, Stegu, EcoTeak, akapity o dachówkach i podłogach) nie
wracają – piszemy własne krótkie teksty ([komunikacja.md](komunikacja.md#zasady-pisania)).

## Przekierowania 301 ze starej strony

Stara strona to WordPress (10 podstron). Przekierowania chronią to, co Google już zaindeksował. Plik
przekierowań zależy od hostingu (⚠ P-15) – [architektura.md](architektura.md#wdrożenie).

| Stary adres                  | Nowy adres                  |
| ---------------------------- | --------------------------- |
| `/dachy/`                    | bez zmian                   |
| `/drzwi/`                    | bez zmian                   |
| `/podlogi/`                  | bez zmian                   |
| `/okna/`                     | bez zmian                   |
| `/parapety-i-blaty/`         | bez zmian                   |
| `/tarasy-balkony-eleawacje/` | `/tarasy-balkony-elewacje/` |
| `/uslugi/`                   | bez zmian                   |
| `/certyfikaty-i-referencje/` | `/`                         |
| `/nasze-realizacje/`         | `/realizacje/`              |
| `/kontakt/`                  | bez zmian                   |
