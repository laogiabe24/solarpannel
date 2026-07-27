$ErrorActionPreference = "SilentlyContinue"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $root

$url = "http://127.0.0.1:5173/#slide-01"
$isRunning = $false

try {
  Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2 | Out-Null
  $isRunning = $true
} catch {
  $isRunning = $false
}

if (-not $isRunning) {
  Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-NoProfile",
    "-ExecutionPolicy",
    "Bypass",
    "-Command",
    "Set-Location -LiteralPath '$root'; npm run dev -- --port 5173"
  )
  Start-Sleep -Seconds 4
}

Start-Process $url
