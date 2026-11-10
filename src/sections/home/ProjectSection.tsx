import { TracingReveal } from '@/components/motion/TracingReveal';
import { CheckList, Container, Section } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { Project } from './projects';
import styles from './ProjectSection.module.css';

/**
 * One project up close (docs/mapa-strony.md#strona-główna, docs/decyzje.md D-19, D-20, D-50, D-81):
 * the photo from the old site, edge to edge, and its technical drawing comes out from under it while
 * scrolling. No heading band: the photo speaks for itself; the caption and the notes name what it
 * shows. The projects – projects.tsx.
 */
export function ProjectSection({ project }: { project: Project }) {
  const { caption, alt, photo, ratio, drawing, notes } = project;

  return (
    <Section
      theme="white"
      contained={false}
      aria-label={`Realizacja z bliska – ${caption}`}
      // The photo starts right at the top edge: no space above it
      className={cn('pt-0', styles.coveredByNext)}
    >
      <figure>
        <TracingReveal
          ratio={ratio}
          photo={
            // Static export: both widths are generated ahead of time, next/image would not add a
            // srcset (images.unoptimized)
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo.large.src}
              srcSet={`${photo.small.src} 960w, ${photo.large.src} 1920w`}
              sizes="100vw"
              width={photo.large.width}
              height={photo.large.height}
              loading="lazy"
              decoding="async"
              alt={alt}
            />
          }
          drawing={drawing}
          label={
            <Container>
              <span className="inline-block bg-pd-white px-3 py-2 text-eyebrow text-pd-navy-900 uppercase">
                {caption}
              </span>
            </Container>
          }
        />
        <Container>
          <figcaption
            className={cn('mt-4 text-eyebrow text-(--label) uppercase', styles.captionBelow)}
          >
            {caption}
          </figcaption>
          {/* The notes of the drawing as text – visible on narrower screens, for screen readers always */}
          <CheckList items={notes} className="mt-6 lg:sr-only" />
        </Container>
      </figure>
    </Section>
  );
}
