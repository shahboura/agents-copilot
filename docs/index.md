---
layout: default
title: Home
nav_order: 0
description: "Specialized GitHub Copilot agents for intelligent, plan-first development workflows"
permalink: /
---

# GitHub Copilot Agents

{: .fs-9 }

Specialized agents for intelligent, plan-first development workflows.
{: .fs-6 .fw-300 }

[Get Started](getting-started.md){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[View on GitHub](https://github.com/shahboura/agents-copilot){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## What Are Agents?

Specialized versions of GitHub Copilot that excel at specific tasks:

- **@planner** - Analyzes and plans (read-only)
- **@orchestrator** - Coordinates multi-phase projects
- **@codebase** - Implements features (multi-language)
- **@docs** - Creates documentation
- **@review** - Audits security & quality
- **@em-advisor** - Helps with leadership decisions

## Quick Start

1. Open GitHub Copilot Chat: `Ctrl+Shift+I` (or `Cmd+Shift+I`)
2. Select an agent (e.g., `@codebase`)
3. Describe your task:

```
@codebase Create a REST API endpoint for user authentication with JWT
```

The agent will propose a plan, wait for approval, then implement step-by-step.

## Key Features

### 🎯 Plan-First Workflow

Agents propose detailed plans before making changes. You review and approve.

### 🔧 Auto-Applied Standards

File-specific coding standards activate automatically:

- `**/*.cs` → .NET Clean Architecture
- `**/*.py` → Python type hints & testing
- `**/*.ts` → TypeScript strict mode
- And more...

### 🤝 Agent Collaboration

Agents work together for complex tasks:

```
orchestrator → @codebase (implement) 
           → @review (audit)
           → @docs (document)
```

### 📝 Context Persistence

Agents read/write project context to `.github/agents.md` for continuity.

## Documentation

- [Getting Started](getting-started.md) - 5-minute quickstart
- [Agents](agents/) - Detailed agent capabilities
- [Workflows](workflows.md) - Real-world examples
- [Customization](customization.md) - Adapt to your project
- [Troubleshooting](troubleshooting.md) - Common issues
 - [Deployment](DEPLOYMENT.md) - GitHub Pages setup

## Why Use Agents?

✅ **Consistent quality** - Standards applied automatically  
✅ **Reduced errors** - Plan-first approach catches issues early  
✅ **Better documentation** - Specialized agent keeps docs current  
✅ **Security by default** - Review agent audits changes  
✅ **Team alignment** - Shared context and workflows

---

## License

MIT License - see [LICENSE](https://github.com/shahboura/agents-copilot/blob/main/LICENSE)
