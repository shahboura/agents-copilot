---
layout: default
title: Workflows
nav_order: 5
---

# Real-World Workflows

See agents working together on realistic projects.

---

## Workflow 1: Build REST API (30 min)

**Goal:** Create a user management REST API with JWT authentication.

### Step 1: Plan the Architecture

```
@planner Create plan for user API with:
- User entity (email, password, name)
- CRUD endpoints
- JWT authentication
- Input validation
- Error handling
- Unit tests
```

**Agent proposes:**

- Domain entities (User, JwtToken)
- Service layer (UserService, AuthService)
- Repository pattern for data
- Middleware for JWT validation
- Comprehensive test suite

**You review and approve** ✓

### Step 2: Implement the Code

```
@codebase Implement the plan above. Use .NET Clean Architecture with:
- Entity Framework for data access
- Repository pattern
- Dependency injection
- xUnit + Moq for testing
```

**Agent:**

- Creates User entity with validation
- Implements UserRepository with EF Core
- Builds UserService with business logic
- Creates API controllers
- Adds comprehensive tests
- Validates build and tests pass

### Step 3: Security Review

```
@review Audit the authentication module for:
- Password hashing security
- JWT token expiration
- Rate limiting needs
- SQL injection prevention
- Input validation completeness
```

**Agent identifies:**

- ⚠️ Missing rate limiting on login
- ⚠️ No token refresh mechanism
- ✅ Passwords properly hashed with bcrypt

### Step 4: Fix Issues

```
@codebase Implement the findings:
- Add rate limiting to login endpoint
- Add refresh token mechanism
- Update tests
```

### Step 5: Document API

```
@docs Create API documentation showing:
- All endpoints with examples
- Authentication flow
- Error responses
- Setup instructions
```

**Workflow Complete!** 🎉

Agents handled: Planning → Implementation → Security → Fixes → Documentation

---

## Workflow 2: Refactor Monolith Module (1-2 hours)

**Goal:** Refactor user management from procedural to Clean Architecture.

### Step 1: Analyze Current State

```
@planner Analyze current user management code:
- Identify tight coupling issues
- Find code duplication
- Map dependencies
- Propose layered structure
```

### Step 2: Create Migration Plan

```
@planner Create refactoring plan:
- Keep all functionality identical
- Migrate incrementally
- Ensure tests don't break
- Minimize risk
```

### Step 3: Execute Migration

```
@codebase Execute refactoring plan step-by-step:
- Create new domain layer
- Extract business logic to services
- Implement repository pattern
- Migrate tests
- Remove old code
- Validate all tests pass
```

### Step 4: Quality Check

```
@review Verify refactoring quality:
- Architecture follows standards
- No functionality broken
- Performance unchanged
- Code readability improved
```

---

## Workflow 3: Create Python Data Pipeline (45 min)

**Goal:** Build data validation pipeline with testing.

### Step 1: Plan Architecture

```
@planner Design data pipeline:
- Input validation
- Transformation logic
- Error handling
- Logging
- Unit tests
```

### Step 2: Implement Pipeline

```
@codebase Implement using Python best practices:
- Type hints on all functions
- Context managers for file handling
- Async for I/O operations
- pytest for testing
- Docstrings for all functions
```

**Agent creates:**

- Validators with type hints
- Async data loader
- Data transformer
- Comprehensive tests
- Proper logging

### Step 3: Test Coverage

```
@codebase Generate tests for:
- Happy path scenarios
- Edge cases (empty data, invalid formats)
- Error conditions
```

### Step 4: Document

```
@docs Create README with:
- Usage examples
- Configuration
- Error handling guide
```

---

## Workflow 4: Code Review & Improvement (20 min)

**Goal:** Review payment processing module before production.

### Step 1: Request Security Review

```
@review Audit payment processing for:
- PCI compliance
- Token handling
- Error messaging (no sensitive data)
- Logging (no payment details)
- Rate limiting
```

### Step 2: Address Findings

```
@codebase Fix the identified issues:
- Remove sensitive data from logs
- Add rate limiting
- Improve error messages
- Add token expiration
```

### Step 3: Re-Review

```
@review Verify all issues resolved
```

**Production ready!** ✓

---

## Workflow 5: Leadership: Team Issues (30 min)

**Goal:** Prepare for difficult 1-on-1 about missed deadlines.

### Step 1: Prepare Conversation

```
@em-advisor Help me prepare for 1-on-1 with Jane:
- She's missed 3 deadlines in 2 weeks
- Great developer, unusual pattern
- I want to understand root cause
- Help structure conversation
```

**Advisor suggests:**

- Opening questions to understand issues
- Frameworks for discussion
- Questions to ask
- Action planning approach
- Follow-up plan

### Step 2: Document Meeting

```
@em-advisor After meeting, help me document:
- Key discussion points
- Root causes identified
- Action items
- Next steps
- Support I'm providing
```

**Result:** Clear support plan, team member feels heard, issues resolved

---

## Workflow 6: Multi-Phase Feature (2-3 hours)

**Goal:** Implement user notification system with database, services, and API.

### Step 1: Orchestrate the Project

```
@orchestrator Build notification system with:
- Database schema (notifications table)
- Service layer (notification logic)
- API endpoints (send, retrieve)
- Admin dashboard (view logs)
- Unit tests
- Security review
- API documentation
```

**Orchestrator breaks into phases:**

**Phase 1 - Data Layer** (@codebase)

- Create Notification entity
- Add migrations
- Implement NotificationRepository

**Phase 2 - Business Logic** (@codebase)

- Create NotificationService
- Add business rules
- Implement queuing if needed

**Phase 3 - API Layer** (@codebase)

- Create endpoints
- Add request validation
- Implement authentication

**Phase 4 - Testing** (@codebase)

- Unit tests per layer
- Integration tests

**Phase 5 - Security** (@review)

- Audit for vulnerabilities
- Check rate limiting
- Verify auth/authz

**Phase 6 - Fixes** (@codebase)

- Address security findings

**Phase 7 - Documentation** (@docs)

- API docs
- Setup guide
- Configuration

**Phase 8 - Final Check** (@review)

- Approve for deployment

**Complete Notification System** 🚀

---

## General Patterns

### ✅ DO: Start with Planning

Always let @planner propose before implementing.

### ✅ DO: Review Plans

Take time to review and refine proposed plans.

### ✅ DO: Use Handoffs

Let agents transition between roles automatically.

### ✅ DO: Save Context

Accept agent proposals to update `.github/copilot-instructions.md`.

### ❌ DON'T: Skip Planning

Jumping straight to implementation causes rework.

### ❌ DON'T: Ignore Review

Security and quality reviews catch issues early.

### ❌ DON'T: Skip Documentation

Document as you go, not after.

---

## Tips for Success

### Be Specific

```
✅ @codebase Create a rate limiter using Redis with 100 requests/hour per IP
❌ @codebase Add rate limiting
```

### Include Requirements

```
✅ @codebase Create payment processing with:
   - PCI compliance
   - Retry logic (3 attempts)
   - Timeout after 30s

❌ @codebase Create payment processing
```

### Leverage Context

```
✅ /code-review  (uses project standards automatically)
❌ @review Check this code
```

---

## Workflow 7: Microservices Migration (2-4 hours)

**Goal:** Extract user service from monolith to standalone microservice.

### Step 1: Architecture Review

```
/architecture-review Analyze current monolith focusing on:
- User module dependencies
- Database coupling
- API contracts
- Authentication flow
```

**Review identifies:**
- User module has clean boundaries
- Shared database needs splitting
- 12 API endpoints to migrate
- Auth tokens can remain centralized

### Step 2: Migration Plan

```
@planner Create incremental migration plan:
- Strangler pattern approach
- Database split strategy
- API gateway configuration
- Rollback procedures
```

### Step 3: Implement New Service

```
@codebase Create standalone user service:
- Copy user domain logic
- Create separate database
- Implement API endpoints
- Add health checks
- Configure Docker/K8s
```

### Step 4: Data Migration

```
@codebase Create data migration scripts:
- Extract user data
- Transform to new schema
- Sync changes during transition
- Validation checks
```

### Step 5: Integration Testing

```
@codebase Add integration tests:
- Test new service independently
- Test with API gateway
- Test fallback to monolith
- Performance benchmarks
```

### Step 6: Security & Performance Review

```
@review Audit microservice:
- Service-to-service auth
- Network security
- Performance impact
- Observability coverage
```

### Step 7: Document Architecture

```
@docs Create documentation:
- Architecture decision record (ADR)
- Deployment guide
- Rollback procedures
- Monitoring setup
```

**Migration Complete!** Monolith → Microservice ✓

---

## Workflow 8: Database Schema Migration (1 hour)

**Goal:** Add user preferences table with zero downtime.

### Step 1: Plan Migration

```
@planner Design schema change:
- New preferences table
- Foreign key to users
- Migration strategy (expand-migrate-contract)
- Backwards compatibility
```

### Step 2: Create Migration

```
@codebase Generate migration scripts:
- Up migration (create table)
- Down migration (rollback)
- Data seeding (defaults)
- Indexes for performance
```

### Step 3: Update Application Code

```
@codebase Update code:
- Add UserPreference entity
- Update repository pattern
- Add service methods
- Update API endpoints
```

### Step 4: Test Migration

```
@codebase Test on staging:
- Run migration
- Verify data integrity
- Test rollback
- Performance check
```

### Step 5: Documentation

```
@docs Document:
- Migration steps
- Rollback procedure
- New API endpoints
- Configuration changes
```

---

## Workflow 9: Error Monitoring Setup (45 min)

**Goal:** Integrate error tracking and alerting.

### Step 1: Plan Integration

```
@planner Design error monitoring:
- Tool selection (Sentry/Rollbar)
- Error categorization
- Alert thresholds
- Privacy considerations
```

### Step 2: Implement

```
@codebase Integrate error tracking:
- Add SDK dependencies
- Configure middleware
- Set up error grouping
- Add contextual logging
- Filter sensitive data
```

### Step 3: Configure Alerts

```
@codebase Set up alerting:
- Critical errors → PagerDuty
- High errors → Slack
- Error rate thresholds
- Escalation policies
```

### Step 4: Security Check

```
@review Verify:
- No PII in error logs
- Proper error sanitization
- Secret redaction
```

### Step 5: Runbook

```
@docs Create operations guide:
- Error response procedures
- Investigation checklist
- Common issues & solutions
```

---

## Workflow 10: API Versioning Strategy (1-2 hours)

**Goal:** Add API versioning without breaking existing clients.

### Step 1: Review Current API

```
/architecture-review Analyze API:
- Current endpoints
- Client usage patterns
- Breaking change needs
- Versioning options (URI/header/content negotiation)
```

### Step 2: Design Versioning

```
@planner Design version strategy:
- URI versioning (/v1/, /v2/)
- Deprecation policy
- Migration timeline
- Client communication plan
```

### Step 3: Implement V2 Endpoints

```
@codebase Create v2 API:
- New endpoint structure
- Maintain v1 compatibility
- Add version middleware
- Update routing
```

### Step 4: Documentation

```
@docs Create migration guide:
- v1 vs v2 differences
- Migration examples
- Deprecation timeline
- Support policy
```

### Step 5: Deprecation Notices

```
@codebase Add deprecation warnings:
- Response headers
- API docs badges
- Client logging
```

---

## Workflow 11: Team Onboarding (Engineering Manager)

**Goal:** Create effective onboarding for new team member.

### Step 1: Plan Onboarding

```
@em-advisor Create 30-60-90 day plan for senior backend engineer:
- Technical setup checklist
- Learning milestones
- Relationship building
- First projects
```

### Step 2: Documentation Review

```
@docs Audit onboarding docs:
- Are setup instructions current?
- Missing context?
- Architectural overview complete?
```

### Step 3: Buddy System

```
@em-advisor Design buddy program:
- Pairing schedule
- Knowledge transfer plan
- Check-in cadence
- Success metrics
```

### Step 4: First Project Selection

```
@planner Identify good first project:
- Touches multiple systems
- Has clear scope
- Provides learning
- Low production risk
```

---

## Agent Collaboration Patterns

### Pattern 1: Plan → Execute → Review

```mermaid
@planner → @codebase → @review
```

**Use for:** Feature development, refactoring, migrations

### Pattern 2: Orchestrated Multi-Phase

```mermaid
@orchestrator → [Phase 1: @codebase]
             → [Phase 2: @codebase]
             → [Phase 3: @review]
             → [Phase 4: @docs]
```

**Use for:** Complex features spanning multiple domains

### Pattern 3: Iterative Improvement

```mermaid
@codebase → @review → @codebase → @review
```

**Use for:** Security-critical code, performance optimization

### Pattern 4: Documentation-First

```mermaid
@docs → @planner → @codebase → @docs
```

**Use for:** API design, public interfaces

### Pattern 5: Analysis & Decision

```mermaid
@planner → @em-advisor → @orchestrator
```

**Use for:** Strategic decisions, technology selection

---

## Next Steps

- **[Agents Guide](./agents/README.md)** - Deep dive into each agent
- **[Prompts](./prompts.md)** - Slash command reference
- **[Customization](./customization.md)** - Tailor to your project
