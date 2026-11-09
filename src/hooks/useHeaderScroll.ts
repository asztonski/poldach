import { useEffect, useState } from 'react';

// Past this the page counts as scrolled and the header takes its compact form
const SCROLLED_AFTER = 8;
// Near the top the header always stays
const HIDE_AFTER = 100;
// Smaller moves (touchpad jitter, the tail of smooth scrolling) do not change the direction
const MIN_MOVE = 8;

/**
 * What the scroll means for the header (docs/decyzje.md D-41): `scrolled` – the page has left the
 * top; `hidden` – the last move went down, so the header makes room until the next move up.
 */
export function useHeaderScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > SCROLLED_AFTER);
      if (Math.abs(y - last) < MIN_MOVE) return;
      setHidden(y > last && y > HIDE_AFTER);
      last = y;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { scrolled, hidden };
}
