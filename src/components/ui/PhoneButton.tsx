import { Phone } from 'lucide-react';
import { SITE, phoneHref } from '@/config/site';
import { buttonClasses } from './button-variants';

type PhoneButtonProps = {
  className?: string;
};

/** Main call to action – always a tel: link (docs/design-system.md#komponenty). */
export function PhoneButton({ className }: PhoneButtonProps) {
  return (
    <a href={phoneHref} className={buttonClasses('pl-1.5 shadow-phone', className)}>
      <span
        aria-hidden="true"
        className="grid size-9 shrink-0 place-items-center rounded-full bg-(--btn-fg) text-(--btn-bg)"
      >
        <Phone className="size-5" strokeWidth={2.5} />
      </span>
      <span>
        <span className="sr-only">Zadzwoń: </span>
        {SITE.contact.phone}
      </span>
    </a>
  );
}
