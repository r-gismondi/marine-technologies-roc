# Standard Operating Procedure (SOP)-UROC-001 — Incident Management and Escalation

| Field | Value |
|-------|-------|
| Version | 0.1 |
| Owner | UROC Supervisor |
| Last reviewed | 2026-05-07 |
| Status | Draft |

## Purpose

Define how UROC receives, triages, documents, escalates, and closes incidents that affect remote operations, customer support, monitoring, data/shore-pipeline continuity, or safety/compliance posture.

This procedure is intended to create a consistent first response and escalation path. It does not replace emergency services, on-vessel command, product engineering authority, Legal/Commercial decision-making, or company-wide incident procedures when those apply.

## Scope

Use this procedure for UROC-owned or UROC-observed incidents, including:

- Safety risk or potential regulatory exposure identified through a UROC channel.
- Customer-impacting outage, degradation, or missed operational handoff.
- Monitoring alarm, remote operations support issue, or abnormal signal requiring action.
- Data/shore-pipeline disruption affecting ingest, retention, access, or export workflows.
- Access, tooling, or remote-service disruption that blocks UROC work.
- Contractual, commercial, or legal ambiguity that affects what UROC can say or do.

Do not record customer names, vessel identifiers, credentials, or detailed incident narratives in this documentation repository. Use official ticket identifiers, Configuration Management Database (CMDB) identifiers, or controlled incident records instead.

## Roles and responsibilities

| Role | Responsibility |
|------|----------------|
| Agent | Detects or receives the issue, protects immediate safety, opens or updates the official ticket, assigns an initial severity, follows documented steps, and escalates ambiguity or high-impact conditions. |
| Senior Agent / Lead (if assigned) | Supports triage for complex or cross-stream incidents, coordinates handoffs, validates documentation quality, and coaches Agents through the procedure. |
| UROC Supervisor | Owns escalation decisions, approves procedure deviations within policy, confirms severity changes for high-impact cases, and coordinates with the General Manager or specialist stakeholders. |
| General Manager | Provides business direction for resource, policy, or customer-impact decisions outside the Supervisor’s authority. |
| Product / Engineering | Provides product authority, technical assessment, and safety-critical sign-off where required. |
| UROC Information Technology (IT) stream / platform owner | Supports tooling, access, infrastructure, and remote-service availability issues under UROC Supervisor direction. |
| Commercial / Legal | Owns contractual interpretation, customer commitments, legal guidance, and external statements where required. |

## Severity classes

These severity classes are planning defaults until approved by the UROC Supervisor and General Manager.

| Severity | Criteria | Initial escalation expectation |
|----------|----------|-------------------------------|
| Severity Level 1 (Sev1) | Immediate safety risk, active regulatory exposure, major customer-impacting outage, or any situation where delay could materially increase harm. | Notify the UROC Supervisor immediately and use the published duty / on-call path. If someone is in immediate danger, follow local emergency procedures first. |
| Severity Level 2 (Sev2) | Significant operational disruption, repeated monitoring alarm with customer or fleet impact, blocked remote operations support, or unresolved ambiguity that needs Supervisor/Senior judgment. | Notify the UROC Supervisor or Senior Agent / Lead within 30 minutes of classification. |
| Severity Level 3 (Sev3) | Standard incident or service degradation with limited impact, known workaround, or contained issue requiring follow-up. | Handle through the official queue; escalate if blocked, impact grows, or ownership is unclear. |
| Severity Level 4 (Sev4) | Routine question, minor issue, documentation gap, or low-impact follow-up that does not require urgent response. | Track in the official system and resolve through normal prioritization. |

## Procedure

1. **Protect safety first.** If there is immediate danger, follow local emergency procedures before any UROC workflow. Do not perform remote actions unless authorization is clear under product, regulatory, and company policy.
2. **Open or update the official ticket.** Use the company-approved ticketing system as the source of truth. Include the issue summary, observed impact, current owner, initial severity, and related ticket or Configuration Management Database (CMDB) identifiers.
3. **Classify initial severity.** Use the severity table above. When in doubt between two severities, choose the higher severity and ask the UROC Supervisor or Senior Agent / Lead to confirm.
4. **Capture minimum facts.** Record what was observed, when it was observed, who is affected by role or system category, what action has already been taken, and what decision or support is needed next. Avoid sensitive identifiers in uncontrolled notes.
5. **Escalate according to severity.** Use the published duty / on-call path for Severity Level 1 (Sev1) and urgent Severity Level 2 (Sev2) incidents. Escalate immediately if safety, legal, commercial, or product-authorization boundaries are unclear.
6. **Coordinate the response.** Keep ownership explicit in the ticket. Handoff notes must include current status, next action, owner, timestamp, and open risks.
7. **Communicate carefully.** Share only approved facts. Do not make commitments about service restoration, contract interpretation, or root cause until the accountable stakeholder has approved the message.
8. **Record timeline and actions.** For significant incidents, use the [incident report template](../../templates/incident-report-template.md) or controlled company incident system to capture timeline, actions taken, root cause if known, and follow-ups.
9. **Close with confirmation.** Close the incident only after the owner confirms impact is resolved or transferred, required communications are complete, follow-up tasks are created, and any procedure or training gaps are noted.

## Escalation

Escalate immediately to the UROC Supervisor when:

- Safety, regulatory, legal, commercial, or product-authorization boundaries are unclear.
- Impact is customer-facing, cross-stream, or likely to miss a published Service Level Agreement (SLA).
- The official source of truth conflicts with monitoring data, customer reports, or internal observations.
- The responsible team or owner is unclear.
- The incident is worsening, repeating, or blocked beyond the severity timebox.

Escalate to Product / Engineering for product behavior, safety-critical control, technical diagnosis, or authorization decisions. Route tooling, access, infrastructure, or remote-service availability issues to the UROC Information Technology (IT) stream under the UROC Supervisor. Escalate to Commercial / Legal for contractual interpretation, external commitments, claims, or legally sensitive communications.

Company-specific phone numbers, bridges, rosters, ticket priorities, and channels must be maintained in controlled internal systems, not in this repository.

## References

- [Standard Operating Procedures index](README.md)
- [SOP-UROC-006 — Major Incident Communications (Internal)](SOP-UROC-006-major-incident-communications-internal.md)
- [Incident report template](../../templates/incident-report-template.md)
- [UROC charter](../strategy/charter.md)
- [Roles and levels](../org/roles-and-levels.md)
- [Migration Frequently Asked Questions](../migration/faq.md)

## Revision history

| Date | Author | Change |
|------|--------|--------|
| 2026-05-07 | Cursor agent draft | Initial draft for Supervisor review. |
