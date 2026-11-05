# Roadmapa

Kolejność prac i stan projektu. Zakres każdej strony – [mapa-strony.md](mapa-strony.md).

## Stan na 22.10.2026

**Zrobione:** szkielet Next.js ze statycznym eksportem, mapa witryny i `robots.txt`, narzędzia
jakości (TS strict, ESLint, Prettier), dokumentacja, tokeny (kolory, typografia, kontener, cień),
motywy sekcji i tło „rysunek techniczny”, Roboto Condensed, favicon (parasol na biurku, D-14) i `theme-color`, dane
firmy w `src/config/site.ts`, nagłówek z nawigacją (panel usług, menu mobilne w `<dialog>`, pasek z
telefonem na telefonie), hero z logo z postacią (D-15), strona 404, skany certyfikatów z opisem
(`src/data/certificates.ts`). Tymczasowe podstrony i stopka usunięte (D-11).

**Do uzupełnienia przed publikacją:**

- menu linkuje do stron, których jeszcze nie ma (404) – przed publikacją strony powstają albo
  znikają z menu,
- brak stopki; to ona ma dawać pełną listę linków także bez JavaScriptu (panel usług i menu mobilne
  wymagają JS),
- wartości oznaczone `TODO` w hero i w danych firmy (P-01, P-07, P-19, ocena Google),
- kolejność motywów sekcji: hero (D-15) i „Wybór ścieżki” są teraz oba żółte – ułożyć przy budowie
  sekcji 2 ([mapa-strony.md](mapa-strony.md#strona-główna)).

## Fazy

| Faza                     | Zakres                                                                                                                                                                                                                                                                    | Gotowe, gdy                                                                                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Fundamenty techniczne | tokeny i motywy, tło „rysunek techniczny”, Roboto Condensed, `src/brand/` (tokeny, logo, ikony), dane firmy, infrastruktura animacji, komponenty design systemu, obrazy, SEO (JSON-LD, Open Graph), formularz, analityka, testy; strona testowa `/playground` (`noindex`) | `/playground` spełnia [standardy.md](standardy.md) (mysz, dotyk, klawiatura, reduced motion, bez JS); tokeny identyczne z reklamą; tabele wartości w docs zastąpione odnośnikami do kodu |
| 2. Prototyp kierunku     | hero (D-15) + dach składający się przy przewijaniu                                                                                                                                                                                                                        | klient mówi „tak” lub „nie” dla kierunku (P-08), zanim powstanie reszta                                                                                                                  |
| 3. Wersja 1.0            | strona główna (wszystkie sekcje), podstrona diagnostyki, kontakt, polityka prywatności, przekierowania 301; momenty WOW: hero, składający się dach, linia wymiarowa, przejścia kolorów                                                                                    | lista „Przed publikacją” ze [standardy.md](standardy.md#przed-publikacją)                                                                                                                |
| 4. Wersja 1.1            | od dachu po podłogę, realizacje „rysunek → zdjęcie”, podstrony usług, B2B, lokalne, O nas                                                                                                                                                                                 | j.w.                                                                                                                                                                                     |
| 5. Wersja 1.2            | mini-gra „Znajdź przeciek”, przejścia między podstronami (View Transitions), poradniki                                                                                                                                                                                    | j.w.                                                                                                                                                                                     |

## Materiały do zebrania

- [ ] Odpowiedzi na otwarte pytania – [decyzje.md](decyzje.md#otwarte-pytania-do-klienta).
- [ ] Zdjęcia według listy ujęć – [design-system.md](design-system.md#zdjęcia). Ze starej strony
      (47 zdjęć z lat 2015–2016, bez opisów) wybrać najlepsze i dopisać opisy.
- [ ] Certyfikaty: oryginały lub skany z opisem (wystawca, czego dotyczy, rok, ważność).
- [ ] Projekt reklamy Remotion (`poldach-reklama.zip` – brak w przekazanych materiałach): tokeny do
      porównania i ilustracje do eksportu jako SVG.
- [ ] Wersja reklamy 16:9 z planszą tytułową na podstronę diagnostyki.
- [ ] Logo PSD: aktualny znak (PNG 87 × 87 px z [dekarz.com.pl](https://www.dekarz.com.pl/), pobrany
      05.11.2026) jest w `src/assets/images/logotypy/psd-znak.png`; brak wersji wektorowej. Na
      stronie tylko po potwierdzeniu członkostwa (P-19).
- [ ] Aktualna ocena i liczba opinii Google, sprawdzone bezpośrednio w Google Maps.
