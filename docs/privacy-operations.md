# Ravenous privacy operations — adopted by the sole owner

Update: authenticated Firefox observations and inspected Netlify/Google settings are recorded in [the 6 October deployment assessment](deployed-assessment-2026-10-06.md). The observations below distinguish the completed limited checks from outstanding assessments; legal assessments remain pending.

Prepared 6 October 2026. **The sole owner approved the retention schedule and operating procedure on 6 October 2026. The outstanding privacy/storage, provider and launch assessments remain pending.** This public document contains the adopted procedure and sanitised verification facts. It is not a complaint register, a completed storage inventory, or evidence that the public notice is ready for launch.

## Scope

Ravenous is a personal portfolio project built and operated by one developer. There are no visitor accounts, bookings, payments or a saved-search database. Google requests and hosting logs still need assessment. Recruiting use should not be assumed to fall within the purely personal/household exclusion. Keep the public notice clear and proportionate; keep detailed assessment work outside it.

## Confirmed Netlify observations

The earlier [account/deployment assessment](deployed-assessment-2026-10-06.md) established the Free plan, one Owner workspace member, disabled Forms/Web Analytics/Real User Monitoring, unconfigured Log Drains and no deployed functions. Netlify's “team” terminology does not imply multiple developers or a paid plan.

The later [production verification](production-verification-2026-10-06.md) confirms the private production deployment now serves merged `main@17392c5`, with one processed header rule and the enforcing CSP plus all four companion headers on authenticated application responses. Team-login protection applies to production and previews. HTTP redirects to HTTPS, and HSTS is present. Real Google geocoding with synthetic public coordinates, location withdrawal and pending-response cancellation passed. The real device-permission interaction and independent authenticated cross-origin framing check remain limited as documented.

These checks do not establish exact visitor-log retention, accepted agreement versions, complete third-party storage behaviour or personal account MFA. The existing Firefox profile had a Netlify-namespaced owner-toolbar preference; keep this separate from public-visitor behaviour. A configured region for an unused feature is not evidence of all processing locations.

## Provider documents reviewed

For the Netlify self-serve hosting account, distinguish the subscription agreement from the terms for visiting Netlify's own website:

- [Self-Serve Subscription Agreement](https://www.netlify.com/pdf/self-serve-subscription-agreement.pdf/)
- [Privacy Statement](https://www.netlify.com/privacy/)
- [Data Processing Agreement, updated 9 June 2026](https://www.netlify.com/pdf/netlify-dpa.pdf)
- [Netlify GDPR information](https://www.netlify.com/gdpr-ccpa/)

The DPA describes processor obligations where Netlify processes customer personal data on the customer's behalf. It provides for the UK Extension to the EU–US Data Privacy Framework and fallback contractual provisions. Confirm current certification, relevant processing/subprocessors and scope before completing the transfer assessment. Its public deletion provisions do not specify an exact visitor/CDN/security-log retention period.

For Google:

- [Maps Platform Terms](https://cloud.google.com/maps-platform/terms)
- [Controller–Controller Data Protection Terms](https://business.safety.google/controllerterms/)
- [Contracting entities](https://cloud.google.com/terms/google-entity)
- [Privacy Policy](https://policies.google.com/privacy)

The published Maps terms incorporate controller–controller terms. Those terms identify Google LLC as the Google end controller for UK controller personal data. The published contracting-entity table points to Google Cloud EMEA Limited for UK Maps billing unless otherwise agreed. The authenticated inspection showed a UK billing profile and website/API restrictions, as recorded in the dated report. The billing-entity conclusion remains a published-document inference: applicable account exceptions and accepted agreement versions have not been verified, so the account-specific placeholder remains pending.

## Adopted retention schedule

These are adopted owner-controlled defaults, not statutory periods or confirmed provider settings. Permit earlier deletion where information is no longer needed. The owner supplied Malcolm Spina and malpoke1@gmail.com as the public contact on 6 October 2026 and reported creating the Gmail inbox. Delivery, monitoring, MFA, absence coverage and email-provider arrangements still need verification before launch; approval of this procedure does not prove they are already operating.

| Information | Adopted period or criterion | Reason and action |
| --- | --- | --- |
| Searches, restaurant results and coordinates | Current-page memory only; coordinates also cleared by Stop/manual editing | Provide the requested interaction without saved histories. Google processing and browser caches are separate. Do not create a backend history. |
| Routine project/privacy enquiries | Up to 6 months after closure | Allow related follow-up, then delete the correspondence and unnecessary attachments. Review sooner if it no longer serves that purpose. |
| Privacy complaints and rights-request handling records | Review for deletion 12 months after closure; retain only necessary material | A limited record supports follow-up and demonstrates how the request was handled. Delete at review unless a specific continuing need is recorded; do not keep every attachment automatically. |
| Material subject to an active complaint, ICO investigation or legal claim | Until the specific need ends, with a monthly review | Record why retention is necessary and the next review date; do not use an indefinite “just in case” exception. |
| Netlify visitor/CDN/security logs | **Pending provider confirmation** | Obtain fields, purposes, actual retention/deletion and available controls. Dashboard history is not proof of deletion. Do not add an extra log-export service for this project without a need and assessment. |
| Google-controlled retention | Google's applicable policies/terms; account-specific assessment pending | Do not promise that Google deletes data when Ravenous clears page memory. |
| Test evidence | Keep a sanitised domain/purpose inventory and dated findings; avoid raw exports | Do not retain API keys, authentication values, personal coordinates or fetched Google results/photos as evidence. Recheck after changes and annually while the site operates. |

Also check the selected privacy-email provider's deletion, backups, recipient roles and transfers. Restrict access to records and secure that account with MFA. Deleting a live email does not establish deletion from all provider backups; describe actual arrangements accurately.

ICO reference: [Storage limitation](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/).

## Adopted operating procedure

1. Check the privacy inbox and spam at least twice weekly, for example Monday and Thursday. Arrange coverage or another reliable checking method during absences.
2. Record a complaint or rights request in a restricted private file: receipt date, a reference, minimum necessary contact details, issue, applicable deadline, actions and outcome. Do not commit the record or correspondence to GitHub.
3. Acknowledge a complaint promptly; the required acknowledgement limit is 30 days. Confirm receipt and that it will be investigated. An automated receipt is not an investigation or outcome.
4. Classify rights requests separately, calculate the applicable deadline and use current ICO guidance. Do not confuse the complaint acknowledgement limit with rights-request response deadlines.
5. Investigate what Ravenous actually processes. If the concern involves Netlify or Google data, use the relevant provider support/data-rights process as appropriate. Avoid asking for identity documents unless proportionately needed.
6. Provide progress updates when needed and a clear outcome, including what was checked, any action, and the ICO escalation route. Retain the minimum necessary evidence under the adopted schedule.
7. Review closed records monthly. Delete expired/unnecessary records, including copies and exports within the owner's control; consider provider backup arrangements. Record specific reasons and review dates for any exception.
8. Reassess the notice and data flows after adding analytics, forms, accounts, new providers or features, or changing Google loading/consent behaviour. Review this procedure annually while Ravenous remains available.

References: [ICO complaint handling](https://ico.org.uk/for-organisations/how-to-deal-with-data-protection-complaints/what-do-we-do-when-we-receive-a-complaint/), [privacy notices](https://ico.org.uk/for-organisations/advice-for-small-organisations/privacy-notices-and-cookies/how-to-write-a-privacy-notice-and-what-goes-in-it/).

## Outstanding evidence and concise public wording

- Complete the Google account-agreement review, including accepted versions or exceptions, and verify quotas, alerts and personal MFA. UK billing country and production-key restrictions were inspected in the limited pass.
- Obtain Netlify's actual visitor-log fields, purposes, retention/deletion and relevant transfer arrangements. Draft a support request; do not send it without the owner's instruction.
- Complete the browser inventory in a clean profile, comparing third-party cookies allowed/blocked and testing optional geocoding, withdrawal and pending-request cancellation. Initial loading, autocomplete and search/photos were inspected in the limited authenticated Firefox pass. Local source inspection alone cannot establish third-party storage/access.
- Netlify documents that pre-launch-toolbar hide/minimise preferences use local storage, and that the toolbar disappears when the project becomes public. Record test-only toolbar/login behaviour separately and repeat relevant checks on the final visitor configuration. Audits use Agent Runners and consume credits; their findings do not establish lawful bases, exact retention or completed compliance.
- Review and complete the [draft processing assessment](privacy-assessment-draft.md), including Google's initial page-load requests and whether loading can be deferred. Confirm optional-location consent and separate bases for correspondence and statutory complaints/rights handling.
- Enforcing headers and the tested private production flows now pass for `17392c5`; repeat relevant checks after configuration or visibility changes, and complete the framing/device-permission limitations recorded in the production report.
- Owner/contact details are supplied. Verify the Gmail inbox, put the adopted procedure into operation, and complete the ICO fee assessment with the actual owner facts.

[Netlify pre-launch-toolbar documentation](https://docs.netlify.com/manage/projects/pre-launch-toolbar/), [ICO storage/access exceptions](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/).

After each issue is resolved, replace the notice's short pending label with visitor-facing facts. The pending labels abbreviate the original checklist instructions; they do not remove the work or represent a passing assessment. Keep the detailed processing/necessity/balancing analysis and any personal/confidential evidence in restricted private storage.

Procedure adoption is recorded above. Final owner sign-off should identify the dated assessment and notice versions and the verified settings. Sign-off of the completed assessments remains pending until the outstanding evidence has been reviewed. Do not put an approval statement in the public notice before that review.

## Draft questions for Netlify — not sent

For the static Ravenous site on the Free plan, with Forms disabled and no deployed functions, please confirm:

1. What personal-data fields are held in visitor/CDN/security logs, and for what purposes?
2. What are the actual retention and deletion periods, including relevant internal copies/backups, and which controls are available to the site owner?
3. Which processing falls under the DPA and which Netlify performs as controller; what processing locations and UK transfer arrangements apply to these logs?
4. What browser storage/access is introduced for ordinary public visitors, separately from private-project login, the pre-launch toolbar and any public-site badge?

Do not include API keys, authentication cookies or personal visitor data in a support request. The owner must instruct sending; this document is only a prepared draft.
