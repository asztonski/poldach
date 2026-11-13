'use client';

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ButtonLink, Container, PhoneButton } from '@/components/ui';
import { MAIN_NAV } from '@/config/navigation';
import { ROUTES } from '@/config/routes';
import { SITE, emailHref } from '@/config/site';
import { cn } from '@/lib/cn';
import { normalizePath } from '@/lib/path';
import styles from './MobileMenu.module.css';

const topLinkClasses =
  'flex min-h-14 w-full items-center text-h3 uppercase decoration-2 underline-offset-8 hover:underline aria-[current=page]:underline';

// From here the header has its own navigation and no menu button (lg)
const DESKTOP = '(width >= 64rem)';

/** Place of an item in the order it fades in (MobileMenu.module.css) */
const order = (i: number) => ({ '--i': i }) as CSSProperties;

type MobileMenuProps = {
  className?: string;
};

/**
 * The header's menu button and the panel it opens below the header (docs/decyzje.md D-126). The
 * button stays where it is – its burger turns into an X – so the panel is not modal: while it is
 * open the rest of the page is inert, Esc closes it, and it scrolls by itself. The animation is CSS
 * (MobileMenu.module.css): the panel is shown, then `data-open` plays the opening; without it the
 * closing plays, and only after that is the panel closed.
 */
export function MobileMenu({ className }: MobileMenuProps) {
  const path = normalizePath(usePathname());
  // The page the menu was opened on – on another one (a link in it, the logo) it is closed
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === path;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelId = useId();

  const close = () => setOpenOn(null);

  // Showing and hiding the panel around its animation
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.show();
      // The closed state is drawn first, so the opening is a transition from it
      dialog.getBoundingClientRect();
      dialog.dataset.open = '';
      return;
    }
    if (!dialog.open) return;
    delete dialog.dataset.open;
    // Closed once the closing has played (none with reduced motion); opened again – kept open. Closed
    // by another page, it forgets the one it was opened on, so coming back does not open it again
    let reopened = false;
    void Promise.allSettled(dialog.getAnimations({ subtree: true }).map((a) => a.finished)).then(
      () => {
        if (reopened) return;
        dialog.close();
        setOpenOn(null);
      },
    );
    return () => {
      reopened = true;
    };
  }, [open]);

  // While open: the rest of the page is inert, Esc closes, a desktop-wide screen closes at once
  useEffect(() => {
    if (!open) return;
    const header = buttonRef.current?.closest('header');
    const others = Array.from(document.body.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && el !== header,
    );
    for (const el of others) el.inert = true;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpenOn(null);
      buttonRef.current?.focus();
    };
    const desktop = window.matchMedia(DESKTOP);
    const onDesktop = () => {
      if (desktop.matches) setOpenOn(null);
    };
    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onDesktop);
    return () => {
      for (const el of others) el.inert = false;
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onDesktop);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpenOn(open ? null : path)}
        className={cn('inline-flex min-h-11 items-center gap-2 px-2 text-lg font-bold', className)}
      >
        <span className={styles.labels}>
          <span className={styles.labelMenu}>Menu</span>
          <span className={styles.labelClose}>Zamknij</span>
        </span>
        <span aria-hidden="true" className={styles.burger}>
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        id={panelId}
        aria-label="Menu"
        data-analytics-area="mobile_menu"
        className={cn(
          // `clip`, not `hidden`: the focus moving in on opening must not scroll the panel or its
          // window to the first link while it is still on its way
          'absolute inset-x-0 top-full m-0 h-[calc(100dvh-var(--header-h))] max-h-none w-full max-w-none overflow-clip border-0 bg-transparent p-0 lg:hidden',
          // The scrolled header is shorter by its shift
          'group-data-scrolled:h-[calc(100dvh-var(--header-h)+var(--header-shift))]',
        )}
      >
        <div className={cn(styles.window, 'h-full overflow-clip')}>
          <div
            // The menu scrolls by itself – smooth scrolling (SmoothScroll) stays out of it
            data-lenis-prevent
            className={cn(
              styles.sheet,
              'h-full overflow-y-auto blueprint theme-yellow blueprint-flat',
              // The grid goes on from the header's: it is drawn from the header's top edge
              'bg-position-[0_calc(-1*var(--header-h))]',
            )}
          >
            <div className="flex min-h-full flex-col">
              <nav aria-label="Menu mobilne" className="flex-1">
                <Container className="py-4">
                  <ul className="divide-y divide-pd-navy-900/20">
                    {MAIN_NAV.map((item, i) => (
                      <li key={item.href} className={styles.item} style={order(i)}>
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

              <Container
                className={cn(
                  styles.item,
                  'space-y-3 pt-2 pb-[calc(1.5rem+env(safe-area-inset-bottom))]',
                )}
                style={order(MAIN_NAV.length)}
              >
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
          </div>
        </div>
      </dialog>
    </>
  );
}
