import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Custom tokens from globals.css – without them tailwind-merge reads e.g. `text-h1` as a text
// colour and drops it when merged with `text-pd-white`
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['display', 'h1', 'h2', 'h3', 'eyebrow', 'lead', 'body', 'list', 'small'],
      shadow: ['phone'],
    },
  },
});

/** Merges conditional class names and resolves conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
