# Fix Markdown Lint Issues Script
# This script helps identify and guide fixes for markdown linting issues

Write-Host "Markdown Linting Issues Summary" -ForegroundColor Cyan
Write-Host "===============================" -ForegroundColor Cyan
Write-Host ""

# Run markdownlint with fix option
Write-Host "Attempting automatic fixes..." -ForegroundColor Yellow
& markdownlint "**/*.md" --ignore node_modules --ignore .github --fix

Write-Host ""
Write-Host "Automatic fixes applied!" -ForegroundColor Green
Write-Host ""
Write-Host "Remaining issues (if any):" -ForegroundColor Yellow
& markdownlint "**/*.md" --ignore node_modules --ignore .github

Write-Host ""
Write-Host "To manually fix remaining issues:" -ForegroundColor Cyan
Write-Host "1. Add blank lines around headings" -ForegroundColor White
Write-Host "2. Add blank lines around lists" -ForegroundColor White
Write-Host "3. Add blank lines around code blocks" -ForegroundColor White
Write-Host "4. Add language specifiers to code blocks" -ForegroundColor White
Write-Host "5. Fix table formatting" -ForegroundColor White
