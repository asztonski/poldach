import Image from 'next/image';
import { CenterStage } from '@/components/motion/CenterStage';
import { Section } from '@/components/ui';
import { FEATURED_CERTIFICATES } from '@/data/certificates';
import { sheetNumber } from '@/lib/format';

/**
 * Section 4 – authorisations and the award (docs/mapa-strony.md#strona-główna, docs/decyzje.md
 * D-26, D-28, D-29, D-47): the blue band with the heading, and below it the scans pass through the
 * centre on desktop (CenterStage).
 */
export function DocumentsSection() {
  return (
    <Section
      theme="white"
      heading={{
        id: 'documents-title',
        title: 'Autoryzacje i nagroda',
        lead: 'Autoryzacje producentów pokryć i nagroda w konkursie Prefa i Polskiego Stowarzyszenia Dekarzy. Każdy skan otwiera się w pełnym rozmiarze.',
      }}
    >
      <CenterStage
        // Three columns also on phones – full-size scans one under another would be a long scroll
        className="grid grid-cols-3 gap-3 sm:gap-6"
        items={FEATURED_CERTIFICATES.map((doc, i) => ({
          id: doc.id,
          visual: (
            <a href={doc.image.src} target="_blank" rel="noopener" className="block">
              <Image
                src={doc.image}
                sizes="(width >= 64rem) 27rem, 30vw"
                alt={`${doc.title} – ${doc.issuer}, ${doc.year ?? 'bez daty'}`}
                className="h-auto w-full border-2 border-pd-navy-900"
              />
              <span className="sr-only"> (skan otwiera się w nowej karcie)</span>
            </a>
          ),
          text: (
            <>
              <p className="text-small font-bold sm:text-eyebrow sm:uppercase">
                {sheetNumber(i + 1, FEATURED_CERTIFICATES.length)} · {doc.year}
              </p>
              {/* The title colour only from h2 size up (docs/design-system.md#kontrast) */}
              <p className="mt-1 text-small font-bold sm:text-h3 lg:text-h2 lg:text-(--title)">
                {doc.name}
              </p>
              <p className="mt-2 hidden sm:block lg:text-list">{doc.title}</p>
            </>
          ),
        }))}
      />
    </Section>
  );
}
