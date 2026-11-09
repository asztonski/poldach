'use client';

import { LogoLink } from '@/components/common/LogoLink';
import { Container, PhoneButton } from '@/components/ui';
import { useHeaderScroll } from '@/hooks/useHeaderScroll';
import { cn } from '@/lib/cn';
import { DesktopNav } from './DesktopNav';
import { MobileMenu } from './MobileMenu';
import { SHIFT_WITH_HEADER } from './nav-utils';

/**
 * Yellow bar on the grid (docs/design-system.md#komponenty). After scrolling it slides up by
 * --header-shift – a shrink done with transform only – and loses the vignette. While the page moves
 * down it hides, on the first move up it comes back, like on metriccivil.ca (docs/decyzje.md D-41);
 * it stays for keyboard focus inside it and for an open panel. Its height and the shift are tokens
 * (globals.css): pinned scenes keep that place free below it, so it never covers them.
 */
export function Header() {
  const { scrolled, hidden } = useHeaderScroll();

  return (
    <header
      data-scrolled={scrolled || undefined}
      className={cn(
        'group sticky top-0 z-50 h-(--header-h) blueprint theme-yellow transition-transform duration-300 ease-out motion-reduce:transition-none',
        scrolled && '-translate-y-(--header-shift) blueprint-flat',
        // 1.5rem past its height: the phone button's shadow must not show at the top of the screen
        hidden &&
          '-translate-y-[calc(100%+1.5rem)] has-focus-visible:-translate-y-(--header-shift) has-[[aria-expanded=true]]:-translate-y-(--header-shift)',
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
  );
}
