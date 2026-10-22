import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './DrawOnLoad.module.css';

type DrawOnLoadProps = {
  children: ReactNode;
  className?: string;
};

/** Draws an illustration from `src/components/illustrations` once on page load – CSS only. */
export function DrawOnLoad({ children, className }: DrawOnLoadProps) {
  return <div className={cn(styles.root, className)}>{children}</div>;
}
