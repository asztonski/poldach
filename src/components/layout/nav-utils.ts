/**
 * Header content moves down by half of the header's slide-up, so it stays centred in the shorter
 * bar. Applied per element, as the header's other parts are.
 */
export const SHIFT_WITH_HEADER =
  'transition-transform duration-300 ease-out motion-reduce:transition-none group-data-scrolled:translate-y-[calc(var(--header-shift)/2)]';

// Red of the old site's menu (D-22) – 3.5:1 on yellow, below AA for this size (exception in decyzje.md).
// Capitals (D-119) are wider: below xl the links get smaller, so the phone number stays on one line.
export const navItemClasses =
  'inline-flex min-h-11 items-center gap-1 px-2 text-base font-medium uppercase text-pd-red-nav decoration-2 underline-offset-8 hover:underline xl:px-3 xl:text-lg';
