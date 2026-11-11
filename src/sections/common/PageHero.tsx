import type { ReactNode } from 'react';
import { ButtonLink, PhoneButton, Section } from '@/components/ui';
import { SECTION_IDS } from '@/config/routes';
import { cn } from '@/lib/cn';

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  /** A photo or a video next to the text, from lg */
  visual?: ReactNode;
};

/**
 * The opening of a subpage that sells (docs/mapa-strony.md#podstrony): the home hero's yellow
 * under the header, without its motion – eyebrow, the page's h1, the lead, the phone and
 * "Bezpłatna wycena" to the page's own contact section.
 */
export function PageHero({ eyebrow, title, lead, visual }: PageHeroProps) {
  return (
    <Section
      theme="yellow"
      aria-labelledby="page-title"
      data-analytics-area="hero"
      className="under-header -mt-(--header-h) pt-[calc(var(--header-h)+var(--section-space))]"
      containerClassName={cn(
        'grid grid-cols-1 items-center gap-12',
        visual && 'lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16',
      )}
    >
      <div>
        <p className="text-eyebrow text-(--label) uppercase">{eyebrow}</p>
        <h1 id="page-title" className="mt-3 text-h1 text-(--title)">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-lead">{lead}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <PhoneButton className="w-full sm:w-auto" />
          <ButtonLink href={`#${SECTION_IDS.contact}`} className="w-full sm:w-auto">
            Bezpłatna wycena
          </ButtonLink>
        </div>
      </div>
      {visual}
    </Section>
  );
}
