import type { CSSProperties } from 'react';
import Image from 'next/image';
import headquarters from '@/assets/images/firma/siedziba-kokoszkowy.webp';
import { OneWayScene } from '@/components/motion/OneWayScene';
import { PinnedScene } from '@/components/motion/PinnedScene';
import { Section, SectionHeading } from '@/components/ui';
import { BUILD_YEAR, SITE } from '@/config/site';
import { cn } from '@/lib/cn';
import styles from './AboutSection.module.css';

const YEARS = BUILD_YEAR - SITE.foundingYear;

/** "34 lata", "35 lat", "1 rok" */
function yearsWord(n: number) {
  if (n === 1) return 'rok';
  const lastDigit = n % 10;
  const lastTwo = n % 100;
  return lastDigit >= 2 && lastDigit <= 4 && (lastTwo < 12 || lastTwo > 14) ? 'lata' : 'lat';
}

// docs/firma.md#historia
// TODO(P-09): further milestones and notable projects
const MILESTONES = [
  { year: String(SITE.foundingYear), text: 'Jacek Supiński rozpoczyna działalność' },
  { year: '2003', text: 'Dołącza Piotr Supiński – firmę prowadzą bracia' },
  { year: '2005', text: 'Autoryzowany wykonawca pokryć Euronit' },
  { year: '2006', text: 'Autoryzowany wykonawca Prefa, nagroda w konkursie Prefa i PSD' },
  { year: 'dziś', text: 'Dachy, diagnostyka przecieków, eternit, drzwi i podłogi' },
];

/**
 * Dimension line of a technical drawing: arrowheads and extension lines at both ends. From 1024 px
 * it lies above the milestones; the bar grows from the left and the right end rides on its tip
 * (AboutSection.module.css).
 */
function DimensionLine() {
  return (
    <div aria-hidden="true" className="relative hidden h-6 overflow-hidden lg:block">
      <span className="absolute top-0 left-0 h-6 w-0.5 bg-current" />
      <span className="absolute top-1/2 left-0.5 size-3 -translate-y-1/2 bg-current [clip-path:polygon(0_50%,100%_0,100%_100%)]" />
      <span
        className={cn(
          styles.bar,
          'absolute inset-x-0 top-1/2 h-0.5 origin-left -translate-y-1/2 bg-current',
        )}
      />
      <span className={cn(styles.end, 'absolute inset-0')}>
        <span className="absolute top-0 right-0 h-6 w-0.5 bg-current" />
        <span className="absolute top-1/2 right-0.5 size-3 -translate-y-1/2 bg-current [clip-path:polygon(0_0,100%_50%,0_100%)]" />
      </span>
    </div>
  );
}

/**
 * The same line standing up, on the right of the milestones (below 1024 px, docs/decyzje.md D-124):
 * it grows down from the top and the bottom end rides on its tip.
 */
function DimensionLineVertical() {
  return (
    <div aria-hidden="true" className="relative mt-6 w-6 overflow-hidden lg:hidden">
      <span className="absolute top-0 left-0 h-0.5 w-6 bg-current" />
      <span className="absolute top-0.5 left-1/2 size-3 -translate-x-1/2 bg-current [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
      <span
        className={cn(
          styles.barDown,
          'absolute inset-y-0 left-1/2 w-0.5 origin-top -translate-x-1/2 bg-current',
        )}
      />
      <span className={cn(styles.endDown, 'absolute inset-0')}>
        <span className="absolute bottom-0 left-0 h-0.5 w-6 bg-current" />
        <span className="absolute bottom-0.5 left-1/2 size-3 -translate-x-1/2 bg-current [clip-path:polygon(0_0,100%_0,50%_100%)]" />
      </span>
    </div>
  );
}

/**
 * Section 3 – the company (docs/mapa-strony.md#strona-główna, docs/decyzje.md D-23, D-29, D-53):
 * how long it has been around, who runs it and the head office; the documents follow (D-28). All
 * blue, no separate band: the heading fades in once (D-36), the stage is pinned (D-25; on a phone
 * by the timeline, D-124) and scrolling down plays the rest; scrolling up never rewinds it, and once
 * complete it unpins (D-63).
 */
export function AboutSection() {
  const { street, city } = SITE.contact.address;

  return (
    // overflow-x-clip: the columns slide in from beyond the container – no sideways page scroll
    <Section theme="blue" aria-labelledby="about-title" className="overflow-x-clip">
      {/* Title, description and photo in one block (D-53) */}
      {/* Slowed down twice on request: 150vh + 30 % = 195vh, then × 2. One way: D-63 */}
      <OneWayScene>
        {/* On a phone a shorter swipe – five milestones one under another (D-124). On a low
            desktop screen the scene is taller than the screen and pins by the timeline (D-125) */}
        <PinnedScene length="390vh" smallLength="260vh" tall className={styles.stage}>
          <div
            className={cn(
              styles.head,
              'grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16',
            )}
          >
            {/* From the old site's "O nas" (design/stara-strona/tresci.md), in our own words */}
            <SectionHeading
              id="about-title"
              title={`Dachy robimy od ${SITE.foundingYear} roku`}
              lead="Jesteśmy rodzinną firmą z Kokoszkowych pod Starogardem Gdańskim. Umiejętności i doświadczenie przechodzą u nas z ojca na syna."
              stacked
            >
              <p className="mt-4 max-w-xl text-lead">
                Prowadzimy klienta od bezpłatnego doradztwa i wyceny, przez dostawę materiału, po
                montaż – z materiału własnego albo powierzonego. Ekipę systematycznie szkolimy u
                producentów.
              </p>
            </SectionHeading>

            {/* A photo stands on a field in the opposite colour, caption as an eyebrow (docs/design-system.md#zdjęcia) */}
            <figure className={cn(styles.right, 'rounded-box bg-pd-yellow-500 p-3 sm:p-4')}>
              <Image
                src={headquarters}
                sizes="(width >= 64rem) 30rem, calc(100vw - 4rem)"
                alt="Siedziba POLDACH w Kokoszkowych – budynek z łukowym dachem i szyldem POLDACH"
                // Inner corners follow the field: its radius less the padding, at least a hint
                className="h-auto w-full rounded-[calc(var(--radius-box)/2)]"
              />
              <figcaption className="mt-3 text-eyebrow text-pd-navy-900 uppercase">
                Siedziba · {street}, {city}
              </figcaption>
            </figure>
          </div>

          {/* 1992 ↔ today as a dimension line; the number of years is its dimension. Below 1024 px
              the line stands on the right and the milestones go one under another (D-124) */}
          <div
            className={cn(
              styles.timeline,
              'mt-12 grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 lg:block',
            )}
          >
            <p className="col-span-2 flex items-baseline justify-end gap-3 text-(--title) lg:justify-center">
              <span
                className={cn(styles.years, 'text-display tabular-nums')}
                style={{ '--to': YEARS } as CSSProperties}
              >
                <span className={styles.yearsValue}>{YEARS}</span>
              </span>
              <span className={cn(styles.yearsWord, 'text-h3')}>{yearsWord(YEARS)}</span>
            </p>
            <DimensionLine />
            <ol className={cn(styles.milestones, 'mt-6 grid gap-5 lg:grid-cols-5 lg:gap-6')}>
              {MILESTONES.map((milestone) => (
                <li key={milestone.year} className="border-l-2 border-current pl-4">
                  <p className="text-eyebrow uppercase">{milestone.year}</p>
                  <p className="mt-1">{milestone.text}</p>
                </li>
              ))}
            </ol>
            <DimensionLineVertical />
          </div>
        </PinnedScene>
      </OneWayScene>
    </Section>
  );
}
