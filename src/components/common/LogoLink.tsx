import Link from 'next/link';
import { Logo, type LogoVariant } from '@/brand/Logo';
import { ROUTES } from '@/config/routes';
import { SITE } from '@/config/site';
import { cn } from '@/lib/cn';

type LogoLinkProps = {
  variant?: LogoVariant;
  /** Set the logo size with a height class, e.g. `h-10`. */
  className?: string;
};

export function LogoLink({ variant, className }: LogoLinkProps) {
  return (
    <Link
      href={ROUTES.home}
      aria-label={`${SITE.name} – strona główna`}
      className={cn('inline-flex h-8', className)}
    >
      <Logo variant={variant} decorative className="h-full w-auto" />
    </Link>
  );
}
