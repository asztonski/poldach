import Link from 'next/link';
import { OfferDrawing } from '@/components/illustrations/OfferDrawing';
import { DrawOnScroll } from '@/components/motion/DrawOnScroll';
import { PinnedScene } from '@/components/motion/PinnedScene';
import reveal from '@/components/motion/Reveal.module.css';
import { Section, SectionHeading } from '@/components/ui';
import { SERVICE_NAV } from '@/config/navigation';
import { cn } from '@/lib/cn';
import { sheetNumber } from '@/lib/format';
import styles from './OfferSection.module.css';

// The same services as the "Usługi" menu – one source (src/config/navigation.ts).
// TODO(P-04): windows, decking and worktops from the old site wait for the client's answer
// TODO(P-10): the weight of doors and floors against roofs
const OFFER = SERVICE_NAV.flatMap((group) =>
  group.links.map((link) => ({ ...link, group: group.label })),
);

/**
 * Section 2 – the offer at a glance, like the old site's "Czym się zajmujemy" tiles
 * (docs/mapa-strony.md#strona-główna, docs/decyzje.md D-29): one sheet per service, each with a
 * technical drawing. The heading fades in once (D-36); the sheets come with the scroll, strictly
 * one element after another – on desktop the stage is pinned and the scroll plays them (D-30, D-31,
 * OfferSection.module.css).
 * Blue paper; the divider comes from its position (D-24).
 */
export function OfferSection() {
  return (
    <Section theme="blue" aria-labelledby="offer-title">
      {/* About 60vh of scrolling per sheet */}
      <PinnedScene length="360vh" className={styles.stage}>
        <SectionHeading
          id="offer-title"
          eyebrow="Oferta"
          title="Czym się zajmujemy"
          lead="Dach od pokrycia po rynnę – i to, co w domu pod nim: drzwi, podłogi i parapety."
          className={styles.heading}
          leadClassName={styles.lead}
        />

        <ul
          className={cn(
            styles.sheets,
            'mt-(--grid-step) grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8',
          )}
        >
          {OFFER.map((item, i) => (
            <li
              key={item.href}
              className={cn(
                styles.sheet,
                'group relative flex flex-col p-5 lg:p-6',
                'has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-(--focus)',
              )}
            >
              <p
                className={cn(reveal.rise, styles.number, 'text-eyebrow text-(--label) uppercase')}
              >
                {sheetNumber(i + 1, OFFER.length)} · {item.group}
              </p>
              <DrawOnScroll className={cn(styles.drawing, 'mt-4')}>
                <OfferDrawing route={item.href} className="h-auto w-full" />
              </DrawOnScroll>
              <h3 className={cn(reveal.rise, styles.title, 'mt-5 text-h3')}>
                {/* The whole sheet is the link; the focus ring is drawn on the sheet */}
                <Link
                  href={item.href}
                  className="after:absolute after:inset-0 focus-visible:outline-none"
                >
                  {item.label}
                </Link>
              </h3>
              <p className={cn(reveal.rise, styles.text, 'mt-2 mb-4')}>{item.description}</p>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(reveal.rise, styles.arrow, 'mt-auto size-7 self-end text-(--title)')}
              >
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </li>
          ))}
        </ul>
      </PinnedScene>
    </Section>
  );
}
