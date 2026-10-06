# Privacy launch inputs and operational procedure

Current production security and functional observations are recorded in [the enforcing production report](production-verification-2026-10-06.md). The older [deployment assessment](deployed-assessment-2026-10-06.md) remains historical evidence. The owner approved the retention schedule and operating procedure on 6 October 2026. A [draft processing assessment](privacy-assessment-draft.md) now provides purpose/necessity/balancing reasoning for owner review; the completed lawful-basis, storage and transfer assessments are not yet approved.

The public notice is a draft. Do not publish it as complete until every bracketed field is resolved. No owner, hosting entity, log retention or international-transfer safeguard has been invented.

## Processing and lawful-basis assessment

Document purposes, necessity and the balancing assessment for requested text searches, debounced location autocomplete, initial Google loading and security/access logs. Legitimate interests is the proposed basis, subject to owner assessment. Optional precise location uses an informed affirmative click and browser permission; retain the notice version and an explanation of the flow as evidence of how it is obtained. Do not log coordinates to create a consent record. Assess correspondence/complaint processing separately.

Coordinates stay in memory. Stop/manual entry invalidates pending position and geocoding responses and clears Redux coordinates; it cannot recall a Google request already sent. Google results remain transient. Manual entry remains available.

## Google and host assessment

See [provider evidence and prepared enquiries](provider-evidence-2026-10-06.md) for current sources, live certification checks and the clean-browser protocol. Google LLC and Netlify, Inc. showed active UK DPF Extension coverage for non-HR data in the official register on 6 October 2026; mapping that coverage to each actual flow remains part of the transfer assessment.

The provider documents and confirmed account facts are recorded in [privacy-operations.md](privacy-operations.md). The current private `main@17392c5` deployment has enforcing headers and passed the tested flows. Exact visitor-log fields/retention, accepted account-specific agreements and applicable transfers remain pending. Dashboard visibility is not proof of deletion; obtain provider confirmation where public terms do not specify the facts.

## Storage/access assessment

The [clean Firefox technical assessment](clean-browser-assessment-2026-10-06.md) now records the staged cookies-allowed/cross-site-blocked comparison on private production. Autocomplete, search/photos, synthetic geocoding and withdrawal worked in both modes; app local/session storage, IndexedDB and Cache Storage were empty, with a separate HttpOnly private-access cookie. No cookie counts were observed on captured Google API/photo requests. This is not evidence of every non-cookie access technique or provider purpose. Complete the purpose/exception-or-consent decision and repeat relevant checks when private login/toolbar is removed; keep those final assessments as launch gates.

If non-exempt activity is found, gate the affected SDK/requests before consent, offer clear accept/refuse choices and withdrawal, stop future requests on withdrawal, and keep legal pages reachable without consent. Do not add a cosmetic banner that leaves the activity running. Repeat the inventory after any consent implementation.

ICO guidance: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/

## Privacy enquiries and complaints

The owner supplied Malcolm Spina and malpoke1@gmail.com as the public contact on 6 October 2026. The owner reported the inbox-verification checklist complete on 6 October 2026; this is owner confirmation rather than independent mailbox/settings inspection. Record receipt date, reference, concern and minimum necessary contact details in a restricted private record. Acknowledge within 30 days, investigate proportionately, give progress updates where appropriate, and communicate the outcome and ICO escalation route. Set and document a justified retention/deletion period for correspondence and complaint records. Record applicable rights requests and their deadlines; do not copy those private records into this public repository.

Current requirements: https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/06/new-data-protection-complaints-law-now-in-force/

## ICO fee assessment

Owner action required: complete https://ico.org.uk/fee-checker with the actual operator's organisation/sole-trader status, purposes and processing, record the dated result, and pay/register if required. Those facts have not been supplied, so no exemption or fee amount has been asserted. Fee exemption does not remove other data protection obligations.

## Remaining publication gates

- Complete the applicable lawful-basis and email-provider assessments. Owner identity, contact details and owner-reported inbox verification are supplied; the retention schedule and operating procedure were approved on 6 October 2026. Completed legal assessments remain pending.
- Google/host roles, logging, retention and international transfers.
- Review the completed bounded clean-browser inventory, resolve provider-purpose/exception-or-consent decisions, and check the final visitor configuration.
- ICO fee-checker result.
- Accessibility review on the eventual HTTPS deployment.

Privacy-notice source: https://ico.org.uk/for-organisations/advice-for-small-organisations/privacy-notices-and-cookies/how-to-write-a-privacy-notice-and-what-goes-in-it/

## Public documentation and private evidence

This file is a public checklist, not the completed assessment or a record of visitor information. Keep generic documentation, licence provenance and sanitised validation summaries in the public repository. Keep complaints, email correspondence, raw logs, browser exports and assessment evidence containing personal or confidential information outside the checkout in restricted private storage. Never use the public repository as a complaint register. A gitignore rule does not hide tracked files or remove Git history.

## Order of launch preparation with Netlify

1. Draft verified project/provider wording locally; leave owner details and unverified assessments marked as pending.
2. Set up the Netlify account and relevant plan/settings, enable MFA, and confirm data terms/logging. GitHub linking is optional for a manual deployment; it enables automatic builds/deployments when configured.
3. Prepare Netlify response headers and a restricted HTTPS test deployment before inviting public visitors. Configure and verify actual access restrictions: a preview URL alone does not make a deployment private.
4. Verify HTTPS/certificate behaviour and Report-Only CSP while inspecting Google and host storage/access. Distinguish Netlify login or preview-toolbar behaviour from the app itself and repeat relevant checks when those features or visibility change.
5. Complete lawful-basis, retention, transfer and complaints decisions, record private evidence, and replace remaining public placeholders with factual wording. Implement any required storage/access consent controls and retest.
6. Enforce the verified CSP and repeat functional/header/storage checks on the final hostname before public release. Fill contact details, verify the privacy inbox, and complete other launch gates.

The initial HTTPS checks support the storage assessment; final security checks follow the completed configuration. Neither these public instructions nor provider policy links establish that an assessment has passed.

## Remaining placeholder actions

| Public draft field | How to resolve it |
| --- | --- |
| Owner name/contact/privacy email (and Terms contact email) | Supplied by the owner on 6 October 2026: Malcolm Spina, malpoke1@gmail.com; inserted in both legal pages. The owner reported the inbox-verification checklist complete on 6 October 2026. Complete the email-provider assessment before public release. |
| Netlify visitor log fields/purposes and retention/deletion | Review the project’s Observability, Web Analytics, RUM and Log Drains settings; use the prepared support questions in privacy-operations.md for internal CDN/security logs not specified there. Obtain a written answer; do not invent a deletion period. |
| Owner review of lawful bases | Review privacy-assessment-draft.md, resolve necessity/balancing gaps (especially initial SDK loading), and record the dated decision privately. Procedure approval alone does not approve this assessment. |
| Account-specific Google terms | Record the applicable Maps subscription/account agreement, accepted version and any overrides from account onboarding records or Google support. Billing settings identify billing arrangements but do not prove all accepted Maps terms. Compare with the published Maps/controller terms. |
| Public-visitor storage/access | Review the completed clean-profile staged inventory and complete the purpose/exception-or-consent decision. Private SSO cookies and toolbar preferences are separate; repeat relevant checks when visibility/features change. |
| Account-specific transfers/safeguards | Map actual recipients, roles and destinations; confirm current UK adequacy/certification coverage or contractual provisions, onward recipients and any required risk assessment. Ask providers for missing facts. Include the chosen email provider. |
| Monitored contact and inbox coverage | Resolved by the owner's confirmation of completed inbox verification on 6 October 2026; continue the adopted checking/handling procedure. |

The owner supplied a Netlify support reply referring to its Trust Center. The assistant has sent no provider messages or accepted account agreements; the focused follow-up is prepared but unsent. Header configuration and application flows are now verified for the named commit; unresolved privacy fields still prevent public release.

## Owner input recorded — 6 October 2026

The owner initially confirmed that no written Netlify log-retention answer or account-specific Google agreement had been obtained. The later Netlify reply provides a Trust Center route, not the requested log-retention answer. Inbox verification was subsequently reported complete. Netlify log-retention and Google agreement fields remain pending. Continue this work in draft PR #21; adding confirmed contact details does not complete the provider/storage assessments or authorise public release.
