import Link from 'next/link';
import type { ReactNode } from 'react';
import { Logo } from '@/brand/Logo';
import { Container, PhoneButton } from '@/components/ui';
import { MAIN_NAV } from '@/config/navigation';
import { ROUTES } from '@/config/routes';
import { BUILD_YEAR, SITE, emailHref, phoneHref } from '@/config/site';
import { cn } from '@/lib/cn';

// The two pillars (menu items with groups) get a list each, by group; the rest goes under "Firma"
const PILLARS = MAIN_NAV.filter((item) => item.groups);
const COMPANY_NAV = MAIN_NAV.filter((item) => !item.groups);

const linkClass = 'underline-offset-4 hover:underline';

/** One field of the title block: a small label above the value. */
function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('-mt-px -ml-px border-t border-l border-current/30 px-4 py-3', className)}>
      <dt className="text-eyebrow text-(--label) uppercase">{label}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}

/**
 * Footer of every page (docs/mapa-strony.md#strona-główna, docs/design-system.md#komponenty,
 * docs/decyzje.md D-57, D-80): the blue paper of the page, on its grid; small labels in white –
 * yellow on blue is for large text only (docs/design-system.md#kontrast). Every page of the menu as
 * a plain link (the header links only the pillars' overview pages, the mobile menu needs
 * JavaScript); the company
 * details as the title block in the corner of a technical drawing; the big POLDACH at the bottom.
 */
export function Footer() {
  const { street, postalCode, city } = SITE.contact.address;

  return (
    <footer className="paper pt-(--section-space) pb-8 theme-blue">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="text-h3 text-(--title)">{SITE.tagline}</p>
            <p className="mt-4 max-w-sm">
              Usługi dekarskie i montaż, a w salonie w Kokoszkowych – drzwi, podłogi i materiały.
              Doradztwo i wycena bezpłatnie.
            </p>
            <PhoneButton className="mt-6" />
            <p className="mt-4 font-bold">
              <a href={emailHref} className={linkClass}>
                {SITE.contact.email}
              </a>
            </p>
          </div>

          {PILLARS.map((pillar) => (
            <nav
              key={pillar.href}
              aria-label={pillar.label}
              className={(pillar.groups?.length ?? 0) > 1 ? 'lg:col-span-4' : 'lg:col-span-2'}
            >
              <h2 className="text-eyebrow text-(--label) uppercase">
                <Link href={pillar.href} className={linkClass}>
                  {pillar.label}
                </Link>
              </h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {pillar.groups?.map((group) => (
                  <div
                    key={group.label}
                    className={pillar.groups?.length === 1 ? 'sm:col-span-2' : undefined}
                  >
                    <h3 className="font-bold">{group.label}</h3>
                    <ul className="mt-2 space-y-2">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className={linkClass}>
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
          ))}

          <nav aria-label="Firma" className="lg:col-span-2">
            <h2 className="text-eyebrow text-(--label) uppercase">Firma</h2>
            <ul className="mt-4 space-y-2">
              {COMPANY_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* The title block of a drawing sheet: a rounded frame; cells draw the inner lines, their own top and left edges hidden under it (-1px) */}
        <dl className="mt-16 grid overflow-hidden rounded-box border border-current/30 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Wykonawca" className="sm:col-span-2">
            {SITE.legalName}
          </Field>
          <Field label="Adres">
            {street}, {postalCode} {city}
          </Field>
          <Field label="Telefon">
            <a href={phoneHref} className={linkClass}>
              {SITE.contact.phone}
            </a>
          </Field>
          <Field label="Na rynku">od {SITE.foundingYear}</Field>
          {/* TODO(P-19): keep only if PSD membership is confirmed */}
          <Field label="Członek">Polskie Stowarzyszenie Dekarzy</Field>
          <Field label="NIP · REGON">
            {SITE.nip} · {SITE.regon}
          </Field>
          <Field label="Arkusz">01 / 01 · Skala 1:1 · Rew. {BUILD_YEAR}</Field>
        </dl>

        {/* The name is already said above (Wykonawca) – the big wordmark is drawing only */}
        <Logo variant="yellow" decorative className="mt-16 h-auto w-full" />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-small">
          <p>
            © {BUILD_YEAR} {SITE.name}
          </p>
          <Link href={ROUTES.privacy} className={linkClass}>
            Polityka prywatności
          </Link>
        </div>
      </Container>
    </footer>
  );
}
