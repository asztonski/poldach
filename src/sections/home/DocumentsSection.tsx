import Image from 'next/image';
import { CenterStage } from '@/components/motion/CenterStage';
import { Section, SectionHeading } from '@/components/ui';
import { FEATURED_CERTIFICATES } from '@/data/certificates';
import { sheetNumber } from '@/lib/format';

/**
 * Section 4 – authorisations and the award (docs/mapa-strony.md#strona-główna, docs/decyzje.md
 * D-26, D-28, D-29): a big centred heading, and below it the scans pass through the centre on
 * desktop (CenterStage). Yellow paper between the white company section and the blue project; the divider
 * comes from its position (D-24).
 */
export function DocumentsSection() {
  return (
    <Section theme="yellow" aria-labelledby="documents-title">
      <CenterStage
        heading={
          <SectionHeading
            id="documents-title"
            eyebrow="Dokumenty"
            title="Autoryzacje i nagroda"
            lead="Autoryzacje producentów pokryć i nagroda w konkursie Prefa i Polskiego Stowarzyszenia Dekarzy. Każdy skan otwiera się w pełnym rozmiarze."
            centered
          />
        }
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
              {/* The title colour only from h2 size up – blue on yellow needs 40 px (docs/design-system.md#kontrast) */}
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
