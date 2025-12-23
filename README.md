# GitHub Copilot Custom Agents

[![Validate Agents](https://github.com/shahboura/agents-copilot/actions/workflows/validate.yml/badge.svg)](https://github.com/shahboura/agents-copilot/actions/workflows/validate.yml)
[![Documentation](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://shahboura.github.io/agents-copilot/)

Specialized GitHub Copilot agents for intelligent, plan-first development workflows.

**Agents:** @planner • @orchestrator • @codebase • @docs • @review • @em-advisor

---

## 🚀 Quick Start (60 seconds)

### Use an Agent

1. Open GitHub Copilot Chat: `Ctrl+Shift+I` (or `Cmd+Shift+I`)
2. Select an agent: `@codebase`, `@planner`, `@review`, etc.
3. Describe what you want:

   ```bash
   @codebase Create a user REST API endpoint with JWT authentication
   ```

**The agent will:**

- 📋 Propose a step-by-step plan
- ⏸️ Wait for your approval
- 🔨 Implement with validation
- ✨ Suggest next steps (docs, review, etc.)

---

## 📚 Core Concepts

### 6 Specialized Agents

| Agent | Purpose | Use For |
|-------|---------|---------|
| **@planner** | Read-only planning | Complex features, refactoring, risk assessment |
| **@orchestrator** | Multi-phase coordination | Complex workflows, multi-domain tasks |
| **@codebase** | Multi-language dev | Implementation, bug fixes, code generation |
| **@docs** | Documentation | README, API docs, guides |
| **@review** | Security & quality | Audits, performance, best practices |
| **@em-advisor** | Leadership guidance | Strategy, team dynamics, 1-on-1s |

**[👉 Full Agent Details](./docs/agents/README.md)**

---

## ⚡ Reusable Prompts

Invoke with `/` in Copilot Chat:

- `/create-readme` - Generate professional README
- `/code-review` - Comprehensive code review
- `/generate-tests` - Unit test generation
- `/architecture-review` - Architecture assessment & recommendations
- `/1-on-1-prep` - EM meeting prep
- `/architecture-decision` - ADR creation

**[👉 Learn More](./docs/prompts.md)**

---

## 🎯 Auto-Applied Coding Standards

No configuration needed. When you edit files, standards activate automatically:

| Pattern | Standards |
|---------|-----------|
| `.cs` / `.csproj` | .NET Clean Architecture, async/await, nullable types |
| `.py` | Python type hints, pytest, black formatting |
| `.ts` / `.tsx` | TypeScript strict mode, null safety |
| `.kt` | Kotlin null safety, coroutines, immutability |
| `.rs` | Rust ownership, Result types, clippy |
| `.dart` | Flutter/Dart null safety, testing |
| `.go` | Go modules, concurrency patterns |

**[👉 View All Standards](./docs/instructions.md)**

---

## 💡 Example Workflows

### Build Authentication System

```bash
@orchestrator Build JWT auth with endpoints, tests, security review, and docs
```

### Implement Feature Fast

```bash
@codebase Create user CRUD service with repository pattern and unit tests
```

### Code Review

```bash
@review Security and performance audit of auth module
```

**[👉 More Examples](./docs/workflows.md)**

---

## 🛠️ Customization

Add project context to `.github/copilot-instructions.md`:

```markdown
## Your Project

Multi-language microservices using:
- Clean Architecture (.NET)
- FastAPI (Python)
- React TypeScript

## Your Standards
- Async/await on all I/O
- Repository pattern for data

---

## 📦 Documentation & Deployment

- [Getting Started](./docs/getting-started.md)
- [Agents](./docs/agents/README.md)
- [Workflows](./docs/workflows.md)
- [Customization](./docs/customization.md)
- [Troubleshooting](./docs/troubleshooting.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- Unit tests for public methods
```

Agents automatically use this context!

**[👉 Full Customization Guide](./docs/customization.md)**

---

## ❓ FAQ & Troubleshooting

**Q: How do I get agents to show up?**  
A: Ensure files are in `.github/agents/` with `.agent.md` extension. Reload VS Code.

**Q: How do I modify agent behavior?**  
A: Edit `.github/agents/[agent-name].agent.md` directly.

**Q: Do agents save context between sessions?**  
A: Yes! They update `.github/copilot-instructions.md` automatically (with your approval).

**[👉 Full FAQ](./docs/troubleshooting.md)**

---

## 📖 Full Documentation
