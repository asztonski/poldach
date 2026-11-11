'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { StaticImageData } from 'next/image';
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useHydrated } from '@/hooks/useHydrated';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';

// The share of the video that has to be on the screen for it to count as seen
const IN_VIEW = 0.25;

type VideoPlayerProps = {
  src: string;
  /** The first frame – shown until the video plays, so nothing jumps when it starts */
  poster: StaticImageData;
  /** What the video shows, for screen readers */
  label: string;
  className?: string;
};

/** Round button over the video: white icon on navy, 44 px (docs/design-system.md#komponenty). */
function ControlButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full bg-pd-navy-900/80 text-pd-white transition-colors [--focus:var(--color-pd-white)] hover:bg-pd-navy-900"
    >
      {children}
    </button>
  );
}

/**
 * A muted, looping video that plays while it is on the screen and pauses when it leaves it
 * (docs/decyzje.md D-88). Buttons: play and pause, sound, full screen. A pause by the visitor holds
 * – the video does not start again by itself; with reduced motion it starts only on "play".
 * Without JavaScript – the browser's own controls.
 */
export function VideoPlayer({ src, poster, label, className }: VideoPlayerProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Paused by the visitor – scrolling back does not resume it
  const heldRef = useRef(false);
  // Watched to the end – counted once per page, the video loops (D-96)
  const completedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const hydrated = useHydrated();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // React does not write `muted` into the static HTML nor set it on hydration – set it here
    video.muted = true;
    heldRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) video.pause();
        // Blocked autoplay (e.g. battery saver) – it waits for "play"
        else if (!heldRef.current) video.play().catch(() => {});
      },
      { threshold: IN_VIEW },
    );
    observer.observe(video);

    const onFullscreen = () => setFullscreen(document.fullscreenElement === frameRef.current);
    document.addEventListener('fullscreenchange', onFullscreen);
    return () => {
      observer.disconnect();
      document.removeEventListener('fullscreenchange', onFullscreen);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    heldRef.current = !video.paused;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  // What GA's events name the video by
  const videoParams = { video_title: label.slice(0, 100) };

  const toggleSound = () => {
    if (muted) track('video_unmute', videoParams);
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    const frame = frameRef.current;
    const video = videoRef.current as
      (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (document.fullscreenElement) return void document.exitFullscreen();
    track('video_fullscreen', videoParams);
    // The frame, so the buttons stay; iPhone can only show the video itself full screen
    if (frame?.requestFullscreen) void frame.requestFullscreen();
    else video?.webkitEnterFullscreen?.();
  };

  // A looping video never ends – the last half second of the first pass counts as the end
  const checkComplete = (video: HTMLVideoElement) => {
    if (completedRef.current || !video.duration || video.currentTime < video.duration - 0.5) return;
    completedRef.current = true;
    track('video_complete', videoParams);
  };

  return (
    <div
      ref={frameRef}
      className={cn(
        'relative overflow-hidden rounded-box bg-pd-navy-900 [&:fullscreen]:rounded-none',
        className,
      )}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster.src}
        width={poster.width}
        height={poster.height}
        aria-label={label}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        controls={!hydrated}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
        onTimeUpdate={(event) => checkComplete(event.currentTarget)}
        className="block h-auto w-full in-[:fullscreen]:h-full in-[:fullscreen]:object-contain"
      />
      {hydrated ? (
        <div className="absolute bottom-3 left-3 flex gap-2">
          <ControlButton label={playing ? 'Wstrzymaj wideo' : 'Odtwórz wideo'} onClick={togglePlay}>
            {playing ? (
              <Pause aria-hidden="true" className="size-5" fill="currentColor" />
            ) : (
              <Play aria-hidden="true" className="size-5 translate-x-px" fill="currentColor" />
            )}
          </ControlButton>
          <ControlButton label={muted ? 'Włącz dźwięk' : 'Wycisz'} onClick={toggleSound}>
            {muted ? (
              <VolumeX aria-hidden="true" className="size-5" />
            ) : (
              <Volume2 aria-hidden="true" className="size-5" />
            )}
          </ControlButton>
          <ControlButton
            label={fullscreen ? 'Zamknij pełny ekran' : 'Pełny ekran'}
            onClick={toggleFullscreen}
          >
            {fullscreen ? (
              <Minimize aria-hidden="true" className="size-5" />
            ) : (
              <Maximize aria-hidden="true" className="size-5" />
            )}
          </ControlButton>
        </div>
      ) : null}
    </div>
  );
}
