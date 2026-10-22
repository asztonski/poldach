import { PhoneButton } from '@/components/ui';

/**
 * Phone button pinned to the bottom of the screen below 1024 px (docs/design-system.md#komponenty).
 * Its height is --call-bar-h in globals.css, which keeps the page end visible above it.
 */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-pd-navy-900 blueprint px-5 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] theme-yellow blueprint-flat lg:hidden">
      <PhoneButton className="w-full" />
    </div>
  );
}
