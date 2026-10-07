"use client";

import { useEffect, useRef, useState } from "react";

interface Fact {
  label: string;
  text: string;
}

interface Props {
  heading?: string;
  facts: Fact[];
}

const INTERVAL_MS = 3600;

const Chrome = ({ count }: { count: string }) => (
  <div className="facts-chrome">
    <span className="facts-chrome-dot" />
    <span className="facts-chrome-dot" />
    <span className="facts-chrome-dot" />
    <span className="facts-chrome-label">IP facts</span>
    <span className="facts-count">{count}</span>
  </div>
);

/**
 * A one-at-a-time rotator of trivia in a self-contained card, crossfading
 * through the list on a timer. Starts the first time it scrolls into view
 * rather than immediately, so nobody arrives mid-fact. Readers who asked for
 * less motion get the whole list at once instead of a loop.
 */
export default function FactsTicker({ heading, facts }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const [reduced, setReduced] = useState(false);

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
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setActive((i) => (i + 1) % facts.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, [running, facts.length]);

  if (reduced) {
    return (
      <div ref={ref}>
        {heading ? <p className="facts-heading">{heading}</p> : null}
        <div className="facts-card">
          <Chrome count={`${facts.length} total`} />
          <ul className="facts-static">
            {facts.map((f) => (
              <li key={f.label}>
                <strong>{f.label}.</strong> {f.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="facts-ticker" ref={ref}>
      {heading ? <p className="facts-heading">{heading}</p> : null}
      <div className="facts-card">
        <Chrome count={`${String(active + 1).padStart(2, "0")} / ${facts.length}`} />
        <div className="facts-body">
          <div className="facts-dots" aria-hidden>
            {facts.map((f, i) => (
              <span key={f.label} className={`facts-dot${i === active ? " is-active" : ""}`} />
            ))}
          </div>
          <div className="facts-stage" role="status">
            {facts.map((f, i) => (
              <p key={f.label} className={`facts-item${i === active ? " is-live" : ""}`}>
                <strong>{f.label}.</strong> {f.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
