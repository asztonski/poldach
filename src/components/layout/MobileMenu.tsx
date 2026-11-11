'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/brand/Logo';
import { ButtonLink, Container, PhoneButton } from '@/components/ui';
import { MAIN_NAV } from '@/config/navigation';
import { ROUTES } from '@/config/routes';
import { SITE, emailHref } from '@/config/site';
import { cn } from '@/lib/cn';
import { normalizePath } from '@/lib/path';

const topLinkClasses =
  'flex min-h-14 w-full items-center text-h3 decoration-2 underline-offset-8 hover:underline aria-[current=page]:underline';

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
        data-analytics-area="mobile_menu"
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
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={path === item.href ? 'page' : undefined}
                      className={topLinkClasses}
                    >
                      {item.label}
                    </Link>
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
