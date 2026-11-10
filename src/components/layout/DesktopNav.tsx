'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MAIN_NAV } from '@/config/navigation';
import { cn } from '@/lib/cn';
import { SHIFT_WITH_HEADER, isItemActive, navItemClasses, normalizePath } from './nav-utils';

type DesktopNavProps = {
  className?: string;
};

/**
 * Plain links, no panels (docs/decyzje.md D-60): a pillar links to its overview page and is
 * underlined there and on every page of its groups. The full list of pages is in the footer.
 */
export function DesktopNav({ className }: DesktopNavProps) {
  const path = normalizePath(usePathname());

  return (
    <nav aria-label="Główna nawigacja" className={className}>
      <ul className="flex items-center xl:gap-2">
        {MAIN_NAV.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={path === item.href ? 'page' : undefined}
              className={cn(
                navItemClasses,
                SHIFT_WITH_HEADER,
                isItemActive(item, path) && 'underline',
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
