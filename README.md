# Postical

A content engine plugin for Claude Code. Create, optimize, and distribute blog content at scale.

Postical provides an 8-step pipeline from brand profiling through content writing to social media posting. Each step is a separate skill with clear inputs, outputs, and approval gates.

## Installation

```bash
# From GitHub
claude plugins install github:mindantic/postical

# Or from npm
claude plugins install @mindantic/postical
```

### Optional: DataforSEO MCP Server

For accurate keyword and competitor data, install the DataforSEO MCP server:

1. Sign up at [dataforseo.com](https://dataforseo.com)
2. Install the MCP server: [github.com/dataforseo/mcp-server-typescript](https://github.com/dataforseo/mcp-server-typescript)
3. Configure it in your Claude Code MCP settings

Without DataforSEO, postical falls back to web search (less accurate but functional).

### Optional: Chrome Browser Automation

Required for affiliate product research (`/postical-generating-affiliate`) and social media posting (`/postical-posting`). Configure Chrome MCP tools in Claude Code.

## Quick Start

```
/postical-planning              # Set up brand, competitors, style, keywords
/postical-generating-title      # Generate titles and content calendar
/postical-generating-outline    # Research and outline posts (one at a time)
/postical-generating-affiliate  # Find affiliate products (optional)
/postical-writing               # Write posts (one at a time)
/postical-reviewing             # Review content and check repository health
/postical-generating-media-post # Create social posts and image prompts
/postical-posting linkedin      # Post to social platforms
```

## Pipeline

| Step | Skill | What It Does |
|------|-------|-------------|
| 1 | `/postical-planning` | Brand profiling, competitor analysis, writing style, keyword research |
| 2 | `/postical-generating-title` | Topic clusters, title generation, content calendar |
| 3 | `/postical-generating-outline` | Deep research, outlines, reference links |
| 4 | `/postical-generating-affiliate` | Affiliate product research (optional) |
| 5 | `/postical-writing` | Write blog posts with SEO and affiliate integration |
| 6 | `/postical-reviewing` | Style check, keyword audit, link integrity, repo health |
| 7 | `/postical-generating-media-post` | Social media posts and AI image prompts per platform |
| 8 | `/postical-posting` | Post to social platforms via browser automation |

## Project Structure

After setup, your project will contain:

```
contexts/          # Brand, product, competitors, style, keywords, platforms
plans/             # Content calendar
content/           # Blog posts organized by category
  [category]/
    [post-title]/
      CONTENT.md   # The blog post
      OUTLINE.md   # Approved outline
      KEYWORDS.md  # Keyword map
      REFERENCES.md # Link plan
      AFFILIATE.md # Affiliate products
      PROMPT.md    # Social posts and image prompts
      media/       # Images and media files
```

## Multi-Brand / Agency Use

One installation per brand. For agencies managing multiple clients, create a separate project directory for each client:

```
clients/
  client-a/    # Run /postical-planning here
  client-b/    # Run /postical-planning here
```

## License

MIT
