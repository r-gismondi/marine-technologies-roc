const DOCUMENT_SECTIONS = [
  {
    id: "start",
    label: "Start Here",
    documents: [
      { title: "Welcome to ROC", path: "docs/start-here.md", audience: "all" },
    ],
  },
  {
    id: "strategy",
    label: "Strategy",
    documents: [
      { title: "ROC Charter", path: "docs/strategy/charter.md", audience: "all" },
      { title: "Class Concept", path: "docs/strategy/class-and-conops.md", audience: "all" },
      { title: "Responsibility Matrix", path: "docs/strategy/raci.md", audience: "all" },
    ],
  },
  {
    id: "goals",
    label: "Goals",
    documents: [
      { title: "Goals Folder Guide", path: "docs/goals/README.md", audience: "all" },
      { title: "Year One Goals", path: "docs/goals/year-one-goals.md", audience: "all" },
    ],
  },
  {
    id: "organization",
    label: "Organization",
    documents: [
      { title: "Organization Chart", path: "docs/org/org-chart.md", audience: "all" },
      { title: "Roles and Agent Levels", path: "docs/org/roles-and-levels.md", audience: "all" },
    ],
  },
  {
    id: "procedures",
    label: "Procedures",
    documents: [
      { title: "Procedure Index", path: "docs/procedures/README.md", audience: "all" },
      { title: "Incident Management and Escalation", path: "docs/procedures/SOP-ROC-001-incident-management-and-escalation.md", audience: "all" },
      { title: "Office-Hours Handoff and On-Call Continuity", path: "docs/procedures/SOP-ROC-002-office-hours-handoff-and-on-call-continuity.md", audience: "all" },
      { title: "Remote Intervention Authorization", path: "docs/procedures/SOP-ROC-003-remote-intervention-assisted-operations-authorization.md", audience: "all" },
      { title: "Customer Inquiry Routing and Ownership", path: "docs/procedures/SOP-ROC-004-customer-inquiry-routing-and-ownership.md", audience: "all" },
      { title: "Data Export, Retention, and Access Requests", path: "docs/procedures/SOP-ROC-005-data-export-retention-access-requests.md", audience: "all" },
      { title: "Major Incident Communications", path: "docs/procedures/SOP-ROC-006-major-incident-communications-internal.md", audience: "all" },
      { title: "Engineering and Maintenance Handoff", path: "docs/procedures/SOP-ROC-007-engineering-and-maintenance-handoff.md", audience: "all" },
    ],
  },
  {
    id: "quality",
    label: "Quality",
    documents: [
      { title: "ISO 9001 and QMS Alignment", path: "docs/quality/iso-9001-alignment.md", audience: "all" },
      { title: "ROC Records Matrix", path: "docs/quality/records-matrix.md", audience: "all" },
    ],
  },
  {
    id: "migration",
    label: "Employee Migration",
    documents: [
      { title: "Migration Folder Guide", path: "docs/migration/README.md", audience: "all" },
      { title: "Migration Scope and Expectations", path: "docs/migration/scope-and-expectations.md", audience: "all" },
      { title: "Frequently Asked Questions", path: "docs/migration/faq.md", audience: "all" },
      { title: "Training Plan", path: "docs/migration/training-plan-outline.md", audience: "all" },
    ],
  },
  {
    id: "templates",
    label: "Templates",
    documents: [
      { title: "Standard Operating Procedure Template", path: "templates/sop-template.md", audience: "all" },
      { title: "Responsibility Matrix Template", path: "templates/raci-template.md", audience: "all" },
      { title: "Incident Report Template", path: "templates/incident-report-template.md", audience: "all" },
      { title: "Change Request Template", path: "templates/change-request-template.md", audience: "all" },
      { title: "Communications Brief Template", path: "templates/comms-brief-template.md", audience: "all" },
    ],
  },
];

const LOGO_CANDIDATES = [
  "docs/marketing/ROC logo transparent.png",
  "docs/marketing/ROC logo.png",
  "docs/marketing/ROC logo black.png",
  "docs/marketing/roc-logo-transparent.png",
  "docs/marketing/roc-logo-white.png",
  "docs/marketing/roc-logo-black.png",
  "docs/marketing/logo-transparent.png",
  "docs/marketing/logo-white.png",
  "docs/marketing/logo-black.png",
];

window.ROC_DOCUMENT_SECTIONS = DOCUMENT_SECTIONS;
window.ROC_LOGO_CANDIDATES = LOGO_CANDIDATES;
