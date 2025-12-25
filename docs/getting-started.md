---
layout: default
title: Getting Started
nav_order: 1
description: "Get up and running with GitHub Copilot agents in 5 minutes"
---

# 🚀 Getting Started (5 Minutes)

{: .fs-6 .fw-300 }
Transform your development workflow with AI-powered coding assistants.

## 📋 Prerequisites

- ✅ VS Code with GitHub Copilot installed
- ✅ Any project (works with existing repos)

## 🎯 Step 1: Choose Your Agent (1 min)

**Agents** are specialized Copilot experts. Pick the right one for your task:

| Agent | 🎯 Best For | ⚡ Example |
|-------|-------------|-----------|
| `@codebase` | **Writing Code** | "Create a user login API" |
| `@planner` | **Analysis Only** | "Analyze this codebase architecture" |
| `@review` | **Code Quality** | "Audit for security issues" |
| `@docs` | **Documentation** | "Create API documentation" |
| `@orchestrator` | **Big Projects** | "Build a complete auth system" |
| `@em-advisor` | **Leadership** | "Prepare for team meeting" |

## 🎯 Step 2: Your First Agent Interaction (2 min)

### 1. Open Copilot Chat

- **Windows/Linux**: `Ctrl + Shift + I`
- **Mac**: `Cmd + Shift + I`

### 2. Select an Agent

Click the dropdown at the top and choose `@codebase` (most versatile for beginners)

### 3. Try Your First Request

```bash
@codebase Create a REST API endpoint for user authentication with JWT
```

### 4. Review & Approve

- Agent shows you a detailed plan
- Review each step carefully
- Type "yes" or "approved" to proceed
- Watch it implement step-by-step!

## ⚡ Step 3: Power Up with Prompts (1 min)

Use `/` commands for instant results:

```bash
/code-review          # Quick security & quality check
/generate-tests       # Create unit tests automatically
/create-readme        # Professional documentation
/1-on-1-prep         # Leadership meeting preparation
```

**Tip**: Type `/` in chat to see all available prompts.

## 🎨 Step 4: Customize for Your Project (1 min)

Make agents project-aware by creating `.github/copilot-instructions.md`:

```markdown
# My Project Context

Tech Stack:
- Node.js + TypeScript + Express
- PostgreSQL database
- Docker containers

Standards:
- Async/await everywhere
- Comprehensive error handling
- OpenAPI documentation
- Jest for testing
```

**Agents automatically learn from this file!**

---

## 💡 Pro Tips for Success

### 🎯 **Be Specific**

```bash
✅ Good: @codebase Create authentication middleware that validates JWT tokens and extracts user info to req.user

❌ Bad:  @codebase Add auth
```

### 🔍 **Always Review Plans**

Agents show you exactly what they'll do before making changes. Take a moment to review!

### 🤝 **Use Agent Handoffs**

```bash
@codebase (implement) → @review (audit) → @docs (document)
```

### 🚀 **Try These Next**

<div class="grid">
  <div class="card">
    <h3>🔧 Build Features</h3>
    <p>@codebase Create user management API with CRUD operations</p>
  </div>
  <div class="card">
    <h3>🔒 Security Audit</h3>
    <p>@review Check authentication code for vulnerabilities</p>
  </div>
  <div class="card">
    <h3>📚 Documentation</h3>
    <p>@docs Generate API documentation with examples</p>
  </div>
</div>

---

## 📚 Learn More

- **[📖 Agent Deep Dive](./agents/README.md)** - Detailed capabilities
- **[💡 Real Examples](./workflows.md)** - Production workflows
- **[⚙️ Customization](./customization.md)** - Adapt to your needs
- **[🔧 Troubleshooting](./troubleshooting.md)** - Common issues

## ❓ Need Help?

- **Quick Start**: Revisit this guide
- **Agent Guide**: Check [detailed capabilities](./agents/README.md)
- **Examples**: Browse [real workflows](./workflows.md)
- **Issues**: See [troubleshooting](./troubleshooting.md)

---

**🎉 You're all set! Start building with AI-powered development assistants.**
