import Link from 'next/link';
import { OfferDrawing } from '@/components/illustrations/OfferDrawing';
import { CenterStage } from '@/components/motion/CenterStage';
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
 * (docs/mapa-strony.md#strona-główna, docs/decyzje.md D-29, D-37): built like the authorisations –
 * a big centred heading, and below it the services pass through the centre on desktop (CenterStage),
 * each as a technical drawing on a sheet. Blue paper – white lines of the drawings; the divider comes
 * from its position (D-24).
 */
export function OfferSection() {
  return (
    <Section theme="blue" aria-labelledby="offer-title">
      <CenterStage
        heading={
          <SectionHeading
            id="offer-title"
            eyebrow="Oferta"
            title="Czym się zajmujemy"
            lead="Dach od pokrycia po rynnę – i to, co w domu pod nim: drzwi, podłogi i parapety."
            centered
          />
        }
        // 50 % faster than the default on request: six items at one screen each were too long
        vhPerItem={67}
        className={cn(styles.scene, 'grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3')}
        items={OFFER.map((item, i) => ({
          id: item.href,
          visual: (
            <Link
              href={item.href}
              aria-label={item.label}
              className={cn(styles.sheet, 'block p-4')}
            >
              <OfferDrawing route={item.href} className="h-auto w-full" />
            </Link>
          ),
          text: (
            <>
              <p className="text-eyebrow text-(--label) uppercase">
                {sheetNumber(i + 1, OFFER.length)} · {item.group}
              </p>
              <h3 className="mt-1 text-h3 lg:text-h2 lg:text-(--title)">{item.label}</h3>
              <p className="mt-2 text-list">{item.description}</p>
            </>
          ),
        }))}
      />
    </Section>
  );
}
