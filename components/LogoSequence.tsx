"use client";

import { useEffect, useRef, useState } from "react";
import { Sequence } from "@/lib/sequence/engine";
import { PHASES, TOTAL } from "@/lib/sequence/timeline";

interface Props {
  /** Fires once, when the sequence starts handing the stage to the copy. */
  onSettle?: () => void;
  /** Fires once the whole sequence has finished. */
  onDone?: () => void;
}

export default function LogoSequence({ onSettle, onDone }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markRef = useRef<HTMLCanvasElement>(null);
  const seqRef = useRef<Sequence | null>(null);
  const [skippable, setSkippable] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const markCanvas = markRef.current;
    if (!canvas || !markCanvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Dev affordance: /?t=2.4 holds the sequence on a single frame.
    const seekParam = new URLSearchParams(window.location.search).get("t");
    const seek =
      seekParam != null && seekParam !== "" && Number.isFinite(Number(seekParam))
        ? Number(seekParam)
        : null;
    let settled = false;
    let finished = false;

    const seq = new Sequence(canvas, markCanvas, {
      seek,
      reducedMotion: reduced,
      onProgress: (t, settle) => {
        if (!settled && settle > 0.02) {
          settled = true;
          onSettle?.();
        }
        if (!finished && t >= TOTAL) {
          finished = true;
          setDone(true);
          onDone?.();
        }
      },
    });
    seqRef.current = seq;
    // If the rig ever fails to build, fall through to the revealed state rather
    // than leaving the page scroll-locked behind a blank canvas.
    seq.init().catch(() => {
      onSettle?.();
      onDone?.();
      setDone(true);
    });

    // A seeked frame should look like that moment really looks, so only reveal
    // the copy if the seek lands at or after the settle phase.
    if (reduced || (seek != null && seek >= PHASES.settle[0])) {
      settled = true;
      finished = true;
      onSettle?.();
      onDone?.();
      setDone(true);
    }

    const skipTimer = window.setTimeout(() => setSkippable(true), 900);

    // A one-shot measure loses to anything that changes layout after mount —
    // a late scrollbar, `svh` settling, a mobile chrome bar collapsing. Observe
    // instead, and fall back to the resize event where RO is unavailable.
    const onResize = () => {
      seq.resize();
      onScroll();
    };
    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
    ro?.observe(canvas);
    window.addEventListener("resize", onResize);

    // The corner transition is scrubbed by scroll, not played. One viewport of
    // travel over 0.85 of the screen height completes it.
    let scrolled = false;
    function onScroll() {
      const y = window.scrollY;
      const span = Math.max(1, window.innerHeight * 0.85);
      const frac = y / span;
      seq.setScroll(frac);
      document.documentElement.style.setProperty(
        "--hero-fade",
        String(Math.max(0, 1 - frac * 1.7)),
      );
      // Toggled only on change — this runs on every scroll event.
      const next = y > 24;
      if (next !== scrolled) {
        scrolled = next;
        document.documentElement.classList.toggle("is-scrolled", next);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Any deliberate input is treated as "get on with it".
    const skip = (e: Event) => {
      if (e instanceof KeyboardEvent && !["Enter", " ", "Escape"].includes(e.key)) return;
      seq.skip();
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchstart", skip, { passive: true });

    return () => {
      window.clearTimeout(skipTimer);
      ro?.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
      seq.dispose();
      seqRef.current = null;
    };
    // Mount-only: the engine owns its own clock from here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="seq-canvas" aria-hidden="true" />
      <canvas ref={markRef} className="mark-canvas" aria-hidden="true" />
      <span className="sr-only">Screendibs</span>
      <button
        type="button"
        className={`seq-skip${skippable && !done ? " is-live" : ""}`}
        onClick={() => seqRef.current?.skip()}
        tabIndex={skippable && !done ? 0 : -1}
        aria-hidden={!skippable || done}
      >
        Skip intro
      </button>
    </>
  );
}
