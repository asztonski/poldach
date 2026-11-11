import { useSyncExternalStore } from 'react';

const noSubscription = () => () => {};

/**
 * False in the static HTML and while it hydrates, true once React runs – for controls that need
 * JavaScript (VideoPlayer's buttons), so the page without it shows none of them.
 */
export const useHydrated = () =>
  useSyncExternalStore(
    noSubscription,
    () => true,
    () => false,
  );
