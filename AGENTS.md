# Instrukcje dla agentów AI

Nowa strona poldach.eu (Next.js, statyczny eksport). Mapa dokumentacji i zasady jej prowadzenia:
[docs/README.md](docs/README.md) – przeczytaj przed pracą.

## Zanim zaczniesz

- Wygląd i ruch → `docs/design-system.md`. Tabela kontrastu jest wiążąca.
- Nowa strona lub sekcja → `docs/mapa-strony.md`, potem `docs/architektura.md`.
- Teksty → `docs/komunikacja.md`; fakty o firmie → `docs/firma.md`.
- Kod → zasady w `docs/architektura.md`, wymagania w `docs/standardy.md`.

## W trakcie

- Nie wymyślaj danych firmy, liczb, opinii, cen ani gwarancji. Brakującą wartość oznacz `TODO` z
  numerem pytania z `docs/decyzje.md` (np. `TODO(P-01)`).
- Rozbieżność między kodem a dokumentacją zgłoś, zamiast po cichu wybierać jedną wersję.

## Po skończeniu

- `npm run check` i `npm run build` muszą przejść.
- Nowa decyzja → wiersz w `docs/decyzje.md`; zamknięty etap → `docs/roadmapa.md`.
- Wdrożona wartość ze specyfikacji (np. tokeny) → w dokumencie zostaje odnośnik do kodu.

<!-- Blok poniżej zapisuje i odtwarza `next dev` – nie edytuj go ręcznie. -->

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
