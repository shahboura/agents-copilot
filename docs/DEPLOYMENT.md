# GitHub Pages Deployment Guide

Your documentation is now ready for GitHub Pages with Jekyll!

## Setup Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Deploy from a branch
   - **Branch**: `main` (or your default branch)
   - **Folder**: `/docs`
4. Click **Save**

### 2. Wait for Deployment

- GitHub will automatically build and deploy your site
- First deployment takes 2-5 minutes
- Check the Actions tab to monitor progress
- Your site will be available at: `https://<username>.github.io/<repo-name>/`

### 3. Custom Domain (Optional)

If you want a custom domain:

1. Add a `CNAME` file in the `docs/` folder with your domain
2. Configure DNS settings with your domain provider:
   - Add a CNAME record pointing to `<username>.github.io`
3. Enable "Enforce HTTPS" in repository settings

## Configuration

### Theme: Just the Docs

Your site uses the **Just the Docs** theme, which provides:

- ✅ Clean, professional design
- ✅ Built-in search functionality
- ✅ Mobile-responsive
- ✅ Excellent navigation with your `nav_order` front matter

### Customize Theme

Edit `docs/_config.yml` to customize:

```yaml
# Site settings
title: Your Site Title
description: Your description
url: https://yourusername.github.io
baseurl: /your-repo-name

# Theme colors
color_scheme: light  # or "dark"

# Navigation
aux_links:
  "View on GitHub":
    - "https://github.com/yourusername/your-repo"
```

## Local Development

### Install Dependencies

```bash
cd docs
bundle install
```

### Run Local Server

```bash
bundle exec jekyll serve
```

Visit `http://localhost:4000` to preview your site locally.

### Watch for Changes

Jekyll automatically rebuilds when you edit files while the server is running.

## File Structure

```
docs/
├── _config.yml          # Jekyll configuration
├── Gemfile              # Ruby dependencies
├── index.md             # Home page
├── getting-started.md   # Documentation pages
├── customization.md
├── instructions.md
├── prompts.md
├── troubleshooting.md
├── workflows.md
└── agents/
    └── README.md        # Agent documentation
```

## Front Matter

Each markdown file should have front matter at the top:

```yaml
---
layout: default
title: Page Title
nav_order: 1
description: "Optional page description for SEO"
---
```

### Navigation Options

- `nav_order`: Number for ordering in navigation (lower = higher in menu)
- `has_children: true`: For parent pages with sub-pages
- `parent: "Parent Title"`: For child pages
- `nav_exclude: true`: Hide from navigation

## Markdown Linting

Your project includes markdownlint for consistency:

```bash
# Check all markdown files
npm run lint:md  # or markdownlint "**/*.md"

# Auto-fix issues
markdownlint "**/*.md" --fix
```

Configuration is in `.markdownlint.json`.

## Troubleshooting

### Site Not Building

1. Check **Actions** tab for build errors
2. Verify `_config.yml` syntax (use a YAML validator)
3. Ensure all files have valid front matter
4. Check that baseurl matches your repository name

### Navigation Not Showing

1. Verify front matter has `nav_order` and `title`
2. Check that files are in the `docs/` folder
3. Ensure `layout: default` is set

### Search Not Working

1. Search is automatically enabled with Just the Docs
2. Rebuild the site: push a new commit
3. Clear browser cache

### Styles Look Wrong

1. Verify `remote_theme: just-the-docs/just-the-docs` in `_config.yml`
2. Check that `baseurl` matches your repository name
3. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)

## Resources

- [Just the Docs Documentation](https://just-the-docs.github.io/just-the-docs/)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Markdown Guide](https://www.markdownguide.org/)

## Next Steps

1. ✅ **Commit and push** your changes
2. ✅ **Enable GitHub Pages** in repository settings
3. ✅ **Monitor deployment** in Actions tab
4. ✅ **Visit your site** at the GitHub Pages URL
5. 🎨 **Customize** `_config.yml` to match your branding
6. 📝 **Add more documentation** as needed
