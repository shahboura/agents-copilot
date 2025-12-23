# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.0] - 2025-12-23

### Added

- Git repository initialization
- Central context management system (agents.md)
- Validation scripts (validate-agents, check-context-size, validate-docs)
- Terminal access for docs agent
- MIT License
- NPM caching in CI workflow for faster builds
- Kotlin best practices instructions
- Rust best practices instructions
- Architecture review prompt
- GitHub Pages deployment workflow (docs.yml)
- Collaboration patterns documentation
- 5 new workflow examples (microservices migration, database migration, error monitoring, API versioning, team onboarding)
- Agent collaboration decision tree
- Community templates: SECURITY.md, CODE_OF_CONDUCT.md, issue templates, PR template
- Versioning system with semantic versioning
- Automated releases on merge to main
- Release workflow for GitHub releases

### Changed

- All 6 agents now use agents.md for context persistence
- Simplified documentation structure
- Streamlined copilot-instructions.md
- Updated codebase agent with 11 language support (added Kotlin, Rust)

### Fixed

- Documentation links in docs/index.md now include .md extensions for proper Jekyll rendering
- Removed `continue-on-error` from documentation validation workflow step
- Fixed all markdown linting issues (MD040, MD060)
- Corrected table formatting for compact style

### Removed

- GitHub Pages configuration (not used)
- Temporary implementation files

## [0.1.0] - 2025-12-23

### Added

- 6 specialized agents (@planner, @orchestrator, @codebase, @docs, @review, @em-advisor)
- 5 reusable prompts (create-readme, code-review, generate-tests, 1-on-1-prep, architecture-decision)
- 3 auto-applied instruction sets (.NET, Python, TypeScript)
- Comprehensive documentation
