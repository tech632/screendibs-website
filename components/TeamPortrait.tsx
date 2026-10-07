import Image from "next/image";

export type Tone = "sage" | "coral" | "peri";

interface Props {
  name: string;
  /** Drop real photos in /public/team and pass the path. */
  src?: string;
  tone: Tone;
  /** object-position, for a sitter a centre crop would behead. */
  focus?: string;
  /** Skip lazy loading — for the one portrait that can be above the fold. */
  eager?: boolean;
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("");

/**
 * A portrait filling one cell of the team grid. Falls back to a brand-coloured
 * plate with the sitter's initials when no photograph has been supplied yet, so
 * an incomplete team page reads as deliberate rather than broken.
 */
export default function TeamPortrait({ name, src, tone, focus, eager }: Props) {
  return (
    <div className={`portrait portrait-${tone}`}>
      {src ? (
        <Image
          src={src}
          alt={`${name}, Screendibs`}
          fill
          /* One of three columns of a 1240px grid, one of two below 1100px,
             the full width below 780px. */
          sizes="(max-width: 780px) 100vw, (max-width: 1100px) 45vw, 400px"
          // `priority` is deprecated as of Next 16; eager + high fetchPriority
          // is the replacement that does not also inject a <head> preload.
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          style={{ objectFit: "cover", objectPosition: focus ?? "50% 50%" }}
        />
      ) : (
        <div className="portrait-placeholder" aria-hidden>
          <span className="portrait-initials">{initials(name)}</span>
          <span className="portrait-ast">*</span>
        </div>
      )}
    </div>
  );
}
