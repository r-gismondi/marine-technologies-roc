# ROC employee document portal

This folder contains a lightweight static webpage for browsing ROC documents from a local web server.

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

## Brand mark

The portal uses a compact **ROC** oval mark in the sidebar. Marketing PNG files in `docs/marketing/` remain available for print and presentations.
