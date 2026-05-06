# First push to GitHub

The repository is initialized locally at `c:\Repo\marine-technologies-uroc` on branch `main`.

## Option A — GitHub website + Git (no CLI)

1. On GitHub: **New repository** → name e.g. `marine-technologies-uroc` → **Private** → **do not** add README (this repo already has one).
2. In PowerShell:

```powershell
cd c:\Repo\marine-technologies-uroc
git remote add origin https://github.com/YOUR_ORG/marine-technologies-uroc.git
git push -u origin main
```

Use Git Credential Manager or a personal access token when prompted.

## Option B — GitHub CLI (after login)

```powershell
cd c:\Repo\marine-technologies-uroc
& "$env:ProgramFiles\GitHub CLI\gh.exe" auth login
& "$env:ProgramFiles\GitHub CLI\gh.exe" repo create YOUR_ORG/marine-technologies-uroc --private --source=. --remote=origin --push
```

Replace `YOUR_ORG` with your user or organization name.

## After the first push

- Optional: enable branch protection on `main` ([github-branch-protection.md](github-branch-protection.md)).
- Uncomment `CODEOWNERS` in the repo root if you use GitHub teams for marketing review.
