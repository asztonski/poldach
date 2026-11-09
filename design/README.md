# Materiały projektowe

Pliki od projektanta i klienta w postaci, w jakiej je dostaliśmy. Nie trafiają do builda (są poza
`src/` i `public/`) ani do ESLint i Prettiera. Strona odtwarza ich wartości własnymi komponentami i
tokenami – [docs/architektura.md](../docs/architektura.md#zasady-kodu). Decyzja – D-13 w
[docs/decyzje.md](../docs/decyzje.md).

## Logo z postacią i parasolem

Na stronie: hero – komponent `src/brand/LogoWithFigure.tsx` z animacją wejścia `LogoEntrance`
(D-15, D-16). Rola poza hero – ⚠ P-20.

| Plik                              | Zawartość                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------- |
| `logo/poldach-logo.svg`           | napis POLDACH w łuku, parasol, postać za biurkiem, hasło „Dach – to nasz fach”; tło przezroczyste |
| `logo/poldach-logo-zolte-tlo.svg` | to samo na żółtym tle `#EEDF3E`                                                                   |

## Stara strona poldach.eu

Stan na 07.11.2026 – punkt wyjścia dla treści i narracji nowej strony. Co gdzie trafia –
[docs/mapa-strony.md](../docs/mapa-strony.md#treści-starej-strony).

| Plik                     | Zawartość                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `stara-strona/tresci.md` | menu i treści wszystkich 11 stron w kolejności sekcji, z opisem układu – dosłownie       |
| `stara-strona/zrzuty/`   | zrzuty całych stron (720 px szerokości, połowa skali), nazwy jak adresy (`dachy.jpg`, …) |

Zdjęcia realizacji (47 plików) nie są w repo – przegląd i wybór: [docs/roadmapa.md](../docs/roadmapa.md).

## Inspiracje

| Katalog                   | Zawartość                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| `inspiracje/metriccivil/` | metriccivil.ca – wzorzec strony (07.11.2026): `wnioski.md` (sekcje, efekty, co bierzemy) i `zrzuty/` |

## Makiety

| Katalog                            | Zawartość                                                                                                                                                                                                      |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `makiety/favicon-parasol-stolowy/` | favicon: dotychczasowy (parasolka) i trzy propozycje – 1 „Na biurku”, 2 „Kawiarniany”, 3 „Z podstawą”; podgląd w kartach przeglądarki (jasny i ciemny motyw) i w rozmiarach 16–120 px                          |
| `makiety/animacja-spod-biurka/`    | animacja logo (9 s, pętla, wyłączona przy reduced motion): postać wychodzi spod biurka, stawia parasol, parasol się otwiera, pojawia się napis POLDACH, potem hasło na biurku. `assets/9e5f…svg` – sama postać |

- Wartości do odtworzenia: atrybuty `style` i blok `<style>` w plikach `*.dc.html`.
- `support.js` i `vendor/` to runtime podglądu z narzędzia projektowego (pobiera skrypty z
  cdn.jsdelivr.net), nie część projektu. Nie kopiujemy go do `src/` ani `public/`.
- Podgląd: `npx serve design/makiety/animacja-spod-biurka` – przez `file://` przeglądarka może
  zablokować skrypty.
