# GitHub Copilot Custom Agents

[![Validate Agents & Documentation](https://github.com/shahboura/agents-copilot/actions/workflows/validate.yml/badge.svg)](https://github.com/shahboura/agents-copilot/actions/workflows/validate.yml)
[![Documentation](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://shahboura.github.io/agents-copilot/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Last Commit](https://img.shields.io/github/last-commit/shahboura/agents-copilot)](https://github.com/shahboura/agents-copilot/commits/main)

**6 specialized AI agents** for intelligent development workflows. Multi-language support with auto-applied coding standards.

## 🚀 Installation

**Manual Installation:**

1. **Clone or download** this repository
2. **Copy agent files** to your project:

   ```bash
   # Copy agent configurations
   cp -r .github/agents/ ~/.config/agents-copilot/

   # Copy language instructions
   cp -r .github/instructions/ ~/.config/agents-copilot/instructions/

   # Copy reusable prompts
   cp -r .github/prompts/ ~/.config/agents-copilot/prompts/

   # Copy session log template (if not exists)
   cp AGENTS.md ~/.config/agents-copilot/ 2>/dev/null || true
   ```

**Installation Locations:**

- **Global:** `~/.config/agents-copilot/` (Linux/macOS/Windows)
- **Project:** Copy files directly to your project directory

**That's it!** Agents are ready to use. No configuration needed.

---

## 🎯 Quick Start

1. **Install** (above)
2. **Run:** Configure your preferred chat interface
3. **Use:** `@orchestrator Build a REST API with JWT auth`

**That's it!** Agents handle planning, implementation, testing, and documentation automatically.

## 🤖 Available Agents

| Agent | Purpose |
|-------|---------|
| `@orchestrator` | Strategic planning & coordination |
| `@planner` | Read-only analysis & planning |
| `@codebase` | Multi-language implementation |
| `@docs` | Documentation generation |
| `@review` | Security & quality audits |
| `@em-advisor` | Leadership & team guidance |

## 🌟 Key Features

- **11+ Languages** with auto-applied standards (.NET, Python, TypeScript, Flutter, Go, etc.)
- **Context Aware** - Learns from your `AGENTS.md` file
- **Session Logging** - Automatic summaries between conversations
- **Multi-Agent Workflows** - Agents can hand off to each other
- **Zero Config** - Works out of the box

## 📚 Examples

```bash
@orchestrator Build JWT auth with endpoints, tests, security review, and docs
@codebase Create user CRUD service with repository pattern and unit tests
@review Security and performance audit of auth module
@planner Analyze codebase architecture and suggest improvements
```

---

---

## Table of Contents

- [📚 Core Concepts](#-core-concepts)
- [⚡ Reusable Prompts](#-reusable-prompts)
- [🎯 Auto-Applied Coding Standards](#-auto-applied-coding-standards)
- [💡 Example Workflows](#-example-workflows)
- [🛠️ Customization](#️-customization)
- [❓ FAQ & Troubleshooting](#-faq--troubleshooting)
- [📖 Full Documentation](#-full-documentation)

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

|Agent|Purpose|Use For|
|-------|---------|---------|
|**@planner**|Read-only planning|Complex features, refactoring, risk assessment|
|**@orchestrator**|Multi-phase coordination|Complex workflows, multi-domain tasks|
|**@codebase**|Multi-language dev|Implementation, bug fixes, code generation|
|**@docs**|Documentation|README, API docs, guides|
|**@review**|Security & quality|Audits, performance, best practices|
|**@em-advisor**|Leadership guidance|Strategy, team dynamics, 1-on-1s|

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

|Pattern|Standards|
|---------|-----------|
|`.cs` / `.csproj`|.NET Clean Architecture, async/await, nullable types|
|`.py`|Python type hints, pytest, black formatting|
|`.ts` / `.tsx`|TypeScript strict mode, null safety|
|`.kt`|Kotlin null safety, coroutines, immutability|
|`.rs`|Rust ownership, Result types, clippy|
|`.dart`|Flutter/Dart null safety, testing|
|`.go`|Go modules, concurrency patterns|

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
