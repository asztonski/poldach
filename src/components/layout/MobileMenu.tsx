'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Logo } from '@/brand/Logo';
import { ButtonLink, Container, PhoneButton } from '@/components/ui';
import { MAIN_NAV } from '@/config/navigation';
import { ROUTES } from '@/config/routes';
import { SITE, emailHref } from '@/config/site';
import { cn } from '@/lib/cn';
import { normalizePath } from './nav-utils';

const topLinkClasses =
  'flex min-h-14 w-full items-center justify-between text-h3 decoration-2 underline-offset-8 hover:underline aria-[current=page]:underline';

type MobileMenuProps = {
  className?: string;
};

/** Full-screen menu in a modal <dialog>: focus trap, Esc and inert page come from the browser. */
export function MobileMenu({ className }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const path = normalizePath(usePathname());

  const open = () => {
    dialogRef.current?.showModal();
    closeRef.current?.focus();
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={open}
        className={cn('inline-flex min-h-11 items-center gap-2 px-2 text-lg font-bold', className)}
      >
        <Menu aria-hidden="true" className="size-6" />
        Menu
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        // The menu scrolls by itself – smooth scrolling (SmoothScroll) stays out of it
        data-lenis-prevent
        className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto blueprint theme-yellow blueprint-flat"
      >
        <div className="flex min-h-full flex-col">
          <Container className="flex h-(--header-h) shrink-0 items-center justify-between border-b border-pd-navy-900">
            <Logo className="h-7 w-auto" />
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="inline-flex min-h-11 items-center gap-2 px-2 text-lg font-bold"
            >
              <X aria-hidden="true" className="size-6" />
              Zamknij
            </button>
          </Container>

          <nav aria-label="Menu mobilne" className="flex-1">
            <Container className="py-4">
              <ul className="divide-y divide-pd-navy-900/20">
                {MAIN_NAV.map((item) => (
                  <li key={item.href}>
                    {item.groups ? (
                      <details className="group">
                        <summary
                          className={cn(
                            topLinkClasses,
                            'cursor-pointer list-none [&::-webkit-details-marker]:hidden',
                          )}
                        >
                          {item.label}
                          <ChevronDown
                            aria-hidden="true"
                            className="size-6 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                          />
                        </summary>
                        <div className="space-y-5 pb-6">
                          {item.groups.map((group) => (
                            <div key={group.label}>
                              <p className="text-eyebrow uppercase">{group.label}</p>
                              <ul className="mt-1">
                                {group.links.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      onClick={close}
                                      aria-current={path === link.href ? 'page' : undefined}
                                      className="flex min-h-11 items-center text-lg font-medium decoration-2 underline-offset-4 hover:underline aria-[current=page]:underline"
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          <Link
                            href={item.href}
                            onClick={close}
                            className="inline-flex min-h-11 items-center text-lg font-bold underline decoration-2 underline-offset-4"
                          >
                            {item.allLabel ?? item.label}
                          </Link>
                        </div>
                      </details>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={close}
                        aria-current={path === item.href ? 'page' : undefined}
                        className={topLinkClasses}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </Container>
          </nav>

          <Container className="space-y-3 pt-2 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            <PhoneButton className="w-full" />
            <ButtonLink href={ROUTES.contact} onClick={close} className="w-full">
              Bezpłatna wycena
            </ButtonLink>
            <a
              href={emailHref}
              className="flex min-h-11 items-center justify-center font-bold underline decoration-2 underline-offset-4"
            >
              {SITE.contact.email}
            </a>
          </Container>
        </div>
      </dialog>
    </>
  );
}
