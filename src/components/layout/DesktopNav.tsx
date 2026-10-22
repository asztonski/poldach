'use client';

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Container } from '@/components/ui';
import { MAIN_NAV } from '@/config/navigation';
import { SITE, phoneHref } from '@/config/site';
import { cn } from '@/lib/cn';
import type { NavItem } from '@/types';
import { SHIFT_WITH_HEADER, isItemActive, navItemClasses, normalizePath } from './nav-utils';

// Mouse users open the panel by hovering; leaving it closes the panel after this delay
const CLOSE_DELAY_MS = 200;

type NavPanelProps = {
  item: NavItem;
  path: string;
};

/** Menu entry that opens a full-width panel with grouped links (disclosure pattern). */
function NavPanel({ item, path }: NavPanelProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const openedByHover = useRef(false);

  useEffect(() => {
    if (!open) return;
    const closeOnOutsidePointer = (event: globalThis.PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsidePointer);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointer);
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const close = () => setOpen(false);

  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    window.clearTimeout(closeTimer.current);
    if (!open) {
      openedByHover.current = true;
      setOpen(true);
    }
  };

  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    closeTimer.current = window.setTimeout(close, CLOSE_DELAY_MS);
  };

  const onClick = () => {
    // A click right after hovering keeps the panel open instead of toggling it shut
    if (open && openedByHover.current) {
      openedByHover.current = false;
      return;
    }
    openedByHover.current = false;
    setOpen((value) => !value);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && open) {
      close();
      buttonRef.current?.focus();
    }
  };

  const onBlur = (event: FocusEvent) => {
    if (!rootRef.current?.contains(event.relatedTarget as Node | null)) close();
  };

  return (
    <li
      ref={rootRef}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onClick}
        className={cn(
          navItemClasses,
          SHIFT_WITH_HEADER,
          (open || isItemActive(item, path)) && 'underline',
        )}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            'size-5 transition-transform motion-reduce:transition-none',
            open && 'rotate-180',
          )}
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-y border-pd-navy-900 blueprint theme-yellow blueprint-flat"
      >
        <Container className="grid grid-cols-3 gap-10 py-10">
          {item.groups?.map((group) => (
            <div key={group.label}>
              <p className="text-eyebrow uppercase">{group.label}</p>
              <ul className="mt-4 space-y-4">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={close}
                      aria-current={path === link.href ? 'page' : undefined}
                      className="group block"
                    >
                      <span className="text-xl font-bold decoration-2 underline-offset-4 group-hover:underline group-aria-[current=page]:underline">
                        {link.label}
                      </span>
                      {link.description && (
                        <span className="mt-1 block text-small">{link.description}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Container>
        <div className="border-t border-pd-navy-900/20">
          <Container className="flex items-center justify-between gap-6 py-3">
            <Link
              href={item.href}
              onClick={close}
              className="inline-flex min-h-11 items-center gap-2 text-lg font-bold underline decoration-2 underline-offset-4"
            >
              Wszystkie usługi
              <ArrowRight aria-hidden="true" className="size-5" />
            </Link>
            <p>
              Nie wiesz, od czego zacząć?{' '}
              <a href={phoneHref} className="font-bold underline decoration-2 underline-offset-4">
                Zadzwoń: {SITE.contact.phone}
              </a>
            </p>
          </Container>
        </div>
      </div>
    </li>
  );
}

type DesktopNavProps = {
  className?: string;
};

export function DesktopNav({ className }: DesktopNavProps) {
  const path = normalizePath(usePathname());

  return (
    <nav aria-label="Główna nawigacja" className={className}>
      <ul className="flex items-center xl:gap-2">
        {MAIN_NAV.map((item) =>
          item.groups ? (
            <NavPanel key={item.href} item={item} path={path} />
          ) : (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={path === item.href ? 'page' : undefined}
                className={cn(navItemClasses, SHIFT_WITH_HEADER, path === item.href && 'underline')}
              >
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
