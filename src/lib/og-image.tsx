import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { ImageResponse } from 'next/og';
import { LogoWithFigure } from '@/brand/LogoWithFigure';
import { SITE } from '@/config/site';

/*
 * The image a shared link shows (Open Graph, docs/standardy.md#seo, docs/decyzje.md D-129): the
 * yellow of the hero with the page's grid, the page's title, the proof as marker notes – as in the
 * hero – and the logo with the figure. Every page's `opengraph-image.tsx` calls `ogImage` with its
 * title; the image is drawn at build time (static export). Files are read from the project, so
 * nothing is fetched while building.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const root = process.cwd();
const file = (...path: string[]) => readFileSync(join(root, ...path));

// Colour tokens from globals.css – the one source (docs/architektura.md, rule 3)
const TOKENS = Object.fromEntries(
  Array.from(
    file('src/styles/globals.css')
      .toString()
      .matchAll(/--color-(pd-[a-z0-9-]+):\s*(#[0-9a-f]{3,8})/gi),
    (match) => [match[1], match[2]],
  ),
);
const color = (token: string) => {
  const value = TOKENS[token];
  if (!value) throw new Error(`og-image: no colour token --color-${token}`);
  return value;
};
/** A token with some opacity – the image renderer has no color-mix() */
const translucent = (token: string, alpha: number) => {
  const [r, g, b] = (color(token).slice(1).match(/../g) ?? []).map((hex) => parseInt(hex, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/*
 * The logo with the figure (LogoWithFigure) with its Tailwind colour classes (`fill-pd-…`,
 * `stroke-pd-…`) turned into `fill` and `stroke` of the token values – the image has no stylesheet
 */
function paint(node: ReactNode): ReactNode {
  if (!isValidElement(node)) return node;
  const { className, children } = node.props as { className?: string; children?: ReactNode };
  const colours = Object.fromEntries(
    (className?.split(/\s+/) ?? []).map((name) => {
      const [, property, token] = /^(fill|stroke)-(.+)$/.exec(name) ?? [];
      if (!property) throw new Error(`og-image: unexpected class "${name}" in the logo`);
      return [property, token === 'none' ? 'none' : color(token)];
    }),
  );
  const painted = Children.map(children, paint);
  return cloneElement(
    node as ReactElement<Record<string, unknown>>,
    { ...colours, className: undefined },
    ...(painted ?? []),
  );
}

// viewBox of LogoWithFigure: 424 × 529
const LOGO_HEIGHT = 500;
const LOGO_WIDTH = Math.round((LOGO_HEIGHT * 424) / 529);
const LOGO = cloneElement(
  paint(LogoWithFigure({ decorative: true })) as ReactElement<Record<string, unknown>>,
  { width: LOGO_WIDTH, height: LOGO_HEIGHT },
);

const PSD_SIGN = `data:image/png;base64,${file('src/assets/images/logotypy/psd-znak.png').toString('base64')}`;

const font = (name: string) => file('src/assets/fonts', name);
// Whole static files (Google Fonts, OFL), not the split latin / latin-ext subsets – with those
// the renderer took "ś" from a fallback font
const FONTS = [
  { name: 'Roboto Condensed', data: font('roboto-condensed-700.ttf'), weight: 700 },
  { name: 'Kalam', data: font('kalam-700.ttf'), weight: 700 },
] as const;

const FOUNDED = `Istniejemy od ${SITE.foundingYear}`;
// TODO(P-19): membership to be confirmed by the client – the hero and the logo state it too
const PSD_MEMBER = 'Członek Polskiego Stowarzyszenia Dekarzy';

/** Alt text of a page's image */
export const ogAlt = (title: string) =>
  `${title} – ${SITE.name}, logo z parasolem. ${FOUNDED}. ${PSD_MEMBER}.`;

/** Hand-drawn tick, as in the hero's notes (HeroSection) */
function MarkerTick() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color('pd-blue-500')}
      strokeWidth={3.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12.6c2 1.3 3.7 3.1 5.2 6C11.2 11.6 15.3 6.6 21 3.6" />
    </svg>
  );
}

function Note({ icon, text, tilt }: { icon: ReactNode; text: string; tilt: number }) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 20, transform: `rotate(${tilt}deg)` }}
    >
      <div style={{ display: 'flex', width: 60, justifyContent: 'center' }}>{icon}</div>
      <span>{text}</span>
    </div>
  );
}

/** The image of one page: its title next to the proof and the logo */
export function ogImage(title: string) {
  // The grid line of a yellow section (theme-yellow in globals.css: navy at 8 %)
  const grid = translucent('pd-navy-900', 0.08);
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 80px',
        fontFamily: 'Roboto Condensed',
        color: color('pd-navy-900'),
        backgroundColor: color('pd-yellow-500'),
        // The page grid (54 px, globals.css) over the vignette of a yellow section
        backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px), radial-gradient(ellipse 80% 60% at 50% 30%, ${color('pd-yellow-300')}, ${color('pd-yellow-600')})`,
        backgroundSize: '54px 54px, 54px 54px, 100% 100%',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', width: 600 }}>
        <span style={{ fontSize: 26, letterSpacing: 4, textTransform: 'uppercase' }}>
          poldach.eu
        </span>
        <span
          style={{
            marginTop: 16,
            fontSize: title.length > 26 ? 64 : 80,
            lineHeight: 1.05,
            color: color('pd-blue-500'),
          }}
        >
          {title}
        </span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
            marginTop: 48,
            fontFamily: 'Kalam',
            fontSize: 38,
          }}
        >
          <Note icon={<MarkerTick />} text={FOUNDED} tilt={-2} />
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse draws plain <img> */}
          <Note
            icon={<img src={PSD_SIGN} width={60} height={60} alt="" />}
            text={PSD_MEMBER}
            tilt={-1}
          />
        </div>
      </div>
      {LOGO}
    </div>,
    { ...OG_SIZE, fonts: [...FONTS] },
  );
}
