# Contributing to GitHub Copilot Agents

Thank you for your interest in contributing! This project welcomes contributions.

## Ways to Contribute

### 1. Documentation Improvements

- Fix typos or improve clarity
- Add examples and use cases
- Improve Getting Started guides

### 2. Agent Enhancements

- Suggest improvements to agent prompts
- Add new agent capabilities
- Improve agent coordination patterns

### 3. Coding Standards

- Add new language standards (in `.github/instructions/`)
- Improve existing standards
- Add best practices for new frameworks

### 4. Reusable Prompts

- Create new slash command prompts
- Improve existing prompt templates
- Add prompt combinations and workflows

## Development Setup

### Prerequisites

- Git
- Node.js (for markdown linting)
- PowerShell 7+ (for validation scripts)
- Ruby 3+ & Bundler (for Jekyll documentation)

### Setup Steps

```bash
# Clone repository
git clone https://github.com/shahboura/agents-copilot.git
cd agents-copilot

# Install dependencies
npm install

# Install Ruby dependencies (for docs)
cd docs
bundle install
cd ..
```

## Making Changes

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

Follow the existing patterns:

- Agent files: `.github/agents/*.agent.md`
- Prompts: `.github/prompts/*.prompt.md`
- Instructions: `.github/instructions/*.instructions.md`
- Documentation: `docs/*.md`

### 3. Test Your Changes

```bash
# Validate agents
./scripts/validate-agents.ps1

# Check documentation links
./scripts/validate-docs.ps1

# Lint markdown
npm run lint:md:fix

# Serve docs locally
cd docs
bundle exec jekyll serve
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: describe your changes"
```

Use conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Formatting changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Pull Request Guidelines

### PR Description Should Include

- **What**: Brief description of changes
- **Why**: Reason for the changes
- **Testing**: How you tested the changes

### PR Checklist

- [ ] All validation scripts pass
- [ ] Markdown linting passes (`npm run lint:md`)
- [ ] Documentation is updated if needed
- [ ] Changes follow existing patterns
- [ ] Commit messages follow conventional commits

## Adding New Agents

1. Create file: `.github/agents/your-agent.agent.md`
2. Follow the structure of existing agents
3. Add frontmatter with `name`, `description`, `extends`
4. Define Role, Responsibilities, Workflow sections
5. Update `copilot-instructions.md` to reference it
6. Run `./scripts/validate-agents.ps1`

## Adding New Prompts

1. Create file: `.github/prompts/your-prompt.prompt.md`
2. Add frontmatter with `command`, `description`
3. Follow the template structure
4. Add examples of usage
5. Update `docs/prompts.md` to document it
6. Test with GitHub Copilot Chat

## Adding Coding Standards

1. Create file: `.github/instructions/language-framework.instructions.md`
2. Add frontmatter with `description` and `applyTo` pattern
3. Document standards, patterns, and validation commands
4. Update `copilot-instructions.md` to reference it
5. Test with a sample file matching the `applyTo` pattern

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the issue, not the person
- Help others learn and grow

## Questions?

- Open a [GitHub Issue](https://github.com/OpenAgents/agents-copilot/issues)
- Check [Documentation](./docs/)
- Review [Troubleshooting](./docs/troubleshooting.md)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
