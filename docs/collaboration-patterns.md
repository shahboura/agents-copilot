---
layout: default
title: Agent Collaboration Patterns
nav_order: 6
---

# Agent Collaboration Patterns

Effective multi-agent workflows for complex tasks.

## Table of Contents

- [Core Collaboration Principles](#core-collaboration-principles)
- [Pattern Catalog](#pattern-catalog)
- [Handoff Best Practices](#handoff-best-practices)
- [Anti-Patterns to Avoid](#anti-patterns-to-avoid)
- [Collaboration Decision Tree](#collaboration-decision-tree)
- [Measuring Success](#measuring-success)
- [Advanced Patterns](#advanced-patterns)
- [Next Steps](#next-steps)

---

## Core Collaboration Principles

### 1. Sequential Handoffs

Agents pass work from one specialist to another in sequence.

```
@planner → @codebase → @review → @docs
```

**When to use:**

- Clear linear dependency chain
- Each phase builds on previous
- No parallel work possible

### 2. Orchestrated Workflows

Orchestrator coordinates multiple agents and phases.

```
@orchestrator
  ├─ Phase 1: @codebase (backend)
  ├─ Phase 2: @codebase (frontend)
  ├─ Phase 3: @review (security)
  ├─ Phase 4: @codebase (fixes)
  └─ Phase 5: @docs (documentation)
```

**When to use:**

- Complex multi-domain tasks
- Multiple implementation phases
- Need coordination and status tracking

### 3. Iterative Refinement

Agent cycles back for improvements based on feedback.

```
@codebase → @review → @codebase → @review ✓
```

**When to use:**

- Security-critical features
- Performance optimization
- Quality gate enforcement

### 4. Parallel-then-Merge

Multiple agents work independently, then integrate.

```
@codebase (backend) ─┐
                     ├─→ @orchestrator (merge) → @review
@codebase (frontend) ─┘
```

**When to use:**

- Independent components
- Different technical stacks
- Speed optimization

---

## Pattern Catalog

### Pattern: Feature Development

**Goal:** Implement new feature from idea to production-ready.

**Flow:**

```
1. @planner     - Analyze requirements, propose architecture
2. @codebase    - Implement with tests
3. @review      - Security and quality audit
4. @codebase    - Address review findings
5. @docs        - API documentation and guides
6. @review      - Final approval
```

**Example:**

```
User: @planner Design user notification system with email and push

↓ Agent analyzes and proposes architecture ↓

User: @codebase Implement the plan

↓ Agent builds feature with tests ↓

User: @review Security audit

↓ Agent identifies rate limiting gap ↓

User: @codebase Add rate limiting

↓ Agent implements fix ↓

User: @docs Document API endpoints

↓ Complete! ↓
```

---

### Pattern: Refactoring Large Module

**Goal:** Safely refactor without breaking functionality.

**Flow:**

```
1. @planner     - Analyze current code, identify issues
2. @planner     - Propose incremental refactoring plan
3. @codebase    - Execute phase 1
4. @review      - Verify no regressions
5. @codebase    - Execute phase 2
6. @review      - Verify no regressions
7. ...repeat...
8. @docs        - Update architecture docs
```

**Key Success Factor:** Incremental changes with continuous validation.

---

### Pattern: Production Incident

**Goal:** Debug and fix production issue quickly.

**Flow:**

```
1. @planner     - Analyze logs, identify root cause
2. @codebase    - Implement hotfix
3. @review      - Quick security check
4. @docs        - Update runbook
5. @planner     - Plan long-term solution
```

**Emergency Mode:** Skip formal planning, prioritize speed with review.

---

### Pattern: Technical Debt Reduction

**Goal:** Systematically reduce technical debt.

**Flow:**

```
1. @review      - Audit codebase, identify debt
2. @planner     - Prioritize issues, create roadmap
3. @orchestrator - Coordinate multi-phase cleanup
   ├─ @codebase  - Fix category 1 issues
   ├─ @codebase  - Fix category 2 issues
   └─ @docs      - Update standards
```

---

### Pattern: API Design

**Goal:** Design robust, user-friendly API.

**Flow:**

```
1. @docs        - Draft API specification (OpenAPI)
2. @planner     - Review design, suggest improvements
3. @codebase    - Implement endpoints
4. @review      - API security audit
5. @docs        - Create usage examples
6. @docs        - Generate client SDKs
```

**Documentation-First Approach:** Design API contract before implementation.

---

### Pattern: Performance Optimization

**Goal:** Improve system performance systematically.

**Flow:**

```
1. @planner     - Analyze metrics, identify bottlenecks
2. @codebase    - Add performance tests/benchmarks
3. @codebase    - Implement optimization
4. @codebase    - Measure improvement
5. @review      - Verify no functionality broken
6. If not sufficient: repeat steps 3-5
7. @docs        - Document performance characteristics
```

---

### Pattern: Security Hardening

**Goal:** Comprehensive security improvement.

**Flow:**

```
1. @review      - Security audit (OWASP Top 10)
2. @planner     - Prioritize findings
3. @codebase    - Implement critical fixes
4. @review      - Verify fixes
5. @codebase    - Implement high priority
6. @review      - Verify fixes
7. ...continue...
8. @docs        - Security documentation
9. /security-audit - Generate final report
```

---

### Pattern: Microservices Migration

**Goal:** Extract service from monolith.

**Flow:**

```
1. /architecture-review - Assess current architecture
2. @planner            - Design migration strategy
3. @orchestrator       - Coordinate migration phases
   ├─ Phase 1: @codebase - Extract domain logic
   ├─ Phase 2: @codebase - Database split
   ├─ Phase 3: @codebase - API layer
   ├─ Phase 4: @codebase - Data migration
   ├─ Phase 5: @review   - Integration testing
   └─ Phase 6: @docs     - Architecture docs
```

---

### Pattern: Team Leadership Decision

**Goal:** Make informed technical or people decision.

**Flow:**

```
1. @em-advisor   - Analyze situation, provide framework
2. @planner      - Technical feasibility (if applicable)
3. @em-advisor   - Communication strategy
4. @docs         - Document decision (ADR/memo)
```

**Example Decisions:**

- Technology adoption
- Team restructuring
- Promotion decisions
- Performance improvement plans

---

## Handoff Best Practices

### Clear Context Passing

```
✅ Good:
@review Audit payment processing module (src/payments/) for:
- PCI compliance
- Proper error handling
- Rate limiting
- No sensitive data in logs

❌ Poor:
@review Check the payment code
```

### Explicit Requirements

```
✅ Good:
@codebase Implement rate limiter:
- 100 requests/hour per user
- Redis-backed
- Exponential backoff
- Admin bypass capability

❌ Poor:
@codebase Add rate limiting
```

### Accept Context Updates

When agents propose updating `AGENTS.md`, accept to maintain continuity.

---

## Anti-Patterns to Avoid

### ❌ Skipping Planning

```
Bad: @codebase Just build a user system
Better: @planner Design user system → @codebase Implement
```

### ❌ No Review Step

```
Bad: @codebase Implement → Deploy
Better: @codebase Implement → @review Audit → Deploy
```

### ❌ Documentation Afterthought

```
Bad: Build everything → @docs Document at the end
Better: Interleave documentation throughout
```

### ❌ Over-Orchestration

```
Bad: @orchestrator for every small task
Better: Use @orchestrator only for multi-phase, multi-domain work
```

### ❌ Wrong Agent for Task

```
Bad: @em-advisor write code
Better: Each agent for their specialization
```

---

## Collaboration Decision Tree

```
Is task complex with multiple phases?
├─ YES → Use @orchestrator
└─ NO
    │
    Is code change needed?
    ├─ YES
    │   │
    │   Is security critical?
    │   ├─ YES → @planner → @codebase → @review → @codebase
    │   └─ NO → @codebase → @review
    │
    └─ NO
        │
        Is planning/analysis needed?
        ├─ YES → @planner
        └─ NO
            │
            Is documentation needed?
            ├─ YES → @docs
            └─ NO → @review or @em-advisor
```

---

## Measuring Success

### Effective Collaboration Indicators

✅ Clear handoffs between agents  
✅ Each agent used for their specialization  
✅ Issues caught in review phase, not production  
✅ Documentation stays current  
✅ Plans approved before implementation  

### Red Flags

⚠️ Frequently rewriting implementations  
⚠️ Security issues found late  
⚠️ Documentation outdated  
⚠️ Skipping review steps  
⚠️ Using wrong agent for tasks  

---

## Advanced Patterns

### Pattern: A/B Test Implementation

```
@planner     - Design experiment
@codebase    - Implement both variants
@codebase    - Add feature flags
@codebase    - Add metrics tracking
@review      - Verify statistical validity
@docs        - Document experiment setup
```

### Pattern: API Version Migration

```
@docs        - Document v1 → v2 differences
@planner     - Design migration strategy
@codebase    - Implement v2
@codebase    - Add deprecation warnings to v1
@docs        - Client migration guide
```

### Pattern: Incident Postmortem

```
@planner     - Analyze incident timeline
@review      - Identify root causes
@codebase    - Implement preventive measures
@docs        - Write postmortem report
@docs        - Update runbooks
```

---

## Next Steps

- **[Workflows](workflows.md)** - See these patterns in action
- **[Agents Guide](agents/README.md)** - Deep dive into each agent
- **[Prompts](prompts.md)** - Slash commands for common patterns
