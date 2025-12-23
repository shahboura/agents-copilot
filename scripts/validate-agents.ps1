# Agent Configuration Validator
$ErrorActionPreference = "Stop"
$agentsPath = ".github/agents"
$errors = @()
$warnings = @()

Write-Host "Validating GitHub Copilot Agents..." -ForegroundColor Cyan

if (-not (Test-Path $agentsPath)) {
    Write-Host "ERROR: .github/agents directory not found!" -ForegroundColor Red
    exit 1
}

$agentFiles = Get-ChildItem -Path $agentsPath -Filter "*.agent.md"

if ($agentFiles.Count -eq 0) {
    Write-Host "ERROR: No agent files found in $agentsPath" -ForegroundColor Red
    exit 1
}

Write-Host "Found $($agentFiles.Count) agent files`n" -ForegroundColor Green

$requiredFields = @('name', 'description', 'tools')

foreach ($file in $agentFiles) {
    Write-Host "Validating: $($file.Name)" -ForegroundColor Yellow
    
    try {
        $content = Get-Content -Path $file.FullName -Raw -ErrorAction Stop
    } catch {
        $errors += "$($file.Name): Failed to read file - $($_.Exception.Message)"
        continue
    }
    
    if ($content -notmatch '(?ms)^---\s*\n(.+?)\n---') {
        $errors += "$($file.Name): Missing frontmatter (---...---)"
        continue
    }
    
    $frontmatter = $Matches[1]
    
    foreach ($field in $requiredFields) {
        if ($frontmatter -notmatch "(?m)^$field\s*:") {
            $errors += "$($file.Name): Missing required field '$field'"
        }
    }
    
    if ($frontmatter -match 'name\s*:\s*(.+)') {
        $name = $Matches[1].Trim()
        if ($name -match '\s') {
            $warnings += "$($file.Name): Agent name contains spaces: '$name'"
        }
        if ($file.BaseName -ne "$name.agent") {
            $warnings += "$($file.Name): Filename doesn't match agent name (expected: $name.agent.md)"
        }
    }
    
    if ($frontmatter -notmatch "tools\s*:\s*\[.+\]") {
        $errors += "$($file.Name): 'tools' must be an array [...]"
    }
    
    if ($content -notmatch '(?m)^##\s+Role') {
        $warnings += "$($file.Name): Missing ## Role section"
    }
    
    if ($content -notmatch '\*\*Start every response with:\*\*') {
        $warnings += "$($file.Name): Missing startup message instruction"
    }
    
    if ($content -notmatch '(?i)Context Persistence|agents\.md') {
        $warnings += "$($file.Name): Missing context persistence to agents.md"
    }
    
    Write-Host "  ✓ Basic structure valid" -ForegroundColor Green
}

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Validation Results" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

if ($errors.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host "✅ All agents validated successfully!" -ForegroundColor Green
    exit 0
}

if ($errors.Count -gt 0) {
    Write-Host "`n❌ ERRORS ($($errors.Count)):" -ForegroundColor Red
    foreach ($errorMessage in $errors) {
        Write-Host "  • $errorMessage" -ForegroundColor Red
    }
}

if ($warnings.Count -gt 0) {
    Write-Host "`n⚠️  WARNINGS ($($warnings.Count)):" -ForegroundColor Yellow
    foreach ($warning in $warnings) {
        Write-Host "  • $warning" -ForegroundColor Yellow
    }
    Write-Host "`n✅ Validation complete (warnings only)" -ForegroundColor Green
}

if ($errors.Count -gt 0) {
    exit 1
}

exit 0
