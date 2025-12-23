# Quick Installation Script
# Copies agents to your repository

param(
    [Parameter(Mandatory=$false)]
    [string]$TargetRepo = "."
)

$ErrorActionPreference = "Stop"

Write-Host "Installing GitHub Copilot Agents..." -ForegroundColor Cyan

# Check if target is a git repo
if (-not (Test-Path "$TargetRepo/.git")) {
    Write-Host "ERROR: Target directory is not a git repository" -ForegroundColor Red
    exit 1
}

# Create .github directory if it doesn't exist
$githubDir = Join-Path $TargetRepo ".github"
New-Item -ItemType Directory -Path $githubDir -Force | Out-Null

# Copy agent files
Write-Host "Copying agents..." -ForegroundColor Yellow
Copy-Item -Path ".github/agents" -Destination $githubDir -Recurse -Force
Copy-Item -Path ".github/prompts" -Destination $githubDir -Recurse -Force
Copy-Item -Path ".github/instructions" -Destination $githubDir -Recurse -Force

# Create fresh agents.md for the target project (do not copy source context)
$agentsFile = Join-Path $githubDir "agents.md"
if (-not (Test-Path $agentsFile)) {
    Write-Host "Creating agents.md (context log for target project)..." -ForegroundColor Yellow
    $agentsContent = @'
# Agent Context & Project Summary

**Last Updated:** _set after first task_

## Project Overview
[Add a one-paragraph summary of the target project]

## Recent Activity
[Agents will append entries here in reverse chronological order]

---

## Context Guidelines

**For All Agents:**
- Read this file at task start for project context
- Write summary at task completion
- Format: `### YYYY-MM-DD HH:MM - [Task Summary]`
- Include agent name, key decisions, patterns established
- Keep summaries concise (3-5 bullet points max)
- Oldest entries auto-pruned when file exceeds 100KB

**Entry Template:**
```markdown
### YYYY-MM-DD HH:MM - [Brief Task Description]
**Agent:** [agent-name]  
**Summary:** [What was accomplished]
- Key decision/pattern 1
- Key decision/pattern 2
- Impact on future work
```
'@
    Set-Content -Path $agentsFile -Value $agentsContent -NoNewline
} else {
    Write-Host "agents.md already exists, preserving existing project context..." -ForegroundColor Yellow
}

# Copy scripts
Write-Host "Copying validation scripts..." -ForegroundColor Yellow
$scriptsDir = Join-Path $TargetRepo "scripts"
New-Item -ItemType Directory -Path $scriptsDir -Force | Out-Null
Copy-Item -Path "scripts/*" -Destination $scriptsDir -Force

# Copy copilot-instructions.md (if doesn't exist)
$instructionsFile = Join-Path $githubDir "copilot-instructions.md"
if (-not (Test-Path $instructionsFile)) {
    Write-Host "Creating copilot-instructions.md..." -ForegroundColor Yellow
    Copy-Item -Path ".github/copilot-instructions.md" -Destination $instructionsFile -Force
} else {
    Write-Host "copilot-instructions.md already exists, skipping..." -ForegroundColor Yellow
}

Write-Host "`n✅ Installation complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Reload VS Code to detect new agents"
Write-Host "2. Open Copilot Chat (Ctrl+Shift+I)"
Write-Host "3. Select an agent from dropdown (@codebase, @planner, etc.)"
Write-Host "`nValidate installation:" -ForegroundColor Cyan
Write-Host ".\scripts\validate-agents.ps1"
