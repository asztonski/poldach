import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { type SectionTheme, themeClass } from './theme';

type PanelProps = ComponentPropsWithoutRef<'div'> & {
  theme: SectionTheme;
};

/**
 * Sheet in another colour inside a section, on the same screen grid (`paper`, globals.css). Sharp
 * corners, no border, no shadow (docs/design-system.md#kształty). Like a section, it clips what
 * sticks out.
 */
export function Panel({ theme, className, ...props }: PanelProps) {
  return <div className={cn(themeClass(theme), 'paper', className)} {...props} />;
}
