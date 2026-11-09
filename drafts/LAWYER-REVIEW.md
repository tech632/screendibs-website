# Beta legal drafts — review notes

Prepared 8 November 2026 from the 6 November weekly meeting. **Not legal advice; written by a developer for review by Jonathan Nuss (or another Quebec lawyer). Nothing here is published.**

## What the existing drafts already cover well

Jonathan's drafts in `content/legal/` are already thorough and Quebec-aware: Consumer Protection Act distance-contract rights, Law 25 (person in charge, profiling, transfers outside Quebec, confidentiality incidents), CASL, GDPR/UK, AI-output disclaimers and "no guarantee a right is available". The beta drafts keep all of that and only change what the beta and the new sign-up flow make wrong or incomplete.

## What changed for the beta (all marked [BETA] in the drafts)

1. **New "Beta testing phase" section (Terms §1):** free service, no payment taken, Stripe test mode, at least 30 days' notice before any charging starts, features may change, feedback licence.
2. **Sign-up:** email verification required (anti-bot); name and date of birth collected; 18+ enforced at sign-up.
3. **Build Your Taste Profile:** four steps; the AI conversation is capped at three follow-ups and produces a stored summary.
4. **Prices updated** to the new grid (USD): Scout $24.99/mo, Deep Dive $54.99/mo, Premium $599/mo; one-off Scout $9.99, Deep Dive $18.99, Premium $199.99; title access $9.99. The old $29/$79/$199 and "10 searches per month" are gone.
5. **"Card only for reports"** stated in the Terms and the app.
6. **No free trial / no countdown** stated explicitly.
7. **Launch offer flagged** as conflicting with a free beta.
8. **Privacy:** new data (name, date of birth, chat answers, AI summary), beta use of data, retention of date of birth, age check.
9. **Disclaimer:** "Beta service" section.

## Needs a lawyer before publishing

| # | Issue | Why it matters |
|---|---|---|
| 1 | **French versions (Charter of the French Language, as amended by Bill 96).** | Contracts of adhesion (these Terms) must be presented in French first for Quebec users; an English version may only be binding if the user asks for it after seeing the French. The app and site are English-only today. This blocks launch to Quebec users, beta or not. |
| 2 | **Date of birth (Law 25 data minimisation).** | Collecting a full date of birth to check "18+" may be more than necessary. Consider storing only an "18 or older" confirmation, or justify the full date. Also decide if a privacy impact assessment is needed. |
| 3 | **Beta = free, then paid.** | Confirm the notice period and form before charging starts, and that beta users are not auto-enrolled into anything paid (Consumer Protection Act, s. 230 and distance-contract rules). |
| 4 | **"Unlimited search" vs. rate limits.** | The app caps searches at 4/minute and 30/day per account (anti-abuse). Terms §7 has a fair-use clause, but advertising "unlimited" with a hard daily cap may be a misleading representation (CPA ss. 219, 228). Either raise/hide the cap or say "unlimited, subject to fair use" on the pricing page. |
| 5 | **Comparison to search engines.** | Search engines rely on broad "information only" positions. Screendibs goes further: it gives rights-status indications and contact pathways for rights holders. Confirm the Disclaimer's limitation of liability holds for rights-status errors, and whether rights-holder contact data raises Law 25 issues (personal information of third parties). |
| 6 | **AI chat answers sent to Google Gemini.** | Transfer outside Quebec (Law 25 s. 17 assessment) and profiling notice. Confirm the paid Gemini tier is used (no training on prompts) before saying so. |
| 7 | **"We don't sell your data" / "delete at any time"** in the in-app beta notice. | These are binding representations. Confirm they are true and that a deletion process exists (today: by email). |
| 8 | **Premium multi-user login.** | Needs either terms for organisational accounts or a separate enterprise agreement. |
| 9 | **Person in charge of personal information.** | Still a placeholder (defaults to the CEO). Must be named and published. |
| 10 | **Promotion advertising.** | The launch offer and "price of a coffee" style claims: check CPA rules on advertised reductions and price claims. |
| 11 | **Cookie Notice.** | Still says the app only stores sign-in tokens and the dark-mode choice. The app now also stores the beta-notice dismissal in local storage (functional, no consent needed in most readings, but list it). |

## Status after the 9 November 2026 pass

| # | What was done | Still needs |
|---|---|---|
| 1 | French drafts of all five documents in `drafts/legal-beta/fr/` (Terms, Privacy, Disclaimer, Cookie Notice, Website Terms of Use) plus the French beta notice. The website and the app are now French-first (French by default, English on request). The website's legal pages show the French version once it is placed in `content/legal/fr/`; until then they show the English text under a "French version in preparation" notice. | Review by a legal translator and by you. These are machine-assisted working translations. Terms §1 "Language" also needs the Charter rule on when the English version can bind. |
| 2 | Nothing changed. The app still stores the full date of birth. | Your decision: keep the full date or store only an "18 or older" flag. Switching is a small code change. |
| 3 | Nothing changed. | Your confirmation of the notice period and form. |
| 4 | The pricing page now says "Unlimited search, subject to fair use" (English and French). Terms §7 notes it. | Your confirmation that this is enough with the 4/minute and 30/day cap. |
| 5–8 | Nothing changed. | Your review. |
| 9 | **New conflict to resolve:** on 9 Nov the founder's name was removed from the website and the app. Law 25 still requires the title and contact details of the person in charge to be published. The French Privacy draft says "the co-founder and CEO" without a name. | Your decision on whether a title is enough or a name must be published. |
| 10 | Nothing changed ("price of a coffee" still on the pricing page). | Your review. |
| 11 | Done in `drafts/legal-beta/cookie-notice.md` (and French): adds the beta-notice dismissal and the new language preference ("screendibs-lang"). | Your review. |

Also new: the app now links to the Terms, Privacy Policy and Disclaimer on the website (sign-up screen and footer) in the user's language, and emails go out in the user's language. The Privacy draft lists the language preference as new data [BETA].

## Not changed (out of scope for this pass)

Website Terms of Use and Cookie Notice drafts were not rewritten; only item 11 above needs a one-line update.
