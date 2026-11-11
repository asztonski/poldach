'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MAIN_NAV } from '@/config/navigation';
import { cn } from '@/lib/cn';
import { normalizePath } from '@/lib/path';
import { SHIFT_WITH_HEADER, navItemClasses } from './nav-utils';

type DesktopNavProps = {
  className?: string;
};

/**
 * Plain links (docs/decyzje.md D-60, D-84). Only a page link can match the path – the sections of
 * the home page are anchors, so no item is underlined there.
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
              className={cn(navItemClasses, SHIFT_WITH_HEADER, path === item.href && 'underline')}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
