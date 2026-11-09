'use client';

import { LogoLink } from '@/components/common/LogoLink';
import { Container, PhoneButton } from '@/components/ui';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/cn';
import { DesktopNav } from './DesktopNav';
import { MobileMenu } from './MobileMenu';
import { SHIFT_WITH_HEADER } from './nav-utils';

/**
 * Yellow bar on the grid (docs/design-system.md#komponenty). After scrolling it slides up by
 * --header-shift – a shrink done with transform only – loses the vignette and gets a navy bottom
 * line. Its height and that shift are tokens (globals.css): pinned scenes stand right below it.
 */
export function Header() {
  const { scrolled, sentinelRef } = useScrolled();

  return (
    <>
      {/* The first 8 px of the page: once they are gone, the page counts as scrolled */}
      <div ref={sentinelRef} aria-hidden="true" className="absolute top-0 left-0 h-2 w-px" />
      <header
        data-scrolled={scrolled || undefined}
        className={cn(
          'group sticky top-0 z-50 h-(--header-h) border-b blueprint theme-yellow transition-transform duration-300 ease-out motion-reduce:transition-none',
          scrolled
            ? '-translate-y-(--header-shift) border-pd-navy-900 blueprint-flat'
            : 'border-transparent',
        )}
      >
        <Container className="flex h-full items-center justify-between gap-6">
          <LogoLink
            className={cn(
              'h-7 origin-left lg:h-8',
              SHIFT_WITH_HEADER,
              'group-data-scrolled:scale-90',
            )}
          />
          <DesktopNav className="hidden lg:block" />
          <div className={cn('hidden lg:block', SHIFT_WITH_HEADER)}>
            <PhoneButton />
          </div>
          <MobileMenu className={cn('lg:hidden', SHIFT_WITH_HEADER)} />
        </Container>
      </header>
    </>
  );
}
