import type { Metadata } from 'next';
import { ButtonLink, Eyebrow, Section } from '@/components/ui';
import { ROUTES } from '@/config/routes';

export const metadata: Metadata = {
  title: 'Nie znaleziono strony',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Section aria-labelledby="not-found-title">
      <Eyebrow>Błąd 404</Eyebrow>
      <h1 id="not-found-title" className="mt-2 text-h1 text-(--title)">
        Nie znaleziono strony
      </h1>
      <p className="mt-6 max-w-xl text-lead">
        Strona, której szukasz, nie istnieje lub została przeniesiona.
      </p>
      <ButtonLink href={ROUTES.home} className="mt-8">
        Wróć na stronę główną
      </ButtonLink>
    </Section>
  );
}
