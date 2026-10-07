"use client";

import { useCallback, useEffect, useState } from "react";
import LogoSequence from "./LogoSequence";
import ScrollBooks from "./ScrollBooks";

/**
 * The hero is deliberately bare: the mark, and the cue to keep going. Copy will
 * come back here later — the layout leaves the lower band free for it.
 */
export default function Hero() {
  const [revealed, setRevealed] = useState(false);

  const handleSettle = useCallback(() => setRevealed(true), []);

  // Hold the page still until the mark has finished forging itself. Only the
  // home page does this — every other route renders its chrome immediately.
  useEffect(() => {
    document.documentElement.classList.toggle("is-intro", !revealed);
    return () => document.documentElement.classList.remove("is-intro");
  }, [revealed]);

  return (
    <header className={`hero${revealed ? " is-revealed" : ""}`}>
      <LogoSequence onSettle={handleSettle} />
      <ScrollBooks />
    </header>
  );
}
