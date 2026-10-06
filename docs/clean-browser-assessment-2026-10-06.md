# Clean Firefox storage/access assessment — 6 October 2026

Status: the staged **technical comparison on private production is complete**. Provider-purpose interpretation, final public-visitor configuration and owner approval of the completed legal assessments remain outstanding. Netlify remains private; PR #21 remains draft. No credentials, cookie values, complete API URLs, raw exports or actual device coordinates are included.

## Configuration and method

- Site: https://ravenousfind.netlify.app, authenticated Netlify private production. The earlier production report identifies the merged deployment as `main@17392c5`; this test did not change or redeploy it.
- Firefox 157.0.1, owner-created **Personal** profile. Firefox Sync was signed out; no user-installed extensions were present. Mozilla's bundled browser components are separate from installed user extensions.
- Baseline was after the owner completed Netlify sign-in, before restaurant interaction. It was not a pre-login capture. Login-related site data already existed.
- Mode A: Custom tracking protection with Cookies disabled, explicitly labelled **Allow all cookies**. Mode B: Custom protection with **Block all cross-site cookies** selected. Both used separate page-load baselines in the same profile, not independently new empty profiles. No site data or login sessions were copied or cleared between modes.
- Other protections remained in place: known fingerprinters and cryptominers blocked; tracking content and suspected fingerprinters blocked in private windows. Normal HTTP caching was inspected separately; DevTools Disable Cache was temporarily enabled for fresh network requests.
- Used Firefox Storage Inspector and Network Monitor, plus console inventories of localStorage, sessionStorage, document-readable cookie names, IndexedDB database names and Cache Storage names. Recorded metadata/counts only. Network Cookies/Set-Cookies columns were checked; a Google SearchText request's Cookies pane showed **No cookies for this request**.
- Typed a public location (London) and cuisine (Pizza), selected an autocomplete suggestion by keyboard, searched and inspected photos. A temporary geolocation callback supplied public test coordinates (51.5074, -0.1278); the actual Google SDK performed reverse geocoding and biased searches. Real device location and its native permission prompt were not used.

## Staged results

In both modes, every inspected stage had zero Ravenous localStorage keys, sessionStorage keys, document-readable cookies, IndexedDB databases and Cache Storage names. Storage Inspector separately showed the HttpOnly private-access cookie below; JavaScript's empty cookie result does not mean there were no cookies.

| Stage | Cookies allowed | All cross-site cookies blocked |
| --- | --- | --- |
| Initial page load before restaurant interaction | Google SDK requests observed; inventory empty | Google SDK requests observed; inventory empty |
| Type London and choose a suggestion with keyboard | Suggestions and selection worked; inventory empty | Suggestions and selection worked; inventory empty |
| Submit Pizza search and load restaurant photos | 20 photos loaded; inventory empty | 20 photos loaded; inventory empty |
| Synthetic location with real Google reverse geocoding | London, United Kingdom; withdrawal control appeared; inventory empty | London, United Kingdom; withdrawal control appeared; inventory empty |
| Search biased by synthetic coordinates | 20 photos loaded; inventory empty | 20 photos loaded; inventory empty |
| Stop using precise location | Readable London retained; withdrawal control disappeared; inventory empty | Readable London retained; withdrawal control disappeared; inventory empty |
| Manual location edit | Manual selection exercised during the flow | Edited to Oxford; withdrawal control absent; inventory empty |
| Reload | Fresh uncached request check completed | Final reload after restoring Standard protection: results cleared, no override and inventory empty |

The staged comparison did not recreate every pending-request race. The earlier [production verification](production-verification-2026-10-06.md) records cancellation checks. Browser restoration of form text is distinct from application storage; no persisted search database or browser-storage keys were observed.

## Cookies and storage metadata

| Item | Observation | Scope/interpretation |
| --- | --- | --- |
| `nf_edge` | Domain `.ravenousfind.netlify.app`, path `/`, Session expiry, Secure and HttpOnly true. SameSite and Partition Key fields were blank in the inspector. | Netlify private-access authentication; blank fields are not evidence of a specific SameSite policy. Session expiry is not a provider-log deletion period. |
| App local/session storage, IndexedDB and Cache Storage | Empty at every inspected stage | No persistent app search storage observed. This does not cover all device access techniques or provider records. |
| `nl-hud:owner-private:v1` | Not created in this clean-profile run | The older owner-profile report observed this documented Netlify toolbar preference. We did not minimise the toolbar to generate it. |
| HTTP cache | Cached SDK/assets/photos and fresh requests observed | Browser HTTP caching is distinct from the Cache Storage API. Empty Cache Storage does not mean assets were never cached. |

Firefox's global site-data list after the allowed flow showed Netlify login/dashboard data, Google and GitHub sign-in-site cookies, and one Ravenous cookie. No separate Maps API or photo-host storage row was listed. The sign-in data predated the restaurant interactions and cannot be attributed to the app's Maps requests; the captured Google API/photo requests showed no cookie counts. This global list is not proof that all third-party access is absent.

## Network observations

Sanitised full-flow counts (including repeated searches and redirects, not counts of unique visitors):

| Host | Allowed capture | Blocked capture | Cookie/Set-Cookie observation |
| --- | --- | --- | --- |
| ravenousfind.netlify.app | 8 requests (6×200, 2×304) | 7 requests (all 200) | Single-cookie counts on application requests, consistent with private access |
| maps.googleapis.com | 15 requests (all 200) | 15 requests (all 200) | No numeric cookie or set-cookie count in captured rows |
| places.googleapis.com | 45 requests (5×200, 40×302) | 48 requests (8×200, 40×302) | No numeric cookie or set-cookie count in captured rows |
| lh3.googleusercontent.com | 40 requests (all 200) | 40 requests (all 200) | No numeric cookie or set-cookie count in captured rows |

An additional fresh allowed-mode reload produced 8 successful Maps requests without cookie counts. SDK loading and service telemetry occurred before interaction; autocomplete/search/geocoding followed the controls; photo-media requests redirected from Places to the Google image host. HTTP requests still disclose network/request information even without cookies. Captures did not establish every initiator stack, provider-side reuse or log retention.

## Purpose and exception assessment — provisional decisions

Apply the [ICO storage/access exceptions guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/) to each actual purpose, not to a provider as a whole:

- Private-access authentication is a candidate for the strictly necessary exception for the requested protected service, provided its use is limited to authentication/security and proportionate. Provider confirmation of secondary uses remains relevant. This is not a public restaurant-search account feature.
- A user-elected toolbar appearance preference requires a separate purpose/conditions review if used; this run did not create it. Private owner tooling is separate from the planned public site.
- No persistent advertising/analytics cookie or storage entry was identified in the tested Maps/Places/photo flows. This evidence alone does not establish the absence of non-cookie device access or all provider secondary purposes, and does not settle a PECR exception for the initial SDK load.
- Keep the provider enquiries and owner necessity/balancing review open, including deferring initial SDK loading and partial-text sharing. Do not add a cosmetic banner or claim that legitimate interests replaces storage/access consent. If a non-exempt purpose is identified, gate that activity before consent and support refusal/withdrawal.

## Authenticated headers and cleanup

After restoring settings, an authenticated no-store GET returned 200. X-Content-Type-Options was `nosniff`; X-Frame-Options `DENY`; Referrer-Policy `strict-origin-when-cross-origin`; Permissions-Policy `geolocation=(self), camera=(), microphone=(), payment=()`. Enforcing CSP was present, Report-Only absent, and the expected script allowlist, `object-src 'none'` and `frame-ancestors 'none'` were present. HSTS was `max-age=31536000; includeSubDomains; preload` (a preload token does not establish preload-list membership).

The private Netlify owner HUD produced a blocked inline-script message associated with its srcdoc context; the tested restaurant flows still worked. Do not broaden the application's inline-script/frame permissions merely for that tooling. Independent authenticated cross-origin framing and the real OS geolocation-permission flow remain limited as in the earlier report.

The synthetic callback was restored and its temporary global removed, then the page reloaded. Firefox protection was restored to **Standard**, Disable Cache was unchecked, Sync remained signed out, and Add-ons showed no user extensions. DevTools was closed and the private Ravenous page left open. The owner-created Personal profile and its authenticated sessions were retained; no profile or sign-in data was deleted.

Repeat relevant checks on the final visitor configuration when private login/toolbar is removed; this run does not directly establish that different configuration. Preserve the private access setting while resolving the remaining draft notice, provider evidence and owner decisions.
