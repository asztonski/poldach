import photo960 from '@/assets/images/realizacje/kamienica-morska-960.webp';
import photo1920 from '@/assets/images/realizacje/kamienica-morska-1920.webp';
import {
  TENEMENT_NOTES,
  TENEMENT_RATIO,
  TenementDrawing,
} from '@/components/illustrations/TenementDrawing';
import { TracingReveal } from '@/components/motion/TracingReveal';
import { CheckList, Container, Section } from '@/components/ui';
import { cn } from '@/lib/cn';
import styles from './ProjectSection.module.css';

// TODO(P-21): town and name of the building, confirmed year – the year is the photo's (EXIF)
const CAPTION = 'Kamienica narożna · 2009';

/**
 * One project up close, right under the hero (docs/mapa-strony.md#strona-główna, docs/decyzje.md
 * D-19, D-20, D-50): the photo from the old site, edge to edge, and its technical drawing on tracing
 * paper slides over it while scrolling – navy lines, hidden structure in blue. No heading band: the
 * photo speaks for itself; the caption and the notes name what it shows.
 */
export function ProjectSection() {
  return (
    <Section
      theme="white"
      contained={false}
      aria-label="Realizacja z bliska – zdjęcie i rysunek techniczny"
      // The photo starts right at the slanted edge: no space above it
      className={cn('pt-0', styles.coveredByNext)}
    >
      {/* Reaches up into the slant, like a heading band (--slant-edge, globals.css) */}
      <figure className="mt-[calc(-1*var(--slant-edge,0px))]">
        <TracingReveal
          ratio={TENEMENT_RATIO}
          photo={
            // Static export: both widths are generated ahead of time, next/image would not add a
            // srcset (images.unoptimized)
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo1920.src}
              srcSet={`${photo960.src} 960w, ${photo1920.src} 1920w`}
              sizes="100vw"
              width={photo1920.width}
              height={photo1920.height}
              loading="lazy"
              decoding="async"
              alt="Narożna kamienica z wieżą, dachem mansardowym z czerwonej dachówki i lukarnami obitymi blachą"
            />
          }
          drawing={<TenementDrawing preserveAspectRatio="xMidYMin slice" />}
          label={
            <Container>
              <span className="inline-block bg-pd-white px-3 py-2 text-eyebrow text-pd-navy-900 uppercase">
                {CAPTION}
              </span>
            </Container>
          }
        />
        <Container>
          <figcaption
            className={cn('mt-4 text-eyebrow text-(--label) uppercase', styles.captionBelow)}
          >
            {CAPTION}
          </figcaption>
          {/* The notes of the drawing as text – visible on narrower screens, for screen readers always */}
          <CheckList items={TENEMENT_NOTES} className="mt-6 lg:sr-only" />
        </Container>
      </figure>
    </Section>
  );
}
