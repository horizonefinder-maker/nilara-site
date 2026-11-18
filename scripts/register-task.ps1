# Registers the weekly Windows task "Nilara Blog Publisher": every Wednesday at 13:45, it runs publish-due.ps1.
# Run once, in PowerShell opened as Administrator, from the site folder:
#   powershell -ExecutionPolicy Bypass -File .\scripts\register-task.ps1
# Optional one-off test run at a chosen time (it does the real thing if a post is due):
#   powershell -ExecutionPolicy Bypass -File .\scripts\register-task.ps1 -TestAt '2026-11-25 13:50'
#
# It asks for your Windows password so the task can run even when you are not signed in.
# With a Microsoft account, that is the account password, not the PIN.
param([string]$TestAt)

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
$Script = Join-Path $Root 'scripts\publish-due.ps1'
$User = "$env:USERDOMAIN\$env:USERNAME"

$action = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$Script`"" -WorkingDirectory $Root
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -RunOnlyIfNetworkAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -ExecutionTimeLimit (New-TimeSpan -Minutes 30)

$cred = Get-Credential -UserName $User -Message 'Your Windows password, so the task can run when you are not signed in'
$pass = $cred.GetNetworkCredential().Password

if ($TestAt) {
  $when = [datetime]::Parse($TestAt)
  $trigger = New-ScheduledTaskTrigger -Once -At $when
  $name = 'Nilara Blog Publisher (test)'
} else {
  $trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Wednesday -At '13:45'
  $name = 'Nilara Blog Publisher'
}

Register-ScheduledTask -TaskName $name -Action $action -Trigger $trigger -Settings $settings -User $User -Password $pass -RunLevel Limited -Force | Out-Null
Write-Host "Registered '$name'."
Get-ScheduledTask -TaskName $name | Get-ScheduledTaskInfo | Select-Object TaskName, NextRunTime | Format-List
