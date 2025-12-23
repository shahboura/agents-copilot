---
description: Analyze code and create a detailed refactoring plan
agent: planner
---

# Refactor Planning Prompt

Analyze the codebase and create a comprehensive refactoring plan without making any changes.

## Analysis Scope

Specify what to analyze:
- [ ] Entire codebase
- [ ] Specific module/package
- [ ] Selected files
- [ ] Code pattern across project

## Refactoring Goals

What are we trying to achieve?
- [ ] Improve code maintainability
- [ ] Reduce technical debt
- [ ] Improve performance
- [ ] Better separation of concerns
- [ ] Update to modern patterns
- [ ] Simplify complexity

## Analysis Steps

1. **Current State Assessment**
   - Identify code smells and anti-patterns
   - Measure complexity (cyclomatic complexity, nesting depth)
   - Find duplication (DRY violations)
   - Check SOLID principles adherence
   - Analyze dependencies and coupling

2. **Impact Analysis**
   - Identify all affected files
   - Find dependent code and consumers
   - Check test coverage
   - Estimate breaking change risk
   - Identify integration points

3. **Refactoring Strategy**
   - Prioritize changes by impact/effort
   - Define refactoring phases
   - Identify quick wins vs. major changes
   - Suggest incremental approach

## Output Format

Provide a detailed plan with:

```markdown
## Refactoring Plan: [Component/Module Name]

### Current State Analysis
**Issues Identified:**
1. [Issue 1] - Severity: Critical/High/Medium/Low
   - Location: [file:line]
   - Impact: [description]
   - Root cause: [why it exists]

2. [Issue 2]
   ...

**Metrics:**
- Files affected: [count]
- Complexity score: [metric]
- Code duplication: [percentage]
- Test coverage: [percentage]

### Proposed Changes

#### Phase 1: Foundation (Low Risk)
**Duration Estimate:** [X days/hours]

1. **Change:** [Description]
   - **Files:** [list]
   - **Rationale:** [why]
   - **Risk:** Low/Medium/High
   - **Testing:** [approach]

#### Phase 2: Core Refactoring (Medium Risk)
...

#### Phase 3: Integration (Higher Risk)
...

### Migration Path

**Before Refactoring:**
- [ ] Ensure all tests pass
- [ ] Create feature branch
- [ ] Backup critical data/config
- [ ] Document current behavior

**During Refactoring:**
- [ ] One phase at a time
- [ ] Run tests after each change
- [ ] Keep changes atomic
- [ ] Update documentation

**After Refactoring:**
- [ ] Regression testing
- [ ] Performance comparison
- [ ] Update dependent code
- [ ] Deploy incrementally

### Risk Mitigation

**Potential Risks:**
1. [Risk 1] - Mitigation: [strategy]
2. [Risk 2] - Mitigation: [strategy]

**Rollback Plan:**
[How to revert if needed]

### Success Criteria

- [ ] All tests pass
- [ ] No regression in functionality
- [ ] Improved code metrics
- [ ] Reduced complexity
- [ ] Better test coverage
- [ ] Documentation updated

### Alternative Approaches

**Option A:** [Different approach]
- Pros: [benefits]
- Cons: [drawbacks]

**Option B:** [Another approach]
- Pros: [benefits]
- Cons: [drawbacks]

**Recommended:** [Choice with rationale]
```

## Validation

After creating the plan:
- Review with team for feedback
- Estimate effort and timeline
- Get stakeholder approval
- Hand off to @codebase for implementation
