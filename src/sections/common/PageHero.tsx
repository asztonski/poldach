import type { ReactNode } from 'react';
import { ButtonLink, PhoneButton, Section, buttonClasses } from '@/components/ui';
import { CONTACT_SECTION_HREF } from '@/config/routes';
import { cn } from '@/lib/cn';

/** 'phone' – the phone button; an anchor – down the page; https – another site, in a new tab */
export type HeroAction = 'phone' | { label: string; href: string };

/** The home page's buttons; every other page says what its own visitor came for (D-121) */
const DEFAULT_ACTIONS: HeroAction[] = [
  'phone',
  { label: 'Bezpłatna wycena', href: CONTACT_SECTION_HREF },
];

const actionClasses = 'w-full sm:w-auto';

function HeroButton({ action }: { action: HeroAction }) {
  if (action === 'phone') return <PhoneButton className={actionClasses} />;
  if (action.href.startsWith('https://')) {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses(actionClasses)}
      >
        {action.label}
        <span className="sr-only"> (nowa karta)</span>
      </a>
    );
  }
  return (
    <ButtonLink href={action.href} className={actionClasses}>
      {action.label}
    </ButtonLink>
  );
}

export type PageHeroProps = {
  eyebrow: string;
  /** The page's h1 */
  title: ReactNode;
  lead: ReactNode;
  /** The buttons under the lead, the first one the page's main action */
  actions?: HeroAction[];
  /** A photo, a video or the logo next to the text, from lg */
  visual?: ReactNode;
  /** More under the buttons, e.g. the home hero's marker notes */
  children?: ReactNode;
  className?: string;
};

/**
 * The yellow opening of a page (docs/mapa-strony.md#podstrony): eyebrow, the page's h1, the lead,
 * the page's buttons (by default the phone and "Bezpłatna wycena"). It starts under the header,
 * which has no background of its own until the page scrolls (`under-header`, globals.css), so the
 * grid and the vignette run through both without a seam. The home hero (HeroSection) is this one
 * with the logo and the motion.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  actions = DEFAULT_ACTIONS,
  visual,
  children,
  className,
}: PageHeroProps) {
  return (
    <Section
      theme="yellow"
      aria-labelledby="page-title"
      data-analytics-area="hero"
      // Pulled up under the header; the usual space above the content starts below it. At least
      // a full screen (svh – no jump when the phone's address bar hides), content centred (D-120)
      className={cn(
        'under-header -mt-(--header-h) flex min-h-svh flex-col justify-center pt-[calc(var(--header-h)+var(--section-space))]',
        className,
      )}
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
          {actions.map((action) => (
            <HeroButton key={action === 'phone' ? action : action.href} action={action} />
          ))}
        </div>
        {children}
      </div>
      {visual}
    </Section>
  );
}
