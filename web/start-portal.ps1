$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$port = 8000

Set-Location $repoRoot

Write-Host "Starting UROC employee document portal..."
Write-Host "Open: http://localhost:$port/web/"
Write-Host "Press Ctrl+C to stop the server."
Write-Host ""

if (Get-Command py -ErrorAction SilentlyContinue) {
  py -m http.server $port
  exit $LASTEXITCODE
}

if (Get-Command python -ErrorAction SilentlyContinue) {
  python -m http.server $port
  exit $LASTEXITCODE
}

if (Get-Command python3 -ErrorAction SilentlyContinue) {
  python3 -m http.server $port
  exit $LASTEXITCODE
}

Write-Error "Python was not found. Install Python or enable the Python launcher, then rerun this script."
