# Marketing site vs. app (Vercel): duplicated content, and French + English

Inventory only, nothing merged. "Site" = `website/` (Next.js, screendibs company site). "App" = `app/app/` (React + Vite on Vercel), whose landing page and menu pages (About Us, How It Works, Pricing, FAQ) also act as a marketing site.

## Duplicated content

| Topic | Site | App | Note |
|---|---|---|---|
| Company mission / About | `app/about/page.tsx` (mission, who we serve, platform for producers) | `src/views/AboutView.jsx` (intro, three pillars, Our Story) | Two different About texts. The site's is marked "verbatim from the company, don't copyedit". Pick one source. |
| Founder story | `app/team/page.tsx` (named bio of John Feifer) | `AboutView.jsx` "Our Story" (now anonymous: "a film professional", "the Screendibs founder") | **Still names the founder on the site's Team page**, left as-is pending your decision. |
| What the product does (search / rights / reports) | Home page `components/SearchReveal.tsx` and the "Our Process" steps (3 features, two wordings) | `LandingView.jsx` pipeline and feature boxes, `HowItWorksView.jsx` (5-step pipeline) | Same three ideas written 3-4 different ways. |
| Size of the catalogue | About: "a database of over **100 million** sources" | AboutView: "Over **10 million** literary properties indexed from 150+ countries" | **Contradictory claims.** |
| Report length | — | `HOMEPAGE_STATS`: "**45+** Pages of Analysis"; AboutView: "45+ page dossiers" | **Contradicts the product**: reports are 1, 3 and 5 pages (`reportTiers.js`). |
| Contact | `app/contact/page.tsx`, `ContactBlock` form | `mailto:contact@screendibs.com` in nav, About, Pricing | Two contact paths; the app could link to the site's form. |
| Legal pages | `content/legal/*` at `/terms`, `/platform-terms`, `/privacy`, `/cookies`, `/disclaimer` | None on `main` (sign-up says "By continuing, you agree to our Terms…" with no link) | App should link to the site's pages rather than copy them. |
| Pricing | None | `PricingView.jsx` + landing pricing block | Single source already (`subscriptionTiers.js`). Old prices are still in the legal draft's §11 (fixed in `drafts/legal-beta`). |
| FAQ / facts | `FactsTicker.tsx` (copyright trivia) | `FaqView.jsx` (product FAQ) | Different content, no overlap. |

Suggested direction when you're ready to merge: the site owns company content (About, Team, Contact, Legal); the app keeps only product pages (How It Works, Pricing, FAQ) and links out for the rest.

## What French + English would take

**Website (Next.js 16 App Router)** — moderate, about 2-4 days plus translation:
- Move pages under a `[lang]` segment (`/fr/...`, `/en/...`) with a small dictionary file per language; detect the language from `Accept-Language` in the request proxy and add a FR/EN switch in `SiteNav`. App Router has no built-in i18n config; read `node_modules/next/dist/docs/` for the current routing and proxy conventions before building.
- About 20 pages/components, mostly short marketing copy, plus `FactsTicker` (~30 facts).
- Legal: French versions of the five documents (~11,000 words). Under the Charter of the French Language, the French text must be available first for Quebec users. This is the biggest item and needs a legal translator.
- `hreflang` tags and per-language metadata.

**App (React + Vite SPA)** — larger, about 1-2 weeks plus translation:
- All UI copy is hard-coded in JSX across ~20 views (~4,000 lines) and components. Extract it into message files and use a library such as `react-i18next`, or a small in-house `t()` helper.
- AI output: prompts (`constants/prompts.js`) would need a target-language parameter so search results, the taste-profile chat and reports come back in French. Report layouts (`src/reports/`) are tuned to fixed lengths; French text runs ~15-20% longer, so the page-fit logic needs re-checking.
- Emails (`api/send-*.js`), Stripe checkout locale, Firebase verification email templates (set per language in the Firebase console), dates and number/currency formatting (prices stay USD, but "9,99 $ US" in French).
- Store the user's language in their profile so emails and reports use it.

**Shared:** one glossary (for example "Taste Profile" = « Profil de goûts »?) so the site, app and legal texts use the same terms; a French-speaking reviewer for tone.
