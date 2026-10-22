import type { ReactNode } from 'react';
import { Check } from 'lucide-react';

type StatusPillProps = {
  children: ReactNode;
};

// Navy, not blue-500 as the spec says: white 14 px text on blue-500 fails the contrast table
/** Short status or proof, e.g. "Od 1992". */
export function StatusPill({ children }: StatusPillProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-pd-navy-900 py-1.5 pr-4 pl-1.5 text-small font-bold text-pd-white">
      <span
        aria-hidden="true"
        className="grid size-6 place-items-center rounded-full bg-(--icon-ok-bg) text-(--icon-ok-fg)"
      >
        <Check className="size-4" strokeWidth={3} />
      </span>
      {children}
    </span>
  );
}
