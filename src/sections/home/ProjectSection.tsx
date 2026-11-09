import photo960 from '@/assets/images/realizacje/kamienica-morska-960.webp';
import photo1920 from '@/assets/images/realizacje/kamienica-morska-1920.webp';
import {
  TENEMENT_NOTES,
  TENEMENT_RATIO,
  TenementDrawing,
} from '@/components/illustrations/TenementDrawing';
import { TracingReveal } from '@/components/motion/TracingReveal';
import { CheckList, Container, Section, SectionHeading } from '@/components/ui';

/**
 * Projects – opened by one project up close (docs/mapa-strony.md#strona-główna, docs/decyzje.md
 * D-19, D-20, D-23): the photo from the old site, edge to edge, turns into its technical drawing
 * on the section's paper while scrolling – white lines on blue, like a cyanotype.
 */
export function ProjectSection() {
  return (
    <Section theme="blue" contained={false} aria-labelledby="project-title">
      <Container>
        <SectionHeading
          id="project-title"
          eyebrow="Realizacja z bliska"
          title="Co kryje dobrze zrobiony dach"
          lead="Zdjęcie jednej z naszych realizacji zamienia się w rysunek techniczny – od więźby po rynny."
          className="max-w-3xl"
        />
      </Container>

      <figure className="mt-(--grid-step)">
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
        />
        <Container>
          <figcaption className="mt-4 text-eyebrow text-(--label) uppercase">
            {/* TODO(P-21): town and name of the building, confirmed year – the year is the photo's (EXIF) */}
            Kamienica narożna · 2009
          </figcaption>
          {/* The notes of the drawing as text – visible on narrower screens, for screen readers always */}
          <CheckList items={TENEMENT_NOTES} className="mt-6 lg:sr-only" />
        </Container>
      </figure>
    </Section>
  );
}
