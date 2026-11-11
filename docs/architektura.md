# Architektura

Jak budujemy stronę. Co ma powstać – [mapa-strony.md](mapa-strony.md), jakie wymagania spełnić –
[standardy.md](standardy.md).

## Stos

**Zainstalowane** (wersje – `package.json`): Next.js (App Router, statyczny eksport), React,
TypeScript (strict), Tailwind CSS 4, lucide-react, clsx + tailwind-merge, ESLint (konfiguracja Next) +
Prettier z sortowaniem klas Tailwind. Font Roboto Condensed (zmienny) przez `next/font/google` w
`src/app/layout.tsx`; Kalam 700 (notatki pisakiem) w `src/sections/home/HeroSection.tsx`. Formularz
kontaktowy – usługa Web3Forms, bez biblioteki, walidacja przeglądarki
([`ContactForm`](../src/components/common/ContactForm.tsx), [decyzje.md](decyzje.md) D-85); mapa –
osadzenie Google po zgodzie na cookies ([`MapCard`](../src/components/common/MapCard.tsx), wybór – `src/lib/consent.ts`, D-86, D-93); statystyki – Google Analytics 4 przez `next/script`, tylko w buildzie produkcyjnym i po zgodzie ([`Analytics`](../src/components/common/Analytics.tsx), D-94); własne zdarzenia – `track()` z [`src/lib/analytics.ts`](../src/lib/analytics.ts), nowe zdarzenie dopisujemy do typu `AnalyticsEvent` (D-96).

**Planowane** (faza fundamentów – [roadmapa.md](roadmapa.md)):

| Obszar             | Wybór                                                                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Animacje           | GSAP + `@gsap/react` (ScrollTrigger, DrawSVGPlugin); proste pojawienia – natywne CSS scroll-driven animations w `@supports`                                   |
| Płynne przewijanie | Lenis – włączony na stałe ([decyzje.md](decyzje.md) D-35); tylko mysz i touchpad, nigdy przy reduced motion, uruchamiany po wczytaniu strony (`SmoothScroll`) |
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
│   ├── common/           # komponenty współdzielone (LogoLink, ContactForm, MapCard, VideoPlayer, CookieBanner, CookieSettingsButton, Analytics)
│   ├── layout/           # Header, DesktopNav, MobileMenu, MobileCallBar; Footer
│   ├── ui/               # klocki design systemu (Section, Eyebrow, PhoneButton, ButtonLink, …; klasy przycisków i linków – button-variants, link-variants)
│   ├── illustrations/    # rysunki techniczne: TenementDrawing, DormersDrawing na technical-drawing.tsx; edges/ – krawędzie zdjęć (generowane)
│   └── motion/           # AnchorGlide, CenterStage, FadeInOnce, LogoEntrance, OneWayScene, PinnedScene, SmoothScroll, StayInPlace, TracingReveal; (planowane) CountUp, SectionWipe
├── config/               # site.ts (dane firmy), routes.ts (ścieżki), navigation.ts (menu)
├── data/                 # treści jako typowane dane (oferta, opinie, certyfikaty)
├── hooks/                # własne hooki React (useHeaderScroll, useHydrated)
├── lib/                  # funkcje pomocnicze (cn, sheetNumber, pageMetadata, normalizePath); zgoda na cookies (consent), zdarzenia GA (analytics); (planowane) gsap
├── sections/             # sekcje stron według podstron (home, leak-detection, shop); common – kontakt i otwarcie podstrony
├── styles/globals.css    # tokeny Tailwind (@theme) i style bazowe
└── types/                # wspólne typy TS
```

Import z `src` przez alias `@/`, np. `import { Section } from '@/components/ui'`.

Poza `src/`: `design/` – pliki logo i makiety od projektanta, bez zmian i poza buildem
([design/README.md](../design/README.md), [decyzje.md](decyzje.md) D-13); `scripts/` – narzędzia
deweloperskie uruchamiane `node scripts/<nazwa>.mjs` (rysunki techniczne, patrz niżej).

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
2. Dodaj ścieżkę do `ROUTES` w `src/config/routes.ts` i do `LIVE_ROUTES` – w `ROUTES` są tylko
   istniejące strony i kotwice sekcji strony głównej (`SECTION_IDS`), więc żaden link nie prowadzi
   donikąd ([decyzje.md](decyzje.md) D-84).
3. Utwórz `src/app/<adres>/page.tsx` z `export const metadata = pageMetadata({...})`; otwarcie –
   `PageHero`, na końcu `ContactSection` (`src/sections/common/`).
4. Jeśli ma być w menu – dodaj pozycję w `src/config/navigation.ts`.

Mapa witryny aktualizuje się sama na podstawie `LIVE_ROUTES`.

**Sekcję** – komponent w `src/sections/<podstrona>/`, zbudowany na `Section` i `SectionHeading`,
eksportowany w `index.ts`.

**Treść powtarzalną** (usługa, realizacja) – wpis w odpowiednim pliku `src/data/`; komponenty tylko ją
renderują. Struktura danych ma ułatwić późniejsze podpięcie lekkiego CMS (⚠ P-14).

**Zdjęcie** – `next/image`; plik wrzucamy od razu w docelowym rozmiarze i formacie (brak optymalizacji
w locie). Zdjęcie w kilku szerokościach (np. realizacje: WebP 960 i 1920 px, wygenerowane `sharp` –
zależność deweloperska) – zwykły `<img>` z `srcSet` i `sizes`, bo `next/image` przy
`images.unoptimized` nie tworzy `srcset`.

**Realizację z rysunkiem technicznym** ([decyzje.md](decyzje.md) D-50, D-81, D-83) – wpis w
`src/sections/home/projects.tsx` i rysunek w `src/components/illustrations/`, zbudowany na
`technical-drawing.tsx`. Linie rysunku to krawędzie samego zdjęcia, więc pasują do niego 1:1:

1. `node scripts/photo-edges.mjs <zdjęcie> src/components/illustrations/edges/<nazwa>.ts` – detekcja
   krawędzi (Canny), łańcuchy pikseli uproszczone do łamanych, zapis jako ścieżka SVG w pikselach
   zdjęcia (plik generowany, nie edytujemy go). Opcje: rozmycie, progi, minimalna długość, odrzucanie
   małych pętelek (naklejki na szybach), wycinanie obszaru (np. baner). Podgląd: to samo z `.svg` na
   końcu.
2. Odnośniki z opisami i ukrytą konstrukcję wpisujemy ręcznie w komponencie rysunku; współrzędne
   odczytujemy z wycinków zdjęcia z siatką: `node scripts/photo-grid.mjs <zdjęcie> <wynik.jpg> x y szer
wys [krok] [powiększenie]`.
3. Kontrola: rysunek nałożony na półprzezroczyste zdjęcie (w `TracingReveal` wystarczy w DevTools
   wyłączyć animację okna zdjęcia i dać mu `opacity: 0.45`).

## Wdrożenie

- `npm run build` tworzy w `out/` gotową stronę: każda podstrona to osobny `index.html`, więc wystarczy
  dowolny hosting plików.
- Przekierowania 301 ([mapa-strony.md](mapa-strony.md#przekierowania-301-ze-starej-strony)) –
  [`public/_redirects`](../public/_redirects), format Netlify i Cloudflare Pages; przy Vercel trzeba
  je przepisać do `vercel.json`. Hosting – ⚠ P-15.
- Klucze usług, jawne z założenia i te same dla każdej budowy – identyfikator GA i klucz Web3Forms –
  w [`.env.production`](../.env.production), w repozytorium (D-95, D-98). Zmiana na czas testu – w
  `.env.local` (poza repozytorium), wzór w [`.env.example`](../.env.example). Wchodzą do strony przy budowie –
  po zmianie trzeba ponownego `npm run build`. Sekretów (kluczy, które dają dostęp) strona statyczna nie ma i
  mieć nie może.
