# Class concept — assisted remote operations

This page is an **employee digest** of Marine Technologies’ official Concept of Operations (ConOps) used for American Bureau of Shipping (ABS) and DNV class review. It is **not** the class submittal.

**Source (outside this repository):** `MT_ROC_with_ABS_v8_2.docx` — *Autonomous System for Supervised Remote-Assisted Operation*, revision 8.2. That file, the Design Package, and the controlled test / cyber drawings are the documents class sees. Do not paste them here.

This department library describes **how ROC people work**. The ConOps describes **how the Remote Operations Centre assists vessels** and how that assistance is classified. Both must stay consistent. If they conflict, stop and ask the ROC Supervisor; do not invent a third rule.

## What class is reviewing

Marine Technologies is qualifying a **shore-based Remote Operations Centre** that monitors and assists **crewed** offshore and wind-farm support vessels.

The current concept is **supervised assistance**, not uncrewed operation:

- Each vessel keeps its required **minimum crew**.
- The **master keeps command authority aboard**.
- Onboard crew can **override any assisted function without shore consent**.
- The ROC adds a shore watch: monitor many vessels in transit or standby, and give close assistance when a vessel is in demanding work such as dynamic positioning.

Governing references (titles only — use the official editions in the ConOps):

- ABS *Requirements for Autonomous and Remote-Control Functions* (October 2024) — **REMOTE-CON** for assisted remote control; **AUTONOMOUS** only where a function is later approved for that step.
- DNV-CG-0264 *Autonomous and remotely operated ships*.
- IMO MSC.1/Circ.1455 alternative-design route, and the IMO MASS Code as a goal-based, non-mandatory instrument during its experience-building phase.

## Two operational categories

| Category | Class idea | What it means for ROC |
|----------|------------|------------------------|
| **A — Assisted** (the current concept) | ABS **REMOTE-CON**. Onboard supervision **OP1–OP3**. Remote supervision **RO2** in monitoring states, **RO1** when a vessel is in active station-keeping. | Crew and master stay aboard. ROC monitors and assists. Onboard override is always available. |
| **B — Fully autonomous** (later, evidence-led) | ABS **AUTONOMOUS**. Remote supervision at least **RO2**, **RO1** in congested waters, port approach, and other active phases. | Functions move here only after class-approved evidence. Do not treat this as the day-to-day default. |

**OP** = onboard operator attention (continuous / periodic / as-needed). **RO** = remote operator attention (same scale). These are **class supervision levels**, not Agent job titles.

Assisted functions in the current notation set include **navigation (NAV)**, **maneuvering / dynamic positioning (MNV)**, **propulsion (PROP / PRP)**, and **auxiliaries (AUX)**. The vessel–shore link is supporting infrastructure, not a separate notation.

## Department roles versus watch profiles

The employee org stays **General Manager → ROC Supervisor → Agents** (Junior → Intermediate → Senior → Specialist). That ladder does not change.

The ConOps watch floor uses **profiles** for how a watch is seated:

| ConOps profile | Typical department stream | What that watch does |
|----------------|---------------------------|----------------------|
| Bridge / Navigation (Tier-1) | Remote operations support, remote monitoring | Monitor vessels in transit or relaxed station-keeping; lock **1:1** when a vessel enters active dynamic positioning or close work |
| Technical / Chief Engineer (Tier-2) | Information Technology (IT), remote operations support | Machinery, power, alarms, diagnostics; overflow monitoring when the navigation row is saturated |
| Supervision / Support (Tier-3) | Supervisor-directed oversight | Traffic, routing, escalation, overflow |
| Command (on-duty senior captain) | ROC Supervisor (and General Manager for business / class liaison) | Mode changes, overflow, search-and-rescue coordination, customer and class liaison |

Profiles are **assignments on a watch**, not a second reporting line and not a reason to coordinate other Agents from the Specialist level.

## Operating rules Agents must not break

These rules come from the class concept. Procedures [SOP-ROC-003](../procedures/SOP-ROC-003-remote-intervention-assisted-operations-authorization.md) and [SOP-ROC-001](../procedures/SOP-ROC-001-incident-management-and-escalation.md) apply them.

1. **One controller at a time.** Control of a function is held by exactly one party: local, engine-control room, bridge, or ROC. Transfers use a documented handshake. Failed or unclear transfers do not proceed.
2. **Onboard override wins.** The crew can take the function back at any time without asking shore.
3. **Loss of link reverts to the vessel.** The vessel follows its pre-agreed safe behavior with the crew in control. ROC re-establishes the link; it does not keep commanding through a dead path.
4. **Observe and advise is the assisted baseline.** Shore may monitor and recommend (authority levels **R1–R2**). Operating, repairing, or supervising autonomy from shore (**R3–R5**) needs extra, time-limited authorization, the crew-controlled remote-access isolation on board, and — for high-consequence engineering — a second qualified person ashore plus onboard acknowledgement where the vessel is crewed.
5. **A named responsible person exists for every vessel** at all times (master aboard in assisted mode).
6. **Minimum-risk condition.** If the situation is beyond normal operation, the vessel moves toward a defined safe state. At least two safe options should be available; the crew aboard is the always-available fallback in assisted mode.
7. **Do not reduce crew because the ROC is watching.** Pilot and class work keep normal crew aboard on purpose.

## How a watch is loaded (concept)

- **Monitoring** (transit or relaxed station-keeping outside the close-work zone): one navigation operator may hold several vessels, up to the approved concurrency limit.
- **Active** (dynamic positioning or close work): that operator locks **1:1**. Other vessels are redistributed.
- **Saturation**: overflow monitoring moves to the technical row under command. Concurrent incidents can move to the backup / hand-over room.

Exact numbers live in the official ConOps and the Safety Management System. Do not invent a private ratio.

## What this library will not hold

Do not copy into this repository: class drawings, test packages, cyber-zone diagrams, hardware schedules, commercial pricing, data-center locations, customer or vessel names, credentials, or detailed incident narratives. Point to the controlled ConOps or ticket / Configuration Management Database (CMDB) identifiers instead.

## Related pages

- [ROC charter](charter.md)
- [Organization chart](../org/org-chart.md)
- [Roles and levels](../org/roles-and-levels.md)
- [Remote intervention authorization](../procedures/SOP-ROC-003-remote-intervention-assisted-operations-authorization.md)
- [Incident management](../procedures/SOP-ROC-001-incident-management-and-escalation.md)
- [Engineering and Maintenance handoff](../procedures/SOP-ROC-007-engineering-and-maintenance-handoff.md)
