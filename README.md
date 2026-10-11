# Screendibs — site

```bash
npm install
npm run dev     # http://localhost:3000
```

Next.js 16 (App Router) + TypeScript. No CSS framework, no animation library — the
intro is hand-written Canvas 2D.

## Pages

| Route | What it is |
|---|---|
| `/` | The company. Sear intro, then the story, ending on a contact block |
| `/team` | Meet the team. Centred masthead over two columns, then full-height portraits alternating side to side |
| `/contact` | Full contact form plus details |

Nav and footer are shared chrome in [layout.tsx](app/layout.tsx). The contact
block at the foot of the company page and the one on `/team` are the same
component ([ContactBlock.tsx](components/ContactBlock.tsx)), so the two cannot
drift apart.

`/team` has no photographs. Each person is one row: the bio on the left, the
quote on the right (`sticky`, so it rides down beside a long bio), stacked on
screens under 781px. The row's `tone` colours the rule over the quote.

The quotes are pull quotes, lifted verbatim from the bio beside them the way a
magazine sets one. Swap in a real spoken line whenever there is one; nothing in
the layout has to move.

## Palette

| Role | Hex | Used for |
|---|---|---|
| Warm canvas | `#EAE7DA` | Page ground; what the sunrise floods the frame with |
| Sage | `#A6BF84` | Portrait plates, card rules, the studio card |
| Coral | `#F76D52` | Primary CTA, the heat of the sear, the sun |
| Periwinkle | `#769AF4` | Portrait plates, form focus rings, links on dark |
| Primary ink | `#111111` | Type, the contact band |
| Reverse ink | `#F5F5F5` | Type on dark, the mark while it is still hot |

Sage and coral are pitched for **fills**. At 11–14px on cream they land at
roughly 2–2.7:1, so small type uses `--sage-deep` / `--coral-deep` — same hues,
about 5:1. The bright values stay for plates, rules and buttons.

The sear's heat colours ([sear.ts](lib/sequence/sear.ts)) sit in the coral
family on purpose, so the iron that brands the mark and the accent the site is
built on read as the same warmth.

## The mark

[SdMark.tsx](components/SdMark.tsx) draws it as inline SVG from the same
proportions the canvas rig uses. Inner pages render it directly; the home page
leaves that slot empty, because its corner mark is the one the canvas seared
there.

## The intro sequence

One canvas, one clock, three beats, about 3.4 seconds. Each beat is an isolated
class that knows how to paint itself at a given time; [engine.ts](lib/sequence/engine.ts)
decides which are live and in what order they composite. Every beat is a pure
function of the clock, so `?t=` seeks and skip behave exactly like playback.

| Beat | t (s) | Technique |
|---|---|---|
| Hold | 0.0–0.45 | Black, with a vignette. A breath before the brand lands |
| **Sear** ([sear.ts](lib/sequence/sear.ts)) | 0.45–1.4 | The mark is pressed straight into its final nav-corner position, level, at nav scale. A thin white-hot edge, tilted a little, crosses the silhouette in 0.4 s; behind it the imprint is orange metal that cools back to bone. A tight glow rides the edge, and about eight grey wisps lift off. No sparks, no flash |
| **Sunrise** ([sunrise.ts](lib/sequence/sunrise.ts)) | 1.3–2.9 | A noise-wobbled beige wavefront opens from the mark, top-left outward. The mark inverts bone to ink exactly where the front passes it |
| Settle | 2.6–3.4 | Nav and copy come in, page background commits to beige, idle loop takes over |

Timings live in one place: [timeline.ts](lib/sequence/timeline.ts). Each effect
reads its own normalised progress, so retiming a beat is a one-line change.

## The parked mark

There is no hero-scale mark and nothing moves on scroll. The mark is seared where
it will live, and stays there. There is deliberately **no DOM wordmark**: the nav
holds only an invisible hit area giving it a link and an accessible name.

### Two canvases

`.seq-canvas` is absolute inside the hero and owns the intro and the beige
field, and it scrolls away with the hero. `.mark-canvas` is fixed, transparent
and above the page content; it takes the mark over when the intro ends and is
painted once, so the parked mark stays pinned. Handover happens at scroll 0,
where hero and viewport coordinates coincide.

For that to be seamless the mark has to land on the same pixels either way, so
lockups are measured at the exact font size they are drawn at rather than
scaled from a probe size (glyph ink boxes are not perfectly linear in font
size once hinting is involved), and both canvases use live text.

The corner lockup mirrors the nav's CSS clamps (`--gutter`, `--nav-h`,
`.nav-mark-slot`) in `buildRig` in [rig.ts](lib/sequence/rig.ts). Change one,
change the other.

### Weights

The S is set at 700 and the d at 360 (`WEIGHT_S` / `WEIGHT_D` in
[rig.ts](lib/sequence/rig.ts)), matching the reference where the S carries
noticeably more weight than the d — trimmed a little lighter than the d's
own regular cut.

### Geometry

The lockup's proportions were measured off `Screendibs 2026-07-22 .png` and are
expressed in [rig.ts](lib/sequence/rig.ts) as multiples of the cap height, so
the mark scales exactly at any viewport and at any position — the `Lockup`
builder lays it out at nav scale. Letterforms come
from the system grotesk stack (Helvetica/Arial/Liberation Sans), measured at
runtime — cap height from `H`, x-height from `x`, stem weight from `l` — which
is what the `d`'s bowl ellipse and stem line are derived from. The asterisk is
pure geometry (five arms at 72°).

Because the real brand face is not bundled, the mark is a little wider than the
reference, which is set in a more condensed grotesk. Dropping the actual font in
is a one-line change to `FONT_STACK`; every proportion is per-cap-height and
will re-derive itself.

### Inspecting a single frame

`?t=` freezes the sequence at any second, which is how the choreography was
tuned:

```
http://localhost:3000/?t=0.7    # the edge crossing the mark
http://localhost:3000/?t=1.1    # imprint cooling, smoke rising
http://localhost:3000/?t=1.9    # wavefront opening from the corner
```

### Accessibility / escape hatches

- `prefers-reduced-motion: reduce` renders the final frame immediately.
- Any wheel, touch or key press skips to the end; a **Skip intro** button
  appears after 0.9s.
- Scrolling is locked only for the duration of the intro, and a `<noscript>`
  block unlocks it plus reveals the copy if JS never runs.

## Content status

Everything below the hero — headline, pillars, steps, the access form — is
**placeholder copy** standing in the mark's visual language. The form is not
wired to a backend. Swap the words; the layout will hold.
