import type { CSSProperties } from 'react';
import { Star } from 'lucide-react';
import { FadeInOnce } from '@/components/motion/FadeInOnce';
import { Container, Section } from '@/components/ui';
import { TESTIMONIALS, type Testimonial } from '@/data/testimonials';
import { cn } from '@/lib/cn';
import styles from './TestimonialsSection.module.css';

/** "Podłogi i drzwi z montażem · Salon w Kokoszkowych · opinia w Google" */
const caption = ({ role, place, year, source }: Testimonial) =>
  [role, place, year, source === 'google' ? 'opinia w Google' : null].filter(Boolean).join(' · ');

/**
 * The rating as stars: yellow, outlined in navy, so they read on white (yellow alone has 1.4:1);
 * screen readers get it as a number
 */
function Stars({ rating }: { rating: number }) {
  return (
    <p className="flex gap-1">
      <span className="sr-only">Ocena: {rating} na 5</span>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          strokeWidth={1.5}
          className={cn(
            'size-6 stroke-pd-navy-900',
            i < rating ? 'fill-pd-yellow-500' : 'fill-transparent',
          )}
        />
      ))}
    </p>
  );
}

/**
 * One copy of the cards. Each ends with the same gap as between the cards (pr-6), so two copies in a
 * row are one even tape; the second one is decorative.
 */
function Cards({ copy = false }: { copy?: boolean }) {
  return (
    <ul
      aria-hidden={copy || undefined}
      className={cn('flex shrink-0 gap-6 pr-6', copy && styles.copy)}
    >
      {TESTIMONIALS.map((testimonial) => (
        <li key={testimonial.id} className="w-[min(80vw,26rem)] shrink-0 snap-start">
          {/* White cards on the light grey section; navy on white 11.3:1 (docs/design-system.md#kontrast) */}
          <figure className="flex h-full flex-col rounded-box bg-pd-white p-6 text-pd-navy-900 lg:p-8">
            <Stars rating={testimonial.rating} />
            <blockquote className="mt-4 text-list">
              <p>„{testimonial.quote}”</p>
            </blockquote>
            <figcaption className="mt-auto pt-8">
              <p className="text-h3 uppercase">{testimonial.name}</p>
              <p className="mt-2 text-small">{caption(testimonial)}</p>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

/**
 * Opinions of clients, like "Built on trust" on metriccivil.ca (docs/mapa-strony.md#strona-główna,
 * docs/decyzje.md D-74–D-77): light grey paper, a centred title, below it the cards on a tape across the
 * whole screen, gliding from right to left (TestimonialsSection.module.css). No band: a short
 * section between the scenes.
 */
export function TestimonialsSection() {
  return (
    <Section theme="grey" aria-labelledby="testimonials-title" contained={false}>
      <Container>
        <FadeInOnce>
          {/* TODO: a proposal for the client's acceptance (docs/komunikacja.md#zasady-pisania) */}
          <h2
            id="testimonials-title"
            className="mx-auto max-w-4xl text-center text-h1 text-balance text-(--title)"
          >
            Polecają nas ci, dla których pracowaliśmy
          </h2>
        </FadeInOnce>
      </Container>
      <div className={cn(styles.tape, 'mt-12 lg:mt-16')}>
        <div className={styles.track} style={{ '--count': TESTIMONIALS.length } as CSSProperties}>
          <Cards />
          <Cards copy />
        </div>
      </div>
    </Section>
  );
}
