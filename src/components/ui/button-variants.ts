import type { ClassValue } from 'clsx';
import { cn } from '@/lib/cn';

// Pill in the section's button colours, text 20 px bold, at least 48 px high
// (docs/design-system.md#kontrast, rule 3)
const pill =
  'inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-(--btn-bg) px-7 text-xl font-bold text-(--btn-fg) transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none';

/** Button styles as a class string – use on any element that should look like a button. */
export function buttonClasses(...classes: ClassValue[]) {
  return cn(pill, ...classes);
}
