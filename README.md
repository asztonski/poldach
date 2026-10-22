# poldach.eu

Strona internetowa P.H.U. „POLDACH” S.C. – rodzinnej firmy dekarskiej z Kokoszkowych. Next.js ze
statycznym eksportem.

## Start

Wymagany Node.js 22.13+ (patrz `.nvmrc`).

```bash
npm install
npm run dev        # serwer deweloperski: http://localhost:3000
```

## Skrypty

| Skrypt              | Opis                                                  |
| ------------------- | ----------------------------------------------------- |
| `npm run dev`       | serwer deweloperski z HMR                             |
| `npm run build`     | build produkcyjny – statyczne pliki w `out/`          |
| `npm run preview`   | podgląd zbudowanej strony z `out/` (po `build`)       |
| `npm run typecheck` | sprawdzenie typów TypeScript                          |
| `npm run lint`      | ESLint z regułami Next.js (`lint:fix` – autopoprawki) |
| `npm run format`    | Prettier (`format:check` – tylko sprawdzenie)         |
| `npm run check`     | typecheck + lint + format:check (np. przed PR)        |

## Dokumentacja

Firma, komunikacja, design system, mapa strony, standardy, architektura, decyzje i plan prac –
[docs/README.md](docs/README.md).
