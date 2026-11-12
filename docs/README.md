# Dokumentacja projektu poldach.eu

Każda informacja ma w dokumentacji jedno miejsce. Zanim coś dopiszesz, sprawdź w tabeli, do którego
dokumentu to należy.

| Dokument                             | Odpowiada na pytanie                                                                                  |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| [firma.md](firma.md)                 | Kim jest POLDACH? Dane rejestrowe, historia, oferta, kontakt, dowody wiarygodności                    |
| [komunikacja.md](komunikacja.md)     | Co i do kogo mówimy? Oś przekazu, odbiorcy, wyróżniki, ton, zasady pisania                            |
| [design-system.md](design-system.md) | Jak strona wygląda i się porusza? Kolory, kontrast, typografia, układ, komponenty, ilustracje, ruch   |
| [mapa-strony.md](mapa-strony.md)     | Jakie strony istnieją i co na nich jest? Adresy URL, sekcje strony głównej, podstrony, przekierowania |
| [standardy.md](standardy.md)         | Jakie wymagania musi spełnić każda strona? Wydajność, dostępność, SEO, prywatność, konwersja          |
| [architektura.md](architektura.md)   | Jak to budujemy? Stos, struktura katalogów, zasady kodu, biblioteki, wdrożenie                        |
| [decyzje.md](decyzje.md)             | Co ustalono i dlaczego? Otwarte pytania do klienta                                                    |
| [roadmapa.md](roadmapa.md)           | Co robimy, w jakiej kolejności i co jest już zrobione?                                                |
| [przewodnik.md](przewodnik.md)       | Jak działa projekt, bez programowania? Technologie, mapa folderów, jak wprowadzić zmianę              |

## Zasady prowadzenia dokumentacji

1. **Jedna informacja – jedno miejsce.** W innych dokumentach tylko odnośnik, np. „kontrast – patrz
   [design-system.md](design-system.md#kontrast)”.
2. **Kod wygrywa z dokumentacją.** Wartość wdrożona w kodzie (np. ścieżki w `src/config/routes.ts`)
   nie jest przepisywana do dokumentu – dokument linkuje do pliku. Wartości jeszcze niewdrożone
   żyją w dokumentach jako specyfikacja; przy wdrożeniu przenosimy je do kodu, a w dokumencie
   zostawiamy odnośnik.
3. **Niepewne dane oznaczamy ⚠ z numerem pytania** z [decyzje.md](decyzje.md), np. „⚠ P-01”. Po
   odpowiedzi klienta: poprawka w jednym miejscu i przeniesienie pytania do sekcji „Ustalone”.
4. **Każda decyzja zmieniająca kierunek** trafia do [decyzje.md](decyzje.md) (data, decyzja, powód).
5. **Krótko:** punkty i tabele zamiast prozy, bez kopiowania materiałów źródłowych.

## Źródła

Dokumentacja powstała 22.10.2026 na podstawie materiałów projektu „Poldach” (research firmy,
analizy konkurencji i odbiorców B2B, identyfikacja wizualna i reklama wideo, inwentaryzacja starej
strony, design system, koncepcja strony 2027, prompt fundamentów technicznych). Materiały źródłowe
nie są częścią repozytorium – wyjątek to pliki logo i makiety w [`design/`](../design/README.md)
(D-13). W razie rozbieżności obowiązuje `docs/`.
