/**
 * Where the top of a pinned stage stands while it is stuck (PinnedScene, TracingReveal). It pins by
 * its top edge – `top` below the top of the screen – or, a stage taller than the screen, by its
 * bottom edge – `--pin-bottom` above the bottom of the screen (PinnedScene.module.css).
 */
export function pinnedTop(
  stage: HTMLElement,
  style: CSSStyleDeclaration = getComputedStyle(stage),
) {
  const bottom = style.getPropertyValue('--pin-bottom').trim();
  if (bottom && bottom !== 'none') {
    return window.innerHeight - parseFloat(bottom) - stage.offsetHeight;
  }
  return parseFloat(style.top) || 0;
}
