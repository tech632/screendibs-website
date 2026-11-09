# Drafts — not published

Nothing in this folder is linked from the site or the app. The live legal pages still read from `content/legal/` (which is synced from `documents/legal/` in the app repo; never edit those copies by hand).

| File | What it is |
|---|---|
| `legal-beta/terms-of-service.md` | Platform Terms of Service, beta version. Built from Jonathan Nuss's current draft; every beta change is marked **[BETA]**. |
| `legal-beta/privacy-policy.md` | Privacy Policy, beta version (adds name, date of birth, the "About you" conversation and its AI summary, beta use of data). |
| `legal-beta/disclaimer.md` | Disclaimer with a "Beta service" section. |
| `legal-beta/beta-notice.md` | The in-app beta notice text, English and French, for sign-off. |
| `legal-beta/cookie-notice.md` | Cookie Notice, beta version (adds the language preference and the beta-notice dismissal). |
| `legal-beta/fr/` | French working translations of all five legal documents. Not reviewed. Once approved they go to `content/legal/fr/` (same file names), and the `/fr` legal pages pick them up automatically. |
| `LAWYER-REVIEW.md` | What changed and what needs a Quebec lawyer before anything is published. |
| `website-duplication-and-i18n.md` | Content duplicated between the marketing site and the app (Vercel), and what French + English would take. |

To see exactly what changed in a legal draft:

```bash
git diff --no-index content/legal/terms-of-service.md drafts/legal-beta/terms-of-service.md
```

When approved: apply the changes to `documents/legal/*.md` in the app repo (the source of truth), then run `node documents/legal/sync.mjs`. The French versions need a `documents/legal/fr/` folder there and a matching line in `sync.mjs`, which only exists on the app's `feature/paywall` branch.
