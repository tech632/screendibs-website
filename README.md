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
| `/` | The company. Forge intro, then the story, ending on a contact block |
| `/team` | Meet the team. Centred masthead over two columns, then full-height portraits alternating side to side |
| `/contact` | Full contact form plus details |

Nav and footer are shared chrome in [layout.tsx](app/layout.tsx). The contact
block at the foot of the company page and the one on `/team` are the same
component ([ContactBlock.tsx](components/ContactBlock.tsx)), so the two cannot
drift apart.

Team photographs go in `/public/team/` — pass the path as `src` to
[TeamPortrait](components/TeamPortrait.tsx) and the coloured initials plate is
replaced by the photo. A sitter a centre crop would behead takes a `focus`
(an `object-position`) alongside it.

`/team` is a 3×3 grid: the photograph sits on the diagonal — first column for
the first person, second for the second, third for the third — and the two
cells it leaves in each row are, reading left to right, always the bio and then
the quote. Every cell is placed by `grid-column`, so the markup order stays
photo-bio-quote whichever cell the photograph lands in. The bios run long, so
the photograph and the quote are `sticky` and ride down beside them.

The grid is written the small width up and each breakpoint places every cell
itself, because the diagonal rules carry a `.pic-N` class: an override written
as `.team-row .portrait-slot` is a class less specific and would lose to them
however late it came. Below 1100px the diagonal cannot hold — a third of that
viewport puts the bio under about 22 characters a line — so the photograph
takes the left column for everyone and the quote falls under the bio it was
pulled from. Below 780px it is one column, photograph first, because placing it
second would put a bio above its own sitter.

The quotes are pull quotes, lifted verbatim from the bio beside them the way a
magazine sets one. Swap in a real spoken line whenever there is one; nothing in
the layout has to move.

## Palette

| Role | Hex | Used for |
|---|---|---|
| Warm canvas | `#EAE7DA` | Page ground; what the sunrise floods the frame with |
| Sage | `#A6BF84` | Portrait plates, card rules, the studio card |
| Coral | `#F76D52` | Primary CTA, the fire in the forge, the sun |
| Periwinkle | `#769AF4` | Portrait plates, form focus rings, links on dark |
| Primary ink | `#111111` | Type, the contact band |
| Reverse ink | `#F5F5F5` | Type on dark, the mark while it is still molten |

Sage and coral are pitched for **fills**. At 11–14px on cream they land at
roughly 2–2.7:1, so small type uses `--sage-deep` / `--coral-deep` — same hues,
about 5:1. The bright values stay for plates, rules and buttons.

The forge's heat ramp ([palette.ts](lib/palette.ts)) is pulled through coral on
purpose, so the fire that makes the mark and the accent the site is built on
are the same colour.

## The mark

[SdMark.tsx](components/SdMark.tsx) draws it as inline SVG from the same
proportions the canvas rig uses. Inner pages render it directly; the home page
leaves that slot empty, because its corner mark is the one the canvas flew
there.

## The intro sequence

One canvas, one clock, five beats. Each beat is an isolated class that knows how
to paint itself at a given 0..1 progress; [engine.ts](lib/sequence/engine.ts)
decides which are live and in what order they composite.

| # | Beat | t (s) | Technique |
|---|------|-------|-----------|
| 0 | Dark sky | 0.0–1.2 | Seeded starfield, parallax drift, twinkle, vignette |
| 1 | **Forge the S** | 0.9–3.9 | Per-pixel burn-dissolve over the glyph's alpha mask, driven by a noise field + directional ramp, coloured through a heat LUT. Embers peel off the front |
| 2 | **Write the d** | 3.7–6.3 | A wide round-capped stroke walks the letterform's construction lines (bowl anticlockwise from 12 o'clock, pen lift, ascender pulled top-down); the glyph is composited into that stroke as a mask |
| 3 | **Gather the asterisk** | 6.1–7.9 | ~190 sky stars fly bezier paths into the five arms. They land tip-first, so each arm grows inward and all five converge on the hub together |
| 4 | **Sunrise** | 7.85–9.6 | The merge flashes; a noise-wobbled beige wavefront leaves the hub. The mark inverts bone→ink exactly where the front passes it; stars it overtakes are consumed |
| 5 | Settle | 9.35–10.2 | Copy rises, page background commits to beige, idle loop takes over |

Beats 1 and 2 are the slow ones by design. Every phase is expressed as a start
and end second, and each effect reads its own normalised 0..1 progress, so
retiming a beat is a one-line change — nothing downstream is hard-coded to a
duration.

## The scroll act

Once the intro settles, the mark stops being time-driven and becomes
scroll-driven ([scrollmorph.ts](lib/sequence/scrollmorph.ts)). Scrolling one
viewport takes it from centre stage to the nav corner:

| Fraction | Beat | What happens |
|---|---|---|
| 0.00–0.34 | **Absorb** | The asterisk eats the "Sd" right-to-left along a ragged front; the letterforms erode into ~760 motes that stream into it |
| 0.30–0.70 | **Travel** | The loaded asterisk turns once and flies to the top-left on an arc, motes orbiting it as an elliptical shell |
| 0.66–1.00 | **Rewrite** | Motes stream back out and the "Sd" reassembles at nav scale, swaying left and right on a damped oscillation before it settles |

Every value is a pure function of the scroll fraction, so it scrubs and reverses
exactly — scroll back up and the mark walks back to the centre.

There is deliberately **no DOM wordmark**. The corner mark is the one that flew
there; the nav holds only an invisible hit area giving it a link and an
accessible name.

### Two canvases

`.seq-canvas` is absolute inside the hero and owns the intro and the beige
field — it scrolls away with the hero. `.mark-canvas` is fixed, transparent and
above the page content, and owns the mark from the end of the intro onward, so
the parked mark stays pinned. Handover happens at scroll 0, where hero and
viewport coordinates coincide.

For that to be seamless the mark has to land on the same pixels either way, so
lockups are measured at the exact font size they are drawn at rather than
scaled from a probe size — glyph ink boxes are not perfectly linear in font
size once hinting is involved.

### Weights

The S is set at 700 and the d at 360 (`WEIGHT_S` / `WEIGHT_D` in
[rig.ts](lib/sequence/rig.ts)), matching the reference where the S carries
noticeably more weight than the d — trimmed a little lighter than the d's
own regular cut.

Timings live in one place: [timeline.ts](lib/sequence/timeline.ts).

### Geometry

The lockup's proportions were measured off `Screendibs 2026-07-22 .png` and are
expressed in [rig.ts](lib/sequence/rig.ts) as multiples of the cap height, so
the mark scales exactly at any viewport and at any position — the same `Lockup`
builder produces both the hero mark and the nav-corner mark. Letterforms come
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
http://localhost:3000/?t=2.6    # mid-burn
http://localhost:3000/?t=4.6    # bowl of the d
http://localhost:3000/?t=7.2    # arms half-formed
http://localhost:3000/?t=8.5    # wavefront crossing the mark
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
