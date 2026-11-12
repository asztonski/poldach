# Przewodnik po projekcie

Dla osoby, która nie programuje, a chce zrozumieć, jak powstaje strona poldach.eu, gdzie co leży
i jak coś na niej zmienić.

## 1. Co to jest

To **repozytorium** – jeden folder, w którym jest cała strona: teksty, zdjęcia, wygląd i opis, jak
to wszystko złożyć. Folder leży w serwisie **GitHub**, który pamięta każdą zmianę: kto, kiedy i co
zmienił. Działa to jak historia wersji w Dokumentach Google – zawsze można wrócić do poprzedniej.

Strona nie jest wyklikana w panelu, jak dawniej w WordPressie. Jest **napisana kodem**, a z kodu
powstają zwykłe, gotowe strony, które wyświetla przeglądarka. Dzięki temu jest szybka, nic nie
kosztuje na serwerze i nie ma panelu, do którego ktoś mógłby się włamać.

## 2. Jak zmiana trafia na stronę

```
zmiana w pliku  →  zapis w GitHubie  →  Cloudflare buduje stronę  →  nowa wersja na poldach.eu
                    („commit”)          (ok. 2–3 minuty)
```

1. Ktoś zmienia plik – np. poprawia numer telefonu.
2. Zapisuje zmianę w GitHubie. Taki zapis to **commit**.
3. **Cloudflare** (firma, na której serwerach stoi strona) zauważa zmianę i **buduje** stronę:
   zamienia kod na gotowe strony.
4. Po kilku minutach na poldach.eu jest nowa wersja.

Jeśli w zmianie jest błąd, budowanie się nie uda i **na stronie zostaje poprzednia, działająca
wersja**. Zepsuć stronę jednym zapisem jest bardzo trudno.

## 3. Z czego jest zbudowana

| Narzędzie            | Co robi                                                                              |
| -------------------- | ------------------------------------------------------------------------------------ |
| **Next.js**          | „fabryka stron” – z kodu robi gotową stronę                                          |
| **React**            | składa stronę z klocków: nagłówek, przycisk, stopka są napisane raz i użyte wszędzie |
| **TypeScript**       | język, w którym pisany jest kod; wyłapuje pomyłki, zanim trafią na stronę            |
| **Tailwind CSS**     | wygląd: kolory, odstępy, wielkości liter                                             |
| **GitHub**           | przechowuje kod i całą historię zmian                                                |
| **Cloudflare Pages** | hosting – buduje i publikuje stronę pod adresem poldach.eu                           |
| **Web3Forms**        | wysyła wiadomości z formularza na poldachpk@wp.pl                                    |
| **Google Analytics** | statystyki odwiedzin – tylko gdy odwiedzający się zgodzi                             |

Na komputerze programisty działają jeszcze **Node.js** i **npm** – programy do uruchamiania
strony na próbę i do jej budowania. Do drobnych zmian nie są potrzebne.

## 4. Mapa folderów

Gwiazdką ★ oznaczone miejsca, w których zmienia się najczęściej.

```
poldach/
├── docs/            dokumentacja – co jest na stronie i dlaczego (spis: docs/README.md)
├── design/          logo i makiety od projektanta – tylko do wglądu
├── public/          pliki podawane bez zmian: wideo, lista przekierowań ze starych adresów
├── scripts/         narzędzia programisty do rysunków technicznych
└── src/             sama strona
    ├── app/         podstrony – jeden folder = jeden adres, np. uslugi/ → poldach.eu/uslugi/
    ├── config/   ★  dane firmy (telefon, adres), menu, adresy podstron
    ├── data/     ★  treści w formie list: oferta, realizacje, certyfikaty
    ├── assets/   ★  zdjęcia
    ├── sections/    duże części stron: otwarcie, oferta, kontakt
    ├── components/  klocki: przyciski, nagłówek, stopka, formularz, animacje
    ├── brand/       logo
    ├── styles/      kolory i fonty całej strony
    └── lib/, hooks/, types/   pomocnicze części kodu – do zmian przez programistę
```

Pliki leżące luzem w głównym folderze (`package.json`, `next.config.ts`, pliki zaczynające się od
kropki) to ustawienia narzędzi. Nie trzeba ich ruszać.

## 5. Gdzie zmienić najczęstsze rzeczy

| Chcę zmienić                       | Plik                                                      | Czego szukać w pliku               |
| ---------------------------------- | --------------------------------------------------------- | ---------------------------------- |
| telefon, e-mail, adres             | [`src/config/site.ts`](../src/config/site.ts)             | `phone:`, `email:`, `street:`      |
| tytuł lub opis na górze podstrony  | `src/app/<adres podstrony>/page.tsx`                      | `title=`, `lead=`                  |
| opis usługi lub produktu w ofercie | [`src/data/offer.ts`](../src/data/offer.ts)               | `title:`, `details:`               |
| opis realizacji                    | [`src/data/projects.ts`](../src/data/projects.ts)         | `title:`, `description:`           |
| certyfikat                         | [`src/data/certificates.ts`](../src/data/certificates.ts) | `title:`, `issuer:`                |
| nazwy w menu i stopce              | [`src/config/navigation.ts`](../src/config/navigation.ts) | `label:`                           |
| zdjęcie                            | [`src/assets/images/`](../src/assets/images/)             | podmień plik, zostaw tę samą nazwę |
| stary adres, który ma przenosić    | [`public/_redirects`](../public/_redirects)               | jedna linia na adres               |

Nowa realizacja, nowa podstrona, kolory i układ – to praca dla programisty.

## 6. Jak samemu poprawić tekst

Do drobnej poprawki wystarczy przeglądarka i konto GitHub z dostępem do repozytorium (dostęp daje
opiekun projektu).

1. Wejdź na **github.com/asztonski/poldach** i otwórz plik z tabeli wyżej.
2. Kliknij ikonę ołówka (**Edit this file**).
3. Zmień **tylko tekst między apostrofami**. Apostrofy, przecinki i nawiasy zostaw. Przykład:

   ```ts
   phone: '503 005 234',
   ```

   zmieniasz tylko `503 005 234`.

4. Kliknij **Commit changes**, wpisz krótko, co zmieniasz (np. „Nowy numer telefonu”), i zatwierdź.
5. Po kilku minutach zmiana jest na poldach.eu.

Jeśli coś pójdzie nie tak – nic się nie stanie: strona zostanie w poprzedniej wersji, a opiekun
cofnie zmianę jednym kliknięciem.

Większe zmiany najprościej zlecić opiekunowi: wyślij nowy tekst albo zdjęcie i powiedz, gdzie ma
się pojawić.

## 7. Zasady treści

- **Na stronie są tylko potwierdzone fakty.** Żadnych wymyślonych liczb, opinii, cen ani gwarancji.
  Fakty o firmie są spisane w [firma.md](firma.md).
- Miejsca czekające na odpowiedź firmy są w kodzie oznaczone `TODO` z numerem pytania, np.
  `TODO(P-01)` – który numer telefonu jest główny. Lista pytań:
  [decyzje.md](decyzje.md#otwarte-pytania-do-klienta). Każda odpowiedź właściciela odblokowuje
  kawałek strony.
- Jak pisać teksty (ton, długość, słownictwo) – [komunikacja.md](komunikacja.md).

## 8. Gdzie szukać dalej

| Chcę wiedzieć                                 | Dokument                             |
| --------------------------------------------- | ------------------------------------ |
| co jest na każdej podstronie                  | [mapa-strony.md](mapa-strony.md)     |
| co już zrobione, a co zostało                 | [roadmapa.md](roadmapa.md)           |
| dlaczego coś zrobiono tak, a nie inaczej      | [decyzje.md](decyzje.md)             |
| jak strona wygląda (kolory, fonty, przyciski) | [design-system.md](design-system.md) |
| wszystko inne                                 | [spis dokumentacji](README.md)       |

Programista zaczyna od [README.md](../README.md) w głównym folderze.

## 9. Słowniczek

- **Repozytorium** – folder z całym projektem i historią zmian.
- **Commit** – jeden zapisany zestaw zmian, z opisem.
- **Gałąź `main`** – główna wersja projektu; to, co w niej jest, trafia na poldach.eu.
- **Budowanie (build)** – zamiana kodu na gotową stronę.
- **Wdrożenie (deploy)** – opublikowanie zbudowanej strony w internecie.
- **Hosting** – serwer, na którym leży strona (tu: Cloudflare).
- **Domena** – adres strony, poldach.eu; opłaca się ją u rejestratora.
- **Komponent** – klocek strony, np. przycisk albo stopka, użyty w wielu miejscach.
- **Przekierowanie 301** – stary adres sam przenosi na nowy, a Google przenosi na niego pozycję.
