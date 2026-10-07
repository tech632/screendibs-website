"use client";

import { useEffect, useRef, useState } from "react";

interface Item {
  query: string;
  answerLabel: string;
  answer: string;
}

interface Props {
  items: Item[];
  thinkingLabel?: string;
}

type Phase = "idle" | "typing" | "thinking" | "answer";

const Chrome = () => (
  <div className="search-chrome">
    <span className="search-dot" />
    <span className="search-dot" />
    <span className="search-dot" />
    <span className="search-chrome-label">Search</span>
  </div>
);

/**
 * A little self-contained search widget, on a loop: types a query as if
 * someone were typing it, pauses to "think" (the brand asterisk, spinning,
 * with the whole card picking up a soft coral pulse), reveals the answer it
 * found, holds, then clears and moves on to the next query. Starts the first
 * time it scrolls into view and keeps cycling from there — it's a side-panel
 * companion to the section, not a one-off.
 */
export default function SearchReveal({
  items,
  thinkingLabel = "Checking the shelf…",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState("");
  const [running, setRunning] = useState(false);
  const [reduced, setReduced] = useState(false);

  const item = items[index];

  // Kick off once the panel is well into view. Reduced-motion readers get
  // every item laid out flat rather than a loop they didn't ask for.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setRunning(true);
        setPhase("typing");
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running || phase !== "typing") return;
    if (typed.length >= item.query.length) {
      const t = setTimeout(() => setPhase("thinking"), 380);
      return () => clearTimeout(t);
    }
    // Slightly irregular per-character delay so it reads as typed, not printed.
    const step = 26 + Math.random() * 48;
    const t = setTimeout(() => setTyped(item.query.slice(0, typed.length + 1)), step);
    return () => clearTimeout(t);
  }, [running, phase, typed, item]);

  useEffect(() => {
    if (!running || phase !== "thinking") return;
    const t = setTimeout(() => setPhase("answer"), 1000);
    return () => clearTimeout(t);
  }, [running, phase]);

  useEffect(() => {
    if (!running || phase !== "answer") return;
    const t = setTimeout(() => {
      setTyped("");
      setIndex((i) => (i + 1) % items.length);
      setPhase("typing");
    }, 2800);
    return () => clearTimeout(t);
  }, [running, phase, items.length]);

  if (reduced) {
    return (
      <div className="search-reveal is-reduced" ref={ref}>
        <div className="search-card">
          <Chrome />
          {items.map((it) => (
            <div className="search-static" key={it.query}>
              <p className="search-static-q">
                <span className="search-ic" aria-hidden>
                  *
                </span>
                {it.query}
              </p>
              <span className="search-answer-label">
                <span className="search-answer-ic" aria-hidden>
                  *
                </span>
                {it.answerLabel}
              </span>
              <p className="search-static-a">{it.answer}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`search-reveal is-${phase}`} ref={ref}>
      <div className="search-card">
        <Chrome />
        <div className="search-box">
          <span className="search-ic" aria-hidden>
            *
          </span>
          <span className="search-typed">
            {typed}
            {phase === "typing" || phase === "idle" ? (
              <span className="search-caret" aria-hidden />
            ) : null}
          </span>
        </div>

        <div className="search-answer" role="status">
          <span className="search-thinking" aria-hidden={phase !== "thinking"}>
            <span className="think-ast" aria-hidden>
              *
            </span>
            {thinkingLabel}
          </span>
          <div className="search-answer-body">
            <span className="search-answer-label">
              <span className="search-answer-ic" aria-hidden>
                *
              </span>
              {item.answerLabel}
            </span>
            <p>{item.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
