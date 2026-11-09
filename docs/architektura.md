# Architektura

Jak budujemy stronę. Co ma powstać – [mapa-strony.md](mapa-strony.md), jakie wymagania spełnić –
[standardy.md](standardy.md).

## Stos

**Zainstalowane** (wersje – `package.json`): Next.js (App Router, statyczny eksport), React,
TypeScript (strict), Tailwind CSS 4, lucide-react, clsx + tailwind-merge, ESLint (konfiguracja Next) +
Prettier z sortowaniem klas Tailwind. Font Roboto Condensed (zmienny) przez `next/font/google` w
`src/app/layout.tsx`; Kalam 700 (notatki pisakiem) w `src/sections/home/HeroSection.tsx`.

**Planowane** (faza fundamentów – [roadmapa.md](roadmapa.md)):

| Obszar             | Wybór                                                                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Animacje           | GSAP + `@gsap/react` (ScrollTrigger, DrawSVGPlugin); proste pojawienia – natywne CSS scroll-driven animations w `@supports`                                   |
| Płynne przewijanie | Lenis – włączony na stałe ([decyzje.md](decyzje.md) D-35); tylko mysz i touchpad, nigdy przy reduced motion, uruchamiany po wczytaniu strony (`SmoothScroll`) |
| Formularz          | usługa dla stron statycznych (Web3Forms lub Formspree), walidacja `zod`                                                                                       |
| Analityka          | Plausible lub Umami przez `next/script`                                                                                                                       |
| Dane strukturalne  | typy z `schema-dts`                                                                                                                                           |
| Obrazy             | skrypt `sharp` generujący AVIF/WebP w kilku szerokościach; `svgo` dla SVG                                                                                     |
| Jakość             | `eslint-plugin-jsx-a11y`, Playwright + `@axe-core/playwright`, Lighthouse CI, `@next/bundle-analyzer`                                                         |

**Nie używamy:**

| Czego                                     | Dlaczego                                                         |
| ----------------------------------------- | ---------------------------------------------------------------- |
| Framer Motion, anime.js, AOS, ScrollMagic | jeden silnik animacji (GSAP) + CSS; dwa to więcej JS i konflikty |
| Three.js, React Three Fiber, WebGL        | ciężkie na telefonach, nic nie dodają do rysunku technicznego    |
| Lottie, Rive                              | animujemy SVG kodem, w kolorach z tokenów                        |
| MUI, Chakra, Ant, Bootstrap               | mamy własny design system                                        |
| Swiper, Slick i inne karuzele             | przewijany rząd robimy CSS `scroll-snap`                         |
| jQuery, fonty z zewnętrznych CDN          | wydajność i prywatność                                           |

Proste interakcje na natywnych elementach: `<details>` (FAQ), `<dialog>` (menu mobilne). Radix UI –
tylko gdy natywne nie wystarczą i po uzgodnieniu.

## Struktura katalogów

```
src/
├── app/                  # routing – jeden folder = jedna podstrona
│   ├── layout.tsx        #   wspólny layout, font, domyślne metadane
│   ├── page.tsx          #   strona główna
│   ├── <podstrona>/page.tsx
│   └── not-found.tsx, sitemap.ts, robots.ts, icon.svg, icon.png, apple-icon.png
├── assets/images/        # zdjęcia importowane w kodzie; logotypy/ – znaki innych (PSD); realizacje/
├── brand/                # elementy marki: Logo.tsx, LogoWithFigure.tsx; (planowane) tokens.ts, icons.tsx
├── components/
│   ├── common/           # komponenty współdzielone (LogoLink)
│   ├── layout/           # Header, DesktopNav, MobileMenu, MobileCallBar; (planowane) Footer
│   ├── ui/               # klocki design systemu (Section, Eyebrow, PhoneButton, ButtonLink, …)
│   ├── illustrations/    # rysunki SVG jako czyste komponenty TSX (TenementDrawing)
│   └── motion/           # CenterStage, FadeInOnce, LogoEntrance, PinnedScene, SmoothScroll, StayInPlace, TracingReveal; (planowane) CountUp, SectionWipe
├── config/               # site.ts (dane firmy), routes.ts (ścieżki), navigation.ts (menu)
├── data/                 # treści jako typowane dane (usługi, realizacje, …)
├── hooks/                # własne hooki React
├── lib/                  # funkcje pomocnicze (cn, sheetNumber, pageMetadata, gsap)
├── sections/             # sekcje stron pogrupowane według podstron
├── styles/globals.css    # tokeny Tailwind (@theme) i style bazowe
└── types/                # wspólne typy TS
```

Import z `src` przez alias `@/`, np. `import { Section } from '@/components/ui'`.

Poza `src/`: `design/` – pliki logo i makiety od projektanta, bez zmian i poza buildem
([design/README.md](../design/README.md), [decyzje.md](decyzje.md) D-13).

## Zasady kodu

1. **Statyczny eksport** (`output: 'export'`, `trailingSlash: true`). Skutki: brak optymalizacji obrazów
   w locie, brak middleware i server actions, przekierowania obsługuje hosting.
2. **Komponenty serwerowe domyślnie.** `'use client'` tylko w małych „wyspach” animacji i interakcji.
3. **Jedno źródło każdej wartości:**
   - dane firmy (NAP) – tylko `src/config/site.ts`,
   - ścieżki – tylko `ROUTES` z `src/config/routes.ts`,
   - kolory, fonty, odstępy – tylko tokeny ([design-system.md](design-system.md)); żadnych HEX-ów w
     komponentach,
   - wysokość nagłówka – tylko `--header-h`, `--header-shift` i `--header-pinned` w
     `src/styles/globals.css`; przypięcie sceny – tylko `PinnedScene`,
   - treści powtarzalne (usługi, realizacje) – typowane dane w `src/data/`.
4. **Stan końcowy w HTML.** Animacje startują od stanu początkowego (`gsap.from`), więc bez JS widać
   gotową treść. Hero nad linią zgięcia: klasa `js` ustawiana małym skryptem w `<head>` + CSS stanu
   początkowego + bezpiecznik, który pokazuje wszystko, jeśli animacja nie wystartuje w około 2 s.
   Animacje wyłącznie w CSS (np. `LogoEntrance`) tego nie potrzebują – stan początkowy istnieje tylko
   w trakcie animacji (`animation-fill-mode: backwards`), [decyzje.md](decyzje.md) D-12.
   Nagłówki sekcji (`FadeInOnce`): stan początkowy tylko przy `@media (scripting: enabled)` + bezpiecznik
   CSS po 3 s, jeśli skrypt nie dotrze ([decyzje.md](decyzje.md) D-36).
5. **Animujemy tylko** `transform`, `opacity` i właściwości SVG (`stroke-dashoffset`) – nigdy
   szerokości, wysokości, marginesów ani `top`/`left`.
6. **GSAP:** wtyczki rejestrowane w jednym module klienckim `src/lib/gsap.ts`; każda animacja w
   `useGSAP` ze `scope`; `gsap.matchMedia()` rozdziela reduced motion oraz telefon i komputer
   (przypinanie tylko od 1024 px).
7. **Bez przesunięć układu:** miejsce na ilustracje rezerwują `viewBox` i `aspect-ratio`, fonty przez
   `next/font`.
8. **Ilustracje oddzielone od ruchu:** rysunki to czyste komponenty TSX (bez logiki animacji, z `id` i
   `data-*` na elementach do animowania, kolory przez zmienne CSS). Animację dodają komponenty z
   `src/components/motion/`. Dzięki temu te same rysunki wracają do reklam w Remotion.
9. **Spójność z reklamą:** `src/brand/tokens.ts` ma wartości identyczne z `src/theme.ts` projektu
   reklamy i z CSS (sprawdzane testem). Wspólny pakiet marki (monorepo) – tylko po uzgodnieniu.

## Jak dodać…

**Podstronę**

1. Dopisz ją w [mapa-strony.md](mapa-strony.md) (adres, cel).
2. Dodaj ścieżkę do `ROUTES` w `src/config/routes.ts` (planowane strony już tam są, żeby menu mogło
   do nich linkować) i do `LIVE_ROUTES`.
3. Utwórz `src/app/<adres>/page.tsx` z `export const metadata = pageMetadata({...})`.
4. Jeśli ma być w menu – dodaj pozycję w `src/config/navigation.ts`.

Mapa witryny aktualizuje się sama na podstawie `LIVE_ROUTES`.

**Sekcję** – komponent w `src/sections/<podstrona>/`, zbudowany na `Section` i `SectionHeading`,
eksportowany w `index.ts`.

**Treść powtarzalną** (usługa, realizacja) – wpis w odpowiednim pliku `src/data/`; komponenty tylko ją
renderują. Struktura danych ma ułatwić późniejsze podpięcie lekkiego CMS (⚠ P-14).

**Zdjęcie** – `next/image`; plik wrzucamy od razu w docelowym rozmiarze i formacie (brak optymalizacji
w locie). Zdjęcie w kilku szerokościach (np. kamienica w sekcji „Realizacje”: WebP 960 i 1920 px, wygenerowane
`sharp` z zależności Next.js do czasu planowanego skryptu) – zwykły `<img>` z `srcSet` i `sizes`,
bo `next/image` przy `images.unoptimized` nie tworzy `srcset`.

## Wdrożenie

- `npm run build` tworzy w `out/` gotową stronę: każda podstrona to osobny `index.html`, więc wystarczy
  dowolny hosting plików.
- Przekierowania 301 ([mapa-strony.md](mapa-strony.md#przekierowania-301-ze-starej-strony)) zapisujemy
  w pliku hostingu: `public/_redirects` (Netlify, Cloudflare Pages) albo `vercel.json`. Hosting –
  ⚠ P-15.
- Klucze usług (formularz, analityka) w `.env` jako `NEXT_PUBLIC_…`, wzór w `.env.example`.
