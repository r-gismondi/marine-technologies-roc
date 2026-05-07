# For the next agent — read this first

This file is the **onboarding brief** for continuing UROC documentation work. The human (Rodrigo) will point new chats here so context survives across agents.

## What this repository is

- **UROC** = **Unified Remote Operations Center** at **Marine Technologies** (marine / remote operations company).
- **Purpose (department):** One shore-side organization combining customer support, Information Technology (IT) touchpoints for remote services, vessel remote monitoring, vessel remote operations support, and governance of data from vessels to shore.
- **Human’s role:** Supervisor of UROC; leading **department implementation** (goals, procedures, marketing drafts, employee migration messaging, presentations).
- **Audience for docs:** Internal first; external/marketing pieces need Legal/Commercial review before release.

## Critical workspace rule

- **All UROC work lives in this repository only:** `marine-technologies-uroc` (local path is often `C:\Repo\marine-technologies-uroc`).
- **Do not** treat **`C:\Repo\DP`** as part of this project — that is a **large separate product/engineering codebase**. Ignore pending reviews or git state in that separate repository unless the human explicitly asks about it.

## Git and GitHub

- **Default branch:** `main`.
- **Remote:** `https://github.com/r-gismondi/marine-technologies-uroc.git` (private).
- First-time push / clone help: [FIRST_PUSH.md](FIRST_PUSH.md).
- Optional branch protection: [github-branch-protection.md](github-branch-protection.md).

## Org model (decisions already reflected in docs)

- **General Manager** → **UROC Supervisor** → **Agents** (generic role name).
- **Agent levels:** Junior → Intermediate → Senior → optional **Lead** (add Lead when scale justifies it; promote **up** before multiplying parallel hierarchies).
- **Streams** (how work is assigned, not separate reporting lines at start): Support, Information Technology (IT), remote monitoring, remote operations support, data/shore pipeline — see matrix in [org/org-chart.md](org/org-chart.md) and detail in [org/roles-and-levels.md](org/roles-and-levels.md).

## What exists vs placeholders

| Area | Status |
|------|--------|
| Charter, Responsible, Accountable, Consulted, Informed (RACI) template, org chart, Agent levels | Draft content in place — fill names, metrics, approvals |
| Year-one goals | [goals/year-one-goals.md](goals/year-one-goals.md) — metrics/targets are placeholders |
| Migration pack + internal deck outline | [migration/](migration/) + [../presentations/internal-migration.md](../presentations/internal-migration.md) — Frequently Asked Questions (FAQ) and training need real answers |
| Standard Operating Procedure (SOP) index | [procedures/README.md](procedures/README.md) — Standard Operating Procedure bodies mostly “planned”; use [../templates/sop-template.md](../templates/sop-template.md) |
| Marketing drafts | [marketing/](marketing/) — explicitly draft; use [marketing/review-checklist.md](marketing/review-checklist.md) before external use |
| `CODEOWNERS` | Commented placeholder at repo root — uncomment with real GitHub handle/team after policy is clear |

## Suggested read order for a new session

1. This file (`docs/FOR_NEXT_AGENT.md`).
2. [README.md](../README.md)
3. [strategy/charter.md](strategy/charter.md)
4. [org/roles-and-levels.md](org/roles-and-levels.md)
5. Whatever the human asks for next (goals, migration, Standard Operating Procedures, marketing, etc.).

## Likely next tasks (pick with human)

- Replace placeholders in [migration/faq.md](migration/faq.md) and [goals/year-one-goals.md](goals/year-one-goals.md).
- Draft first real Standard Operating Procedure (SOP) (e.g. incident/escalation) from template.
- Expand Responsible, Accountable, Consulted, Informed (RACI) matrix in [strategy/raci.md](strategy/raci.md) with real names/roles.
- Turn [presentations/internal-migration.md](../presentations/internal-migration.md) into slides or Marp if desired.
- Align `README.md` clone URL if org moves from placeholder `YOUR_ORG` anywhere.

## Security reminder (non-negotiable)

Do not put **customer names, vessel identifiers, credentials, or detailed incident narratives** in this repository — reference ticket or Configuration Management Database (CMDB) identifiers (IDs) instead. Stated again in [README.md](../README.md).

---

*Last updated for handoff: agent-authored scaffold; human maintains this file when major decisions change.*
