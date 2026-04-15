# Postical — Content Engine Plugin for Claude Code

**Date:** 2026-04-15
**Author:** Shahriar P. Shuvo
**Status:** Draft

---

## 1. Overview

Postical is a Claude Code plugin that provides a multi-pipeline content engine for creating, optimizing, and distributing blog content at scale. It targets content marketers at startups and agencies managing content for client brands.

Each brand gets its own project directory (one repo per client). The plugin exposes 8 invocable skills that form a sequential pipeline from brand profiling through content writing to social media posting. Each skill has explicit inputs, outputs, and approval gates. State is tracked through a content calendar and per-post artifact files — no database, no hidden state.

Postical ships as a pure markdown skill plugin (like superpowers) with no code to build or maintain. It relies on external MCP servers for SEO data and browser automation.

---

## 2. Target Users

- **Content marketers at startups** running content programs for their own product
- **Agencies** managing content for multiple client brands (one postical installation per client)

Users are expected to be comfortable with Claude Code and have basic SEO knowledge. The plugin guides them through the process but doesn't teach content marketing fundamentals.

---

## 3. Plugin Structure

```
postical/
├── .claude-plugin/
│   └── plugin.json                    # Plugin metadata (name, version, author)
├── skills/
│   ├── postical-planning/
│   │   └── SKILL.md
│   ├── postical-generating-title/
│   │   └── SKILL.md
│   ├── postical-generating-outline/
│   │   └── SKILL.md
│   ├── postical-generating-affiliate/
│   │   └── SKILL.md
│   ├── postical-writing/
│   │   └── SKILL.md
│   ├── postical-reviewing/
│   │   └── SKILL.md
│   ├── postical-generating-media-post/
│   │   └── SKILL.md
│   └── postical-posting/
│       └── SKILL.md
├── templates/                         # Scaffolding templates for output files
│   ├── BRAND.md.template
│   ├── PRODUCT.md.template
│   ├── COMPETITORS.md.template
│   ├── WRITING_STYLE.md.template
│   ├── KEYWORDS.md.template
│   ├── PLATFORMS.md.template
│   ├── CONTENT_CALENDER.md.template
│   ├── .env.template
│   └── per-post/
│       ├── CONTENT.md.template
│       ├── OUTLINE.md.template
│       ├── KEYWORDS.md.template
│       ├── REFERENCES.md.template
│       ├── AFFILIATE.md.template
│       └── PROMPT.md.template
├── package.json
├── README.md
└── LICENSE
```

---

## 4. User Project Structure

After `/postical-planning` runs, the user's project looks like this:

```
my-client-project/
├── .env                               # DATAFORSEO_LOGIN, DATAFORSEO_PASSWORD
├── contexts/
│   ├── BRAND.md                       # Brand identity, voice, goals
│   ├── PRODUCT.md                     # Product info, ICP, USP, pain points
│   ├── COMPETITORS.md                 # Competitor SEO data and content analysis
│   ├── WRITING_STYLE.md              # DOs, DON'Ts, rules, output format
│   ├── KEYWORDS.md                    # Category-based keyword universe with KGR
│   └── PLATFORMS.md                   # Social platforms, accounts, preferences
├── plans/
│   └── CONTENT_CALENDER.md           # Master tracking: titles, status, clusters
├── content/
│   └── [category]/
│       └── [blog-title]/
│           ├── media/                 # Generated/collected media files
│           ├── CONTENT.md             # The blog post
│           ├── OUTLINE.md             # Approved outline
│           ├── KEYWORDS.md            # Per-post keyword map
│           ├── REFERENCES.md          # Internal + external link plan
│           ├── AFFILIATE.md           # Affiliate products
│           └── PROMPT.md             # Per-platform social posts + image prompts
└── CLAUDE.md                          # User's project config (tech stack, etc.)
```

---

## 5. Context Layer

Context files are written once during planning and read by every downstream skill. No skill modifies context files after creation.

### `contexts/BRAND.md`

- **Identity:** Name, tagline, website URL, industry/niche, location/geo-focus
- **Voice & Tone:** Brand personality, formality level, perspective (first/third person)
- **Social Presence:** Active profile links, brand hashtags, recurring themes
- **Goals:** Content program objectives, CTA strategy (newsletter, demos, trials)

### `contexts/PRODUCT.md`

- **Product Overview:** What it does, who it's for
- **Pain Points:** Problems the target customer faces
- **ICP:** Role, company size, industry, technical sophistication
- **USP:** Differentiation from alternatives
- **Audience & Geo:** Primary markets, languages, regional considerations
- **Technical Info:** Stack, integrations, APIs
- **Main Competitors:** Quick list (detailed analysis in COMPETITORS.md)

### `contexts/COMPETITORS.md`

Per competitor (3-7 competitors):
- Description, URL, content strategy analysis
- SEO data from DataforSEO: organic ETV, organic count, paid ETV, paid count
- Top ranked keywords table: keyword, position, volume, URL
- Top ranked pages table: URL, traffic, keywords

### `contexts/WRITING_STYLE.md`

- **Output Format:** Content format (MDX, plain Markdown, Hugo, etc.), frontmatter schema, code block conventions, component usage
- **DOs:** Rules the writer must follow
- **DON'Ts:** Banned phrases, formatting anti-patterns, AI tells
- **Rules:** Paragraph length, heading style, linking rules, keyword placement
- **Mistakes:** Common errors caught during review (grows over time)

### `contexts/KEYWORDS.md`

Category-based keyword lists:

| Keyword | Volume | CPC | Competition | KGR |
|---------|--------|-----|-------------|-----|

KGR (Keyword Golden Ratio) = allintitle results / monthly search volume:
- KGR < 0.25: Easy to rank, prioritize these
- KGR 0.25-1.0: Moderate competition
- KGR > 1.0: Hard to rank, reconsider angle

Data sourced from DataforSEO MCP when available, supplemented or overridden by user-provided keywords.

### `contexts/PLATFORMS.md`

Per active platform:
- Profile/page URL, handle
- Content style (long-form, threads, carousels, etc.)
- Posting frequency
- Image specs (dimensions per format)
- Hashtag strategy

---

## 6. Content Calendar & State Management

### `plans/CONTENT_CALENDER.md`

The central tracking document. Every skill reads it to find available work and writes to it to update status.

```markdown
# Content Calendar

## Overview
- Brand: [from BRAND.md]
- Total planned posts: X
- Cornerstones: X
- Clusters: X
- Last updated: YYYY-MM-DD

## Topic Clusters

### Cluster: DevOps
- Cornerstone: #1 — CI/CD Pipeline Guide for Startups

### Cluster: Design
- Cornerstone: #4 — Why Your SaaS Needs a Design System

## Posts

| # | Title | Type | Cluster | Primary Keyword | KGR | Status | Length | Date |
|---|-------|------|---------|-----------------|-----|--------|--------|------|
```

### Content Types

- **Cornerstone (pillar):** Comprehensive coverage of a broad topic (3,000-10,000+ words). Targets high-volume, competitive keywords. Every related cluster post links back to it. Few per site (5-10).
- **Cluster:** Narrower sub-topics, long-tail keywords, lower KGR. Links back to parent cornerstone. Easier to rank, feeds authority up to the pillar.

### Status Flow

```
title-approved → outlined → affiliate-done → drafted → reviewed → media-ready → posted-[platform]
```

| Status | Set By Skill | Meaning |
|--------|-------------|---------|
| `title-approved` | postical-generating-title | Title and keyword map created |
| `outlined` | postical-generating-outline | Outline and references done |
| `affiliate-done` | postical-generating-affiliate | Affiliate products researched |
| `drafted` | postical-writing | Content written |
| `reviewed` | postical-reviewing | Content reviewed and approved |
| `media-ready` | postical-generating-media-post | Social posts and image prompts generated |
| `posted-[platform]` | postical-posting | Posted to that platform |

### State Management Rules

1. State lives in files, not memory. If a session ends mid-pipeline, the next session reads the same files and picks up where things left off.
2. Every skill updates the content calendar after completing work.
3. Skills are idempotent at the per-post level. Re-running a skill on a specific post overwrites that post's output. Re-running `/postical-generating-title` appends new posts to the calendar, it does not overwrite existing approved titles.
4. Skills detect available work by scanning the calendar for posts at the right status and ask the user which one to work on.
5. Affiliate is optional. Writing skill checks if AFFILIATE.md exists and uses it if present.
6. Posting is per-platform. Invoke separately for each platform.
7. The calendar doesn't enforce strict ordering. Skipping the affiliate step is valid.
8. Context files can be updated by re-running `/postical-planning`. The skill detects existing context files and asks whether to update specific files or skip them.

---

## 7. Pipeline Skills

### Skill 1: `/postical-planning`

**Purpose:** One-time setup per brand. Profiles the company, analyzes competitors, establishes writing rules, and builds the keyword universe.

**Flow:**

**Step 0 — Company Profiling (interactive Q&A)**
- Ask about brand identity, product, ICP, pain points, USP
- Ask about social platforms and account details
- Ask for DataforSEO credentials (stored in .env)
- OUTPUT: `BRAND.md`, `PRODUCT.md`, `PLATFORMS.md`, `.env`

**Step 1 — Competitor Analysis**
- Take top competitors from PRODUCT.md
- Call DataforSEO MCP tools for SEO data (fallback: web search)
- Web research for content strategy analysis
- Present findings, user confirms/adjusts competitor list
- OUTPUT: `COMPETITORS.md`

**Step 2 — Writing Style & Rules**
- Analyze competitor content (what works, what doesn't)
- Ask user about format preferences (MDX, Hugo, plain MD)
- Ask about frontmatter schema, code conventions
- Read CLAUDE.md for tech stack context
- Ask about DOs/DON'Ts, voice preferences
- OUTPUT: `WRITING_STYLE.md`

**Step 3 — Keyword Research**
- Pull keyword data from DataforSEO based on competitors' ranked keywords (fallback: web search)
- Supplement with user-provided keywords if any
- Calculate KGR for each keyword (allintitle search / volume)
- Categorize keywords by topic clusters
- Ask user for target blog post count
- OUTPUT: `KEYWORDS.md`

**Gate:** User approves all context files before pipeline ends.

---

### Skill 2: `/postical-generating-title`

**Purpose:** Generate titles and keyword maps for each planned post.

**Inputs:** All context files

**Flow:**
- Read KEYWORDS.md to identify topic opportunities
- Cross-reference with COMPETITORS.md to find content gaps
- Identify high-volume keywords as cornerstone candidates
- Group related lower-volume keywords as clusters around each cornerstone
- Present topic cluster map to user for approval
- Generate 3-5 title options per topic following WRITING_STYLE.md rules
- Each title includes primary keyword, stays under 60 characters
- User picks one title per topic
- Generate per-post keyword map (primary, secondary, long-tail)
- Use KGR to inform title recommendations (steer toward low-KGR keywords)

**Outputs:**
- `plans/CONTENT_CALENDER.md` — Master table with title, type (cornerstone/cluster), cluster, keywords, KGR, status, target length, date
- `content/[category]/[blog-title]/KEYWORDS.md` — Per-post keyword map
- Creates the directory structure for each approved post

---

### Skill 3: `/postical-generating-outline`

**Purpose:** Deep research and detailed outline for one post at a time.

**Inputs:** Context files, `CONTENT_CALENDER.md`, per-post `KEYWORDS.md`

**Flow:**
- Ask user which post to outline (or suggest next pending from calendar)
- Deep web research: competitor articles, search intent, content gaps
- Build detailed outline with H2s targeting secondary keywords
- Identify internal and external link opportunities
- For cluster posts, ensure outline includes link back to parent cornerstone
- Present outline for approval
- Research and compile reference links

**Outputs (per post):**
- `content/[category]/[blog-title]/OUTLINE.md`
- `content/[category]/[blog-title]/REFERENCES.md`
- Updates `CONTENT_CALENDER.md` status to `outlined`

**Gate:** One outline at a time. User approves before next.

---

### Skill 4: `/postical-generating-affiliate`

**Purpose:** Research and recommend affiliate products relevant to each post. Optional — not every post needs affiliates.

**Inputs:** Context files, `CONTENT_CALENDER.md`, per-post `KEYWORDS.md`, `OUTLINE.md`, `REFERENCES.md`

**Flow:**
- Ask user which post to work on (or suggest next pending)
- Ask which affiliate platform to use (Amazon, ShareASale, Impact, CJ Affiliate, PartnerStack, etc.) or suggest one
- Use Chrome browser automation to browse the platform (fallback: web search if Chrome unavailable)
- Search for products relevant to the post's topic
- Extract: product name, description, pricing, affiliate link, ratings
- Prioritize top-selling products
- Present product list for user approval

**Output (per post):**
- `content/[category]/[blog-title]/AFFILIATE.md`
- Updates `CONTENT_CALENDER.md` status to `affiliate-done`

---

### Skill 5: `/postical-writing`

**Purpose:** Write the full blog post.

**Inputs:** All context files, per-post `KEYWORDS.md`, `OUTLINE.md`, `REFERENCES.md`, `AFFILIATE.md` (if exists)

**Flow:**
- Read all context and per-post files
- Follow WRITING_STYLE.md rules strictly
- Place keywords per the keyword map placement rules:
  - Primary keyword: in first 100 words, at least one H2, last 200 words, 3-5 total
  - Secondary keywords: 1-3 appearances each, H2 headings and section openers
  - Long-tail keywords: at least once each, as natural questions
- Weave in affiliate product mentions naturally where relevant
- Place internal and external links from REFERENCES.md
- For cluster posts, link to parent cornerstone
- For cornerstone posts, link to child clusters (if they exist yet)
- For long posts (3,000+ words), write section by section with approval
- For standard posts, full draft

**Output (per post):**
- `content/[category]/[blog-title]/CONTENT.md`
- Updates `CONTENT_CALENDER.md` status to `drafted`

**Gate:** User approves before marking complete.

---

### Skill 6: `/postical-reviewing`

**Purpose:** Comprehensive review of written content and repository-wide health check.

**Inputs:** All context files, per-post `CONTENT.md`, `KEYWORDS.md`, `REFERENCES.md`, `CONTENT_CALENDER.md`

#### Post-Level Checks

- Style rules from WRITING_STYLE.md (banned phrases, formatting, voice, AI tells)
- Keyword placement against per-post KEYWORDS.md (frequency, positions)
- Frontmatter completeness and format
- Affiliate products mentioned naturally (if AFFILIATE.md exists)
- All links from REFERENCES.md placed in content

#### Cross-Post Link Analysis

- **Internal link integrity:** Every internal link in every post points to a post that actually exists in `content/`. Flag broken links from renamed/deleted posts.
- **Missing link opportunities:** Build a keyword-to-post map from all KEYWORDS.md files. Scan every CONTENT.md for mentions of keywords covered by other posts. Flag mentions that don't have a link but should. Example: Post #3 mentions "CI/CD pipeline" but doesn't link to Post #1 (the CI/CD cornerstone).
- **Orphan detection:** Posts that exist but no other post links to them. Dead-end content with no discoverability.
- **Cornerstone/cluster linking:** Every cluster links to its parent cornerstone. Every cornerstone links to its clusters. No broken chain.
- **Missing cross-links:** Posts in the same cluster that cover related topics but don't reference each other.

#### External Link Checks

- **Dead link detection:** Fetch each external URL and flag any that return 404, 403, or timeout.
- **Source authority:** Flag links to low-quality domains or content farms.

#### Repository Health Report

```markdown
## Repository Health

### Internal Links
- Total internal links: 47
- Broken: 2
- Orphan posts: 1
- Missing link opportunities: 5

### External Links
- Total external links: 83
- Dead (404/timeout): 3

### Cornerstone Coverage
- [cluster]: cornerstone links to X/Y clusters

### Content Calendar Sync
- Posts in calendar vs. posts in content/
- Status mismatches
```

**Interactive flow:** Present the report, then ask user which issues to fix. Auto-fix internal link paths where possible (renamed posts). Flag the rest for manual decision.

**Outputs:**
- Updated `content/[category]/[blog-title]/CONTENT.md` (fixes applied)
- Updated `plans/CONTENT_CALENDER.md` status to `reviewed`

---

### Skill 7: `/postical-generating-media-post`

**Purpose:** Generate platform-specific social media posts and AI image prompts for each platform.

**Inputs:** Context files, `PLATFORMS.md`, per-post `CONTENT.md`

**Flow:**
- Read PLATFORMS.md to know which platforms to generate for
- For each active platform:
  - Generate a post tailored to that platform's format and style (long-form for LinkedIn, thread for X, caption for Instagram, etc.)
  - Generate AI image/shots prompts with correct dimensions for that platform:
    - LinkedIn: feed image (1200x627), carousel slides
    - Instagram: square post (1080x1080), story (1080x1920)
    - X: card image (1200x675)
    - Blog: hero image, section illustrations
    - (Other platforms per PLATFORMS.md)
  - Include relevant hashtags, mentions, CTAs per platform norms

**Output (per post):**
- `content/[category]/[blog-title]/PROMPT.md` — Structured by platform, each section has the post copy + image generation prompts with platform-specific dimensions
- Updates `CONTENT_CALENDER.md` status to `media-ready`

---

### Skill 8: `/postical-posting "platform-name"`

**Purpose:** Post content to a social platform via browser automation.

**Inputs:** `PLATFORMS.md`, per-post `PROMPT.md`, `media/` directory

**Flow:**
- Scan calendar for posts with status `media-ready`, ask user which post to publish
- Read the platform-specific section from that post's PROMPT.md
- Read platform credentials/details from PLATFORMS.md
- Open Chrome to the platform's posting interface
- Upload media from the `media/` directory
- Fill in the post content
- Present preview to user for final confirmation before posting
- Post on user's approval

**Output:**
- Updates `CONTENT_CALENDER.md` with `posted-[platform]` status and date

**Gate:** Always confirms with user before hitting "post." No fallback — browser automation is the entire purpose. If Chrome tools are unavailable, tells user to configure them and exits.

---

## 8. External Dependencies

### Required: DataforSEO MCP Server

- **Used by:** postical-planning (Steps 1 & 3), postical-generating-title, postical-generating-outline
- **Source:** Official open-source server at `github.com/dataforseo/mcp-server-typescript`
- **Auth:** User adds credentials to `.env` (DATAFORSEO_LOGIN, DATAFORSEO_PASSWORD)
- **Graceful degradation:** Falls back to web search for approximate data. Warns user that results will be less accurate.

### Required: Chrome Browser Automation

- **Used by:** postical-generating-affiliate (browsing product platforms), postical-posting (posting to social platforms)
- **Source:** Chrome MCP tools (mcp__claude-in-chrome__* or similar), already available in Claude Code
- **Graceful degradation:**
  - Affiliate skill: Falls back to web search for product research (less detailed)
  - Posting skill: No fallback. Exits with setup instructions if unavailable.

### Required: Web Search

- **Used by:** Every skill except postical-posting
- **Source:** Built into Claude Code. No additional configuration.

### Optional: Context7 MCP

- **Used by:** postical-writing, postical-generating-outline
- **Purpose:** Pull current library/framework documentation for technical content accuracy
- **Graceful degradation:** Falls back to web search.

### Dependency Detection

Every skill checks for its dependencies at startup before doing any work:
1. Read .env for credentials
2. Attempt a lightweight call to each required MCP tool
3. If available: proceed normally
4. If unavailable: warn user, offer fallback or exit

The user is never deep into a skill before discovering a dependency is missing.

### Dependency Summary

| Dependency | Required By | Hard Requirement? | Fallback |
|------------|------------|-------------------|----------|
| DataforSEO MCP | planning, titles, outlines | No | Web search (less accurate) |
| Chrome automation | affiliate, posting | Affiliate: No. Posting: Yes | Web search for affiliate; none for posting |
| Web search | all except posting | Yes | Built-in, always available |
| Context7 MCP | writing, outlines | No | Web search |

---

## 9. Skill Interaction & Data Flow

```
/postical-planning
    WRITES → BRAND.md, PRODUCT.md, PLATFORMS.md,
             COMPETITORS.md, WRITING_STYLE.md, KEYWORDS.md, .env

         ↓ (all context files exist)

/postical-generating-title
    READS → all context files
    WRITES → CONTENT_CALENDER.md, per-post KEYWORDS.md
    CREATES → content/[category]/[title]/ directories

         ↓ (calendar exists, post directories created)

/postical-generating-outline          (one post at a time)
    READS → context files, CONTENT_CALENDER.md, per-post KEYWORDS.md
    WRITES → per-post OUTLINE.md, REFERENCES.md
    UPDATES → CONTENT_CALENDER.md status → "outlined"

         ↓ (outline approved)

/postical-generating-affiliate        (optional, one post at a time)
    READS → context files, CONTENT_CALENDER.md, per-post KEYWORDS.md,
            OUTLINE.md, REFERENCES.md
    WRITES → per-post AFFILIATE.md
    UPDATES → CONTENT_CALENDER.md status → "affiliate-done"
    USES → Chrome browser automation

         ↓ (affiliate done or skipped)

/postical-writing                     (one post at a time)
    READS → context files, CONTENT_CALENDER.md, per-post KEYWORDS.md,
            OUTLINE.md, REFERENCES.md, AFFILIATE.md (if exists)
    WRITES → per-post CONTENT.md
    UPDATES → CONTENT_CALENDER.md status → "drafted"

         ↓ (draft written)

/postical-reviewing                   (one post at a time + repo health)
    READS → context files, per-post CONTENT.md, KEYWORDS.md,
            REFERENCES.md, CONTENT_CALENDER.md
    CHECKS → style, keywords, links, frontmatter, cornerstone/cluster,
             internal link opportunities, dead links, orphans
    UPDATES → per-post CONTENT.md (fixes)
    UPDATES → CONTENT_CALENDER.md status → "reviewed"

         ↓ (review approved)

/postical-generating-media-post       (one post at a time)
    READS → context files, PLATFORMS.md, per-post CONTENT.md
    WRITES → per-post PROMPT.md (per-platform posts + image prompts)
    UPDATES → CONTENT_CALENDER.md status → "media-ready"

         ↓ (media generated, images created by user externally)

/postical-posting "platform-name"     (one platform at a time)
    READS → PLATFORMS.md, per-post PROMPT.md, media/ directory
    USES → Chrome browser automation
    UPDATES → CONTENT_CALENDER.md status → "posted-[platform]"
```

### Data Flow Rules

1. **Context files are read-only after creation.** Every downstream skill reads them but never modifies them.
2. **Every skill updates the content calendar.** It is the single source of truth for pipeline state.
3. **Skills are idempotent.** Re-running a skill on a post overwrites previous output.
4. **Skills detect available work.** When invoked, they scan the calendar for posts at the right status and ask the user which one to work on.
5. **Affiliate is optional.** The writing skill checks if AFFILIATE.md exists and uses it if present, ignores if not.
6. **Posting is per-platform.** `/postical-posting "linkedin"` posts to LinkedIn only. Invoke separately for each platform.

---

## 10. Installation & Setup

### For Users

```bash
# Install the plugin
claude plugins install postical

# Ensure DataforSEO MCP server is configured (recommended)
# Follow: github.com/dataforseo/mcp-server-typescript

# Ensure Chrome browser automation is available
# (for affiliate research and social posting)

# Start the planning pipeline
/postical-planning
```

### For Development

```bash
git clone <postical-repo>
cd postical
# Skills are pure markdown — no build step
# Edit skills/ directory and test with Claude Code
```

---

## 11. Design Decisions & Rationale

| Decision | Rationale |
|----------|-----------|
| Pure markdown plugin (no code) | Simplest to maintain, follows superpowers pattern, no build step |
| 8 separate skills (not monolithic) | Content work spans multiple sessions. Each step is independently re-runnable. Skills stay focused (300-600 lines each). |
| One repo per brand (not multi-brand) | Clean separation. Agencies create a new project per client. No cross-contamination. |
| DataforSEO as external MCP (not bundled) | They maintain their own official MCP server. No code to build or maintain. |
| File-based state (not database) | Portable, git-trackable, survives session interruptions. The calendar + files ARE the state. |
| Cornerstone/cluster model | Proven SEO strategy. Cornerstones build authority, clusters capture long-tail traffic and feed authority upward. |
| KGR in keyword research | Enables data-driven prioritization of which posts to write first. Low KGR = quick ranking wins. |
| Affiliate as optional skill | Not every post monetizes. Separate skill means skip it when not needed. |
| Per-platform image prompts | Different platforms need different dimensions and styles. One prompt per platform, not generic. |
| Review checks entire repository | Individual post review misses cross-post issues: broken internal links, orphan posts, missed linking opportunities. |
| Browser automation for posting | The alternative is API integrations per platform, which are complex, rate-limited, and require separate auth flows. Browser automation is universal. |
