import { useEffect, useState } from 'react';
import {
  REVEAL_HEADER_EVENT,
  SCROLL_JUMP_EVENT,
  type RevealHeaderDetail,
} from '@/components/motion/SmoothScroll';

// Past this the page counts as scrolled and the header takes its compact form
const SCROLLED_AFTER = 8;
// Near the top the header always stays
const HIDE_AFTER = 100;
// Smaller moves (touchpad jitter, the tail of smooth scrolling) do not change the direction
const MIN_MOVE = 8;
// A glide to a section may come late on a busy page – the header waits this much past its time (ms)
const REVEAL_SPARE = 1000;

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
    if (track.top > top + 1 || track.bottom < top + el.offsetHeight - 1) return false;
    /*
     * A full-screen scene counts only while it is what the screen shows below the header's place:
     * the next section slides over it while it still sticks (ProjectSection), and from then on it
     * must not keep the header hidden (D-100)
     */
    if (el.dataset.pin !== 'full') return true;
    const below = document.elementFromPoint(window.innerWidth / 2, headerHeight() + 1);
    return Boolean(below && el.contains(below));
  });
}

const headerHeight = () => document.querySelector('header')?.offsetHeight ?? 0;

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
    /*
     * A link took the page to a section (D-100): the header stays until the glide is where it was
     * going (revealTop) – or, if it never gets there exactly (the visitor scrolled on), until its
     * time is up (revealEnd)
     */
    let revealTop: number | undefined;
    let revealEnd: ReturnType<typeof setTimeout> | undefined;
    const stopRevealing = () => {
      revealTop = undefined;
      clearTimeout(revealEnd);
    };
    // The page moved its own scroll position (moveScrollBy): from there on, not a move of the user
    const onJump = () => {
      last = window.scrollY;
    };
    const onReveal = (event: Event) => {
      const { top, ms } = (event as CustomEvent<RevealHeaderDetail>).detail;
      clearTimeout(revealEnd);
      revealTop = top;
      revealEnd = setTimeout(stopRevealing, ms + REVEAL_SPARE);
      setHidden(false);
    };

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > SCROLLED_AFTER);
      // First: a glide to a section passes full-screen scenes on its way – they must not hide it
      if (revealTop !== undefined) {
        last = y;
        if (Math.abs(y - revealTop) <= 2) stopRevealing();
        return;
      }
      const pin = stuckPin();
      if (pin?.dataset.pin === 'full') {
        setHidden(true);
        last = y;
        return;
      }
      // More than a screen at once is a jump, not a move – a link from another page to a section, End,
      // the scrollbar: the header shows above where the page landed
      if (Math.abs(y - last) > window.innerHeight) {
        setHidden(false);
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
    window.addEventListener(REVEAL_HEADER_EVENT, onReveal);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener(SCROLL_JUMP_EVENT, onJump);
      window.removeEventListener(REVEAL_HEADER_EVENT, onReveal);
      clearTimeout(revealEnd);
    };
  }, []);

  return { scrolled, hidden };
}
