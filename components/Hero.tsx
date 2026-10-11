"use client";

import { useCallback, useEffect, useState } from "react";
import LogoSequence from "./LogoSequence";
import ScrollBooks from "./ScrollBooks";

/**
 * The intro sears the mark straight into the nav corner, leaving the stage to
 * one flush-left headline (trimmed from the "What" heading below) and the cue
 * to keep going. The headline stays hidden until the intro has revealed it.
 */
export default function Hero() {
  const [revealed, setRevealed] = useState(false);

  const handleSettle = useCallback(() => setRevealed(true), []);

  // Hold the page still until the mark has been seared in and the light is up. Only the
  // home page does this — every other route renders its chrome immediately.
  useEffect(() => {
    document.documentElement.classList.toggle("is-intro", !revealed);
    return () => document.documentElement.classList.remove("is-intro");
  }, [revealed]);

  return (
    <header className={`hero${revealed ? " is-revealed" : ""}`}>
      <LogoSequence onSettle={handleSettle} />
      <div className="hero-copy">
        <h1>Curated IP rights for Adaptations.</h1>
      </div>
      <ScrollBooks />
    </header>
  );
}
