# Roadmapa

Kolejność prac i stan projektu. Zakres każdej strony – [mapa-strony.md](mapa-strony.md).

## Stan na 22.10.2026

**Zrobione:** szkielet Next.js ze statycznym eksportem, mapa witryny i `robots.txt`, narzędzia
jakości (TS strict, ESLint, Prettier), dokumentacja, tokeny (kolory, typografia, kontener, cień),
motywy sekcji i tło „rysunek techniczny”, Roboto Condensed, favicon (parasol na biurku, D-14) i `theme-color`, dane
firmy w `src/config/site.ts`, nagłówek z nawigacją (zwykłe linki, D-60; menu mobilne w `<dialog>`, pasek z
telefonem na telefonie), stopka wspólna dla wszystkich stron z pełną listą linków (D-57), hero z logo z postacią (D-15), jedna siatka dla całej strony (D-17), motyw
biały i skośne przejścia (D-18), układ strony głównej według KISS (D-23, D-29): oferta ze
zdjęciami usług (prototyp, D-44), „O firmie” (linia wymiarowa, licznik lat, siedziba), autoryzacje i nagroda (D-26,
D-28), realizacja, której zdjęcie zamienia się w rysunek (D-19, D-20); strona 404, skany
certyfikatów z opisem (`src/data/certificates.ts`). Tymczasowe podstrony i stopka usunięte (D-11).

**10.11.2026 – struktura czterech adresów (D-84):** menu z kotwicami sekcji, stopka z tymi samymi
linkami, sekcja „Kontakt” na stronie głównej i podstronach (jak zacząć, formularz Web3Forms – D-85,
mapa – D-86, D-91), podstrony `/wykrywanie-nieszczelnosci/`, `/sprzedaz/`
i `/polityka-prywatnosci/`, przekierowania 301 (dziś w `vercel.json`, D-102), skok do sekcji bez płynnego
przewijania (D-87). Karty „Dom / Firma” usunięte.

**11.11.2026:** wideo kampanii na podstronie diagnostyki (D-88), uporządkowana stopka (D-89), krótszy
adres i link „Nieszczelności” w menu (D-90), polityka prywatności jako dokument (D-92), baner
cookies (D-93), Google Analytics 4 ze zdarzeniami kontaktu (D-94–D-96).

**11.11.2026 – strony tematów (D-103):** menu prowadzi na `/uslugi/`, `/sprzedaz/`,
`/nasze-realizacje/` i `/kontakt/` (stare adresy WordPressa zachowane), scena oferty z wyborem
filaru, hosting – Vercel (D-102). Strona `/certyfikaty-i-referencje/` – skany na scenie zdjęć, bez
kalek (D-113).

### Do dokończenia

Formularz – klucz Web3Forms (zrobione 11.11.2026, D-98):

- [x] [web3forms.com](https://web3forms.com) → „Create your Form — Free” → adres **poldachpk@wp.pl**
      (albo konto na ten adres, formularz `poldach.eu`, odbiorca poldachpk@wp.pl).
- [x] Odebrać klucz z maila – sprawdzić też Spam w wp.pl.
- [x] Klucz do [`.env.production`](../.env.production) jako `NEXT_PUBLIC_WEB3FORMS_KEY` (jawny z
      założenia, jak identyfikator GA – D-95); poprawić wpis o kluczach w
      [architektura.md](architektura.md#wdrożenie) i komentarz w `.env.example`.
- [x] `npm run build` + `npm run preview` → jedna wiadomość testowa („TEST – formularz ze strony”)
      → sprawdzić, czy dotarła; nadawcę Web3Forms oznaczyć w wp.pl jako „To nie spam”.
- [x] P-25 do sekcji „Ustalone” w [decyzje.md](decyzje.md).

Google Analytics (P-26, D-94–D-96):

- [ ] Administracja → Zbieranie i modyfikacja danych → Przechowywanie danych: 2 czy 14 miesięcy →
      wpisać w polityce prywatności w miejsce `TODO(P-26)`; P-26 do „Ustalonych”.
- [x] Wymiary niestandardowe: `link_location`, `link_text`, `form_source`, `video_title` (zakres
      „Zdarzenie”) – założone 11.11.2026.
- [ ] Zdarzenia kluczowe: zgasić gwiazdki przy `close_convert_lead` i `qualify_lead` (dodane przez
      Google, strona ich nie wysyła); zapalić przy `click_phone` i `click_email`, gdy pojawią się w
      „Ostatnich zdarzeniach” (od razu: `npm run preview`, zgoda, kliknięcie telefonu i e-maila), a
      przy `generate_lead` – po pierwszym zapytaniu z formularza.
- [ ] Po wdrożeniu: poldach.eu → „Zgadzam się” → w GA „Czas rzeczywisty” widać wizytę.

### Przeprowadzka na poldach.eu

Nowa strona zastępuje WordPressa pod tą samą domeną – historia domeny w Google zostaje, chronimy
adresy podstron (D-101).

Przed zmianą:

- [ ] Google Search Console – usługa typu „Domena” `poldach.eu`, weryfikacja wpisem TXT w DNS (wymaga
      dostępu do panelu domeny). Na 11.11.2026 strona nie ma śladu GSC ani statystyk.
- [ ] W GSC (Skuteczność, Strony) – które stare adresy i hasła dają wejścia; czy każdy ma swoje
      przekierowanie w [`vercel.json`](../vercel.json). Adres z ruchem, którego treść nowa
      strona pokrywa słabo, to kandydat na powrót podstrony (decyzja – D-84).
- [x] Hosting – Vercel (D-102); przekierowania w [`vercel.json`](../vercel.json).
- [ ] Vercel: nowy projekt z repozytorium (framework Next.js, ustawienia domyślne); pierwsze wdrożenie
      pod adresem `*.vercel.app` – sprawdzić stronę, formularz, baner cookies i przekierowania, zanim
      domena trafi na Vercel.

W dniu zmiany:

- [ ] Vercel → Settings → Domains: dodać `poldach.eu` i `www.poldach.eu` (to drugie z przekierowaniem
      na `poldach.eu`); w panelu, w którym jest domena, ustawić wpisy DNS, które pokaże Vercel. Wpisów
      poczty (MX, SPF) nie ruszać – poczta poldachpk@wp.pl ma działać dalej.
- [ ] HTTPS działa (Vercel – automatycznie), `http://` i `www.` przekierowują na
      `https://poldach.eu` (stara strona odpowiada pod nimi bez przekierowania – duplikaty).
- [ ] Każdy stary adres z listy odpowiada 301 na właściwy cel, z ukośnikiem i bez (np.
      `curl -sI https://poldach.eu/drzwi/` i `…/drzwi`), strony ze starym adresem (kolumna „Stary
      adres” w [mapie strony](mapa-strony.md#strony)) – 200, bez przekierowania;
      nieistniejący adres – strona 404.

Po zmianie:

- [ ] GSC → Mapy witryn → zgłosić `https://poldach.eu/sitemap.xml`.
- [ ] GSC → Sprawdzenie adresu URL dla stron głównej i trzech podstron → „Poproś o zindeksowanie”.
- [ ] Przez 2–6 tygodni: GSC (Strony, Skuteczność) – przekierowania przyjęte, nowe strony w indeksie;
      lekkie wahania pozycji są normalne.
- [ ] Wizytówka Google: adres strony, telefon (P-01) i godziny (P-02) zgodne ze stroną.

**Do uzupełnienia przed publikacją:**

- zatwierdzona polityka prywatności (P-24), godziny
  otwarcia salonu (P-02),
- wartości oznaczone `TODO` w hero i w danych firmy (P-01, P-07, P-19, ocena Google),
- podstrona diagnostyki: przypięta scena z metodami (wideo – D-88)
  ([mapa-strony.md](mapa-strony.md#podstrony)),
- teksty sekcji „Oferta”, „O firmie” i realizacji – propozycja do akceptacji klienta; zakres oferty
  – P-04, P-10, kamienie milowe – P-09, podpis i opisy realizacji – P-21, dokumenty – P-05.

## Fazy

| Faza                     | Zakres                                                                                                                                                                                                                                                                    | Gotowe, gdy                                                                                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Fundamenty techniczne | tokeny i motywy, tło „rysunek techniczny”, Roboto Condensed, `src/brand/` (tokeny, logo, ikony), dane firmy, infrastruktura animacji, komponenty design systemu, obrazy, SEO (JSON-LD, Open Graph), formularz, analityka, testy; strona testowa `/playground` (`noindex`) | `/playground` spełnia [standardy.md](standardy.md) (mysz, dotyk, klawiatura, reduced motion, bez JS); tokeny identyczne z reklamą; tabele wartości w docs zastąpione odnośnikami do kodu |
| 2. Prototyp kierunku     | strona główna według D-23: hero, O firmie, Oferta, Realizacje, Kontakt                                                                                                                                                                                                    | klient mówi „tak” lub „nie” dla kierunku, zanim powstaną podstrony                                                                                                                       |
| 3. Wersja 1.0            | cztery adresy (D-84): strona główna (wszystkie sekcje z kontaktem), podstrona diagnostyki, sprzedaż, polityka prywatności, przekierowania 301; momenty WOW: hero, linia wymiarowa, zdjęcie → rysunek                                                                      | lista „Przed publikacją” ze [standardy.md](standardy.md#przed-publikacją)                                                                                                                |
| 4. Wersja 1.1            | od dachu po podłogę, więcej realizacji z opisem (P-21); nowe podstrony tylko po nowej decyzji (D-84)                                                                                                                                                                      | j.w.                                                                                                                                                                                     |
| 5. Wersja 1.2            | mini-gra „Znajdź przeciek”, przejścia między podstronami (View Transitions), poradniki                                                                                                                                                                                    | j.w.                                                                                                                                                                                     |

## Materiały do zebrania

- [ ] Odpowiedzi na otwarte pytania – [decyzje.md](decyzje.md#otwarte-pytania-do-klienta).
- [ ] Zdjęcia według listy ujęć – [design-system.md](design-system.md#zdjęcia). Stara strona
      (`/nasze-realizacje/`, przegląd 06.11.2026): 47 plików, w tym 9 kwadratowych wycinków
      pozostałych, około 10 obiektów, bez opisów, najwyżej 1920 px. Daty z EXIF: Kodak 2002–2006
      (zegar aparatu błędny – data wtopiona w zdjęcie), Panasonic 2008–2009, Samsung 2015–2016.
      Najlepsze: `02_P1010796`, `09_P1000142`, `01_P1010803`, `07_P1000151`,
      `23_20150508_123833`, `10_P1000137` – do każdego potrzebne miejscowość, zakres prac i zgoda na
      publikację. Na stronie realizacji (D-107, D-109): `02_P1010796`, `04_P1000169`, `07_P1000151`, `23_20150508_123833`, `34_100_2005`, `20_20160218_092954`.
- [ ] Certyfikaty: oryginały lub skany z opisem (wystawca, czego dotyczy, rok, ważność).
- [ ] Projekt reklamy Remotion (`poldach-reklama.zip` – brak w przekazanych materiałach): tokeny do
      porównania i ilustracje do eksportu jako SVG.
- [x] Reklama na podstronę diagnostyki – wersja 4:5 (D-88). Czy jest w niej mowa (napisy, WCAG 1.2.2)?
- [ ] Logo PSD: aktualny znak (PNG 87 × 87 px z [dekarz.com.pl](https://www.dekarz.com.pl/), pobrany
      05.11.2026) jest w `src/assets/images/logotypy/psd-znak.png`; brak wersji wektorowej. Na
      stronie tylko po potwierdzeniu członkostwa (P-19).
- [ ] Aktualna ocena i liczba opinii Google, sprawdzone bezpośrednio w Google Maps.
