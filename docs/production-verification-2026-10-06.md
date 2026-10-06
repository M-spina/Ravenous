# Private production verification — 6 October 2026

Status: **the tested enforcing production flows pass; privacy assessment and public release remain pending**. This report supersedes the security findings for the older deployment, not its historical storage observations. Tests used authenticated Firefox 157 on macOS and public test data. No provider settings, access restrictions or extension preferences were changed.

## Deployment and response checks

Netlify reported a ready, published production deployment from `main@17392c54396cf9ecd770dc63744b0aa9db11a564`, deploy `6ac54fcdd6447b0008050c5a`, at https://ravenousfind.netlify.app. One header rule was processed without errors. Production and previews retain team-login restrictions. No serverless/edge functions are deployed and Forms remain disabled.

Authenticated, uncached requests returned HTTP 200 and the correct distinct HTML titles for `/`, `/privacy.html` and `/terms.html`. On each response:

- `Content-Security-Policy` exactly matched the merged policy in `config/securityHeaders.js` and `netlify.toml`.
- `Content-Security-Policy-Report-Only` was absent.
- `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin` and `Permissions-Policy: geolocation=(self), camera=(), microphone=(), payment=()` were present.
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` was present. A header token does not prove preload-list inclusion.

An independent HTTP request returned a 301 redirect to the HTTPS hostname. Firefox accepted HTTPS normally. Direct navigation rendered both legal pages with their own headings. Legal source HTML has no Google SDK script or dependency on Google availability; host-injected UI is separate.

## Application checks under enforcement

| Operation | Observed result |
| --- | --- |
| Type London; select autocomplete with keyboard | Suggestions and Google attribution visible; selection succeeded. |
| Search Pizza in London | 20 restaurant cards; no application error. |
| Rating and Review Count sorts | Both controls responded and selected the requested sort. |
| Restaurant photos | All 20 displayed photos loaded; no failed image. |
| Optional location flow | A temporary geolocation test double supplied public London coordinates; real Google reverse geocoding succeeded and the withdrawal control appeared. No actual device position was requested. |
| Search with coordinates, then withdraw and search | A temporary SDK wrapper recorded only whether location bias was present: true before withdrawal, false afterwards. Readable location remained, with focus returned to manual entry. |
| Permission denied / position unavailable | Appropriate error messages appeared; manual search remained available. |
| Manual edit while position request pending | The late test response did not replace the edited Oxford text or restore coordinates. |
| Stop while position request pending | The late test response did not restore coordinates. |
| Manual search after all test overrides removed | Oxford search returned 20 cards and 20 loaded photos, with no application error. |

A temporary `securitypolicyviolation` listener recorded no violations during those application flows. Original browser geolocation and SDK methods were restored, listeners and test globals removed, and temporary legal-page tabs closed. The existing production tab was left on a manual Oxford search. uBlock was already off for this hostname; its setting was not changed.

A temporary same-origin frame attempt produced an enforcing `frame-src` violation and was removed. This proves the parent page blocks frame loading. Independent separate-origin `frame-ancestors` enforcement against an authenticated HTTP 200 child was **not** established in this pass: private login protection complicates that test. Do not describe an authentication failure as proof of CSP framing protection. The native operating-system location permission prompt was not exercised by the test double.

## Limited storage observations

The existing signed-in profile had one first-party local-storage key, `nl-hud:owner-private:v1`; session storage, IndexedDB databases and Cache Storage each had zero entries. Values were not exported, and no storage was deleted. The key namespace and [Netlify toolbar documentation](https://docs.netlify.com/manage/projects/pre-launch-toolbar/) are consistent with a private-owner toolbar preference, not Ravenous search history. This does not prove every third-party storage purpose or expiry. The earlier inspection observed a private-access `nf_edge` session cookie; cookie/third-party inventories were not repeated completely in this pass.

## Limits and remaining launch work

This is production compatibility evidence for the named commit, not a complete privacy or accessibility assessment. Finish the clean-profile storage/access comparison, provider logging/retention/roles/transfers, owner lawful-basis review, contact inbox and ICO fee assessment. Repeat relevant checks if host visibility, badge/toolbar, consent, domain or provider configuration changes. Verify the real location-permission interaction and independent framing protection without weakening private access. Account MFA was not established by these response checks.

## Privacy-draft repository validation

The follow-up draft was validated with a clean Node 24.21.0 installation: lint, all 72 existing tests, the multipage production build and dependency audit passed with zero vulnerabilities. Local enforced response checks passed on `/`, `/privacy.html` and `/terms.html`; direct Firefox navigation rendered the revised legal pages. The source diff changes legal wording and sanitised documentation only; application code, dependencies, CSP and Netlify access settings are unchanged. This local validation does not deploy the draft notice or complete its outstanding assessments.
