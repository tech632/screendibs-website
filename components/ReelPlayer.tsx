"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  poster: string;
  /** Accessible name for the video itself. */
  label: string;
  labels: { play: string; pause: string; soundOn: string; soundOff: string };
}

/**
 * A vertical Reel in a phone-shaped frame. It plays muted and looping while
 * it is on screen and pauses when it scrolls away, so it never plays to
 * nobody. Sound is opt-in. Readers who asked for less motion get the poster
 * and a play button instead of autoplay. The file only loads once the frame
 * first comes into view.
 */
export default function ReelPlayer({ src, poster, label, labels }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  /* Set once the reader pauses by hand, so scrolling doesn't restart it. */
  const heldRef = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (calm) heldRef.current = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !heldRef.current) {
          video.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      heldRef.current = false;
      video.play().catch(() => {});
    } else {
      heldRef.current = true;
      video.pause();
    }
  };

  const toggleSound = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted && video.paused) {
      heldRef.current = false;
      video.play().catch(() => {});
    }
  };

  return (
    <div className="reel">
      <video
        ref={ref}
        className="reel-video"
        src={src}
        poster={poster}
        aria-label={label}
        width={720}
        height={1280}
        muted
        loop
        playsInline
        preload="none"
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="reel-controls">
        <button type="button" className="reel-btn" onClick={toggle}>
          {playing ? labels.pause : labels.play}
        </button>
        <button type="button" className="reel-btn" onClick={toggleSound} aria-pressed={!muted}>
          {muted ? labels.soundOn : labels.soundOff}
        </button>
      </div>
    </div>
  );
}
