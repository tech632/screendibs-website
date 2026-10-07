/**
 * The Screendibs mark as inline SVG, built from the same proportions the canvas
 * rig uses (see lib/sequence/rig.ts). Scales with `size`, which is the cap
 * height in px. Used anywhere the mark is static — the nav on inner pages, the
 * footer — while the home page's corner mark is the one painted by the canvas.
 */

const R_GAP = 0.234;
const R_AST_RADIUS = 0.2554;
/** Nudged a touch higher than the reference — reads better against the S. */
const R_AST_CY = 0.755;

/** Five arms at 72°, tapering outward, plus the hub. */
function asteriskPath(cx: number, cy: number, R: number) {
  const hubD = R * 0.06;
  const wIn = R * 0.085;
  const wOut = R * 0.255;
  const parts: string[] = [];
  for (let i = 0; i < 5; i++) {
    const a = ((-90 + i * 72) * Math.PI) / 180;
    const dx = Math.cos(a);
    const dy = Math.sin(a);
    const px = -dy;
    const py = dx;
    const pt = (d: number, w: number, s: number) =>
      `${(cx + dx * d + px * w * s).toFixed(2)},${(cy + dy * d + py * w * s).toFixed(2)}`;
    parts.push(
      `M${pt(hubD, wIn, 1)}L${pt(R, wOut, 1)}L${pt(R, wOut, -1)}L${pt(hubD, wIn, -1)}Z`,
    );
  }
  const hr = R * 0.115;
  parts.push(
    `M${(cx - hr).toFixed(2)},${cy.toFixed(2)}a${hr.toFixed(2)},${hr.toFixed(2)} 0 1,0 ${(hr * 2).toFixed(2)},0a${hr.toFixed(2)},${hr.toFixed(2)} 0 1,0 ${(-hr * 2).toFixed(2)},0Z`,
  );
  return parts.join("");
}

interface Props {
  /** Cap height in px. */
  size?: number;
  className?: string;
  color?: string;
  title?: string;
}

export default function SdMark({
  size = 18,
  className,
  color = "currentColor",
  title,
}: Props) {
  const cap = size;
  // Ink widths of the two letterforms as multiples of cap, measured from the
  // reference lockup. Kept as constants because SVG cannot measure text.
  const sW = cap * 0.85;
  const dW = cap * 0.7;
  const track = cap * 0.025;

  const baseline = cap;
  const sX = 0;
  const dX = sX + sW - track;
  const sdRight = dX + dW;
  const astR = cap * R_AST_RADIUS;
  const astCx = sdRight + R_GAP * cap + astR;
  const astCy = baseline - R_AST_CY * cap;
  const w = astCx + astR;
  // Round letterforms overshoot the cap line a little.
  const pad = cap * 0.04;

  return (
    <svg
      className={className}
      width={w}
      height={cap + pad * 2}
      viewBox={`0 ${-pad} ${w} ${cap + pad * 2}`}
      fill={color}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <text
        x={sX}
        y={baseline}
        fontFamily='"Helvetica Neue", Helvetica, Arial, "Liberation Sans", sans-serif'
        fontWeight={700}
        fontSize={cap / 0.716}
        textLength={sW}
        lengthAdjust="spacingAndGlyphs"
      >
        S
      </text>
      <text
        x={dX}
        y={baseline}
        fontFamily='"Helvetica Neue", Helvetica, Arial, "Liberation Sans", sans-serif'
        fontWeight={360}
        fontSize={cap / 0.716}
        textLength={dW}
        lengthAdjust="spacingAndGlyphs"
      >
        d
      </text>
      <path d={asteriskPath(astCx, astCy, astR)} fillRule="evenodd" />
    </svg>
  );
}
