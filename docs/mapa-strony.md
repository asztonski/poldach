# Mapa strony

Jakie strony istnieją, co jest na każdej z nich i jak przenosimy ruch ze starej strony. Wygląd
elementów opisuje [design-system.md](design-system.md), teksty – [komunikacja.md](komunikacja.md).

## Strony

Osiem adresów ([decyzje.md](decyzje.md) D-84, D-103, D-113): strona główna opowiada całość, a każdy link
menu prowadzi na stronę jednego tematu. Gdzie stara strona miała stronę o tym samym, nowa zostaje
pod jej adresem – kolumna „Stary adres”; to jedyna lista takich stron (przekierowania i
przeprowadzka odsyłają tutaj). Adresy z ukośnikiem na końcu (statyczny eksport, D-03). Ścieżki –
[`src/config/routes.ts`](../src/config/routes.ts).

| Adres                         | Strona                                    | Stary adres | Cel                                                                                                                                                       |
| ----------------------------- | ----------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                           | Strona główna                             | tak         | pierwsze wrażenie, oba filary, realizacje, opinie, kontakt z formularzem i mapą                                                                           |
| `/uslugi/`                    | Usługi dekarskie i montaż                 | tak         | pierwszy filar: scena oferty tylko z usługami, kontakt                                                                                                    |
| `/wykrywanie-nieszczelnosci/` | Wykrywanie nieszczelności dachów płaskich | –           | strona docelowa kampanii wideo (D-02)                                                                                                                     |
| `/sprzedaz/`                  | Sprzedaż – salon w Kokoszkowych           | –           | drugi filar (D-58): scena oferty tylko ze sprzedażą, kontakt z mapą; godziny – ⚠ P-02                                                                     |
| `/nasze-realizacje/`          | Nasze realizacje                          | tak         | scena zdjęć realizacji (jak oferta, D-107), kontakt; opisy i więcej realizacji – ⚠ P-21                                                                   |
| `/certyfikaty-i-referencje/`  | Certyfikaty                               | tak         | skany certyfikatów po kolei przez środek ekranu (jak realizacje, bez kalek, D-113), bez listów referencyjnych (D-115), kontakt; które pokazujemy – ⚠ P-05 |
| `/kontakt/`                   | Kontakt                                   | tak         | telefon, adres, formularz, mapa                                                                                                                           |
| `/polityka-prywatnosci/`      | Polityka prywatności                      | –           | wymagana przez formularz, statystyki i mapę (⚠ P-24)                                                                                                      |

Nowa podstrona – tylko po nowej decyzji (np. podstrony lokalne po P-03).

**Nawigacja** – `src/config/navigation.ts`: Usługi · Nieszczelności · Sprzedaż · Realizacje ·
Certyfikaty · Kontakt – każda pozycja to strona (D-90, D-103, D-114); zwykłe linki (D-60), logo
prowadzi na stronę główną (⚠ P-10). Stopka – wszystkie adresy w dwóch grupach: Oferta (usługi,
wykrywanie nieszczelności, sprzedaż) i Firma (realizacje, certyfikaty, kontakt,
polityka prywatności; D-89, D-113). Żadnego linku do strony, której
nie ma. „Bezpłatna wycena” płynie do sekcji kontaktu na tej samej stronie (D-97); pozycje
oferty prowadzą na swoje strony (D-106); każda strona, która sprzedaje, kończy się kontaktem.

**Kampanie** kierują na podstronę swojej usługi, nigdy na stronę główną.

## Strona główna

| #   | Sekcja                                                                                                                                                                                                                                                                                                                                                                  | Motyw                                                                                       | Moment WOW                                                                                                  | Cel                                                                           |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 0   | Nagłówek: logo, menu, przycisk-telefon                                                                                                                                                                                                                                                                                                                                  | żółty                                                                                       | chowa się przy przewijaniu w dół, wraca przy ruchu w górę (D-41); w przypiętych scenach – D-56              | nawigacja i telefon po ruchu w górę; na telefonie numer zawsze w dolnym pasku |
| 1   | Hero: nadtytuł „RODZINNA FIRMA DEKARSKA · OD 1992”, tytuł (⚠ P-07), telefon, „Bezpłatna wycena”, notatki pisakiem (od 1992 · PSD ⚠ P-19 · ocena Google)                                                                                                                                                                                                                 | żółty, wspólne tło z nagłówkiem (D-15)                                                      | logo z postacią i parasolem                                                                                 | pierwsze wrażenie, zaufanie                                                   |
| 2   | Realizacja z bliska: zdjęcie kamienicy na cały ekran, pod nim rysunek techniczny; bez nagłówka (D-19, D-20, D-50)                                                                                                                                                                                                                                                       | biały                                                                                       | zdjęcie stoi, potem skraca się od dołu i odsłania rysunek; następna sekcja najeżdża na rysunek (D-51, D-54) | najmocniejszy obraz, fachowość                                                |
| 3   | O firmie „Dachy robimy od 1992 roku”: rodzinnie, model pracy, siedziba w Kokoszkowych, kamienie milowe (D-23, D-53)                                                                                                                                                                                                                                                     | niebieski w całości, nagłówek w scenie (D-53)                                               | linia wymiarowa 1992 ↔ dziś, licznik lat                                                                    | zaufanie, doświadczenie                                                       |
| 4   | Oferta „Czym się zajmujemy”: oba filary – najpierw usługi, potem sprzedaż w salonie (dziewięć pozycji, D-79) – po kolei przez środek ekranu: zdjęcie, nazwa, opis; „[ zobacz ]” prowadzi na stronę pozycji – usługi na `/uslugi/`, wykrywanie nieszczelności na swoją, sprzedaż na `/sprzedaz/`; na tych stronach pozycja bez linku (D-106). Dane – `src/data/offer.ts` | rozmyte zdjęcie aktywnej usługi, nagłówek na białym arkuszu w scenie (prototyp, D-65, D-66) | zdjęcia po kolei przez środek ekranu                                                                        | co robimy i sprzedajemy, wejście na podstrony                                 |
| 5   | Opinie klientów: wyśrodkowany tytuł, cytaty na kartach obok siebie – listy referencyjne ze starej strony i opinie z Google (D-74, ⚠ P-23)                                                                                                                                                                                                                               | niebieski (D-75)                                                                            | –                                                                                                           | zaufanie                                                                      |
| 5a  | Druga realizacja z bliska: elewacja od podwórza z trzema lukarnami, zdjęcie na cały ekran, pod nim rysunek techniczny – działa jak sekcja 2 (D-81, ⚠ P-21)                                                                                                                                                                                                              | biały                                                                                       | zdjęcie stoi, skraca się od dołu, odsłania rysunek; następna sekcja na niego najeżdża                       | dowód, fachowość                                                              |
| 6   | Kontakt (`#kontakt`, D-84–D-86): jak zacząć (doradztwo → kosztorys → materiał → wykonanie), krótki formularz, siedziba i salon z telefonem, e-mailem i mapą (D-91). Ta sama sekcja zamyka podstrony (`ContactSection`)                                                                                                                                                  | biały, niebieski pas (D-47)                                                                 | –                                                                                                           | konwersja                                                                     |
| 7   | Stopka na każdej stronie – telefon i e-mail, linki „Oferta” i „Firma”, tabliczka rysunkowa ze znakiem PSD, duży napis POLDACH (D-57, D-84, D-89)                                                                                                                                                                                                                        | niebieski (D-80)                                                                            | –                                                                                                           | wiarygodność, linki bez JS                                                    |

Sekcje i stopka stykają się prostymi krawędziami (D-67).
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
  a obok zmienia się opis (`CenterStage`).
- **Historia jako linia wymiarowa (sekcja 3, D-25):** gdy sekcja wypełni ekran, staje, a
  przewijanie odtwarza ją: kolumny wjeżdżają z boków, liczba lat od 1992 rośnie razem z linią
  wymiarową, która z krótkiego odcinka rozciąga się w prawo, a kamienie milowe (1992, 2003, 2005,
  2006, dziś – ⚠ P-09) pojawiają się pod nią po kolei.
- **Zdjęcie → rysunek (sekcja 5, D-19, D-20; wzorzec: metriccivil.ca):** zdjęcie kamienicy na całą
  szerokość; przy przewijaniu od dołu zamienia się w rysunek techniczny tego budynku na papierze
  sekcji – na niebieskim białe linie jak cyjanotypia. Na końcu opisy: więźba, pokrycie, obróbki,
  rynny, okno dachowe (⚠ P-21). Na komputerze zdjęcie przypięte na wysokość ekranu, na telefonie
  bez przypinania. Parametry – [design-system.md](design-system.md#ruch).

## Podstrony

Strony tematów zaczynają się żółtym otwarciem jak hero (`PageHero`: nadtytuł, h1, lead i przyciski
tej strony) i kończą sekcją kontaktu. Realizacje i certyfikaty otwiera hero strony głównej
(`HeroSection`) z własnym nadtytułem, h1 i leadem (D-116, D-117). Telefon i „Bezpłatna wycena” są
w otwarciu tylko na stronie głównej – każda podstrona ma przyciski od swojego tematu (D-121):

| Strona                    | Przyciski w otwarciu (pierwszy – główny)                                 |
| ------------------------- | ------------------------------------------------------------------------ |
| Usługi                    | „Zamów wycenę” (kontakt) · „Zobacz, co robimy” (oferta)     |
| Wykrywanie nieszczelności | „Umów lokalizację przecieku” (kontakt) · „Zobacz trzy metody” (metody)   |
| Sprzedaż                  | „Zobacz, co sprzedajemy” (oferta) · „Dojazd do salonu” (Mapy Google)     |
| Kontakt                   | telefon · „Napisz do nas” (formularz) · „Dojazd do salonu” (Mapy Google) |
| Realizacje                | „Zobacz realizacje” (galeria) · „Zapytaj o podobny dach” (kontakt)       |
| Certyfikaty               | „Zobacz certyfikaty” (galeria) · „Bezpłatna wycena” (kontakt)            |

Polityka prywatności – bez otwarcia: tytuł i tekst na białym arkuszu nad siatką (D-92).

| Podstrona                 | Teraz                                                                                                                                                                                                                                                                                                                                       | Później                                                                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Usługi                    | otwarcie ze zdjęciem dachu, scena oferty tylko z usługami (`OfferSection`), kontakt                                                                                                                                                                                                                                                         | –                                                                                                                                                 |
| Wykrywanie nieszczelności | otwarcie: problem i rozwiązanie obok reklamy wideo 4:5 (D-88); trzy metody na arkuszach, „po diagnozie”, kontakt                                                                                                                                                                                                                            | scenariusz reklamy jako przewijana opowieść (tabela niżej), przypięta sekcja z metodami; w 1.2 mini-gra „Znajdź przeciek” z celownikiem jak w CAD |
| Sprzedaż                  | salon w otwarciu (zdjęcie siedziby), scena oferty tylko ze sprzedażą (`OfferSection`, pozycje z `src/data/offer.ts`), kontakt z mapą                                                                                                                                                                                                        | godziny otwarcia (⚠ P-02)                                                                                                                         |
| Realizacje                | hero strony głównej: „Nasze dachy z bliska”, „Zobacz realizacje” (D-116, D-117), scena „Co zrobiliśmy” – realizacje po kolei przez środek ekranu: z boku kalka, na środku zdjęcie, kalka przechodzi w zdjęcie (`PhotoStage`, D-108; lista – `src/data/projects.ts`), kontakt; zdjęcie zamieniające się w rysunek zostaje na stronie głównej | opisy realizacji (miejscowość, rok, zakres) i więcej zdjęć (⚠ P-21)                                                                               |
| Certyfikaty               | hero strony głównej: „Fach potwierdzony na piśmie”, „Zobacz certyfikaty” (D-116, D-117), scena „Kto za nas ręczy” – skany po kolei przez środek ekranu, bez kalek (`PhotoStage`, D-113; lista – `src/data/certificates.ts`, szkolenie obu braci jako jedna pozycja, bez listów referencyjnych – D-115), kontakt                             | dokumenty wybrane przez klienta i nowsze (⚠ P-05)                                                                                                 |
| Kontakt                   | otwarcie z adresem, sekcja kontaktu: jak zacząć, formularz, siedziba z mapą                                                                                                                                                                                                                                                                 | godziny otwarcia (⚠ P-02)                                                                                                                         |
| Polityka prywatności      | administrator, formularz, Google Analytics, mapa, pliki cookie i wybór, prawa (⚠ P-24, P-26)                                                                                                                                                                                                                                                | okres przechowywania danych GA (⚠ P-26)                                                                                                           |

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

| Stara strona                                                                                                        | Nowe miejsce                                                                                                                                                                                      | Na miarę 2026 – WOW lub „aha”                                                                                   |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Slider „Dachy · Drzwi · Podłogi · Okna · Tarasy” (zdjęcie sklepu)                                                   | hero – lead „Nowe dachy i remonty – a w domu także drzwi…”                                                                                                                                        | logo z postacią, hero zostaje w miejscu (D-16, D-21); zdjęcie zamkniętego sklepu znika ([firma.md](firma.md))   |
| Pasek „Świadczymy usługi na najwyższym poziomie!”                                                                   | sekcja 2 – realizacja zamiast przymiotnika                                                                                                                                                        | aha: zdjęcie realizacji zamienia się w rysunek techniczny (D-19, D-20)                                          |
| „O nas”: od 1992, z ojca na syna, doszkalanie, PSD, Rzetelna Firma                                                  | sekcja 3 „O firmie”                                                                                                                                                                               | linia wymiarowa 1992 ↔ dziś, lata liczą się same; ⚠ P-06, P-19                                                  |
| „O nas”: bezpłatne doradztwo → wycena → materiał → wykonanie                                                        | sekcja 3 (zdanie) i sekcja 6 – „jak zacząć”                                                                                                                                                       | cztery kroki obok formularza                                                                                    |
| „Czym się zajmujemy” – 8 kafli ze zdjęciami (okna, parapety, tarasy, drzwi, …)                                      | sekcja 4 „Oferta” – usługi według podstrony „Usługi” starej strony i sprzedaż w salonie (D-29, D-46, D-79)                                                                                        | te same zdjęcia po kolei przez środek ekranu                                                                    |
| `/uslugi/`, `/dachy/`: lista usług, rodzaje pokryć                                                                  | sekcja 4 – „Usługi” w menu                                                                                                                                                                        | rodzaje pokryć własnymi słowami w opisie pozycji                                                                |
| „Sprzedaż” w menu (materiały); `/drzwi/`, `/podlogi/`, `/okna/`, `/parapety-i-blaty/`, `/tarasy-balkony-eleawacje/` | `/sprzedaz/` – „Sprzedaż” w menu (D-58, D-84)                                                                                                                                                     | asortyment salonu na jednej stronie; zakres – [firma.md](firma.md#salon-w-kokoszkowych)                         |
| `/certyfikaty-i-referencje/` – 24 skany bez opisu                                                                   | `/certyfikaty-i-referencje/` (ten sam adres, D-113) – skany certyfikatów z `src/data/certificates.ts`; dwa listy referencyjne tylko w sekcji z opiniami (`src/data/testimonials.ts`, D-74, D-115) | każdy skan z wystawcą i rokiem; ⚠ P-05                                                                          |
| `/nasze-realizacje/` – 38 zdjęć bez opisów                                                                          | `/nasze-realizacje/` (ten sam adres) i sekcje 2 i 5a strony głównej                                                                                                                               | zdjęcie → rysunek, każda realizacja z opisem (⚠ P-21)                                                           |
| Mapa Google na całą szerokość; `/kontakt/`: siedziba z godzinami, sklep na Zaspie, formularz                        | sekcja 6 „Kontakt” – „Kontakt” w menu                                                                                                                                                             | mapa przy formularzu, nie na całą szerokość (D-91); sklep zamknięty – bez niego; godziny ⚠ P-02, telefon ⚠ P-01 |

Opisy producentów ze starej strony (Sonarol, Stegu, EcoTeak, akapity o dachówkach i podłogach) nie
wracają – piszemy własne krótkie teksty ([komunikacja.md](komunikacja.md#zasady-pisania)).

## Przekierowania 301 ze starej strony

Stara strona to WordPress (10 podstron i kilka adresów samego WordPressa). Przekierowania chronią
to, co Google już zaindeksował: produkty salonu → `/sprzedaz/`, `/dachy/` → `/uslugi/`, pozostałe →
`/` (D-84, D-101, D-103). Strony ze starym adresem zostają bez przekierowania – kolumna „Stary
adres” w [tabeli stron](#strony). Jedna lista przekierowań – [`vercel.json`](../vercel.json) (hosting – Vercel,
D-102, [architektura.md](architektura.md#wdrożenie)); przeprowadzka krok po kroku –
[roadmapa.md](roadmapa.md#przeprowadzka-na-poldacheu).
