import type { ReactNode } from 'react';
import { Logo } from '@/brand/Logo';
import { cn } from '@/lib/cn';

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

/** Logo + vertical rule + label – the line that ties every section to the video ad. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p className={cn('flex items-center gap-3 text-eyebrow text-(--label) uppercase', className)}>
      <Logo variant="title" decorative className="h-3.5 w-auto shrink-0 md:h-4" />
      <span aria-hidden="true" className="h-4 w-0.5 shrink-0 bg-current opacity-40 md:h-5" />
      <span className="min-w-0">{children}</span>
    </p>
  );
}
