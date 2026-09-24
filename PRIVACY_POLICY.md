# Privacy policy

**Effective date:** 24 September 2026

Ink is a free, static educational site. This policy explains what is stored,
what is transmitted and what is not collected.

## Summary

- There are no user accounts and no Ink database of personal data.
- Lesson progress, XP, streaks, badges, drafts and display preferences are
  stored in your browser's `localStorage` on your device.
- Ink itself does not use analytics, advertising, profiling or tracking
  cookies.
- The site is delivered by its hosting provider, and the Python runtime is
  downloaded from a pinned third-party CDN. Those providers may receive
  standard technical request data under their own policies.

## Data stored on your device

Ink uses browser storage so the course works without an account. Depending on
the features you use, this may include:

- Completed lessons and exercises.
- XP, level, streak, badge and activity data.
- Exercise drafts and editor preferences.
- Reading, type-scale and focus preferences.

This data stays in the browser profile that created it. It is not sent to an
Ink server. Clearing site data for this domain, using a different browser or
using private browsing will remove or isolate it.

## Network requests

When you use the site, your browser may request:

1. **Static site assets** from the hosting provider that serves this
   deployment.
2. **The Pyodide runtime** from the pinned jsDelivr CDN URL declared in
   `src/lib/pyodide/config.ts`. This download is cached by the browser where
   permitted.
3. **Any external links you choose to open**, such as cited sources.

Ink does not upload your exercise code to a server. Code execution and testing
happen locally in your browser through Pyodide.

## What we do not collect

- Names, email addresses or account credentials, because there is no account.
- Payment information, because nothing is sold.
- Precise location, contacts or device contacts.
- Cross-site advertising identifiers.
- Keystroke streams or files from your device beyond the code you type into
  the exercise editor.

Hosting and CDN providers may still process IP address, user agent, timestamps
and requested paths for security, abuse prevention and delivery. Their handling
is governed by their own privacy policies.

## Legal bases and your choices

Where data-protection law requires a legal basis:

- Browser storage is used at your direction to provide the course features you
  request.
- Strictly necessary delivery and security processing is used to serve and
  protect the site.

You can limit or delete stored data at any time through your browser's site
settings. Blocking storage may prevent progress, drafts and preferences from
persisting.

## Children

Ink is suitable for learners of different ages but does not knowingly collect
personal information from anyone, including children. Because no personal data
is submitted to Ink, no account or parental-consent workflow exists.

## Changes

The current version of this policy is maintained in this file and linked from
the site footer. Material changes will update the effective date above.

## Contact

Privacy questions can be sent to <indranilchatterjee098@gmail.com> or raised
through the project's GitHub repository.
