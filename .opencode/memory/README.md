---
description: "Persistent agent memory schema and maintenance guidelines"
---

# Agent Memory Persistence

Persistent memory supplements ephemeral session data (`.tmp/sessions/*`). It stores durable summaries of decisions, architecture choices, and documentation deltas enabling seamless work resumption.

## Directory Structure
```
.opencode/memory/
└── agents/
    ├── codebase-agent.json
    ├── documentation-agent.json
    └── generic.json (optional shared store)
```

## JSON Entry Schema (per agent file)
```json
{
  "entries": [
    {
      "timestamp": "2025-12-01T12:00:00Z",
      "profile": "dotnet-developer",
      "task_id": "auth-impl-03",
      "decisions": ["Introduced repository pattern", "Applied SOLID segregation"],
      "followups": ["Add integration tests for token refresh"],
      "tags": ["architecture", "auth"],
      "context_index": ["src/Auth", "tests/Auth"]
    }
  ],
  "historical": []
}
```

## Compaction Strategy
- Keep max 150 `entries` elements.
- When exceeding, move oldest 50 to `historical`.
- If file > 256 KB, collapse all but last 20 entries into a single historical aggregate item: `{ "range": "2025-10-01..2025-11-15", "count": 80 }`.

## Update Protocol
1. Read existing file.
2. Append new entry.
3. Run compaction rules.
4. Write back atomically: write to temp file → move to target.
5. If write fails, create `.opencode/memory/recovery-{timestamp}.json`.

## Usage Patterns
- Codebase Agent: Append after each implementation checkpoint commit.
- Documentation Agent: Append after each approved doc change set.
- Other Agents: May append summaries of cross-cutting changes.

## Privacy & Safety
- Do NOT store secrets, credentials, or full code listings.
- Only store summaries, identifiers, and relative paths.
- Purge sensitive tokens before writing entries.

## Extensibility
Add new agent memory file when introducing a new orchestrator agent. Ensure validation script checks presence.

