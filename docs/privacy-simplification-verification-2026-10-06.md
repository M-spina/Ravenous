# Privacy simplification and deferred-loading verification — 6 October 2026

Application/legal content tested: `7f1b1ac358bea0cd73b83ae52a50e3dc07c4812f`, PR #21. Private preview: https://deploy-preview-21--ravenousfind.netlify.app, deploy `6ac57449cec09500081d3af4`. This report records its tested version, not a production release or legal approval. PR #21 remains draft and Netlify remains private.

## Review and automated checks

Reviewed the complete PR scope, including the dated reports inherited from earlier work. The visitor notice and terms contain the supplied owner/contact details, no audit placeholders and no application scripts. Internal assessment/operations documents keep evidence, assumptions and owner decisions separate. Historical reports describe their original deployments; the revised assessment supersedes their provisional broad-enquiry/preload conclusions.

On Node 24.19.0: clean `npm ci`, lint, all 80 tests across 15 files, production multipage build and audit including development packages passed; zero vulnerabilities. Diff and changed-file credential-pattern checks passed. Regression coverage includes idle/focus/cuisine behaviour, first submission waiting for SDK loading, retry after failed loading, shared pending Places loading, cancelled suggestions/searches and withdrawal during delayed geocoding.

GitHub Quality passed on this application commit. Netlify's deploy-preview status passed and its header check processed one rule successfully; neutral page/redirect checks reported the expected three changed pages/one asset and no redirect rules. No CSP/header policy changes are included in this PR.

## Clean Firefox private-preview checks

Used the owner-created Personal profile, with Sync signed out and no user extensions, retaining its authorised private Netlify session. No cookie values, credentials, full API request URLs, raw exports or actual device coordinates were retained.

- Fresh page load: zero Google resource entries, no global Google SDK, zero localStorage and sessionStorage entries.
- Cuisine text and focus on an empty location field: zero Google resource entries. Typed eligible location text then triggered lazy loading and an autocomplete request.
- Synthetic permission denial: inline denial error, manual entry available, zero Google resources. This tests application handling, not the actual browser/OS permission prompt.
- Pending synthetic position callback: Stop removed the withdrawal control; delivering the late public test coordinates afterwards did not change the readable location or load Google. Zero Google resources and no Google global remained. The override and temporary callback were restored/removed, followed by reload.
- Direct privacy/terms URLs rendered the updated content without Google resources. Both were visually checked at 320px and measured `innerWidth = documentElement.scrollWidth = 320`, with no horizontal overflow. This is a bounded layout check, not a full screen-reader/device audit.

The earlier [clean-browser assessment](clean-browser-assessment-2026-10-06.md) separately records successful allowed/blocked third-party-cookie flows on private production `17392c5`. It is not evidence that all live Google flows passed on the newly changed preview.

## Authenticated response headers

No-store same-origin GETs to `/`, `/privacy.html` and `/terms.html` returned HTTP 200, enforcing Content-Security-Policy, no Report-Only header, and:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(self), camera=(), microphone=(), payment=()`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`

The CSP matched the repository candidate, including restricted script/connect origins, `object-src 'none'`, `frame-src 'none'` and `frame-ancestors 'none'`. A preload token does not confirm browser preload-list membership; presence of framing headers is not an independent authenticated framing test.

The private owner toolbar produced blocked inline srcdoc and Netlify CDP frame messages. These are recorded separately from Ravenous/Google flow results; application script/frame permissions were not broadened for owner tooling.

## Live Google flow — passed after referrer correction

Initially, the actual autocomplete request returned HTTP 403 with Google's explicit preview-referrer rejection. The owner added the exact preview website restriction to the production key used here. After propagation, the same preview passed without a code, CSP or access change:

- London autocomplete displayed suggestions and official Google Maps attribution. Down/Return selected London, UK.
- One Pizza submission returned restaurants; 20 Google photos were loaded (`complete` with positive natural width), with visible author credits and Google attribution.
- Public synthetic London coordinates were reverse geocoded by the real SDK to London, United Kingdom; a biased search worked and rating sorting was exercised.
- Stop removed coordinate use while retaining the readable London label. Re-establishing synthetic coordinates and manually entering Oxford removed the withdrawal control and produced Oxford suggestions.
- A separate fresh page used precise-location lookup as its first Google interaction, before any Places/autocomplete use. Its first Pizza submit successfully loaded Places and returned 20 restaurants/photos without a second submit. Stop retained London, United Kingdom.
- After search/photos and after the manual edit, localStorage/sessionStorage, document-readable cookie, IndexedDB and Cache Storage counts were all zero. This does not exclude the HttpOnly private-authentication cookie, ordinary HTTP caching, provider-side logs or all non-cookie device access. The earlier allowed/blocked comparison remains the evidence for those browser modes; this regression pass did not change protection settings.

No application/Google CSP failure was observed during the successful flows. Google's informational “Reporting Header: invalid JSON value received” message accompanied successful geocoding; the private-toolbar CSP messages remain distinct. Real device coordinates and the native permission prompt were not used. Synthetic overrides were restored and removed, then the page reloaded; DevTools and responsive mode were closed. The unsynced Personal profile and authorised session were retained, with the private notice open for review.

No provider messages, agreement acceptance, account/privacy settings changes, merge, production release or public-access changes were performed by the assistant. The key restriction was changed by the owner. Keep the exact preview restriction only as long as this preview needs live API access; do not use a broad Netlify wildcard.

## Proportionate remaining review

Use [privacy readiness](privacy-readiness.md): owner review/adoption of the revised notice/assessment; narrowly clarify Netlify retention periods or criteria/controls where useful; fee-checker and relevant final visitor/device/accessibility checks. A missing personalised provider reply is not itself a release veto; actual contradictory or inadequate processing/safeguard evidence needs resolution. Keep confidential correspondence and the owner review note outside this public repository.
