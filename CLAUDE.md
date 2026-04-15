# Postical — Claude Code Content Engine Plugin

## What This Is

Postical is a Claude Code plugin that provides an 8-skill content creation pipeline. It is a pure markdown plugin (no code to build) that follows the superpowers plugin pattern.

## Repository Structure

```
.claude-plugin/plugin.json     — Plugin metadata for Claude Code discovery
.opencode/plugins/postical.js  — Bootstrap script that registers skills directory
skills/                        — 8 SKILL.md files, one per pipeline step
templates/                     — Scaffolding templates for output files
docs/superpowers/specs/        — Design spec
docs/superpowers/plans/        — Implementation plan
```

## Skills

| Skill | Purpose |
|-------|---------|
| `postical-planning` | One-time brand setup: profiling, competitors, writing style, keywords |
| `postical-generating-title` | Topic clusters, title generation, content calendar |
| `postical-generating-outline` | Deep research, outlines, reference links (one post at a time) |
| `postical-generating-affiliate` | Affiliate product research via browser automation (optional) |
| `postical-writing` | Write blog posts following style guide, keywords, and link plan |
| `postical-reviewing` | Post review + repository-wide health check (links, orphans, KGR) |
| `postical-generating-media-post` | Social media posts + AI image prompts per platform |
| `postical-posting` | Post to social platforms via Chrome browser automation |

## Conventions

- **Skill files** live at `skills/<skill-name>/SKILL.md` with YAML frontmatter (`name`, `description`)
- **`name`** must match the directory name, lowercase with hyphens
- **`description`** must start with "Use when" and be under 1024 characters
- **Templates** in `templates/` use `.template` extension and contain placeholder markers in `[brackets]`
- **No code files.** The plugin is pure markdown + one JS bootstrap. Do not add TypeScript, build steps, or dependencies.

## External Dependencies

- **DataforSEO MCP** — Strongly recommended for competitor/keyword data. Falls back to web search if not configured.
- **Chrome browser automation** — Required for `/postical-posting`, optional for `/postical-generating-affiliate`
- **Context7 MCP** — Optional, used by writing and outline skills for library docs
- **Web search** — Built into Claude Code, always available

## Key Design Decisions

- One repo per brand (agencies create separate projects per client)
- State lives in markdown files (content calendar + per-post artifacts), not in memory or databases
- Skills are idempotent at the per-post level
- Affiliate step is optional — the pipeline skips it gracefully
- DataforSEO is the backbone for SEO data but the pipeline runs without it
- Every skill updates `plans/CONTENT_CALENDER.md` as the single source of truth

## When Editing Skills

- Read the design spec at `docs/superpowers/specs/2026-04-15-postical-content-engine-design.md` before making changes
- Every skill must check its dependencies at startup before doing any work
- Every skill that modifies a post must update the content calendar status
- Skills that process posts one at a time must include a `<HARD-GATE>` block
- Cross-skill references in completion messages must point to the correct next skill
- Test changes by invoking the skill in Claude Code — there is no automated test suite

## Publishing

```bash
# npm
npm publish --access public

# GitHub — users install with:
# claude plugins install github:mindantic/postical
```
