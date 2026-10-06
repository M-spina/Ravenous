# Provider evidence and enquiries — 6 October 2026

Status: public-document research and limited authenticated account inspection completed; enquiries prepared, **not sent**. Clean-profile storage testing and final owner assessment approval remain pending. Keep PR #21 draft and Netlify private. This document contains no credentials, raw browser exports or visitor records.

## What is established

| Evidence | Finding | Limit |
| --- | --- | --- |
| [Netlify Observability documentation](https://docs.netlify.com/manage/monitoring/observability/overview/) | Free-plan dashboard history is available for the past 24 hours. | This is a viewing window, not a confirmed internal log-deletion deadline. |
| [Netlify Privacy Statement](https://www.netlify.com/privacy/), updated 10 April 2026 | Retention follows purposes/legal needs; specific retention questions can be directed to privacy@netlify.com. | Its descriptions of Netlify's own website/account activity do not establish every Ravenous visitor-log field. |
| [Netlify DPA](https://www.netlify.com/pdf/netlify-dpa.pdf), updated 9 June 2026 | Provides on-behalf processing terms and conditional UK transfer provisions. | Identify the role and mechanism for each relevant processing activity; exact visitor-log TTL is not specified. |
| [Netlify Trust Center](https://www.netlify.com/trust-center/) and subprocessors list, read in Firefox | The general list includes US infrastructure and logging providers, including AWS, Axiom, Humio and Datadog. | A list entry does not prove that provider processes this static site. Ask which apply; disabled Forms/Analytics do not disable all infrastructure logs. |
| [Google Maps security/compliance documentation](https://developers.google.com/maps/security/compliance/security-compliance) | Maps logs requests and status; typical fields include service identifiers, IP, request parameters, time and browser headers. Retention varies with business need. | Clearing Ravenous's state does not delete these records. Exact service-specific retention remains unspecified. |
| Google Maps Platform Support, authenticated Firefox inspection | The selected project has Standard Support and offers Create a case; no existing cases were displayed. | No account-specific agreement or exception was obtained there. No case was submitted. |
| [Official DPF participant register](https://www.dataprivacyframework.gov/list), searched in Firefox | Google LLC and Netlify, Inc. each showed Active for the UK Extension and Non-HR Data on 6 October 2026. | Certification alone does not establish scope for every transfer or onward recipient. Recheck when adopting the assessment. Google's older certification deep link opened the registry homepage; current List searches were used instead. |

## Confirming applicable terms and transfers

A normal self-service account may use the published standard agreement; a separately negotiated contract is not automatically needed. Check onboarding/acceptance records, any reseller or special agreement, billing country and service use. Obtain support confirmation if those records do not settle applicability. Do not accept new terms merely to obtain evidence.

For the inspected UK billing profile, the [published entity table](https://cloud.google.com/terms/google-entity) points to Google Cloud EMEA Limited as the Maps contracting entity unless otherwise agreed. The [Maps Platform terms](https://cloud.google.com/maps-platform/terms) incorporate the [controller–controller terms](https://business.safety.google/controllerterms/), which identify Google LLC as UK end controller. These are distinct roles. This remains a standard-terms inference until account exceptions are resolved; Maps processing should not be described as wholly processor processing under a generic Cloud DPA.

Create a small private transfer record for each actual flow: Maps SDK/search/coordinates/photos, Netlify delivery/security logs, and Gmail correspondence. Record recipient/entity, role, data, destinations, applicable agreement and transfer mechanism, onward processing, evidence date and review date. Use UK adequacy only where it covers the recipient/data; where contractual safeguards are required, establish the UK provisions and assess any required transfer risk/data protection test. Do not infer data residency from a browser endpoint or a setting for an unused feature.

[Google's transfer information](https://policies.google.com/privacy/frameworks) describes global processing, covered DPF transfers and contractual safeguards where required, with a contact route for copies. Netlify's DPA also describes conditional DPF and contractual provisions. Preserve the applicable documents privately; publish only the resulting clear notice wording.

## Ready-to-send Netlify enquiry

Route: privacy@netlify.com, the address in the Privacy Statement. Send from the account owner or include enough account context for support to identify the project. Country: United Kingdom. No raw cookies, API keys, search results or personal coordinates are needed.

Subject: Visitor logging, retention and UK transfers — Free static site ravenousfind

Hello,

I am Malcolm Spina, the sole operator of a UK personal portfolio site, https://ravenousfind.netlify.app, hosted on Netlify's Free plan. It is currently private while I complete a proportionate privacy assessment. It is a static React/Vite site. Forms, Web Analytics and Real User Monitoring were disabled in the inspected settings; no Functions or Edge Functions are deployed and Log Drains are not configured.

Please confirm, or point me to the applicable service documents:

1. Which visitor/CDN/access/security/Observability records are processed for this configuration? What fields and purposes apply, and which are processed on my behalf under the DPA versus Netlify's own controller purposes?
2. What retention/deletion periods or criteria apply to the underlying records, including relevant backups or security exceptions? I understand the Free-plan 24-hour Observability viewing window does not necessarily establish deletion. What minimisation/deletion controls are available to me?
3. Which countries and subprocessors apply to those records, and which UK transfer mechanism covers each relevant recipient? Please provide the applicable DPA/UK provisions and how I can obtain safeguard details.
4. What storage/access is introduced for ordinary public visitors without optional analytics, separately from private Netlify login and the owner pre-launch toolbar? Please identify any identifiers, purposes and expiry periods.
5. Does the standard Self-Serve Subscription Agreement and current DPA apply to this Free account, or is an additional account-specific step required for the processing described above?

Please distinguish this hosted site's visitors from visits to Netlify's own marketing site/dashboard. A written response will help me accurately describe the processing in my privacy notice.

Thank you,
Malcolm Spina

## Ready-to-send Google enquiry

Privacy route: [Google Maps Platform Data Privacy Inquiry form](https://support.google.com/cloud/contact/maps_api_privacy), linked by the [official support documentation](https://developers.google.com/maps/documentation/geocoding/support). Account/terms applicability can also be raised through Google Cloud Console → Google Maps Platform → Support → Create a case, selecting the existing project. Use the normal account; no paid support upgrade is needed merely to inspect the currently available route. Submit only with owner instruction. The privacy form notes that account/system information accompanies the submission.

Contact email: malpoke1@gmail.com (verify delivery before submission).

Subject: UK self-service Maps privacy/terms confirmation for a static portfolio app

Hello,

I am the sole UK operator of Ravenous, a free personal portfolio restaurant-discovery app at https://ravenousfind.netlify.app. The selected Google Cloud billing profile is UK. The app uses Maps JavaScript API, Places features (location autocomplete, text search, restaurant details/photos and attribution) and browser-side reverse geocoding for optional location. It has no saved-search database, user accounts, advertising or analytics feature. Maps loads on the search page before interaction; legal pages do not load Maps.

Please confirm or identify the applicable documentation for:

1. The standard Maps agreement and incorporated data terms applicable to this UK self-service configuration, the contracting entity and Google's controller/processor roles for these services. If account-specific exceptions cannot be checked through this form, which account-support route should I use?
2. Request-log fields/purposes and retention/deletion periods or criteria for the SDK, autocomplete, text search, photos and geocoding, including optional coordinates and requests before interaction.
3. Any browser storage/access or identifiers used by these services, their purposes/expiry and whether they are separable from the requested functionality. Please distinguish standard operation from signed-in Google services or optional features.
4. Relevant processing destinations/recipients and safeguards for UK data, including the scope of Google LLC's UK DPF Extension coverage, onward transfers and any applicable UK contractual provisions. How can I obtain the relevant safeguard details or copies?

Please do not treat removal of page-memory coordinates as deletion of Google-held records. I want to describe the actual services and safeguards accurately in a concise privacy notice.

Thank you,
Malcolm Spina

## How to use the replies

Keep original correspondence and account identifiers in restricted private storage, outside this public repository. Record a sanitised finding, source/date, relevant configuration and any remaining qualification here. If a provider uses justified retention criteria instead of a fixed period, record those criteria accurately rather than inventing a deadline. Update the notice and owner assessment only after matching the reply to the actual flows. These enquiries do not ask providers to approve the operator's lawful-basis decision.

## Clean-browser assessment to execute

The existing-profile observations remain limited evidence. The owner authorised a separate-profile/third-party-storage comparison. A disposable profile named Ravenous-storage-test-20261006 was created through Firefox UI. Firefox initially selected it as the default; the original default-release was immediately restored and verified. The launch button did not expose a new test window through Computer Use, so the owner was asked to launch it and complete normal Netlify sign-in. No third-party storage setting has been changed and no clean-profile result is claimed yet.

1. Use a fresh, unsynchronised Firefox profile with no extensions. Record the browser version and privacy settings. Authenticate normally for Netlify private access; never copy credentials/cookies from the existing profile.
2. Record only cookie names/domains/flags/expiry and storage names/counts, with no values, before interaction and after autocomplete, search/photos, optional synthetic geocoding, withdrawal/manual edit and reload. Inspect Cookies (including HttpOnly/third-party), local/session storage, IndexedDB and Cache Storage, and distinguish normal HTTP caching.
3. Record request origins, initiators and whether Cookie/Set-Cookie headers occur without exporting their values, complete URLs or bodies. Separate private authentication/toolbar requests from Maps and the application.
4. Compare third-party storage allowed and blocked only in the disposable profile after owner permission. Use separate clean baselines; note Firefox partitioning and blocking so an absence is not falsely reported as provider behaviour.
5. Compare observed purposes with the current ICO exceptions guidance; document an exception and its conditions per purpose, or gate non-exempt activity before consent. No banner conclusion follows just from finding no cookies.
6. Restore temporary probes/settings; close the disposable profile. Repeat relevant public-visitor checks when private login/toolbar is removed, before accepting final visitor configuration. Private testing cannot directly prove the public configuration.

Technical results, provider interpretation and owner approval are separate records. This protocol is prepared; it is **not a completed clean-browser inventory**.
