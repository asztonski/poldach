import { ButtonLink, CheckList, Panel, Section, SectionHeading } from '@/components/ui';
import type { SectionTheme } from '@/components/ui';
import { ROUTES, type RoutePath } from '@/config/routes';

type Path = {
  theme: SectionTheme;
  audience: string;
  title: string;
  points: string[];
  cta: { label: string; href: RoutePath };
};

// Two customer groups (docs/komunikacja.md#odbiorcy); points only from the offer in docs/firma.md
const PATHS: Path[] = [
  {
    theme: 'yellow',
    audience: 'Klient indywidualny',
    title: 'Dla domu',
    points: ['Nowy dach lub remont', 'Docieplenie poddasza', 'Montaż drzwi i podłóg'],
    cta: { label: 'Usługi dla domu', href: ROUTES.services },
  },
  {
    theme: 'blue',
    audience: 'Firma · zarządca · deweloper',
    title: 'Dla firm',
    points: [
      'Dachy płaskie i remonty',
      'Wykrywanie przecieków bez naruszania pokrycia',
      'Dach, drzwi i podłogi – jeden wykonawca',
    ],
    cta: { label: 'Oferta dla firm', href: ROUTES.business },
  },
];

/**
 * Choosing a path – home or business. Temporary: by docs/decyzje.md D-23 the two paths move into
 * the offer (a "Dla firm" link) and the contact section once those are built.
 */
export function PathChoiceSection() {
  return (
    <Section theme="white" aria-labelledby="paths-title">
      <SectionHeading
        id="paths-title"
        eyebrow="Dla kogo pracujemy"
        title="Dla domu i dla firmy – wszystko z jednej ręki"
        className="max-w-3xl"
      />

      <div className="mt-(--grid-step) grid gap-6 lg:grid-cols-2 lg:gap-8">
        {PATHS.map((path) => (
          <Panel key={path.title} theme={path.theme} className="flex flex-col p-8 lg:p-10">
            <p className="text-eyebrow text-(--label) uppercase">{path.audience}</p>
            <h3 className="mt-2 text-h3">{path.title}</h3>
            <CheckList items={path.points} className="mt-6 mb-10" />
            <ButtonLink href={path.cta.href} className="mt-auto w-full sm:w-auto sm:self-start">
              {path.cta.label}
            </ButtonLink>
          </Panel>
        ))}
      </div>
    </Section>
  );
}
