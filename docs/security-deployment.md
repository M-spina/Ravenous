# Static-host security configuration and launch verification

Authenticated Firefox checks on 6 October found HTTP 200 and HSTS on all three HTML pages, but **none of the planned application security headers**. See [the deployment assessment](deployed-assessment-2026-10-06.md). Configure actual Netlify response headers and retest privately before public launch.

Netlify hosts a private deployment. Its earlier authenticated HTML responses, HTTPS/access protection and limited search flows have been checked, as recorded in the dated assessment. Headers, CSP and functional checks against the newly configured revision remain pending. This repository configuration does not change account settings or deploy the site. The application requires no visitor account of its own; Netlify's temporary private-access restriction remains in place during testing.

## Netlify configuration and branch selection

`netlify.toml` at the repository root configures `npm run build`, publication from `dist`, Node 24 and all four companion headers for `/*`. Its CSP starts in Report-Only and matches the candidate in `config/securityHeaders.js`. Netlify applies it on the next build of a branch containing this file; local Vite preview settings do not configure production responses. Keep both copies of the policy aligned when editing.

The 6 October GitHub check found #15 merged into `main`, but #16, #17 and #18 merged into temporary feature-branch bases. This PR integrates their reviewed source changes and history into a branch targeting `main`; the prior “merged” status did not mean they had reached `main`.

After reviewing and merging this PR, set Netlify's production branch to `main` under Project configuration → Developer settings → Continuous deployment → Branches and deploy contexts. Keep production and previews Private while testing. Confirm the resulting deploy uses the expected main commit, `netlify.toml`, three HTML entry points and processed header rules. Leave the Google key in Netlify's existing environment configuration; no keys belong in this file.

Do not add an SPA catch-all rewrite: legal HTML URLs must remain independently accessible. HSTS is already supplied by the Netlify hosting layer; no custom HSTS override is introduced.

Start with `Content-Security-Policy-Report-Only`, then replace it with `Content-Security-Policy` once the HTTPS browser checks below pass. Avoid accidentally retaining a second, conflicting enforcing policy. The companion headers are:

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

The checker fetches `/`, `/terms.html` and `/privacy.html`, checks actual response headers and page identity, and fails for missing restrictions or JavaScript-dependent legal pages. It does not replace browser testing or prove third-party storage behaviour.

## Required HTTPS-host checks — pending after the configured Netlify deploy

1. Serve all three real HTML pages directly; do not route legal URLs to an SPA fallback. Fill every legal placeholder and complete `privacy-readiness.md` before public release.
2. Redirect HTTP to HTTPS without an intervening insecure page. Verify the final certificate and redirects for both hostnames if using `www` and the apex domain.
3. Recheck Netlify's supplied `Strict-Transport-Security` on the final deployment; the earlier `netlify.app` responses had a one-year `max-age`, `includeSubDomains` and `preload`. Do not override that platform setting without a reason. For any future custom domain, verify HTTPS on all affected subdomains before adopting `includeSubDomains`; a `preload` header token does not establish preload-list inclusion.
4. On a private HTTPS preview, apply Report-Only CSP. Exercise initial load, keyboard autocomplete selection, manual search, result sorting, photos and optional reverse geocoding with test data. Check every CSP report; document any necessary source additions. Verify manual entry still works after geolocation denial/failure.
5. Switch that verified policy to enforcement. Repeat the same operations and ensure images load. Try embedding the preview in a separate-origin iframe and verify the browser blocks it. Confirm legal pages work when Google is unavailable.
6. Run `npm run verify:headers -- https://YOUR-HOST --report-only` during staging, then `npm run verify:headers -- https://YOUR-HOST` after enforcement. HTTPS checks also require an active HSTS header. Save dated evidence without keys, personal locations or Google result/photo data.
7. Confirm MFA is enabled on GitHub, Google Cloud and the selected hosting account. These are owner/account checks; repository changes do not enable or verify them.
8. Review each PR's complete diff and checks at its latest commit. The stack is dependencies → attribution → privacy → security. Only the first PR initially targets `main`; the others target the previous stage to keep their review diffs focused. After each stage reaches `main`, retarget the next PR to `main` and verify its current diff and checks before merging. Do not merge a PR into its temporary feature-branch base. Preserving ancestry with merge commits keeps later diffs focused; if earlier stages are squashed/rebased, rebase the remaining stack onto `main` and rerun checks before merging. No high/critical audit exceptions are currently needed.

Record the chosen host, deployed revision, header values, browser/version, operations tested, CSP findings, HTTP redirect result, HSTS decision and MFA confirmations here or in a private launch record. Until these inputs and checks are complete, this is a deployment candidate, not a publicly launch-ready service.

## Repository validation recorded on 5 October 2026

- Clean installation, lint, 72 tests, production build and audit on Node 24 passed; audit reported zero vulnerabilities across runtime and development dependencies.
- Actual HTTP response headers passed the checker for `/`, `/terms.html` and `/privacy.html` in local Report-Only and enforcement modes.
- The production bundle on the existing permitted `http://localhost:5173` origin loaded the SDK, returned keyboard-selectable autocomplete suggestions, searched, sorted and loaded all 20 displayed Google photos with author credits. No CSP violations were recorded for these operations under either policy. Observed script origin: `maps.googleapis.com`; photo URLs: `places.googleapis.com` (redirected photo delivery also needs the documented Google image origins).
- A harmless inline-script probe was blocked under enforcement and produced a `script-src-elem` violation; the probe's code did not execute. A separate-origin iframe containing the privacy page was blocked by the browser.
- Original-artwork/synthetic-data component fixtures at 390px and 320px showed wrapping author/provider credits and matching viewport/content widths. This checks narrow layouts; it is not a physical-device or screen-reader audit. Native flip controls and autocomplete keyboard behaviour have functional tests; pending location cancellation, denial and failure are covered by unit tests. Loading/results now have polite status announcements, withdrawal returns focus to manual entry, and spinners/skeletons honour reduced motion.
- A public-coordinate reverse-geocoding request did not finish within the fixture's 15-second observation window in either Report-Only or enforcement mode, with no CSP violation recorded. Successful real geocoding remains unverified and must be resolved/retested before launch; no additional policy relaxation was made on this evidence.
- Temporary browser test fixtures are excluded from the repository and removed by the final production build. No personal coordinates or fetched Google photos/results were saved as evidence.

These local checks do not establish HTTPS-host behaviour, Google/host storage/access, account MFA, HSTS or a completed privacy assessment. Those launch checks remain pending.

## Netlify toolbar and badge compatibility

Netlify's injected private toolbar/public badge may be blocked when this CSP is enforced because it uses an inline frame/script. Assess and record that optional-UI behaviour; do not add inline-script permission solely to preserve it. Report-Only does not prove framing is blocked: X-Frame-Options is enforced immediately, and the enforced CSP must also be tested. The authenticated checks in the dated assessment describe the earlier deployment without this configuration, not a passing result for the new revision.


## Integration validation recorded on 6 October 2026

A clean installation on Node 24.21.0, lint, all 72 tests, the production multipage build and the high/critical audit gate passed (zero vulnerabilities). The parsed `netlify.toml` header rules match `config/securityHeaders.js`; all three HTML entry points are present in `dist`. Local production-preview response checks passed in Report-Only mode. These checks do not verify the newly configured Netlify deployment.
