# UROC — Unified Remote Operations Center

Internal documentation for **Marine Technologies** UROC: strategy, org design, procedures, migration communications, and marketing drafts.

## How to use this repository

- **Author** in Markdown with Cursor (or any editor). Keep the repo as the **single source of truth** for text; export slides/PDFs when needed.
- **Collaborate** via branches and pull requests when multiple people edit.
- **Do not** store customer names, vessel identifiers, credentials, or operational incident details here—use tickets, CMDB, or approved secure stores.

## Repository layout

| Path | Contents |
|------|----------|
| [docs/strategy/](docs/strategy/) | Charter, vision, RACI |
| [docs/goals/](docs/goals/) | Annual objectives and KPIs |
| [docs/org/](docs/org/) | Org chart, roles, Agent levels |
| [docs/procedures/](docs/procedures/) | SOP index and standard operating procedures |
| [docs/migration/](docs/migration/) | Employee migration scope, FAQ, training |
| [docs/marketing/](docs/marketing/) | External-facing drafts (review before release) |
| [presentations/](presentations/) | Slide outlines (e.g. internal migration deck) |
| [templates/](templates/) | Blank SOP, RACI, incident report, etc. |

## GitHub setup (first push)

If this folder is not yet connected to GitHub:

1. Create an empty **private** repository on GitHub named e.g. `marine-technologies-uroc` (no README/license if you already have commits here).
2. Add the remote and push:

```powershell
cd c:\Repo\marine-technologies-uroc
git remote add origin https://github.com/YOUR_ORG/marine-technologies-uroc.git
git branch -M main
git push -u origin main
```

Replace `YOUR_ORG` and repo URL with your account or organization.

## Working from another machine

```powershell
git clone https://github.com/YOUR_ORG/marine-technologies-uroc.git
cd marine-technologies-uroc
```

Open the folder in Cursor and continue.

## Optional: GitHub CLI

If [GitHub CLI](https://cli.github.com/) (`gh`) is installed and authenticated:

```powershell
gh auth login
gh repo create YOUR_ORG/marine-technologies-uroc --private --source=. --remote=origin --push
```

See [docs/github-branch-protection.md](docs/github-branch-protection.md) for optional branch protection on `main`.
