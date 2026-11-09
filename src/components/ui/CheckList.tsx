import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

type CheckListProps = {
  /** 1–3 points of 2–6 words, no full stops (docs/komunikacja.md#zasady-pisania). */
  items: string[];
  className?: string;
};

/** Benefit list with ✓ in a full circle of about 1.1 em (docs/design-system.md#komponenty). */
export function CheckList({ items, className }: CheckListProps) {
  return (
    <ul className={cn('flex flex-col gap-3 text-list', className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          {/* Centred on the first line: (1.35 line height − 1.1 icon) / 2 */}
          <span
            aria-hidden="true"
            className="mt-[0.125em] grid size-[1.1em] shrink-0 place-items-center rounded-full bg-(--icon-ok-bg) text-(--icon-ok-fg)"
          >
            <Check className="size-[0.7em]" strokeWidth={3} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
