import type { ClassValue } from 'clsx';
import { cn } from '@/lib/cn';

// Pill, text 20 px bold, at least 48 px high (docs/design-system.md#kontrast, rule 3)
const pill =
  'inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 text-xl font-bold transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none';

/** Button styles as a class string – use on any element that should look like a button. */
export function buttonClasses(...classes: ClassValue[]) {
  return cn(pill, 'bg-(--btn-bg) text-(--btn-fg)', ...classes);
}

/**
 * The same pill as an outline in the text colour – a second choice of the same weight next to a
 * button, e.g. "Odrzucam" next to "Zgadzam się" (D-93).
 */
export function outlineButtonClasses(...classes: ClassValue[]) {
  return cn(pill, 'ring-2 ring-current ring-inset', ...classes);
}
