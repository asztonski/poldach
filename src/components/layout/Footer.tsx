import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import psdSign from '@/assets/images/logotypy/psd-znak.png';
import { Logo } from '@/brand/Logo';
import { CookieSettingsButton } from '@/components/common/CookieSettingsButton';
import { Container, PhoneButton, quietLinkClasses } from '@/components/ui';
import { FOOTER_NAV } from '@/config/navigation';
import { BUILD_YEAR, SITE, addressLine, emailHref } from '@/config/site';
import { cn } from '@/lib/cn';

const linkClass = quietLinkClasses();

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
 * docs/decyzje.md D-57, D-80, D-89): the blue paper of the page, on its grid; small labels in
 * white – yellow on blue is for large text only (docs/design-system.md#kontrast). The phone and the
 * e-mail once, next to every address of the site in two groups; the company details as the title
 * block in the corner of a technical drawing, with the PSD sign; the big POLDACH at the bottom.
 */
export function Footer() {
  return (
    <footer data-analytics-area="footer" className="paper pt-(--section-space) pb-8 theme-blue">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-5">
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

          {FOOTER_NAV.map((group, index) => (
            <nav
              key={group.title}
              aria-labelledby={`footer-nav-${index}`}
              className={index === 0 ? 'lg:col-span-4 lg:col-start-6' : 'lg:col-span-3'}
            >
              <h2 id={`footer-nav-${index}`} className="text-eyebrow text-(--label) uppercase">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-3 text-lg font-medium">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* The title block of a drawing sheet: a rounded frame; cells draw the inner lines, their own top and left edges hidden under it (-1px) */}
        <dl className="mt-16 grid overflow-hidden rounded-box border border-current/30 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Wykonawca" className="sm:col-span-2">
            {SITE.legalName}
          </Field>
          <Field label="Siedziba i salon" className="sm:col-span-2">
            {addressLine}
          </Field>
          <Field label="Na rynku">od {SITE.foundingYear}</Field>
          <Field label="NIP · REGON">
            {SITE.nip} · {SITE.regon}
          </Field>
          {/* TODO(P-19): keep only if PSD membership is confirmed */}
          <Field label="Członek" className="sm:col-span-2">
            <span className="flex items-center gap-3">
              {/* The name stands next to it – the sign is decoration */}
              <Image src={psdSign} alt="" className="size-9 shrink-0 rounded-[3px]" />
              Polskie Stowarzyszenie Dekarzy
            </span>
          </Field>
        </dl>

        {/* The name is already said above (Wykonawca) – the big wordmark is drawing only */}
        <Logo variant="yellow" decorative className="mt-16 h-auto w-full" />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-small">
          <p>
            © {BUILD_YEAR} {SITE.legalName}
          </p>
          <CookieSettingsButton className={quietLinkClasses('min-h-11')} />
        </div>
      </Container>
    </footer>
  );
}
