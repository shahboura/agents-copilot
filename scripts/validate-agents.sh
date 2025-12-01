#!/usr/bin/env bash
# validate-agents.sh - Validates agent and subagent integrity, multi-profile presence, and memory files
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

errors=0
warnings=0

ok() { echo -e "${GREEN}✓${NC} $1"; }
err() { echo -e "${RED}✗${NC} $1"; ((errors++)); }
warn() { echo -e "${YELLOW}⚠${NC} $1"; ((warnings++)); }

require_jq() {
  if ! command -v jq >/dev/null 2>&1; then
    err "jq not found. Install jq to use this script."; exit 1
  fi
}

validate_agent_file() {
  local file="$1"
  if [ ! -f "$file" ]; then
    err "Missing agent file: $file"
    return
  fi
  if ! head -n 1 "$file" | grep -q '^---$'; then
    warn "No frontmatter in: $file"
  fi
  local fm=$(awk '/^---$/{if(++n==2)exit;next}n==1' "$file")
  [[ -n "$fm" ]] && echo "$fm" | grep -q 'description:' || warn "Missing description in: $file"
  [[ -n "$fm" ]] && echo "$fm" | grep -q 'mode:' || warn "Missing mode in: $file"
  ok "Validated agent file: $file"
}

validate_registry_entries() {
  local registry="registry.json"
  [ -f "$registry" ] || { err "registry.json not found"; return; }
  if ! jq empty "$registry" 2>/dev/null; then
    err "registry.json invalid JSON"; return
  fi
  ok "registry.json is valid JSON"

  # Agents present
  local agent_paths=$(jq -r '.components.agents[].path' "$registry")
  while IFS= read -r path; do
    validate_agent_file "$path"
  done <<< "$agent_paths"

  # Multi-profile check
  for p in dotnet-developer python-developer typescript-developer generic-developer; do
    if jq -e ".profiles[\"$p\"]" "$registry" >/dev/null 2>&1; then
      ok "Profile exists: $p"
    else
      warn "Missing profile: $p"
    fi
  done
}

validate_memory() {
  local mem_dir=".opencode/memory/agents"
  if [ ! -d "$mem_dir" ]; then
    warn "Memory agents directory missing: $mem_dir"
    return
  fi
  for f in codebase-agent.json documentation-agent.json; do
    if [ ! -f "$mem_dir/$f" ]; then
      warn "Missing memory file: $mem_dir/$f"
    else
      ok "Memory file present: $mem_dir/$f"
    fi
  done
}

main() {
  echo "════════ Agent Validation ─────────────────────────────"
  require_jq
  validate_registry_entries
  validate_memory
  echo "──────────────── Summary ──────────────────────────────"
  echo "Errors: $errors  Warnings: $warnings"
  if [ $errors -gt 0 ]; then
    echo "Result: FAIL"; exit 1
  else
    echo "Result: PASS (warnings allowed)"; exit 0
  fi
}

main "$@"
