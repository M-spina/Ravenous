# Private Netlify deployment assessment — 6 October 2026

Status: **partial assessment; public launch remains blocked**. These are sanitised observations from authenticated Firefox UI and provider documents, not a legal sign-off. No credentials, personal coordinates, raw browser exports or fetched Google content are retained here.

## Deployment and method

- Site: https://ravenousfind.netlify.app . Netlify's dashboard identifies published commit `5418401` from `codex/launch-security`, deploy `6ac4dd394366cc2bb623be16`.
- Firefox 157 on macOS, existing signed-in profile; Enhanced Tracking Protection shows Standard (default). This was not a fresh profile. Other extensions remained installed, and HTTP cache was enabled.
- Inspected Firefox Developer Tools Network and Storage panels through Computer Use. Used public test text “Pizza” and “London”; did not request or disclose the owner's precise location.
- Compared uBlock enabled and temporarily disabled for this hostname with explicit owner permission. The owner operated its toggle because it did not respond to Computer Use. Verified OFF during testing, then verified ON through the popup's “Click to disable … for this site” control after restoration. No other account settings changed; the site remains private.
- Inspected Netlify project configuration, Web Analytics, Real User Monitoring and Log Drains. Inspected Google production-key restrictions and billing-country information. Public terms were reviewed separately; they do not prove which historical agreement version was accepted.

## Authenticated security-header checks

All three URLs served their actual HTML pages over authenticated HTTPS with HTTP 200:

| URL | HSTS | Planned application headers |
| --- | --- | --- |
| `/` | Present | Missing |
| `/privacy.html` | Present | Missing |
| `/terms.html` | Present | Missing |

The HSTS response value was `max-age=31536000; includeSubDomains; preload`. The browser accepted the certificate normally. Earlier unauthenticated HTTP checks found a 301 redirect to HTTPS and private-access responses; those are separate from these authenticated application responses. A `preload` token in a header alone does not prove actual preload-list inclusion.

The complete observed response-header lists contained **neither Content-Security-Policy nor Content-Security-Policy-Report-Only**, and no X-Frame-Options, X-Content-Type-Options, Referrer-Policy or Permissions-Policy. Firefox displayed its effective `strict-origin-when-cross-origin` default, which does not establish a configured site response header. Google's own response headers do not protect Ravenous HTML.

Netlify's deploy summary previously reported no header rules processed. The repository's Vite preview settings do not configure Netlify. Apply the candidate values from `config/securityHeaders.js` using Netlify's response-header mechanism, starting in Report-Only, redeploy privately, and repeat authenticated checks before enforcement. No host configuration or deployment was changed during this assessment.

Framing protection, deployed CSP compatibility and successful reverse geocoding remain **untested**. The absence of CSP violations here cannot demonstrate CSP compatibility because no policy was supplied. A Google `gen_204?csp_test=true` request was blocked by uBlock in the first pass and returned HTTP 200 with uBlock disabled; it was not evidence of a site CSP failure.

Both legal URLs loaded independently, with their own headings, and the captured Network lists contained no Google requests. They still displayed the older deployed draft, dated 5 October, with placeholders; newer local draft edits have not been deployed.

## Network and storage observations

| Operation | Observed requests/behaviour |
| --- | --- |
| Initial search-page load | Google Maps JavaScript and SDK modules from `maps.googleapis.com` load before a search. First-party assets and Netlify's owner-private HUD script also load. |
| Autocomplete | POST to `places.googleapis.com/$rpc/google.maps.places.v1.Places/AutocompletePlaces`, HTTP 200; selectable suggestions and Google attribution displayed. |
| Restaurant search | POST to `places.googleapis.com/$rpc/google.maps.places.v1.Places/SearchText`, HTTP 200; 20 results displayed with photo credits. |
| Photos | Requests to `places.googleapis.com` redirect to image delivery on `lh3.googleusercontent.com`; photos load. |
| Reload | The previous query, location text and results cleared; the earlier user-visible precise-location withdrawal control disappeared. This is not an independently performed precise-location/withdrawal test. |
| Legal pages | Direct HTML and first-party styles, favicon and private Netlify HUD; no Google requests in the captured lists. |

For the Ravenous origin, local storage, session storage and IndexedDB showed no stored data in the inspected search session, including after the unblocked search. The initial pass also inspected Cache Storage with no entries. Ordinary HTTP caching of SDK files and photos was visible and is distinct from Cache Storage or saved application histories. The second pass did not disable HTTP cache or establish a new profile baseline.

The first-party cookie inventory showed `nf_edge`, used for private Netlify access, scoped to `.ravenousfind.netlify.app`, path `/`, Secure and HttpOnly, with a Session expiry in the inspector. The response also included Netlify's access-validity countdown. Do not treat this private-access observation as proof that ordinary public visitors receive this cookie.

The Network Cookies panel showed “No cookies for this request” for inspected Google requests, including the unblocked probe, autocomplete, search and a delivered photo. This is sample evidence, **not proof of every third-party request or browser's behaviour**. The first-party Storage panel is not a complete inventory of cookies held by cross-origin Google services. Requests still convey network information even when no cookie is observed.

No non-exempt storage activity was established by this limited pass. No consent banner was added. This does not amount to a finding that consent is unnecessary: complete the fresh-profile/third-party-cookie comparison, caching-purpose assessment and optional-location flow before deciding which PECR exceptions apply.

## Observed account settings

### Netlify

- Production and Deploy Preview visibility: Private. One Owner; connected-tool plan evidence: Free. “Team” is Netlify's workspace terminology and does not imply multiple developers.
- Web Analytics: page offers Enable Analytics; not enabled.
- Real User Monitoring: page offers Enable Real User Monitoring; not enabled.
- Log Drains: Enterprise availability/contact-sales page; no configured external drain shown.
- Forms disabled and no deployed serverless/edge functions in connected-tool evidence.
- Observability request/error counts are available. Their visible history does not establish underlying log retention/deletion.
- Powered by Netlify badge: General settings says it is shown. The private test uses the pre-launch toolbar instead. The public badge's final behaviour still needs assessment.

Netlify documents that badge dismissal is stored in first-party local storage and the badge/private toolbar uses an isolated frame. It also documents that an inline-script-restricting CSP prevents the badge/toolbar rendering. Do not weaken Ravenous's script policy simply to preserve this optional UI. Review whether to disable the public badge, or leave it blocked under the verified policy, and retest the final configuration.

Sources: [badge documentation](https://docs.netlify.com/manage/projects/powered-by-netlify-badge/), [Self-Serve Subscription Agreement](https://www.netlify.com/pdf/self-serve-subscription-agreement.pdf/), [Privacy Statement](https://www.netlify.com/privacy/), [DPA, 9 June 2026](https://www.netlify.com/pdf/netlify-dpa.pdf).

The DPA forms part of the applicable subscription agreement and governs processing where Netlify acts as processor. Exact visitor/CDN/security log fields, purposes, retention, deletion and controller/processor scope were not established by the inspected dashboard. Use the prepared questions in `privacy-operations.md` to obtain a provider answer; no request was sent. Keep the reply privately and record only the sanitised conclusion here. Accepted-version/account-specific exceptions have not been verified.

### Google

- Production key: Websites restriction with `https://ravenousfind.netlify.app` and `https://ravenousfind.netlify.app/*`.
- API restriction list: Maps JavaScript API, Places API (New), Geocoding API and Google Cloud APIs. The additional Google Cloud APIs entry needs a separate review for necessity; no key restriction was changed in this assessment.
- Billing profile country: United Kingdom. No personal address or payment identifiers are retained in this report.
- “Page usage agreements” contained no entries; its explanation concerns console pages sending information to non-Google systems. It is not proof that Google Maps terms were never accepted.

The published [Maps Platform Terms](https://cloud.google.com/maps-platform/terms), section 4.4, incorporate [controller–controller data terms](https://business.safety.google/controllerterms/). Given the observed UK billing country, the published [contracting-entity table](https://cloud.google.com/terms/google-entity) points to Google Cloud EMEA Limited unless otherwise agreed. This is a document-based inference, not a retrieved signed agreement. The controller terms identify Google LLC as the relevant Google end controller for UK controller personal data; distinguish that privacy role from the billing entity. Verify applicable account exceptions/accepted versions using account records or Google support before finalising that placeholder. Do not accept new agreements as part of inspection.

Quotas, alerts and personal MFA have not been independently verified in this pass.

## Remaining work and owner decisions

1. Configure Netlify headers, then privately deploy and test Report-Only CSP, enforcement and cross-origin framing against the latest revision. Confirm any toolbar/badge impact without adding broad inline-script permission.
2. Repeat storage/network checks in a clean browser profile with documented cookie settings, including third-party cookies allowed and blocked, initial load, autocomplete, search/photos, optional public test-coordinate geocoding, withdrawal and pending-request cancellation. Do not send personal coordinates without specific consent.
3. Obtain provider log-retention/deletion and processing/transfer facts. Review applicable UK safeguards and relevant subprocessors; a CDN IP address or UK billing country does not establish all processing locations.
4. Complete necessity/balancing for requested searches and initial Google loading, assess optional-location consent and correspondence/complaints bases, and document each relied-on storage/access exception and its conditions.
5. The owner approved the retention schedule and operating procedure on 6 October 2026; put them into operation after configuring the contact/inbox. The adopted defaults are: routine enquiries up to six months after closure, minimal complaints/rights records reviewed at twelve months, monthly deletion reviews and twice-weekly inbox checks. They do not control Google/Netlify retention.
6. Supply a monitored privacy address and owner details, confirm inbox access/coverage/MFA and any email-provider processing, complete the ICO fee checker, and replace every legal placeholder.
7. Record owner sign-off identifying the dated assessment, final notice, deployed commit and decisions actually adopted. **Sign-off pending**; the owner's report that the site works is not approval of the legal assessments.

Keep personal correspondence, complaints, raw logs and confidential provider evidence outside this public repository. This sanitised report may be public. No account setting was changed, site made public, vendor message sent, key rotated, contract accepted, PR merged or deployment made by this assessment.
