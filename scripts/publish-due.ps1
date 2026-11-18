# Nilara Hills blog publisher. Runs once a week from Windows Task Scheduler (see register-task.ps1).
#
# What it does, in order:
#   1. git pull --ff-only, so it works on the latest posts from GitHub
#   2. asks `node scripts/blog.mjs due` which post (at most one) is due and passes the gate
#   3. marks it live in src/published.json and runs `npm run deploy` (build, SEO checks, wrangler deploy)
#   4. checks the live URL; if it is not there, rolls back and redeploys the previous site
#   5. commits "publish: <slug>", pushes to GitHub, and writes a line to publish-log.md
#
#   .\scripts\publish-due.ps1 -DryRun     show what is due or held, change nothing
param([switch]$DryRun)

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
$Base = 'https://nilarahills.com'
$Log = Join-Path $Root 'publish-log.md'
Set-Location $Root
# A full record of each run, for when something needs looking into (not kept in git).
if (-not $DryRun) { Start-Transcript -Path (Join-Path $Root 'publish-run.log') -Append | Out-Null }

# Scheduled tasks and admin shells sometimes start without git/node on PATH.
$env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [Environment]::GetEnvironmentVariable('Path', 'User')

function Write-Log([string]$Text) {
  $line = "- $(Get-Date -Format 'yyyy-MM-dd HH:mm') $Text"
  Write-Host $line
  if (-not $DryRun) {
    if (-not (Test-Path $Log)) { Set-Content -Path $Log -Value "# Nilara Hills blog publish log`n" -Encoding UTF8 }
    Add-Content -Path $Log -Value $line -Encoding UTF8
  }
}
function Invoke-Native([string]$What, [scriptblock]$Cmd) {
  & $Cmd
  if ($LASTEXITCODE -ne 0) { throw "$What failed (exit code $LASTEXITCODE)" }
}

try {
  if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw 'git not found on PATH' }
  if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'node not found on PATH' }

  if (-not $DryRun) { Invoke-Native 'git pull' { git pull --ff-only } }

  $gateJson = (& node scripts/blog.mjs due) -join "`n"
  if ($LASTEXITCODE -ne 0) { throw 'node scripts/blog.mjs due failed' }
  $gate = $gateJson | ConvertFrom-Json

  foreach ($h in @($gate.held)) { if ($h) { Write-Log "HELD $($h.slug) (scheduled $($h.date)): $($h.reason)" } }
  foreach ($n in @($gate.notes)) { if ($n) { Write-Log "NOTE $n" } }

  if (-not $gate.due) {
    $next = if ($gate.next) { " Next: $($gate.next.slug) on $($gate.next.date)." } else { ' No more posts scheduled.' }
    Write-Log "Nothing due today ($($gate.today)).$next"
    exit 0
  }

  $slug = $gate.due.slug
  $url = "$Base/blog/$slug/"
  if ($DryRun) {
    Write-Host "DRY RUN: would publish $slug (scheduled $($gate.due.date)) at $url"
    exit 0
  }

  Invoke-Native 'mark post live' { node scripts/blog.mjs publish $slug }
  try {
    Invoke-Native 'npm run deploy' { npm.cmd run deploy }
  } catch {
    # Nothing new reached the site if the build or checks failed; undo the local change.
    git checkout -- src/published.json
    Write-Log "FAILED ${slug}: build, checks or deploy did not pass ($($_.Exception.Message)). Nothing published."
    exit 1
  }

  # Confirm the page is live. Add a query string so a cached answer does not fool us.
  $ok = $false
  for ($i = 0; $i -lt 12 -and -not $ok; $i++) {
    Start-Sleep -Seconds 10
    try {
      $r = Invoke-WebRequest -Uri "${url}?v=$([DateTime]::UtcNow.Ticks)" -UseBasicParsing -TimeoutSec 20
      if ($r.StatusCode -eq 200 -and $r.Content -match [regex]::Escape("/blog/$slug/")) { $ok = $true }
    } catch { }
  }
  if (-not $ok) {
    Write-Log "ROLLBACK ${slug}: deployed but $url did not answer correctly within 2 minutes."
    git checkout -- src/published.json
    try { Invoke-Native 'redeploy previous site' { npm.cmd run deploy } ; Write-Log 'Previous site redeployed.' }
    catch { Write-Log "Rollback redeploy FAILED: $($_.Exception.Message). Run npm run deploy by hand." }
    exit 1
  }

  Invoke-Native 'git add' { git add src/published.json }
  Invoke-Native 'git commit' { git commit -m "publish: $slug" }
  git push
  if ($LASTEXITCODE -ne 0) {
    Invoke-Native 'git pull --rebase' { git pull --rebase }
    Invoke-Native 'git push' { git push }
  }
  $commit = (git rev-parse --short HEAD)
  Write-Log "PUBLISHED $slug -> $url (commit $commit)"
  exit 0
} catch {
  Write-Log "ERROR: $($_.Exception.Message)"
  exit 1
}
