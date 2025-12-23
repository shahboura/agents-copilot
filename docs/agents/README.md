---
layout: default
title: Agents
nav_order: 2
has_children: true
---

# GitHub Copilot Agents

Six specialized agents, each excelling at specific tasks.

## Overview

|Agent|Specialization|Key Capability|
|-------|---|---|
|@planner|Planning|Read-only analysis and planning|
|@orchestrator|Coordination|Multi-phase workflows|
|@codebase|Development|Multi-language implementation|
|@docs|Documentation|README, API docs, guides|
|@review|Quality|Security, performance, best practices|
|@em-advisor|Leadership|Strategy, team dynamics|

---

## When to Use Each Agent

- **@planner** - Analyzes, plans, identifies risks (no code edits)
- **@codebase** - Writes code, runs tests, validates (multi-language)
- **@orchestrator** - Manages phases, delegates to specialists
- **@review** - Security audits, performance checks, best practices
- **@docs** - README, API docs, user guides
- **@em-advisor** - 1-on-1 prep, strategy, team issues

---

## Agent Capabilities

### Read & Search

All agents can:

- Read code and documentation
- Search by filename and content
- Analyze codebase patterns
- Find all usages of functions/classes

### Edit & Create

Only some agents can:

- **@codebase** - Full edit access
- **@orchestrator** - Full edit access
- **@docs** - Documentation edit access
- **@review** - Read-only (no edits)
- **@planner** - Read-only (no edits)
- **@em-advisor** - Read-only (no edits)

### Execute

Some agents can run commands:

- **@codebase** - Run tests, builds, linters
- **@orchestrator** - Run tests, builds, terminal commands

### External Resources

All agents can:

- Fetch documentation from web
- Look up best practices
- Reference external APIs

---

## Agent Workflow

### Phase 1: Planning

Agent analyzes your request and proposes a plan.

### Phase 2: Approval

You review and approve before any changes.

### Phase 3: Execution

Agent implements step-by-step with validation.

### Phase 4: Handoff

Agent suggests next steps (review, document, etc.).

---

## Quick Examples

### Example 1: Build Authentication

```
@orchestrator Build JWT authentication with:
- Login/logout endpoints
- Refresh tokens
- Rate limiting
- Comprehensive tests
- Security review
- API documentation
```

**Flow:**

1. Plan created → You approve
2. @codebase implements endpoints
3. @review audits for security
4. @codebase addresses findings
5. @docs creates API docs
6. Done!

### Example 2: Fix a Bug

```
@codebase Fix: Users can't update their profile picture
- Identify root cause
- Implement fix
- Add tests to prevent regression
- Validate with existing tests
```

### Example 3: Code Review

```
@review Audit the payment processing module for:
- Security vulnerabilities
- Performance issues
- Best practices violations
```

---

## Profile Auto-Detection

@codebase automatically detects your project type:

|Detection|Language|Adaptations|
|-----------|----------|-------------|
|`*.sln`, `*.csproj`|.NET|Clean Architecture, async/await, nullable types|
|`pyproject.toml`, `requirements.txt`|Python|Virtual env, type hints, pytest|
|`package.json`, `tsconfig.json`|TypeScript|Strict types, incremental builds|
|Mixed or unclear|Generic|Language-agnostic patterns|

**Tip:** Mention your language if detection is ambiguous:

```
@codebase Using TypeScript with React, create...
```

---

## Agent Handoffs

Agents can hand off to each other seamlessly:

```
@codebase (implement)
  ↓ handoff
@review (audit)
  ↓ handoff
@docs (document)
```

Each handoff includes context, so the next agent understands the full picture.

---

## Context Persistence

Agents automatically save important decisions to `.github/copilot-instructions.md`:

- Architectural patterns established
- Coding standards developed
- Project-specific conventions
- Technical constraints

This context is reused in all future sessions!

---

## Next Steps

- **[View Workflows](../workflows.md)** - See real-world examples
- **[Customization](../customization.md)** - Adapt agents to your project
- **[Getting Started](../getting-started.md)** - Quick setup guide
