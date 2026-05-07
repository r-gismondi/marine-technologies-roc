# UROC records matrix

This matrix identifies records that UROC procedures are expected to create or reference. It supports Marine Technologies Quality Management System (QMS), Document Control, audit, and retention expectations.

Do not store customer names, vessel identifiers, credentials, raw exports, or detailed incident narratives in this repository. Store controlled records in approved company systems and reference ticket identifiers, Configuration Management Database (CMDB) identifiers, or controlled record identifiers instead.

Retention periods, legal holds, and controlled-copy rules must follow Marine Technologies' official retention schedule and Document Control process.

| Record type | Created / used by | System of record | Record owner | Retention source | Access notes |
|-------------|-------------------|------------------|--------------|------------------|--------------|
| Incident ticket | SOP-UROC-001, SOP-UROC-006 | Company-approved ticketing / incident system | UROC Supervisor or assigned incident owner | Company incident / service record retention policy | Limit to response team and approved stakeholders. |
| Incident report | SOP-UROC-001, SOP-UROC-006 | Controlled incident record repository or approved ticket attachment | UROC Supervisor | Company incident / quality record retention policy | Avoid uncontrolled copies; reference ticket identifier in this repository. |
| Office-hours handoff / carryover note | SOP-UROC-002 | Company-approved ticketing system or work queue | Current ticket owner | Service / operational record retention policy | Must identify owner, next action, and timing. |
| On-call escalation record | SOP-UROC-002, SOP-UROC-001 | Company on-call / incident system | Company on-call owner or UROC Supervisor | Company on-call / incident record retention policy | Do not publish rosters, phone numbers, or bridges in this repository. |
| Remote intervention authorization record | SOP-UROC-003 | Company-approved ticketing, runbook, or controlled authorization record | UROC Supervisor with Product / Engineering or relevant accountable owner | Operational / technical authorization record retention policy | Must include authorization source and stop/rollback expectations. |
| Customer inquiry ticket | SOP-UROC-004 | Company-approved customer support / ticketing system | Assigned UROC owner | Customer support record retention policy | Response boundaries and owner transfer must be documented. |
| Data access request | SOP-UROC-005 | Company access request or UROC Information Technology (IT) service system | UROC Supervisor or assigned UROC IT stream owner, with data owner input as applicable | Access-control record retention policy | Minimum necessary access; do not share credentials in records. |
| Data export request | SOP-UROC-005 | Approved data request / ticketing system | Data owner or system owner | Data governance / customer contract / retention policy | External exports may require Commercial / Legal approval. |
| Data retention / deletion / hold request | SOP-UROC-005 | Approved data governance or Legal / Compliance system | Data owner, Legal, or Compliance owner | Official retention schedule / legal hold process | UROC routes and tracks; Legal / Compliance owns holds and regulatory decisions. |
| Internal major incident communication | SOP-UROC-006 | Controlled communications channel, incident record, or approved archive | UROC Supervisor | Communications / incident record retention policy | Include audience, approver, time sent, and next update time. |
| SOP approval record | All SOPs | Document Control or Quality Management System repository | Document Control / Quality with UROC Supervisor | Document Control retention policy | Required before marking SOP approved. |
| SOP acknowledgment / training record | All SOPs as applicable | Human Resources (HR), learning, or Quality system | Human Resources / UROC Supervisor / Quality as applicable | Training record retention policy | Required for read-and-acknowledge or competence evidence. |
| Change request / revision record | Approved SOP changes, tooling changes | Change management or Quality system | Change owner | Change-control record retention policy | Link to audit finding, incident, corrective action, or improvement request where applicable. |
| Corrective action / nonconformity record | Audit findings, procedure failures, recurring gaps | Company corrective action / Quality system | Quality or assigned corrective-action owner | Corrective-action record retention policy | UROC documents facts and participates; Quality owns process requirements. |

## Use of this matrix

Review this matrix when:

- A new SOP is drafted.
- A procedure changes the record a process creates.
- A tool or system of record changes.
- An audit finding identifies a missing or uncontrolled record.
- Document Control or Quality updates retention requirements.

The UROC Supervisor should review this matrix at least annually or after major changes to UROC scope, tools, or company record-retention policy.
