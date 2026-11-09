import type { ComponentProps } from 'react';
import Link from 'next/link';
import { buttonClasses } from './button-variants';

type ButtonLinkProps = ComponentProps<typeof Link>;

/** Internal navigation styled as a button. */
export function ButtonLink({ className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(className)} {...props} />;
}
