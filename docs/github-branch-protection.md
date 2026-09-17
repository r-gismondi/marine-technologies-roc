# Optional: branch protection for `main`

When more than one person contributes, protect `main` in GitHub:

1. Repository **Settings** → **Branches** → **Add rule** (or **Add branch ruleset**).
2. Branch name pattern: `main`.
3. Enable as appropriate for your org:
   - **Require a pull request before merging**
   - **Require approvals** (e.g. 1)
   - **Do not allow bypassing** (optional, for stricter compliance)

ROC documentation rarely needs force-push; keeping history linear is enough for most teams.
