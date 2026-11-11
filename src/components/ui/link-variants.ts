import type { ClassValue } from 'clsx';
import { cn } from '@/lib/cn';

/** A link inside a sentence – always underlined, so it reads as a link without colour. */
export function textLinkClasses(...classes: ClassValue[]) {
  return cn('underline underline-offset-4', classes);
}

/** A link standing on its own (a list, a contact line) – underlined on hover. */
export function quietLinkClasses(...classes: ClassValue[]) {
  return cn('underline-offset-4 hover:underline', classes);
}
