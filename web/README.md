# UROC employee document portal

This folder contains a lightweight static webpage for browsing UROC documents from a local web server.

## Run locally

From the repository root:

```powershell
.\web\start-portal.ps1
```

Then open:

```text
http://localhost:8000/web/
```

Run the server from the repository root so the portal can load Markdown files from `docs/`, `templates/`, and `presentations/`.

If PowerShell blocks scripts, use the Windows Python launcher directly from the repository root:

```powershell
py -m http.server 8000
```

Type the command in PowerShell. If you see the Python `>>>` prompt, type `exit()` first, then run the command in PowerShell.

## Document list

The navigation is controlled by [`documents.js`](documents.js). Each item has:

- `title`: the user-friendly button label shown in the left navigation.
- `path`: the Markdown file to load.
- `audience`: a placeholder for future credential-based filtering.

When access control is implemented, filter the manifest by `audience` or replace it with an authenticated document API.

## Logo

The portal automatically looks for common logo filenames in `docs/marketing/`, including:

- `UROC logo transparent.png`
- `UROC logo.png`
- `UROC logo black.png`
- `uroc-logo-transparent.png`
- `uroc-logo-white.png`
- `uroc-logo-black.png`
- `logo-transparent.png`
- `logo-white.png`
- `logo-black.png`

If no matching file is present, the page shows a text fallback.
