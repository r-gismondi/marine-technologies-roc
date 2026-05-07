# UROC — Unified Remote Operations Center

Internal documentation for **Marine Technologies** UROC: strategy, org design, procedures, migration communications, and marketing drafts.

## How to use this repository

- **New Cursor agent?** Read **[docs/FOR_NEXT_AGENT.md](docs/FOR_NEXT_AGENT.md)** first so you inherit goals, boundaries, and repo layout without prior chat history.
- **Author** in Markdown with Cursor (or any editor). Keep the repo as the **single source of truth** for text; export slides/PDFs when needed.
- **Collaborate** via branches and pull requests when multiple people edit.
- **Do not** store customer names, vessel identifiers, credentials, or operational incident details here—use tickets, Configuration Management Database (CMDB) records, or approved secure stores.

## Repository layout

| Path | Contents |
|------|----------|
| [docs/strategy/](docs/strategy/) | Charter, vision, Responsible, Accountable, Consulted, Informed (RACI) matrix |
| [docs/goals/](docs/goals/) | Annual objectives and Key Performance Indicators (KPIs) |
| [docs/org/](docs/org/) | Org chart, roles, Agent levels |
| [docs/procedures/](docs/procedures/) | Standard Operating Procedure (SOP) index and procedures |
| [docs/migration/](docs/migration/) | Employee migration scope, Frequently Asked Questions (FAQ), training |
| [docs/marketing/](docs/marketing/) | External-facing drafts (review before release) |
| [presentations/](presentations/) | Slide outlines (e.g. internal migration deck) |
| [templates/](templates/) | Blank Standard Operating Procedure (SOP), Responsible, Accountable, Consulted, Informed (RACI) matrix, incident report, etc. |

## GitHub setup (first push)

See **[docs/FIRST_PUSH.md](docs/FIRST_PUSH.md)** for step-by-step options (browser + Git, or GitHub Command Line Interface (CLI) after `gh auth login`).

## Working from another machine

```powershell
git clone https://github.com/YOUR_ORG/marine-technologies-uroc.git
cd marine-technologies-uroc
```

Open the folder in Cursor and continue.

## Optional: GitHub Command Line Interface (CLI)

If [GitHub Command Line Interface (CLI)](https://cli.github.com/) (`gh`) is installed and authenticated:

```powershell
gh auth login
gh repo create YOUR_ORG/marine-technologies-uroc --private --source=. --remote=origin --push
```

See [docs/github-branch-protection.md](docs/github-branch-protection.md) for optional branch protection on `main`.
