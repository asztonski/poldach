import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

type ContainerProps = ComponentPropsWithoutRef<'div'>;

/** Content column: at most 1200 px, 20–24 px side margin on phones. */
export function Container({ className, ...props }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-site px-5 sm:px-6', className)} {...props} />;
}
