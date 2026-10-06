# Deployed security verification — 6 October 2026

Status: **Report-Only header and functional pass; CSP enforcement remains pending.** This report supersedes the missing-header findings for the earlier deployment in `deployed-assessment-2026-10-06.md`, only for the checks described here. It is not a completed privacy/storage assessment or approval for public launch.

## Deployment and method

- Host: https://ravenousfind.netlify.app . Published production deploy `6ac4fbe5f830a400e1ca4f2e`, branch `main`, commit `f75331c3c07d9550be716c7714431139e0b5800f`.
- Netlify connector confirmed ready state and one header rule processed without errors. Production and previews remain protected by team login.
- Used the owner's existing Firefox/macOS session and Developer Tools through Computer Use. The initial access session had expired; normal navigation refreshed the existing Netlify login. Initial fetches returned the access layer's HTTP 401, and were excluded from application-header verification. Subsequent authenticated, no-store fetches returned the actual pages with HTTP 200.
- uBlock showed off for this hostname at the start; its setting was not changed. This was not a clean browser-profile or third-party-cookie comparison.
- Read only selected response headers and page identity, exercised public test queries, and used public central-London coordinates for a direct SDK reverse-geocoding probe. No owner location was requested.
- Temporary console probes and one test iframe were confined to the browser page. The iframe was removed and the temporary legal-page tab closed. No hosting configuration, visibility, keys, repository commits or deployments were changed.

## Actual authenticated HTML responses

All three paths, `/`, `/privacy.html` and `/terms.html`, returned HTTP 200 with the correct distinct page titles and these values:

| Header | Verified value |
| --- | --- |
| Content-Security-Policy-Report-Only | Exact match to the candidate in `netlify.toml` and `config/securityHeaders.js` |
| Content-Security-Policy | Absent, as intended at this test stage |
| X-Content-Type-Options | `nosniff` |
| X-Frame-Options | `DENY` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | `geolocation=(self), camera=(), microphone=(), payment=()` |
| Strict-Transport-Security | `max-age=31536000; includeSubDomains; preload` |

An independent HTTP HEAD request returned 301 with `Location: https://ravenousfind.netlify.app/`. Normal authenticated HTTPS navigation succeeded without a certificate warning. The `preload` token alone does not establish preload-list inclusion.

## Functional and CSP observations

- Google SDK loaded and its CSP probe returned successfully after the login refresh.
- Typed a public cuisine query and location. Autocomplete displayed Google attribution; keyboard selection worked. Search returned 20 results with credits. Rating and review-count sorts responded.
- Two first-pass photo requests showed Firefox network errors (`NS_ERROR_DOM_NETWORK_ERR`). Repeated the search: final image inspection found 20 photos, all loaded with positive natural width, no failed or pending images. No CSP source was added on this evidence.
- Imported Google's geocoding library and reverse-geocoded public test coordinates. The probe returned success with results. This verifies the deployed SDK request path, not the full current-location button, browser-permission or withdrawal flow.
- A page-level `securitypolicyviolation` listener captured no events during the geocoding probe and repeat search/photo pass. The console showed no Ravenous resource-source violation for those tested flows. This is sampled evidence, not proof of all browsers or all future weekly SDK versions.
- A deliberate same-origin iframe pointing to the privacy page was refused by Firefox with the explicit `X-Frame-Options: DENY` message. The expected Report-Only `frame-src` and `frame-ancestors` messages also appeared. The parent listener recorded the deliberate `frame-src` event with disposition `report`. These intentional framing violations are separate from normal application compatibility findings. A separate-origin test and enforced-CSP retest remain pending.
- Direct address-bar navigation to both legal URLs rendered their own headings and the current 6 October draft. Their authenticated HTML contained only Netlify's injected private HUD script, with no Google scripts. They are independent of the Ravenous/Google application, although the host's private toolbar means the deployed HTML is not entirely script-free.

## Console warnings and limitations

Firefox warns that the Report-Only policy has neither `report-uri` nor `report-to`. No remote reporting endpoint is configured by design; this pass inspected console messages and page events locally. A remote reporting destination is a separate privacy and configuration decision. The warning is not evidence of a missing CSP header. Report-Only does not enforce the policy.

An earlier pre-refresh console message referred to a Google script and `NetUtil.sys.mjs`; it was not reproduced as a normal resource violation after refreshing the login. Firefox also showed an extension-origin unsupported `longtask` warning and invalid reporting-header messages alongside Google service responses. Do not relax Ravenous's CSP merely to suppress extension or provider warnings; the tested geocoding request succeeded.

Netlify's optional private HUD/public badge can behave differently when the policy is enforced. The only injected legal-page script observed here was `/.netlify/scripts/hud`; final visitor configuration still needs assessment. No blanket inline-script or eval permission was introduced.

## Next stage

1. Prepare a reviewed change promoting the verified candidate header to `Content-Security-Policy`, keeping the four companion headers and private access in place.
2. Privately deploy that change and repeat authenticated header checks, initial SDK load, autocomplete, search, photos, sorting and geocoding. Verify separate-origin framing, and test location permission denial/failure, withdrawal and pending-response cancellation.
3. Complete remaining browser storage/access, provider, lawful-basis, transfer, contact/inbox and owner-sign-off inputs before public launch. This functional/security pass does not fill those privacy placeholders.

This public-safe report contains no API key values, authentication tokens, personal coordinates, raw network exports or copied restaurant/photo content. It records the earlier Report-Only deployment; it does not establish that the proposed enforcing deployment has passed.
