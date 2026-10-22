import { HouseIllustration } from '@/components/illustrations/HouseIllustration';
import { DrawOnLoad } from '@/components/motion/DrawOnLoad';
import { ButtonLink, Eyebrow, PhoneButton, Section, StatusPill } from '@/components/ui';
import { ROUTES } from '@/config/routes';

export function HeroSection() {
  return (
    <Section
      theme="blue"
      aria-labelledby="hero-title"
      containerClassName="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16"
    >
      <div>
        <Eyebrow>Rodzinna firma dekarska · od&nbsp;1992</Eyebrow>
        {/* TODO(P-07): slogan and lead follow option 1 – waiting for the client's choice */}
        <h1 id="hero-title" className="mt-2 text-display text-(--title)">
          Dach&nbsp;– to nasz fach
        </h1>
        <p className="mt-6 max-w-xl text-lead">
          Od więźby po rynnę – i dalej, aż po podłogę. Doradzamy, wyceniamy i montujemy z materiału
          własnego lub powierzonego.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <PhoneButton className="w-full sm:w-auto" />
          <ButtonLink href={ROUTES.contact} className="w-full sm:w-auto">
            Bezpłatna wycena
          </ButtonLink>
        </div>

        <ul aria-label="Dlaczego POLDACH" className="mt-10 flex flex-wrap gap-3">
          <li>
            <StatusPill>Od 1992</StatusPill>
          </li>
          {/* TODO(P-19): keep only if PSD membership is confirmed */}
          <li>
            <StatusPill>Członek PSD</StatusPill>
          </li>
          {/* TODO: Google rating pill – rating and count verified in Google Maps (docs/firma.md) */}
        </ul>
      </div>

      <DrawOnLoad className="mx-auto w-4/5 max-w-md lg:w-full lg:max-w-none">
        <HouseIllustration className="h-auto w-full" />
      </DrawOnLoad>
    </Section>
  );
}
