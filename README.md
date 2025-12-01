<div align="center">

# OpenAgents

### GitHub Copilot Custom Agents for Plan-First Development

[![GitHub stars](https://img.shields.io/github/stars/darrenhinde/OpenAgents?style=social)](https://github.com/darrenhinde/OpenAgents/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub last commit](https://img.shields.io/github/last-commit/darrenhinde/OpenAgents)](https://github.com/darrenhinde/OpenAgents/commits/main)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/darrenhinde/OpenAgents/pulls)

**Specialized agents:** @codebase • @docs • @review  
**Auto-detection:** TypeScript • Python • .NET • Generic  
**Workflow:** Plan → Approve → Implement → Review

</div>

---

## Quick Start

### 1. Copy Agents to Your Project
```bash
# Clone this repository
git clone https://github.com/darrenhinde/OpenAgents.git

# Copy agent files to your project
mkdir -p your-project/.github/agents
cp OpenAgents/.github/agents/*.agent.md your-project/.github/agents/

# Or use them directly in this repo (already configured)
```

### 2. Start Using Agents

**In VS Code:**
1. Open GitHub Copilot Chat (Ctrl+Shift+I or Cmd+Shift+I)
2. Select agent from dropdown: `@codebase`, `@docs`, or `@review`
3. Describe what you want

**Example:**
```
@codebase Create a REST API endpoint for user authentication with JWT
```

The agent will:
1. ✅ Propose an implementation plan
2. ⏸️ Wait for your approval  
3. 🔨 Implement step-by-step with validation
4. ✨ Suggest handoffs to @docs or @review

---

## Available Agents

### 🔧 @codebase - Development Agent
Multi-language implementation specialist with profile auto-detection.

**Detects and adapts to:**
- **.NET** - Clean Architecture, async/await, nullable types
- **Python** - Type hints, virtual env, testing  
- **TypeScript** - Strict types, build validation
- **Generic** - Polyglot projects

**Use for:**
- Feature implementation
- Bug fixes
- Refactoring
- Code generation

### 📝 @docs - Documentation Agent
Creates and maintains documentation with consistent formatting.

**Use for:**
- README files
- API documentation
- Architecture docs
- User guides

### 🔍 @review - Code Review Agent
Security and quality-focused reviewer.

**Use for:**
- Security audits
- Performance reviews
- Best practices validation
- Code quality checks

---

## Example Workflows

### Feature Implementation
```
@codebase Create a user service with CRUD operations following repository pattern.
Include:
- UserService with dependency injection
- IUserRepository interface
- Entity Framework implementation  
- Unit tests using xUnit and Moq
```

**Agent response:**
```markdown
DIGGING IN...

Detected active profile: dotnet

## Implementation Plan
1. Create domain entities and interfaces
2. Implement repository pattern with EF Core
3. Create service layer with DI
4. Add unit tests with Moq
5. Validate with dotnet build & test

Approval needed before proceeding.
```

### Documentation Update
```
@docs Update README with:
- New authentication endpoints
- JWT configuration steps
- Example requests/responses
```

### Code Review
```
@review Audit the authentication module for security issues
```

---

## Workflow Features

### ✅ Plan-First Approach
Every agent proposes a plan before executing. You review and approve before any changes.

### 🔄 Step-by-Step Execution  
Agents implement one step at a time, validating after each step.

### 🎯 Profile Auto-Detection
The @codebase agent detects your project type and adapts:

| Profile | Detection | Adaptations |
|---------|-----------|-------------|
| **dotnet** | `*.sln`, `*.csproj` | Clean Architecture, async/await, nullable types |
| **python** | `pyproject.toml`, `requirements.txt` | Virtual env, type hints, pytest |
| **typescript** | `package.json`, `tsconfig.json` | Strict types, incremental builds |
| **generic** | Mixed or unclear | Language-agnostic patterns |

### 🔗 Agent Handoffs
Seamless transitions between specialized agents:
```
@codebase → @review → @docs
```

Each agent suggests relevant next steps with pre-filled prompts.

---

## Customization

### Add Project Context
Create `.github/copilot-instructions.md` to provide project-specific context:

```markdown
# Project Context
This is a microservices architecture using:
- Clean Architecture pattern
- CQRS with MediatR
- Entity Framework Core
- JWT authentication

## Coding Standards
- Use async/await for all I/O operations
- Apply repository pattern for data access
- Write unit tests for all public methods
- Follow conventional commits format

## Architecture

```
src/
├── Domain/           # Entities, ValueObjects, Interfaces
├── Application/      # Services, DTOs, Validators  
├── Infrastructure/   # DbContext, Repositories
└── WebAPI/           # Controllers, Program.cs
```


Agents will automatically use this context!

---

## Installation Options

### Option 1: Per-Project (Recommended)
Copy agent files directly into your project:
```bash
mkdir -p .github/agents
cp path/to/OpenAgents/.github/agents/*.agent.md .github/agents/
```

### Option 2: Reference from This Repo
Clone once, reference from multiple projects:
```bash
# In your .github/copilot-instructions.md
See agent definitions at: https://github.com/darrenhinde/OpenAgents
```

### Option 3: Fork and Customize
1. Fork this repository
2. Modify agents in `.github/agents/`
3. Reference your fork in projects

---

## Agent File Structure

```
.github/agents/
├── codebase.agent.md   # Development specialist
├── docs.agent.md       # Documentation specialist
└── review.agent.md     # Code review specialist
```

Each agent file contains:
- **YAML frontmatter** - Configuration (name, description, tools, handoffs)
- **Markdown body** - Instructions and guidelines

Example structure:
```markdown
---
name: codebase
description: Multi-language development agent
tools: ['read', 'edit', 'write', 'search']
handoffs:
  - label: Generate Documentation
    agent: docs
    prompt: Create docs for changes above
---

# Agent Instructions
Your detailed instructions here...
```

---

## Best Practices

### 1. Be Specific in Prompts
❌ "Add authentication"  
✅ "Create JWT authentication with refresh tokens, rate limiting, and secure password hashing using bcrypt"

### 2. Review Plans Carefully
Always review the proposed implementation plan before approving.

### 3. Use Handoffs
Let agents transition between tasks:
```
@codebase (implement) → @review (audit) → @docs (document)
```

### 4. Add Project Context
Use `.github/copilot-instructions.md` to provide persistent context about your project's architecture, standards, and conventions.

### 5. Leverage Profile Detection
Trust the @codebase agent to detect your project type, or explicitly mention it:
```
@codebase Using .NET Clean Architecture, create...
```

---

## Troubleshooting

**Q: Agent not showing in dropdown?**  
A: Ensure files are in `.github/agents/` with `.agent.md` extension. Reload VS Code window.

**Q: Agent not following instructions?**  
A: Add more context in your prompt or use `.github/copilot-instructions.md` for persistent instructions.

**Q: Wrong profile detected?**  
A: Explicitly mention the language/framework in your prompt or add it to project context.

**Q: How do I modify agent behavior?**  
A: Edit the corresponding `.agent.md` file in `.github/agents/` directory.

**Q: Do agents persist context after task completion?**  
A: Agents maintain context **within the current chat session only**. They remember decisions, patterns, and files discussed during the conversation. For persistence across sessions, document important decisions in `.github/copilot-instructions.md` or your project's documentation.

**Q: What happens when I start a new chat?**  
A: Each new chat session starts fresh. Use `.github/copilot-instructions.md` to provide context that should persist across all sessions (coding standards, architecture decisions, project-specific patterns).

---

## Contributing

We welcome contributions!

1. Fork this repository
2. Create a feature branch
3. Modify/add agents in `.github/agents/`
4. Test your changes
5. Submit a pull request

**Ideas for new agents:**
- @test - Testing specialist
- @refactor - Refactoring specialist  
- @deploy - Deployment specialist
- @api - API design specialist

---

## Resources

- **GitHub Docs:** [Custom Agents Guide](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-custom-agents)
- **VS Code Docs:** [Custom Agents in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-agents)
- **Examples:** [Awesome Copilot Repository](https://github.com/github/awesome-copilot)

---

## License

MIT License - See LICENSE file for details

---

## Support

If you find this useful, consider:
- ⭐ Starring the repository
- 🐛 Reporting issues
- 💡 Suggesting improvements
- 🔀 Contributing new agents

---

**Made with ❤️ for the GitHub Copilot community**

