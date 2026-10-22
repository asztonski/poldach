import type { ComponentProps, ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { buttonClasses } from './button-variants';

type ButtonProps = ComponentPropsWithoutRef<'button'>;

export function Button({ className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(className)} {...props} />;
}

type ButtonLinkProps = ComponentProps<typeof Link>;

/** Internal navigation styled as a button. */
export function ButtonLink({ className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(className)} {...props} />;
}

type ButtonAnchorProps = ComponentPropsWithoutRef<'a'>;

/** External links, tel: and mailto: styled as a button. */
export function ButtonAnchor({ className, ...props }: ButtonAnchorProps) {
  return <a className={buttonClasses(className)} {...props} />;
}
