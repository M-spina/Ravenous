# Static-host security configuration and launch verification

Current status: [private production verification on 6 October](production-verification-2026-10-06.md) passed the named enforcing deployment's headers and tested application flows. Earlier local/staging statements below are historical; the report records remaining test limitations and privacy launch gates.

The private Netlify deployment `main@f75331c` passed the authenticated header and sampled Report-Only compatibility checks on 6 October. See [the security verification report](security-verification-2026-10-06.md) for the exact response values, successful search/photo/geocoding checks and limitations. It supersedes the missing-header findings for the earlier deployment in [the deployment assessment](deployed-assessment-2026-10-06.md).

This change promotes the same policy to enforcement in `netlify.toml`. **The enforcing HTTPS deployment has not yet been tested.** Merge and deploy privately, then repeat the checks below. The four companion headers, policy sources, build settings and existing private access are unchanged. Repository configuration does not enable or remove Netlify's account-level access restrictions.

## Netlify configuration and branch selection

`netlify.toml` at the repository root configures `npm run build`, publication from `dist`, Node 24 and all four companion headers for `/*`. Its CSP uses `Content-Security-Policy` and matches `securityHeaders(true)` in `config/securityHeaders.js`. It replaces the earlier Report-Only header; no second CSP header is configured. Netlify applies it on the next build of a branch containing this file; local Vite preview settings do not configure production responses. Keep both copies of the policy aligned when editing.

PR #19 integrated the earlier launch changes into `main`. Netlify's production branch is now `main`, and the verified Report-Only deploy used merge commit `f75331c`.

After reviewing and merging the enforcement PR, confirm Netlify's production branch remains `main` under Project configuration → Developer settings → Continuous deployment → Branches and deploy contexts. Keep production and previews Private while testing. Confirm the resulting deploy uses the expected main commit, `netlify.toml`, three HTML entry points and processed header rules. Leave the Google key in Netlify's existing environment configuration; no keys belong in this file.

Do not add an SPA catch-all rewrite: legal HTML URLs must remain independently accessible. HSTS is already supplied by the Netlify hosting layer; no custom HSTS override is introduced.

The current change replaces `Content-Security-Policy-Report-Only` with `Content-Security-Policy` after the private Report-Only pass. If a future policy change needs staging, test it privately before enforcing it. Avoid accidentally retaining a second, conflicting enforcing policy. The companion headers are:

```text
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(self), camera=(), microphone=(), payment=()
```

The CSP permits application scripts/assets from the site's origin, Google API and SDK scripts, Google's API connections and restaurant-photo origins. It blocks plugins, frames, framing by other sites, off-origin base URLs and off-origin form submission. Inline application scripts and eval are not permitted. The Google bootstrap is now bundled in application JavaScript and retains the existing public configuration name and weekly SDK channel.

Inline **styles** are permitted for Google's injected styles. This does not grant inline-script permission. Google documents a broader example policy; Ravenous uses only the capabilities its Places/autocomplete/geocoding UI needs. Add a source or capability only after recording a reproducible blocked request, its origin/purpose and the smallest effective change.

Source: [Google CSP guidance](https://developers.google.com/maps/documentation/javascript/content-security-policy) and [dynamic library loading](https://developers.google.com/maps/documentation/javascript/load-maps-js-api). Google recommends nonces for strict CSP; a static host without per-response nonce support uses an allowlist candidate here. Recheck compatibility when the weekly SDK changes. No reporting service is configured: inspect DevTools locally, or assess a chosen reporting endpoint's personal-data handling before adding it.

## Local production-bundle checks

Use Node 24 and build first. Local HTTP checks are useful compatibility checks and cannot substitute for the HTTPS deployment checks.

```sh
npm ci
npm run lint
npm test
npm run build
npm audit --audit-level=high
npm run preview -- --host 127.0.0.1 --port 5173
npm run verify:headers -- http://localhost:5173 --local --report-only
```

Choose an origin already permitted by the development key's referrer restrictions; using a different localhost port may be rejected independently of CSP. Exercise autocomplete, searches, photos and a reverse-geocode request using test coordinates. Review CSP console messages. Then restart preview with enforcement:

```sh
npm run preview -- --host 127.0.0.1 --port 5173 --mode csp-enforced
npm run verify:headers -- http://localhost:5173 --local
```

The checker fetches `/`, `/terms.html` and `/privacy.html`, checks actual response headers and page identity, and rejects script-bearing legal HTML. The current private Netlify host injects its HUD script, and unauthenticated checks encounter the access layer; therefore verify authenticated deployed responses and legal-page independence in the browser as well. Do not remove private access or export login cookies to work around these checker limitations. The checker does not replace browser testing or prove third-party storage behaviour.

## Enforcement and remaining HTTPS launch checks

1. Serve all three real HTML pages directly; do not route legal URLs to an SPA fallback. Fill every legal placeholder and complete `privacy-readiness.md` before public release.
2. Redirect HTTP to HTTPS without an intervening insecure page. Verify the final certificate and redirects for both hostnames if using `www` and the apex domain.
3. Recheck Netlify's supplied `Strict-Transport-Security` on the final deployment; the earlier `netlify.app` responses had a one-year `max-age`, `includeSubDomains` and `preload`. Do not override that platform setting without a reason. For any future custom domain, verify HTTPS on all affected subdomains before adopting `includeSubDomains`; a `preload` header token does not establish preload-list inclusion.
4. The private Report-Only compatibility pass is recorded for `main@f75331c`. For future policy changes, repeat that staging pass before enforcement: initial load, keyboard autocomplete selection, manual search, both sorts, photos and test-coordinate geocoding. Record any violations and necessary source additions. Verify manual entry after geolocation denial/failure.
5. Switch that verified policy to enforcement. Repeat the same operations and ensure images load. Try embedding the preview in a separate-origin iframe and verify the browser blocks it. Confirm legal pages work when Google is unavailable.
6. Run `npm run verify:headers -- https://YOUR-HOST --report-only` during staging, then `npm run verify:headers -- https://YOUR-HOST` after enforcement. HTTPS checks also require an active HSTS header. Save dated evidence without keys, personal locations or Google result/photo data.
7. Confirm MFA is enabled on GitHub, Google Cloud and the selected hosting account. These are owner/account checks; repository changes do not enable or verify them.
8. Review the enforcement PR's complete diff and CI checks at its latest commit before merging into `main`. The earlier launch PRs are already integrated. No high/critical audit exceptions are currently needed.

Record the chosen host, deployed revision, header values, browser/version, operations tested, CSP findings, HTTP redirect result, HSTS decision and MFA confirmations here or in a private launch record. Until these inputs and checks are complete, this is a deployment candidate, not a publicly launch-ready service.

## Repository validation recorded on 5 October 2026

- Clean installation, lint, 72 tests, production build and audit on Node 24 passed; audit reported zero vulnerabilities across runtime and development dependencies.
- Actual HTTP response headers passed the checker for `/`, `/terms.html` and `/privacy.html` in local Report-Only and enforcement modes.
- The production bundle on the existing permitted `http://localhost:5173` origin loaded the SDK, returned keyboard-selectable autocomplete suggestions, searched, sorted and loaded all 20 displayed Google photos with author credits. No CSP violations were recorded for these operations under either policy. Observed script origin: `maps.googleapis.com`; photo URLs: `places.googleapis.com` (redirected photo delivery also needs the documented Google image origins).
- A harmless inline-script probe was blocked under enforcement and produced a `script-src-elem` violation; the probe's code did not execute. A separate-origin iframe containing the privacy page was blocked by the browser.
- Original-artwork/synthetic-data component fixtures at 390px and 320px showed wrapping author/provider credits and matching viewport/content widths. This checks narrow layouts; it is not a physical-device or screen-reader audit. Native flip controls and autocomplete keyboard behaviour have functional tests; pending location cancellation, denial and failure are covered by unit tests. Loading/results now have polite status announcements, withdrawal returns focus to manual entry, and spinners/skeletons honour reduced motion.
- A public-coordinate reverse-geocoding request did not finish within the fixture's 15-second observation window in either Report-Only or enforcement mode, with no CSP violation recorded. The later 6 October private HTTPS pass successfully completed direct SDK geocoding with public test coordinates. The later enforcing production pass verified withdrawal/cancellation using simulated public coordinates and real Google geocoding; the native device-permission interaction remains to be checked. No additional policy relaxation was made on the earlier timeout evidence.
- Temporary browser test fixtures are excluded from the repository and removed by the final production build. No personal coordinates or fetched Google photos/results were saved as evidence.

These local checks do not establish HTTPS-host behaviour, Google/host storage/access, account MFA, HSTS or a completed privacy assessment. Those launch checks remain pending.

## Netlify toolbar and badge compatibility

Netlify's injected private toolbar/public badge may be blocked when this CSP is enforced because it uses an inline frame/script. Assess and record that optional-UI behaviour; do not add inline-script permission solely to preserve it. Report-Only does not prove framing is blocked: X-Frame-Options is enforced immediately, and the enforced CSP must also be tested. The security verification report describes the earlier Report-Only deployment, not a passing result for the new enforcing revision.


## Integration validation recorded on 6 October 2026

A clean installation on Node 24.21.0, lint, all 72 tests, the production multipage build and the high/critical audit gate passed (zero vulnerabilities). The parsed `netlify.toml` header rules match `config/securityHeaders.js`; all three HTML entry points are present in `dist`. Local production-preview response checks passed in Report-Only mode. These checks do not verify the newly configured Netlify deployment.


## Enforcement PR local validation — 6 October 2026

A fresh Node 24.21.0 installation, lint, all 72 tests, production build and dependency audit passed with zero vulnerabilities. Parsed TOML comparison confirmed that the only effective configuration change is the CSP header name; its policy text, four companion headers and build configuration are identical to `main@f75331c`. Actual local production-preview responses passed the enforced-header checker for all three HTML pages. The later production report records the authenticated enforcing checks and their limits.

## Enforcing deployment review and recovery

After merging, confirm the private production deployment uses the new main commit and processed the header rule. All three actual HTML responses must contain the enforcing header, exactly the intended policy and the four companion headers, with no leftover Report-Only header. An expired team-login session can return HTTP 401 without application headers; refresh the normal login and inspect the authenticated HTTP 200 responses. Do not remove private access to make the checker pass, or copy authentication cookies into scripts or command history.

Repeat initial SDK loading, keyboard autocomplete selection, search, both sorts, photos, public-test-coordinate geocoding and direct legal-page navigation. Test separate-origin framing and the complete optional-location permission/withdrawal flow. Distinguish expected blocked framing/toolbar probes from application failures. Keep the Netlify toolbar/public badge impact recorded without granting broad inline-script or eval permission.

If enforcement reproducibly breaks a required flow, keep the site private and use Netlify's previously verified deploy as a reversible fallback. Record the blocked directive and origin, prepare a narrowly scoped reviewed fix or temporary Report-Only rollback, and retest before proceeding. A rollback does not complete the launch gate. No reporting endpoint is added by this change.
