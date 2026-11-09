import Image from 'next/image';
import { PinnedScene } from '@/components/motion/PinnedScene';
import { Section, SectionHeading } from '@/components/ui';
import { FEATURED_CERTIFICATES } from '@/data/certificates';
import { cn } from '@/lib/cn';
import { sheetNumber } from '@/lib/format';
import styles from './DocumentsSection.module.css';

/**
 * Section 4 – authorisations and the award (docs/mapa-strony.md#strona-główna, docs/decyzje.md
 * D-26, D-28, D-29): a big centred heading, then on desktop a pinned sequence like metriccivil.ca
 * "Full-scope" – the scans pass through the centre one after another (DocumentsSection.module.css).
 * Yellow paper between the white company section and the blue project; the divider comes from its
 * position (D-24).
 */
export function DocumentsSection() {
  return (
    <Section theme="yellow" aria-labelledby="documents-title">
      {/* Centred by request – an exception to left-aligned content sections (D-26) */}
      <SectionHeading
        id="documents-title"
        eyebrow="Dokumenty"
        title="Autoryzacje i nagroda"
        lead="Autoryzacje producentów pokryć i nagroda w konkursie Prefa i Polskiego Stowarzyszenia Dekarzy. Każdy skan otwiera się w pełnym rozmiarze."
        centered
        titleClassName="text-h1"
        leadClassName="mt-4 text-body"
      />
      <div aria-hidden="true" className="mt-(--grid-step) h-0.5 bg-current opacity-20" />

      {/* One screen of scrolling per document */}
      <PinnedScene length="300vh">
        {/* Three columns also on phones – full-size scans one under another would be a long scroll */}
        <ol className={cn(styles.docs, 'mt-8 grid grid-cols-3 gap-3 sm:gap-6')}>
          {FEATURED_CERTIFICATES.map((doc, i) => (
            <li key={doc.id} className={styles.doc}>
              <a
                href={doc.image.src}
                target="_blank"
                rel="noopener"
                className={cn(styles.docImage, 'group block')}
              >
                <Image
                  src={doc.image}
                  sizes="(width >= 64rem) 27rem, 30vw"
                  alt={`${doc.title} – ${doc.issuer}, ${doc.year ?? 'bez daty'}`}
                  className="h-auto w-full border-2 border-pd-navy-900"
                />
                <span className="sr-only"> (skan otwiera się w nowej karcie)</span>
              </a>
              <div className={cn(styles.docText, 'mt-3')}>
                <p className="text-small font-bold sm:text-eyebrow sm:uppercase">
                  {sheetNumber(i + 1, FEATURED_CERTIFICATES.length)} · {doc.year}
                </p>
                {/* The title colour only from h2 size up – blue on yellow needs 40 px (docs/design-system.md#kontrast) */}
                <p className="mt-1 text-small font-bold sm:text-h3 lg:text-h2 lg:text-(--title)">
                  {doc.name}
                </p>
                <p className="mt-2 hidden text-small sm:block lg:text-body">{doc.title}</p>
              </div>
            </li>
          ))}
        </ol>
      </PinnedScene>
    </Section>
  );
}
