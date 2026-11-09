'use client';

import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import styles from './FadeInOnce.module.css';

/**
 * Fades its content in once, when the section it sits in covers half of the screen – its top edge
 * reaches the middle (docs/decyzje.md D-36). Then it stays: scrolling back does not hide it. The
 * observer is gone after that, so nothing runs while scrolling. Starting state and safety nets:
 * FadeInOnce.module.css.
 */
export function FadeInOnce({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.dataset.fade = 'waiting';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.fade = 'shown';
        observer.disconnect();
      },
      // The top half of the screen: the section enters it when its top edge reaches the middle
      { rootMargin: '0px 0px -50% 0px' },
    );
    observer.observe(element.closest('section') ?? element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={cn(styles.root, className)} {...props} />;
}
