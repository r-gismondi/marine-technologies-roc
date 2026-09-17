# First push to GitHub

The repository is initialized locally at `c:\Repo\marine-technologies-roc` on branch `main`.

## Option A — GitHub website + Git (no Command Line Interface)

1. On GitHub: **New repository** → name e.g. `marine-technologies-roc` → **Private** → **do not** add a README file (this repository already has one).
2. In PowerShell:

```powershell
cd c:\Repo\marine-technologies-roc
git remote add origin https://github.com/YOUR_ORG/marine-technologies-roc.git
git push -u origin main
```

Use Git Credential Manager or a personal access token when prompted.

## Option B — GitHub Command Line Interface (CLI) after login

```powershell
cd c:\Repo\marine-technologies-roc
& "$env:ProgramFiles\GitHub CLI\gh.exe" auth login
& "$env:ProgramFiles\GitHub CLI\gh.exe" repo create YOUR_ORG/marine-technologies-roc --private --source=. --remote=origin --push
```

Replace `YOUR_ORG` with your user or organization name.

## After the first push

- Optional: enable branch protection on `main` ([github-branch-protection.md](github-branch-protection.md)).
- Uncomment `CODEOWNERS` in the repository root if you use GitHub teams for marketing review.
