import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './LogoEntrance.module.css';

type LogoEntranceProps = {
  children: ReactNode;
  className?: string;
};

/** Plays the entrance of `LogoWithFigure` (src/brand) once on page load – CSS only. */
export function LogoEntrance({ children, className }: LogoEntranceProps) {
  return <div className={cn(styles.root, className)}>{children}</div>;
}
