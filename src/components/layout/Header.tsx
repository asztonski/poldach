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
 * 12 px – a shrink done with transform only – loses the vignette and gets a navy bottom line.
 */
export function Header() {
  const scrolled = useScrolled();

  return (
    <header
      data-scrolled={scrolled || undefined}
      className={cn(
        'group sticky top-0 z-50 h-16 border-b blueprint theme-yellow transition-transform duration-300 ease-out motion-reduce:transition-none lg:h-20',
        scrolled ? '-translate-y-3 border-pd-navy-900 blueprint-flat' : 'border-transparent',
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
