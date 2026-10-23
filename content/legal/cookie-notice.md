# Screendibs Cookie Notice

**Draft for review by Jonathan Nuss. Not yet in force.**

Last updated: [date]

This notice explains the cookies and similar technologies used by **Screendibs Technologies Inc.** on the Screendibs platform at [screendibs.com] (the "Platform") and the company website at [company.screendibs.com] (the "Website"). It forms part of our Privacy Policy.

## What cookies and similar technologies are

Cookies are small text files that a website stores in your browser. Similar technologies, such as browser local storage and IndexedDB, also store information on your device. We call all of these "cookies" in this notice.

## Our approach

**We only use cookies that are strictly necessary for the Platform to work or that remember a choice you made.** We do not use advertising cookies, analytics cookies, social media pixels or any cookie that tracks you across other websites. Because of this, we do not show a cookie consent banner. If we ever want to add non-essential cookies, we will update this notice and ask for your consent first.

## Cookies on the Platform

### Sign-in (strictly necessary)

- **Provider:** Google Firebase Authentication.
- **What it stores:** your user identifier and sign-in tokens, in your browser's storage (IndexedDB or local storage).
- **Why:** to keep you signed in and to prove to our servers that requests come from your account.
- **How long:** until you sign out or clear your browser storage. [ASSUMPTION: Firebase default persistence; tokens refresh automatically.]

### Payments and fraud prevention (strictly necessary)

- **Provider:** Stripe.
- **What it stores:** cookies such as "__stripe_mid" (about one year) and "__stripe_sid" (about 30 minutes), set when you open a payment page.
- **Why:** to process payments securely and to detect and prevent fraud.
- **More information:** Stripe's privacy policy and cookie policy on stripe.com.

[ASSUMPTION: Stripe.js loads only when a payment flow is opened. Ben to confirm the cookie names and durations on the live Platform.]

### Display preference (functional)

- **Provider:** Screendibs.
- **What it stores:** your light or dark display choice, in local storage under the names "screendibs-theme" and "darkMode".
- **Why:** to remember the display you chose.
- **How long:** until you clear your browser storage.

### Fonts and software libraries (no cookies)

The Platform loads fonts from Google Fonts and software libraries used to build PDF files from Cloudflare's cdnjs service. These providers do not set cookies for this purpose, but they receive your IP address and browser information when the files are downloaded. [DECISION for Ben and Jon: self-host fonts and libraries to avoid these transfers, especially for EU visitors.]

## Cookies on the Website

The Website does not set cookies and does not use analytics or advertising tools. Our hosting provider, Vercel, records technical information such as IP addresses in server logs for security and operation. [ASSUMPTION: to be checked on the deployed Website.]

## How to control cookies

You can delete or block cookies and browser storage in your browser settings. If you block or delete the sign-in storage, you will be signed out and will not be able to use your account. If you block Stripe's cookies, payments may fail.

## Contact

Questions about this notice: [privacy@screendibs.com — PLACEHOLDER]

Screendibs Technologies Inc., Montreal, Canada
