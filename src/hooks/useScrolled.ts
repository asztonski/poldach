import { useEffect, useRef, useState } from 'react';

/**
 * `scrolled` turns true once the element under `sentinelRef` – a marker at the very top of the
 * page – has left the screen. An IntersectionObserver wakes only when that changes, while a scroll
 * listener would run on every scroll event.
 */
export function useScrolled() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return { scrolled, sentinelRef };
}
