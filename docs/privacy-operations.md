# Ravenous privacy operations — adopted by the sole owner

Update: authenticated Firefox observations and inspected Netlify/Google settings are recorded in [the 6 October deployment assessment](deployed-assessment-2026-10-06.md). The observations below distinguish the completed limited checks from outstanding assessments; legal assessments remain pending.

Prepared 6 October 2026. **The sole owner approved the retention schedule and operating procedure on 6 October 2026. The outstanding privacy/storage, provider and launch assessments remain pending.** This public document contains the adopted procedure and sanitised verification facts. It is not a complaint register or evidence that the public notice is ready for launch. The bounded clean-profile technical inventory is linked below; legal interpretation and final visitor configuration remain outstanding.

## Scope

Ravenous is a personal portfolio project built and operated by one developer. There are no visitor accounts, bookings, payments or a saved-search database. Google requests and hosting logs still need assessment. Recruiting use should not be assumed to fall within the purely personal/household exclusion. Keep the public notice clear and proportionate; keep detailed assessment work outside it.

## Confirmed Netlify observations

The earlier [account/deployment assessment](deployed-assessment-2026-10-06.md) established the Free plan, one Owner workspace member, disabled Forms/Web Analytics/Real User Monitoring, unconfigured Log Drains and no deployed functions. Netlify's “team” terminology does not imply multiple developers or a paid plan.

The later [production verification](production-verification-2026-10-06.md) confirms the private production deployment now serves merged `main@17392c5`, with one processed header rule and the enforcing CSP plus all four companion headers on authenticated application responses. Team-login protection applies to production and previews. HTTP redirects to HTTPS, and HSTS is present. Real Google geocoding with synthetic public coordinates, location withdrawal and pending-response cancellation passed. The real device-permission interaction and independent authenticated cross-origin framing check remain limited as documented.

These checks do not establish exact visitor-log retention, accepted agreement versions, complete third-party storage behaviour or personal account MFA. The existing Firefox profile had a Netlify-namespaced owner-toolbar preference; keep this separate from public-visitor behaviour. A configured region for an unused feature is not evidence of all processing locations.

## Additional provider evidence

The [6 October provider evidence and ready-to-send enquiries](provider-evidence-2026-10-06.md) records the Free-plan Observability viewing window, Google request-log documentation, live UK DPF certification checks and exact support routes. The owner supplied a Netlify support reply directing them to the Trust Center; a focused follow-up is prepared. No messages were sent by the assistant. The [clean-profile technical comparison](clean-browser-assessment-2026-10-06.md) is complete: both cookie modes passed, with no persistent app storage or captured Google request cookies. The private-access cookie and earlier toolbar preference remain separate from the public configuration. Provider interpretation and final owner approval are pending.

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

These are adopted owner-controlled defaults, not statutory periods or confirmed provider settings. Permit earlier deletion where information is no longer needed. The owner supplied Malcolm Spina and malpoke1@gmail.com as the public contact on 6 October 2026 and reported creating the Gmail inbox. The owner reported the inbox-verification checklist complete on 6 October 2026, covering the delivery and operating checks described below. This is owner confirmation, not independent access to Gmail or its security settings. Email-provider roles/retention/transfers and final legal assessment remain outstanding.

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

## Inbox verification before launch

This is a delivery and operating check, not an identity-verification service. The owner should:

1. From another email account, send a harmless message to malpoke1@gmail.com with a unique subject such as Ravenous privacy inbox test plus the date.
2. Sign into that inbox and confirm receipt; check Spam if it is missing. Do not assume a sent message or absence of a bounce proves delivery.
3. Reply from malpoke1@gmail.com and verify the reply reaches the original sender. Check that the sender/reply address is correct.
4. Click the privacy notice's email link and confirm the compose window targets malpoke1@gmail.com. Sending through that link is optional.
5. Confirm account recovery and MFA are configured, only authorised access exists, and twice-weekly inbox/spam checks and a reliable absence-checking arrangement are in operation.
6. Keep a minimal private note of date, inbound/outbound delivery outcome, checking schedule and account-security confirmation. Do not store passwords, recovery codes or message contents in this repository. Delete disposable test messages when no longer useful.

Owner confirmation: on 6 October 2026 Malcolm Spina reported inbox verification complete. The inbox-operation placeholder is resolved on that basis; no private test messages or account-security evidence were requested or committed. This does not test complaint investigation itself or complete the Gmail provider/transfer assessment.

## How the sole owner completes assessment approval

Approval is a dated operator decision about a specific completed assessment and notice version. It is not a request for Google or the ICO to approve Ravenous, and it does not turn missing evidence into a passing result. A proportionate written record is enough; no particular signature technology is prescribed by this project.

1. Review privacy-assessment-draft.md and the technical/provider evidence. For each activity, record the applicable basis and reasons; for proposed legitimate interests address purpose, necessity/less intrusive alternatives and balancing/safeguards. In particular decide whether initial SDK loading should be deferred and whether automatic partial-location suggestions remain justified.
2. Resolve relevant provider facts from applicable documents, account records and replies where needed: purposes/roles, retention criteria, destinations and safeguards. Review Gmail correspondence as well as Maps and hosting. Record any limits accurately; a fixed deletion period or custom agreement is not automatically necessary.
3. Confirm optional-location choice/withdrawal and any storage/access exception or required consent; complete the final configuration and documented test gaps. Complete inbox operation and the fee-checker decision, and make the visitor notice accurately describe the resulting arrangements.
4. Record the owner, date, assessment version/commit, notice version, adopted decisions and evidence, outstanding conditions (if any), and next review date in a restricted private file. A conditional approval is not final launch approval. Keep other functional/accessibility/security launch checks separate.

Suggested final record, to use only when the identified work is complete:

> Malcolm Spina, [date]: I reviewed assessment [version/commit] and privacy notice [version]. I adopt the recorded processing bases, purpose/exception decisions, safeguards, retention and handling procedure, having resolved the identified evidence gaps. Inbox operation was verified on [date]. Next review: [date], or earlier if processing/settings change.

The owner can communicate these confirmations in the chat so the draft documentation and notice can be updated. No approval is recorded merely by providing contact details or approving the earlier operating procedure.

## Outstanding evidence and concise public wording

- Complete the Google account-agreement review, including accepted versions or exceptions, and verify quotas, alerts and personal MFA. UK billing country and production-key restrictions were inspected in the limited pass.
- Obtain Netlify's actual visitor-log fields, purposes, retention/deletion and relevant transfer arrangements. Draft a support request; do not send it without the owner's instruction.
- Review the completed clean-profile cookie-mode comparison and earlier cancellation tests, then resolve provider purposes/any required exception or consent. Repeat relevant checks on the final visitor configuration; real OS geolocation permission remains to be tested. Local source inspection alone cannot establish third-party storage/access.
- Netlify documents that pre-launch-toolbar hide/minimise preferences use local storage, and that the toolbar disappears when the project becomes public. Record test-only toolbar/login behaviour separately and repeat relevant checks on the final visitor configuration. Audits use Agent Runners and consume credits; their findings do not establish lawful bases, exact retention or completed compliance.
- Review and complete the [draft processing assessment](privacy-assessment-draft.md), including Google's initial page-load requests and whether loading can be deferred. Confirm optional-location consent and separate bases for correspondence and statutory complaints/rights handling.
- Enforcing headers and the tested private production flows now pass for `17392c5`; repeat relevant checks after configuration or visibility changes, and complete the framing/device-permission limitations recorded in the production report.
- Owner/contact details and owner-reported inbox verification are recorded. Continue the adopted procedure and complete the ICO fee assessment with the actual owner facts.

[Netlify pre-launch-toolbar documentation](https://docs.netlify.com/manage/projects/pre-launch-toolbar/), [ICO storage/access exceptions](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/).

After each issue is resolved, replace the notice's short pending label with visitor-facing facts. The pending labels abbreviate the original checklist instructions; they do not remove the work or represent a passing assessment. Keep the detailed processing/necessity/balancing analysis and any personal/confidential evidence in restricted private storage.

Procedure adoption is recorded above. Final owner sign-off should identify the dated assessment and notice versions and the verified settings. Sign-off of the completed assessments remains pending until the outstanding evidence has been reviewed. Do not put an approval statement in the public notice before that review.

## Initial Netlify questions — historical prepared text

For the static Ravenous site on the Free plan, with Forms disabled and no deployed functions, please confirm:

1. What personal-data fields are held in visitor/CDN/security logs, and for what purposes?
2. What are the actual retention and deletion periods, including relevant internal copies/backups, and which controls are available to the site owner?
3. Which processing falls under the DPA and which Netlify performs as controller; what processing locations and UK transfer arrangements apply to these logs?
4. What browser storage/access is introduced for ordinary public visitors, separately from private-project login, the pre-launch toolbar and any public-site badge?

Do not include API keys, authentication cookies or personal visitor data in a support request. The owner has since supplied a Netlify reply. Use the focused follow-up in provider-evidence-2026-10-06.md for unresolved questions; the assistant has not sent it.
