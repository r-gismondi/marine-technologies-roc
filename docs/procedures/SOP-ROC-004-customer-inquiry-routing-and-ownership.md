# Standard Operating Procedure (SOP)-ROC-004 — Customer Inquiry Routing and Ownership

| Field | Value |
|-------|-------|
| Version | 0.1 |
| Owner | ROC Supervisor |
| Last reviewed | 2026-05-07 |
| Status | Draft |

## Purpose

Define how ROC receives, records, owns, routes, and closes customer or internal inquiries so the organization provides one coherent front door without creating conflicting answers, informal commitments, or undocumented handoffs.

This procedure supports customer-facing consistency while preserving Product / Engineering, Commercial, Legal, and General Manager authority for decisions outside ROC scope. Information Technology (IT) work is handled as a ROC stream under the ROC Supervisor.

## Scope

Use this procedure for inquiries received through ROC channels, including:

- Customer operational support questions.
- Internal requests for routing, status, triage, or ownership.
- Monitoring, remote operations support, or data/shore-pipeline questions that do not yet meet incident criteria.
- Requests that may require Product / Engineering, ROC Information Technology (IT) stream, Commercial, Legal, or General Manager input before a response.
- Recurring questions that should be added to approved Frequently Asked Questions (FAQ), runbooks, or Standard Operating Procedures.

If the inquiry involves active safety risk, outage, material service degradation, or urgent ambiguity, follow [SOP-ROC-001](SOP-ROC-001-incident-management-and-escalation.md). If it involves remote action or assisted operations authorization, follow [SOP-ROC-003](SOP-ROC-003-remote-intervention-assisted-operations-authorization.md). If remote resolution is exhausted or not permitted and the next step requires customer Maintenance or Marine Technologies Engineering onsite or project execution (including vessel visit, Factory Acceptance Testing (FAT), or commissioning), follow [SOP-ROC-007](SOP-ROC-007-engineering-and-maintenance-handoff.md).

Do not record customer names, vessel identifiers, credentials, or detailed operational narratives in this documentation repository. Use official ticket identifiers, Configuration Management Database (CMDB) identifiers, approved customer records, or controlled systems instead.

## Roles and responsibilities

| Role | Responsibility |
|------|----------------|
| Agent | Opens or updates the official record, confirms inquiry type and ownership, provides approved responses within scope, and escalates ambiguity or commitments outside authority. |
| Senior Agent / Lead (if assigned) | Supports triage for complex or recurring inquiries, validates response quality, coordinates cross-stream handoffs, and identifies runbook or FAQ gaps. |
| ROC Supervisor | Owns routing standards, resolves ownership conflicts, approves response deviations within policy, and escalates to the General Manager or specialist stakeholders when needed. |
| Product / Engineering | Owns product behavior, technical interpretation, product limitations, and safety-critical response content. |
| ROC Information Technology (IT) stream / platform owner | Owns access, tooling, infrastructure, and platform support responses under ROC Supervisor direction. |
| Commercial / Legal | Owns contractual interpretation, customer commitments, claims, legal guidance, and externally binding statements. |

## Inquiry categories

| Category | Examples | Default owner |
|----------|----------|---------------|
| Routine support | Status request, basic triage, routing question, known procedure question. | ROC Agent |
| Monitoring / remote operations support | Alarm context, remote support status, assisted operations question without immediate risk. | ROC Agent with stream owner or Senior Agent support |
| Data / shore pipeline | Ingest status, retention question, export/access routing. | ROC Agent with data/shore stream owner |
| Access / tooling | Account, remote-service access, tooling availability, platform issue. | ROC Information Technology (IT) stream with ROC tracking |
| Product / technical authority | Product behavior, safety boundary, technical diagnosis, operating envelope. | Product / Engineering |
| Engineering / onsite handoff | Remote path exhausted or not permitted; vessel visit, customer Maintenance execution, Factory Acceptance Testing (FAT), commissioning, or Engineering-led project follow-up required. | ROC coordinates; receiving owner is **customer Maintenance** or **Marine Technologies Engineering** per [SOP-ROC-007](SOP-ROC-007-engineering-and-maintenance-handoff.md) |
| Commercial / Legal | Contract interpretation, customer promise, claim, liability, legal wording. | Commercial / Legal |
| Potential incident | Safety risk, outage, material degradation, urgent ambiguity. | ROC Supervisor via [SOP-ROC-001](SOP-ROC-001-incident-management-and-escalation.md) |

## Procedure

1. **Capture the inquiry in the official system.** Open or update the company-approved ticket or queue. Record inquiry source, summary, current owner, requested outcome, related ticket or CMDB identifiers, and target response expectation if known.
2. **Check for urgency.** If the inquiry includes safety risk, active outage, material service degradation, regulatory exposure, or urgent ambiguity, stop routine routing and follow [SOP-ROC-001](SOP-ROC-001-incident-management-and-escalation.md).
3. **Classify the inquiry.** Use the inquiry categories above to identify the likely owner and whether ROC can respond directly.
4. **Confirm authority to answer.** Agents may answer only with approved facts, published runbooks, approved FAQ content, or Supervisor-approved wording. Do not interpret contracts, promise timelines, diagnose product behavior beyond approved guidance, or authorize remote action without the accountable stakeholder.
5. **Assign ownership.** Keep one clear owner in the official record. If multiple streams are involved, assign a ROC owner for coordination and list contributor roles separately.
6. **Route with context.** When routing to another role, include the question, customer/internal need, impact, known facts, deadline or requested timing, and what decision is needed. Do not paste sensitive details into uncontrolled channels.
7. **Track response and handoff.** ROC remains responsible for customer-experience continuity until the inquiry is answered, closed, or explicitly transferred to another accountable owner.
8. **Respond with approved language.** Keep responses factual, concise, and within authority. If approval is pending, say that ROC is checking with the appropriate owner rather than guessing.
9. **Close and improve.** Close only when the answer, owner transfer, or next step is documented. If the inquiry is recurring or unclear, create a follow-up to update FAQ, runbook, training, or a Standard Operating Procedure.

## Escalation

Escalate to the ROC Supervisor when:

- Ownership is unclear or disputed.
- The inquiry may miss a Service Level Agreement (SLA), committed response time, or customer expectation.
- The response would create a new commitment, exception, or policy interpretation.
- The inquiry crosses Product / Engineering, ROC Information Technology (IT) stream, Commercial, Legal, or General Manager boundaries.
- The inquiry repeats often enough to suggest a documentation or process gap.

Escalate to Product / Engineering for product behavior, technical diagnosis, safety-critical boundaries, or operating-envelope questions.

Route access, tooling, infrastructure, and remote-service platform issues to the ROC Information Technology (IT) stream under the ROC Supervisor.

Escalate to Commercial / Legal for contract interpretation, commitments, claims, legal language, or externally binding statements.

Use [SOP-ROC-002](SOP-ROC-002-office-hours-handoff-and-on-call-continuity.md) for carryover, planned absence, after-hours, holiday, or weekend continuity.

Use [SOP-ROC-007](SOP-ROC-007-engineering-and-maintenance-handoff.md) when the inquiry becomes an **onsite or Engineering-led execution** handoff (customer Maintenance or Marine Technologies Engineering), including vessel attendance, Factory Acceptance Testing (FAT), or commissioning.

## Required record

Every inquiry record must include, at minimum:

- Official ticket identifier.
- Inquiry category.
- Current owner.
- Requested outcome or question.
- Routing decision and reason.
- Response status, next action, and expected timing.
- Final answer, transfer, or closure rationale.

## References

- [Standard Operating Procedures index](README.md)
- [SOP-ROC-001 — Incident Management and Escalation](SOP-ROC-001-incident-management-and-escalation.md)
- [SOP-ROC-002 — Office-Hours Handoff and On-Call Continuity](SOP-ROC-002-office-hours-handoff-and-on-call-continuity.md)
- [SOP-ROC-003 — Remote Intervention / Assisted Operations Authorization](SOP-ROC-003-remote-intervention-assisted-operations-authorization.md)
- [SOP-ROC-007 — Engineering and Maintenance Handoff (Onsite / Non-Remote Work)](SOP-ROC-007-engineering-and-maintenance-handoff.md)
- [ROC charter](../strategy/charter.md)
- [Roles and levels](../org/roles-and-levels.md)
- [Migration Frequently Asked Questions](../migration/faq.md)

## Revision history

| Date | Author | Change |
|------|--------|--------|
| 2026-05-07 | Cursor agent draft | Initial draft for Supervisor review. |
| 2026-05-14 | Cursor agent draft | Linked onsite / Engineering handoff path and inquiry category for SOP-ROC-007. |
