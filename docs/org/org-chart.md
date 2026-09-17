# ROC organization chart

## Narrative

- **General Manager (GM)** owns overall business outcomes and resource allocation for Marine Technologies lines reporting through this structure.
- **ROC Supervisor** is the single operational lead for ROC: priorities, staffing alignment (with the General Manager (GM)), escalation ownership, and quality of remote operations and customer touchpoints.
- **Agents** form a deliberately **generic** job family with **levels** (Junior → Senior, optional Lead). Work is organized by **streams** under the ROC Supervisor (support, Information Technology (IT), monitoring, remote operations support, data/shore pipeline) without multiplying parallel hierarchies prematurely—people grow **up** the ladder before the org grows **wide**.

## Diagram

```mermaid
flowchart TB
  GM[General Manager]
  SUP[ROC Supervisor]
  GM --> SUP
  SUP --> AJ[Agent Junior]
  SUP --> AI[Agent Intermediate]
  SUP --> AS[Agent Senior]
  SUP --> AL[Agent Lead optional]
```

## Streams under ROC (matrix, not separate reporting lines initially)

Map people to streams in Human Resources (HR) / job descriptions or a roster—not as extra boxes above unless scale demands it.

| Stream | Examples of ownership |
|--------|------------------------|
| Customer support | Tickets, triage, escalation to engineering/vendors |
| Information Technology (IT) (remote services) | Accounts, Virtual Private Network (VPN) / remote access logistics, tooling administration, platform support |
| Remote monitoring | Watch consoles, alarms, routine checks |
| Remote operations support | Assisted operations per contract/product rules |
| Data / shore pipeline | Ingest health, retention requests, export workflows |

See [roles-and-levels.md](roles-and-levels.md) for level definitions.
