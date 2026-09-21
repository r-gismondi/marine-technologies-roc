# ROC — Remote Operations Center

Internal documentation for **Marine Technologies** ROC: strategy, org design, procedures, migration communications, and marketing drafts.

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
| [docs/quality/](docs/quality/) | ISO 9001 / Quality Management System (QMS) alignment and records mapping |
| [docs/migration/](docs/migration/) | Employee migration scope, Frequently Asked Questions (FAQ), training |
| [docs/marketing/](docs/marketing/) | External-facing drafts (review before release) |
| [presentations/](presentations/) | Slide outlines (e.g. internal migration deck) |
| [templates/](templates/) | Blank Standard Operating Procedure (SOP), Responsible, Accountable, Consulted, Informed (RACI) matrix, incident report, etc. |
| [web/](web/) | Employee document portal (local and [GitHub Pages](https://r-gismondi.github.io/marine-technologies-roc/)) |

## GitHub setup (first push)

See **[docs/FIRST_PUSH.md](docs/FIRST_PUSH.md)** for step-by-step options (browser + Git, or GitHub Command Line Interface (CLI) after `gh auth login`).

## Working from another machine

```powershell
git clone https://github.com/r-gismondi/marine-technologies-roc.git
cd marine-technologies-roc
```

Open the folder in Cursor and continue.

## Optional: GitHub Command Line Interface (CLI)

If [GitHub Command Line Interface (CLI)](https://cli.github.com/) (`gh`) is installed and authenticated:

```powershell
gh auth login
gh repo create r-gismondi/marine-technologies-roc --private --source=. --remote=origin --push
```

See [docs/github-branch-protection.md](docs/github-branch-protection.md) for optional branch protection on `main`.

## Employee document portal

The portal **Start Here** page for Agents is [docs/start-here.md](docs/start-here.md), not this README.

**Internet (GitHub Pages):** https://r-gismondi.github.io/marine-technologies-roc/

That site publishes the employee portal from this repository. Anyone with the link can open it. Do not put customer names, vessel identifiers, or credentials in documents the portal can load.

**Local:** run the web server from the repository root:

```powershell
.\web\start-portal.ps1
```

Then open `http://localhost:8000/web/`.

If PowerShell blocks scripts, run this command instead from the repository root:

```powershell
py -m http.server 8000
```

Run the command in PowerShell, not inside the Python `>>>` prompt.
