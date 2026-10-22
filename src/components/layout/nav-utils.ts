import type { NavItem } from '@/types';

// `trailingSlash: true` can make pathname end with "/" – compare without it
export const normalizePath = (path: string) => (path.length > 1 ? path.replace(/\/$/, '') : path);

/** True on the item's own page and, for an item with a panel, on any page the panel lists. */
export function isItemActive(item: NavItem, path: string) {
  return (
    path === item.href ||
    Boolean(item.groups?.some((group) => group.links.some((link) => link.href === path)))
  );
}

/**
 * Header content moves down by half of the header's 12 px slide-up, so it stays centred in the
 * shorter bar. Applied per element: a transform on a wrapper would trap the services panel.
 */
export const SHIFT_WITH_HEADER =
  'transition-transform duration-300 ease-out motion-reduce:transition-none group-data-scrolled:translate-y-1.5';

export const navItemClasses =
  'inline-flex min-h-11 items-center gap-1 px-3 text-lg font-medium decoration-2 underline-offset-8 hover:underline';
