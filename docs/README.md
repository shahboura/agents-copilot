# Documentation Setup

This repository uses **Jekyll** with the **Just the Docs** theme for GitHub Pages documentation.

## Quick Start

### View Documentation Locally

```bash
# Install dependencies (first time only)
cd docs
bundle install

# Serve documentation
bundle exec jekyll serve
# Visit http://localhost:4000
```

### Lint Markdown Files

```bash
# Check all markdown files
npm run lint:md

# Auto-fix formatting issues
npm run lint:md:fix
```

## Features

### Just the Docs Theme

- ✨ **Clean Design**: Professional documentation layout
- 🔍 **Search**: Built-in search functionality
- 📱 **Responsive**: Mobile-friendly design
- 🧭 **Navigation**: Automatic navigation from front matter
- 🎨 **Customizable**: Easy theme customization

### Markdown Linting

- ✅ **Consistent Formatting**: Enforces markdown standards
- 🔧 **Auto-Fix**: Automatically fixes common issues
- 🚀 **CI Integration**: Runs in GitHub Actions

## File Structure

```
docs/
├── _config.yml          # Jekyll configuration
├── Gemfile              # Ruby dependencies
├── index.md             # Home page
├── getting-started.md   # Quick start guide
├── customization.md     # Customization guide
├── instructions.md      # Auto-applied standards
├── prompts.md           # Reusable prompts
├── troubleshooting.md   # FAQ and troubleshooting
├── workflows.md         # Real-world examples
└── agents/
    └── README.md        # Agent documentation
```

## Page Front Matter

Each markdown file requires front matter:

```yaml
---
layout: default
title: Page Title
nav_order: 1
description: "Optional page description"
---
```

### Navigation Options

- `nav_order`: Order in navigation (lower = higher)
- `has_children: true`: For parent pages
- `parent: "Parent Title"`: For child pages
- `nav_exclude: true`: Hide from navigation

## Configuration

### Site Settings

Edit `docs/_config.yml`:

```yaml
title: Your Site Title
description: Your description
url: https://yourusername.github.io
baseurl: /your-repo-name
theme: just-the-docs
color_scheme: light
```

### Markdown Linting

Edit `.markdownlint.json` to customize rules:

```json
{
  "MD013": false,  // Line length (disabled)
  "MD025": false,  // Multiple H1 (disabled for Jekyll)
  "MD040": false   // Code language (optional)
}
```

## Deployment

### GitHub Pages

1. Go to **Settings** → **Pages**
2. Set **Source** to: Deploy from a branch
3. Set **Branch** to: `main`, folder `/docs`
4. Click **Save**

Your site will be available at: `https://yourusername.github.io/your-repo-name/`

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## Development Workflow

### Adding New Pages

1. Create a new `.md` file in `docs/`
2. Add front matter with `title` and `nav_order`
3. Write content in markdown
4. Preview locally with `bundle exec jekyll serve`
5. Commit and push

### Updating Existing Pages

1. Edit the `.md` file
2. Preview changes locally
3. Run `npm run lint:md:fix` to fix formatting
4. Commit and push

### Organizing Pages

Use parent/child relationships for nested navigation:

```yaml
# Parent page
---
layout: default
title: Agents
nav_order: 2
has_children: true
---

# Child page
---
layout: default
title: Codebase Agent
parent: Agents
nav_order: 1
---
```

## Scripts

### NPM Scripts

```bash
npm run lint:md          # Check markdown files
npm run lint:md:fix      # Auto-fix markdown issues
npm run docs:serve       # Serve docs locally
npm run docs:build       # Build docs
```

### PowerShell Scripts

```bash
./scripts/fix-markdown-lint.ps1   # Fix markdown issues
./scripts/validate-docs.ps1        # Validate doc links
```

## CI/CD Integration

The `.github/workflows/validate.yml` workflow includes:

1. ✅ Agent configuration validation
2. ✅ Context file size check
3. ✅ Documentation link validation
4. ✅ Markdown linting

## Troubleshooting

### Jekyll Build Fails

- Check `_config.yml` syntax
- Ensure all files have valid front matter
- Verify `Gemfile` dependencies

### Navigation Not Showing

- Add `layout: default` to front matter
- Set `nav_order` and `title`
- Rebuild: `bundle exec jekyll serve`

### Markdown Linting Errors

- Run `npm run lint:md` to see errors
- Run `npm run lint:md:fix` to auto-fix
- Manually fix remaining issues

### Search Not Working

- Search requires JavaScript
- Ensure `search_enabled: true` in `_config.yml`
- Rebuild the site

## Resources

- [Just the Docs](https://just-the-docs.github.io/just-the-docs/)
- [GitHub Pages](https://docs.github.com/pages)
- [Jekyll Docs](https://jekyllrb.com/docs/)
- [Markdownlint](https://github.com/DavidAnson/markdownlint)

## Theme Alternatives

If you want to try different themes:

### Minimal

```yaml
theme: jekyll-theme-minimal
```

Simple, fast, minimal design.

### Cayman

```yaml
theme: jekyll-theme-cayman
```

Clean theme with hero header.

### Slate

```yaml
theme: jekyll-theme-slate
```

Dark theme for technical projects.

To change themes, update `theme:` in `_config.yml` and rebuild.
