import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './DrawOnScroll.module.css';

type DrawOnScrollProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Draws an illustration from `src/components/illustrations` while it scrolls into view – CSS
 * only (DrawOnScroll.module.css). `data-draw="outline"` groups are traced, `data-step` groups fade
 * in after them. A parent can delay it with `--draw-shift` (e.g. 6%) to stagger a row of drawings,
 * or drive it with its own timeline and ranges (`--draw-timeline`, `--draw-trace`, … –
 * DrawOnScroll.module.css).
 */
export function DrawOnScroll({ children, className }: DrawOnScrollProps) {
  return <div className={cn(styles.root, className)}>{children}</div>;
}
