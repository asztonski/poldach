import { useEffect, useState } from 'react';
import { SCROLL_JUMP_EVENT } from '@/components/motion/SmoothScroll';

// Past this the page counts as scrolled and the header takes its compact form
const SCROLLED_AFTER = 8;
// Near the top the header always stays
const HIDE_AFTER = 100;
// Smaller moves (touchpad jitter, the tail of smooth scrolling) do not change the direction
const MIN_MOVE = 8;

/**
 * The pinned scene stuck right now, if any – the scroll plays its animation instead of moving the
 * page. Pinned scenes mark their sticky element with data-pin (PinnedScene, TracingReveal); it is
 * stuck while its track has reached the sticky offset and still reaches below the element. Not
 * sticky (small screen, reduced motion, no support) – never stuck.
 */
function stuckPin() {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-pin]')).find((el) => {
    const style = getComputedStyle(el);
    if (style.position !== 'sticky' || !el.parentElement) return false;
    const top = parseFloat(style.top) || 0;
    const track = el.parentElement.getBoundingClientRect();
    return track.top <= top + 1 && track.bottom >= top + el.offsetHeight - 1;
  });
}

/**
 * What the scroll means for the header (docs/decyzje.md D-41, D-52, D-56): `scrolled` – the page has
 * left the top; `hidden` – the last move went down, so the header makes room until the next move
 * up. While a pinned scene is stuck the page does not move, so a move up does not bring the header
 * back – but a header already there stays until a move down. A full-screen scene
 * (data-pin="full", the photo and its drawing) keeps it hidden in both directions.
 */
export function useHeaderScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    // The page moved its own scroll position (moveScrollBy): from there on, not a move of the user
    const onJump = () => {
      last = window.scrollY;
    };

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > SCROLLED_AFTER);
      const pin = stuckPin();
      if (pin?.dataset.pin === 'full') {
        setHidden(true);
        last = y;
        return;
      }
      if (Math.abs(y - last) < MIN_MOVE) return;
      const down = y > last && y > HIDE_AFTER;
      // Inside a scene only a move down changes anything
      if (!pin || down) setHidden(down);
      last = y;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener(SCROLL_JUMP_EVENT, onJump);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener(SCROLL_JUMP_EVENT, onJump);
    };
  }, []);

  return { scrolled, hidden };
}
