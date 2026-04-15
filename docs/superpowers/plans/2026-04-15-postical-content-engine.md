# Postical Content Engine — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Claude Code plugin with 8 markdown skills that form a content creation pipeline from brand profiling to social media posting.

**Architecture:** Pure markdown skill plugin following the superpowers pattern. No code — just SKILL.md files, templates, and plugin metadata. Skills invoke external MCP servers (DataforSEO, Chrome) for data and automation. State lives in markdown files in the user's project directory.

**Tech Stack:** Markdown, YAML frontmatter, Claude Code plugin system

**Spec:** `docs/superpowers/specs/2026-04-15-postical-content-engine-design.md`

---

## File Map

```
postical/
├── .claude-plugin/
│   └── plugin.json                         # Task 1
├── package.json                            # Task 1
├── LICENSE                                 # Task 1
├── README.md                               # Task 11
├── templates/                              # Task 2
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
├── skills/
│   ├── postical-planning/
│   │   └── SKILL.md                        # Task 3
│   ├── postical-generating-title/
│   │   └── SKILL.md                        # Task 4
│   ├── postical-generating-outline/
│   │   └── SKILL.md                        # Task 5
│   ├── postical-generating-affiliate/
│   │   └── SKILL.md                        # Task 6
│   ├── postical-writing/
│   │   └── SKILL.md                        # Task 7
│   ├── postical-reviewing/
│   │   └── SKILL.md                        # Task 8
│   ├── postical-generating-media-post/
│   │   └── SKILL.md                        # Task 9
│   └── postical-posting/
│       └── SKILL.md                        # Task 10
```

---

### Task 1: Plugin Scaffolding

**Files:**
- Create: `.claude-plugin/plugin.json`
- Create: `package.json`
- Create: `LICENSE`

- [ ] **Step 1: Create plugin.json**

```bash
mkdir -p .claude-plugin
```

Write `.claude-plugin/plugin.json`:

```json
{
  "name": "postical",
  "description": "Content engine for creating, optimizing, and distributing blog content at scale. SEO-driven pipeline from brand profiling through writing to social media posting.",
  "version": "1.0.0",
  "author": {
    "name": "Shahriar P. Shuvo",
    "email": "mindantic@gmail.com"
  },
  "homepage": "https://github.com/mindantic/postical",
  "repository": "https://github.com/mindantic/postical",
  "license": "MIT",
  "keywords": [
    "content-engine",
    "seo",
    "blog-writing",
    "content-marketing",
    "affiliate",
    "social-media",
    "keyword-research"
  ]
}
```

- [ ] **Step 2: Create package.json**

Write `package.json`:

```json
{
  "name": "postical",
  "version": "1.0.0",
  "description": "Content engine plugin for Claude Code",
  "license": "MIT"
}
```

- [ ] **Step 3: Create LICENSE**

Write `LICENSE` with MIT license text, copyright `2026 Shahriar P. Shuvo`.

- [ ] **Step 4: Create skill directories**

```bash
mkdir -p skills/postical-planning
mkdir -p skills/postical-generating-title
mkdir -p skills/postical-generating-outline
mkdir -p skills/postical-generating-affiliate
mkdir -p skills/postical-writing
mkdir -p skills/postical-reviewing
mkdir -p skills/postical-generating-media-post
mkdir -p skills/postical-posting
mkdir -p templates/per-post
```

- [ ] **Step 5: Verify structure**

```bash
find . -type f -not -path './.git/*' | sort
```

Expected output should show `plugin.json`, `package.json`, `LICENSE`, and all skill directories.

- [ ] **Step 6: Commit**

```bash
git add .claude-plugin/plugin.json package.json LICENSE
git commit -m "feat: scaffold postical plugin with metadata and directory structure"
```

---

### Task 2: Template Files

**Files:**
- Create: `templates/BRAND.md.template`
- Create: `templates/PRODUCT.md.template`
- Create: `templates/COMPETITORS.md.template`
- Create: `templates/WRITING_STYLE.md.template`
- Create: `templates/KEYWORDS.md.template`
- Create: `templates/PLATFORMS.md.template`
- Create: `templates/CONTENT_CALENDER.md.template`
- Create: `templates/.env.template`
- Create: `templates/per-post/CONTENT.md.template`
- Create: `templates/per-post/OUTLINE.md.template`
- Create: `templates/per-post/KEYWORDS.md.template`
- Create: `templates/per-post/REFERENCES.md.template`
- Create: `templates/per-post/AFFILIATE.md.template`
- Create: `templates/per-post/PROMPT.md.template`

- [ ] **Step 1: Create BRAND.md.template**

Write `templates/BRAND.md.template`:

```markdown
# Brand Profile

## Identity
- **Name:** [Brand name]
- **Tagline:** [Brand tagline or positioning statement]
- **Website:** [URL]
- **Industry:** [Primary industry/niche]
- **Location:** [HQ location / geo-focus]

## Voice & Tone
- **Personality:** [e.g., "Technical but approachable", "Bold and opinionated"]
- **Formality:** [Casual / Semi-formal / Formal]
- **Perspective:** [First person "I" / Editorial "we" / Third person]

## Social Presence
- **LinkedIn:** [URL]
- **X (Twitter):** [Handle]
- **Instagram:** [Handle]
- **Facebook:** [URL]
- **YouTube:** [URL]
- **Other:** [Platform — URL]
- **Hashtags:** [Brand hashtags or recurring themes]

## Goals
- **Content Objective:** [What the content program is trying to achieve]
- **Primary CTA:** [Newsletter signup / Demo booking / Product trial / Consultation]
- **Secondary CTA:** [If applicable]
```

- [ ] **Step 2: Create PRODUCT.md.template**

Write `templates/PRODUCT.md.template`:

```markdown
# Product Profile

## Overview
[One paragraph: what the product does and who it's for]

## Pain Points
- [Problem 1 the target customer faces without this product]
- [Problem 2]
- [Problem 3]

## Ideal Customer Profile (ICP)
- **Role:** [Job title or function]
- **Company Size:** [Startup / SMB / Enterprise]
- **Industry:** [Target industries]
- **Technical Sophistication:** [Non-technical / Semi-technical / Technical]

## USP (Unique Selling Proposition)
[What makes this product different from alternatives — 1-2 sentences]

## Audience & Geo
- **Primary Markets:** [Countries/regions]
- **Languages:** [Content languages]
- **Regional Considerations:** [Any geo-specific nuances]

## Technical Info
- **Stack:** [Key technologies]
- **Integrations:** [What it connects with]
- **APIs:** [Public APIs if relevant]

## Main Competitors
| Competitor | URL | Key Differentiator |
|-----------|-----|-------------------|
| [Name] | [URL] | [How they differ] |
```

- [ ] **Step 3: Create COMPETITORS.md.template**

Write `templates/COMPETITORS.md.template`:

```markdown
# Competitor Analysis

## Summary
- **Total competitors analyzed:** [N]
- **Data source:** [DataforSEO / Web Research / Manual]
- **Date analyzed:** [YYYY-MM-DD]

---

## [Competitor Name]

### Overview
- **URL:** [website]
- **Description:** [What they do — 1-2 sentences]
- **Content Strategy:** [Blog frequency, topics, style, quality]

### SEO Data
| Metric | Value |
|--------|-------|
| Organic ETV | [value] |
| Organic Keyword Count | [value] |
| Paid ETV | [value] |
| Paid Keyword Count | [value] |

### Top Ranked Keywords
| Keyword | Position | Volume | URL |
|---------|----------|--------|-----|
| [keyword] | [#] | [monthly] | [ranking URL] |

### Top Ranked Pages
| URL | Estimated Traffic | Keywords Ranking |
|-----|-------------------|-----------------|
| [page URL] | [traffic] | [count] |

---

(Repeat for each competitor)
```

- [ ] **Step 4: Create WRITING_STYLE.md.template**

Write `templates/WRITING_STYLE.md.template`:

```markdown
# Writing Style Guide

## Output Format
- **Content Format:** [MDX / Markdown / Hugo / Other]
- **Frontmatter Schema:**
```yaml
---
title: ''
summary: ''
author: ''
date: 'YYYY-MM-DD'
tags: []
---
```
- **Code Block Conventions:** [Fence line filenames / Title comments / None]
- **Components:** [Any custom components available in content, e.g., HireMe, Callout]

## DOs
- [Rule 1: e.g., "Use contractions naturally"]
- [Rule 2: e.g., "1-3 sentences per paragraph"]
- [Rule 3]

## DON'Ts
- [Anti-pattern 1: e.g., "Never use 'In this article, we will...'"]
- [Anti-pattern 2: e.g., "No em dashes"]
- [Anti-pattern 3: e.g., "Never use 'utilize', 'leverage', or 'demonstrate'"]

## Rules
- **Paragraph Length:** [Max sentences per paragraph]
- **Heading Style:** [Conversational / Academic]
- **Linking:** [Internal link count, external link count, placement rules]
- **Keyword Placement:**
  - Primary: [frequency, positions]
  - Secondary: [frequency, positions]
  - Long-tail: [frequency, positions]

## Mistakes
[This section grows over time as the reviewing skill catches errors]

| Mistake | How Caught | Fix |
|---------|-----------|-----|
```

- [ ] **Step 5: Create KEYWORDS.md.template**

Write `templates/KEYWORDS.md.template`:

```markdown
# Keyword Universe

## Overview
- **Total keywords:** [N]
- **Categories:** [N]
- **Data source:** [DataforSEO / Web Research / User-provided]
- **Last updated:** [YYYY-MM-DD]

---

## [Category Name]

| Keyword | Volume | CPC | Competition | KGR |
|---------|--------|-----|-------------|-----|
| [keyword] | [monthly] | [$X.XX] | [Low/Medium/High] | [0.XX] |

---

## KGR Reference
- **KGR < 0.25:** Easy to rank. Prioritize these.
- **KGR 0.25-1.0:** Moderate competition.
- **KGR > 1.0:** Hard to rank. Reconsider angle.
- **Formula:** KGR = allintitle results / monthly search volume
```

- [ ] **Step 6: Create PLATFORMS.md.template**

Write `templates/PLATFORMS.md.template`:

```markdown
# Social Platforms

## Active Platforms

### [Platform Name]
- **Profile URL:** [URL]
- **Handle:** [@handle]
- **Content Style:** [Long-form / Short updates / Threads / Carousels / Reels]
- **Posting Frequency:** [Daily / 3x week / Weekly]
- **Image Specs:**
  - Feed: [WxH]
  - Story/Reel: [WxH]
  - Carousel: [WxH]
- **Hashtag Strategy:** [Branded / Topic / Mixed]
- **Notes:** [Any platform-specific preferences]

---

(Repeat for each platform)
```

- [ ] **Step 7: Create CONTENT_CALENDER.md.template**

Write `templates/CONTENT_CALENDER.md.template`:

```markdown
# Content Calendar

## Overview
- **Brand:** [from BRAND.md]
- **Total planned posts:** 0
- **Cornerstones:** 0
- **Clusters:** 0
- **Last updated:** [YYYY-MM-DD]

## Topic Clusters

(Populated by /postical-generating-title)

## Posts

| # | Title | Type | Cluster | Primary Keyword | KGR | Status | Length | Date |
|---|-------|------|---------|-----------------|-----|--------|--------|------|
```

- [ ] **Step 8: Create .env.template**

Write `templates/.env.template`:

```
# DataforSEO API Credentials
# Sign up at https://dataforseo.com
DATAFORSEO_LOGIN=
DATAFORSEO_PASSWORD=
```

- [ ] **Step 9: Create per-post templates**

Write `templates/per-post/KEYWORDS.md.template`:

```markdown
# Keyword Map: [Post Title]

## Keyword Placement Rules
- **Primary:** 3-5 appearances. Must appear in: title, URL slug, meta description, first 100 words, at least one H2, last 200 words
- **Secondary:** 1-3 appearances each. H2 headings and section openers
- **Long-tail:** At least once each. Natural questions in prose

## Keywords

| Type | Keyword | Target Frequency | Placement |
|------|---------|-----------------|-----------|
| Primary | [keyword] | 3-5x | Title, slug, summary, first 100 words, H2, last 200 words |
| Secondary | [keyword] | 1-3x | H2 headings, section openers |
| Secondary | [keyword] | 1-3x | H2 headings, section openers |
| Secondary | [keyword] | 1-3x | H2 headings, section openers |
| Long-tail | [question keyword] | 1x | Natural question in prose |
| Long-tail | [question keyword] | 1x | Natural question in prose |
```

Write `templates/per-post/OUTLINE.md.template`:

```markdown
# [Post Title]

**Subtitle:** [Optional supporting line]
**Type:** [Cornerstone / Cluster]
**Parent Cornerstone:** [If cluster — link to parent]
**Target Length:** [X words]
**Estimated Reading Time:** [X minutes]

---

## Hook (2-3 sentences)
- [Opening statement or reader validation]
- [Primary keyword in first sentence]

## [H2 — targets: secondary keyword]
- [Key points to cover]
- [Planned code example: filename]
- [Analogy idea if applicable]

## [H2 — targets: secondary keyword]
- [Key points]
- [Before/after comparison if applicable]

## [Additional sections as needed]
- [Build complexity progressively]

## [Final section — NOT titled "Conclusion"]
- [Brief reflection or forward-looking thought]
- [Primary keyword in last 200 words]
```

Write `templates/per-post/REFERENCES.md.template`:

```markdown
# References: [Post Title]

## Parent Cornerstone
[If cluster post — link to parent cornerstone]

## Internal Links

| Target Post | Anchor Text | Placement | Status |
|------------|-------------|-----------|--------|
| [Post title or slug] | [Natural anchor text] | [Section where link goes] | [Planned / Placed] |

## External Links

| Type | Source | Anchor Text | Placement | Status |
|------|--------|-------------|-----------|--------|
| [docs/blog/video/repo] | [URL] | [Natural anchor text] | [Section] | [Planned / Placed] |

## Link Rules
- Internal: 2-4 per post. First within 30% of content.
- External: 2-4 per post. First within 50% of content.
- All links use natural anchor text that fits the sentence.
```

Write `templates/per-post/AFFILIATE.md.template`:

```markdown
# Affiliate Products: [Post Title]

## Platform
- **Affiliate Network:** [Amazon / ShareASale / Impact / CJ / PartnerStack / Other]
- **Category:** [Product category relevant to this post]

## Products

### [Product Name]
- **Description:** [1-2 sentences]
- **Price:** [$X.XX]
- **Rating:** [X.X/5 — N reviews]
- **Affiliate Link:** [URL]
- **Best For:** [Who should use this]
- **Top Seller:** [Yes / No]

### [Product Name]
- **Description:** [1-2 sentences]
- **Price:** [$X.XX]
- **Rating:** [X.X/5 — N reviews]
- **Affiliate Link:** [URL]
- **Best For:** [Who should use this]
- **Top Seller:** [Yes / No]

(Repeat for each product — prioritize top sellers)
```

Write `templates/per-post/CONTENT.md.template`:

```markdown
---
title: '[Post Title with Primary Keyword]'
summary: '[120-155 chars with primary keyword and value prop]'
author: '[Author Name]'
date: 'YYYY-MM-DD'
tags: [primary-keyword, related-tag, framework-name]
---

[Content goes here — written by /postical-writing]
```

Write `templates/per-post/PROMPT.md.template`:

```markdown
# Media & Social Posts: [Post Title]

---

## Blog

### Hero Image
- **Prompt:** [AI image generation prompt for hero/featured image]
- **Dimensions:** [Per site requirements]
- **Style:** [Photography / Illustration / Diagram / Abstract]

### Section Illustrations
- **[Section Name]:** [Prompt for section-specific visual]

---

## [Platform Name]

### Post Copy
[Platform-specific post content — adapted to platform's format and norms]

### Hashtags
[Platform-specific hashtags]

### Image Prompts
- **[Format — e.g., Feed Post]:**
  - Prompt: [AI image generation prompt]
  - Dimensions: [WxH]
- **[Format — e.g., Carousel Slide]:**
  - Prompt: [AI image generation prompt]
  - Dimensions: [WxH]

---

(Repeat for each active platform from PLATFORMS.md)
```

- [ ] **Step 10: Verify all templates exist**

```bash
find templates -type f | sort
```

Expected: 14 template files across `templates/` and `templates/per-post/`.

- [ ] **Step 11: Commit**

```bash
git add templates/
git commit -m "feat: add all context and per-post template files"
```

---

### Task 3: Skill — postical-planning

**Files:**
- Create: `skills/postical-planning/SKILL.md`

- [ ] **Step 1: Write SKILL.md**

Write `skills/postical-planning/SKILL.md`:

```markdown
---
name: postical-planning
description: Use when setting up a new brand for content creation, onboarding a new client, or running initial content strategy setup. Creates brand profile, competitor analysis, writing style guide, and keyword universe.
---

# Postical Planning

Set up the foundation for a content engine. This skill runs once per brand and creates all context files that downstream skills depend on.

<HARD-GATE>
Do NOT proceed to any other postical skill until all context files are created and approved by the user. Every downstream skill depends on these files.
</HARD-GATE>

## When to Use

- Setting up content for a new brand or client
- First time running postical in a project
- Re-running to update brand information, competitors, or keywords

## When NOT to Use

- Context files already exist and you want to write content (use `/postical-generating-title` or later skills)
- You only need to update one context file (edit it directly)

## Prerequisites

Before starting, check for dependencies:

1. **DataforSEO MCP** (recommended, not required): Check if `mcp__dataforseo__*` tools are available. If not, warn the user: "DataforSEO MCP server is not configured. I'll use web search for competitor and keyword data, but results will be less accurate. For better data, install the DataforSEO MCP server: github.com/dataforseo/mcp-server-typescript"
2. **Web search**: Built into Claude Code. Always available.
3. **Existing context files**: Check if `contexts/` directory exists. If context files already exist, ask the user: "I found existing context files. Do you want to: (A) Update specific files, or (B) Start fresh and overwrite everything?"

## The Pipeline

This skill runs 4 steps in order. Each step produces output files. The user approves each step before moving to the next.

```
Step 0: Company Profiling → BRAND.md, PRODUCT.md, PLATFORMS.md, .env
Step 1: Competitor Analysis → COMPETITORS.md
Step 2: Writing Style → WRITING_STYLE.md
Step 3: Keyword Research → KEYWORDS.md
```

---

### Step 0: Company Profiling

**Goal:** Understand the brand, product, and social presence through interactive Q&A.

**Process:**

1. Create the project directories:
   ```
   contexts/
   plans/
   content/
   ```

2. Ask questions ONE AT A TIME. Do not overwhelm with a long form. Use multiple choice where possible.

**Questions to ask (in this order):**

**Brand Identity:**
- "What's the name of your brand/company?"
- "What's your website URL?"
- "What industry or niche are you in?"
- "Where are you based? Any specific geographic focus for your content?"
- "Describe your brand voice in a few words. For example: 'technical but approachable', 'bold and opinionated', 'friendly and educational'"
- "What perspective do you write in? (A) First person — 'I', (B) Editorial — 'we', (C) Third person"

**Product:**
- "Describe your product in one sentence. What does it do and who is it for?"
- "What are the top 3 pain points your customers face before using your product?"
- "Who is your ideal customer? Role, company size, technical level?"
- "What makes your product different from alternatives? Your USP in 1-2 sentences."
- "What's your tech stack? (Only if relevant for technical content)"

**Platforms:**
- "Which social platforms do you actively use for content distribution? (Select all that apply): LinkedIn, X/Twitter, Instagram, Facebook, Reddit, YouTube, Other"
- For each selected platform: "What's your [platform] profile URL or handle?"
- "Do you have preferred posting frequencies for any platform?"

**Credentials:**
- "Do you have a DataforSEO account? If yes, I'll need your login and password for the .env file. If not, I'll use web search for SEO data."

3. After collecting all answers, read the templates from the plugin's `templates/` directory and generate the context files.

4. Write the following files:
   - `contexts/BRAND.md` — populated from brand identity answers
   - `contexts/PRODUCT.md` — populated from product answers
   - `contexts/PLATFORMS.md` — populated from platform answers
   - `.env` — DataforSEO credentials if provided

5. Present each file to the user for approval. Fix any corrections before proceeding.

**Competitors list:** At the end of Step 0, ask: "Who are your main competitors? List 3-7 companies." These will be analyzed in Step 1.

---

### Step 1: Competitor Analysis

**Goal:** Analyze competitors for SEO data, content strategy, and content gaps.

**Inputs:** Competitor list from Step 0, `contexts/PRODUCT.md`

**Process:**

1. For each competitor:

   **If DataforSEO MCP is available:**
   - Call DataforSEO tools to get:
     - Domain overview (organic ETV, organic count, paid ETV, paid count)
     - Top ranked keywords (keyword, position, volume, URL)
     - Top ranked pages (URL, traffic, keywords)
   - Use web search to analyze their content strategy (blog frequency, topics, style, quality)

   **If DataforSEO MCP is NOT available:**
   - Use web search to research each competitor
   - Search for "[competitor] blog" to find their content
   - Estimate their content frequency and topics from what's visible
   - Note: SEO metrics will be approximate or missing

2. For each competitor, compile:
   - Overview: description, URL, content strategy
   - SEO data table (if available)
   - Top ranked keywords table
   - Top ranked pages table

3. Present the full competitor analysis to the user. Ask:
   - "Does this competitor list look right? Any to add or remove?"
   - "Any insights here that surprise you or that I should factor into the writing style?"

4. Write `contexts/COMPETITORS.md` following the template structure.

**Gate:** User approves COMPETITORS.md before proceeding.

---

### Step 2: Writing Style & Rules

**Goal:** Establish the writing rules, content format, and style guide.

**Inputs:** `contexts/COMPETITORS.md`, `CLAUDE.md` (if exists)

**Process:**

1. Read the project's CLAUDE.md to detect tech stack context (e.g., Next.js, Hugo, Astro).

2. Analyze competitor content from COMPETITORS.md:
   - What writing patterns work well in their top-performing content?
   - What mistakes or anti-patterns do they have?
   - What voice/tone resonates in this niche?

3. Ask the user (one at a time):
   - "What content format does your site use? (A) MDX, (B) Plain Markdown, (C) Hugo Markdown, (D) Other — please specify"
   - "What does your frontmatter look like? Share an example if you have one, or I'll suggest a schema."
   - "Any specific DO rules for your content? Things writers must always do."
   - "Any specific DON'T rules? Phrases, patterns, or styles to avoid."
   - "Do you use any custom components in your content? (e.g., callout boxes, CTAs, embeds)"

4. Combine competitor analysis insights with user preferences.

5. Write `contexts/WRITING_STYLE.md` following the template structure. Include:
   - Output format and frontmatter schema
   - DOs list (user-provided + competitor-derived best practices)
   - DON'Ts list (user-provided + common AI tells + competitor anti-patterns)
   - Rules for paragraph length, headings, linking, keyword placement
   - Empty Mistakes table (populated by `/postical-reviewing` over time)

**Gate:** User approves WRITING_STYLE.md before proceeding.

---

### Step 3: Keyword Research

**Goal:** Build a categorized keyword universe with search volumes and KGR scores.

**Inputs:** `contexts/COMPETITORS.md`, `contexts/PRODUCT.md`

**Process:**

1. Ask the user: "How many blog posts are you targeting for this content program? This helps me scope the keyword research."

2. Ask: "Do you have any keywords you already want to target? If yes, share them and I'll incorporate them."

**If DataforSEO MCP is available:**
3. Pull competitor ranked keywords from DataforSEO:
   - For each competitor in COMPETITORS.md, get their top ranked keywords
   - Filter for keywords relevant to the brand's niche
   - Get search volume, CPC, and competition for each

4. Calculate KGR for promising keywords:
   - For each keyword, search Google with `allintitle:"keyword"` to get title match count
   - KGR = allintitle count / monthly search volume
   - Flag keywords with KGR < 0.25 as high-priority

**If DataforSEO MCP is NOT available:**
3. Use web search to research keywords:
   - Search for topics related to the brand's niche
   - Check Google autocomplete suggestions
   - Look at "People also ask" and "Related searches"
   - Note competitor article titles for keyword patterns

4. KGR calculation is still possible via web search (allintitle searches work without DataforSEO)

5. Merge user-provided keywords with researched keywords.

6. Categorize all keywords into topic clusters (3-7 categories based on the brand's niche).

7. Present the keyword universe to the user as a table per category:
   ```
   ## [Category]
   | Keyword | Volume | CPC | Competition | KGR |
   ```

8. Write `contexts/KEYWORDS.md` following the template structure.

**Gate:** User approves KEYWORDS.md before the pipeline ends.

---

## Completion

After all 4 steps are approved, confirm:

"Planning complete. All context files created:
- contexts/BRAND.md
- contexts/PRODUCT.md
- contexts/PLATFORMS.md
- contexts/COMPETITORS.md
- contexts/WRITING_STYLE.md
- contexts/KEYWORDS.md
- .env

Next step: Run `/postical-generating-title` to create your content calendar and generate titles for each post."
```

- [ ] **Step 2: Verify frontmatter is valid**

Read back the file and confirm:
- `name: postical-planning` (matches the directory name)
- `description:` starts with "Use when" and is under 1024 characters
- No YAML syntax errors in the frontmatter block

- [ ] **Step 3: Commit**

```bash
git add skills/postical-planning/SKILL.md
git commit -m "feat: add postical-planning skill — brand profiling, competitors, style, keywords"
```

---

### Task 4: Skill — postical-generating-title

**Files:**
- Create: `skills/postical-generating-title/SKILL.md`

- [ ] **Step 1: Write SKILL.md**

Write `skills/postical-generating-title/SKILL.md`:

```markdown
---
name: postical-generating-title
description: Use when generating blog post titles, creating a content calendar, or mapping keywords to posts. Requires context files from /postical-planning to exist first.
---

# Postical — Title & Content Calendar Generation

Generate titles, build topic clusters, create per-post keyword maps, and produce the content calendar.

<HARD-GATE>
Do NOT run this skill unless all context files exist in `contexts/`. If any are missing, tell the user to run `/postical-planning` first.
</HARD-GATE>

## When to Use

- After `/postical-planning` is complete
- When adding new posts to an existing content calendar
- When regenerating titles for posts that haven't been outlined yet

## Prerequisites

Check that these files exist before starting:
- `contexts/BRAND.md`
- `contexts/PRODUCT.md`
- `contexts/COMPETITORS.md`
- `contexts/WRITING_STYLE.md`
- `contexts/KEYWORDS.md`

If any are missing, stop and tell the user: "Missing context files. Run `/postical-planning` first."

Check if `plans/CONTENT_CALENDER.md` already exists. If it does, this is an append run — new posts will be added without overwriting existing approved titles.

## The Process

### Phase 1: Topic Cluster Mapping

1. Read `contexts/KEYWORDS.md` to get the full keyword universe.
2. Read `contexts/COMPETITORS.md` to identify content gaps (topics competitors rank for but don't cover well, or topics with no strong competitor content).
3. Group keywords into topic clusters:
   - Identify high-volume keywords as **cornerstone** candidates (broad topics, competitive)
   - Group related lower-volume, lower-KGR keywords as **cluster** posts around each cornerstone
4. Present the topic cluster map to the user:

```
## Proposed Topic Clusters

### Cluster: [Category Name]
- Cornerstone: "[Broad topic keyword]" (Volume: X, KGR: X.XX)
  - Cluster: "[Specific sub-topic]" (Volume: X, KGR: X.XX)
  - Cluster: "[Another sub-topic]" (Volume: X, KGR: X.XX)
  - Cluster: "[Another sub-topic]" (Volume: X, KGR: X.XX)
```

5. User approves or adjusts the cluster map before proceeding.

### Phase 2: Title Generation

For EACH post in the approved cluster map, generate 3-5 title options.

**Title rules (non-negotiable):**
- Under 60 characters
- ALWAYS include the primary keyword naturally
- NEVER put a period (dot) in a title to separate two sentences
- NEVER put unverifiable stats in titles
- No clickbait, no "Ultimate Guide to Everything About..."
- No colons unless they genuinely add clarity

**Title patterns to use:**
- **Short declarative:** 2-5 words, direct. "Product Engineers", "My Stack"
- **Curiosity-driven:** Emotional hooks. "The Surprising Truth About..."
- **How-to / Guide:** "How to Set Up CI/CD for Startups"
- **Statement / Contrarian:** "Stop Using useEffect for Data Fetching"

**KGR-informed recommendations:** Steer toward low-KGR keywords (< 0.25) for quick ranking wins. Flag high-KGR keywords (> 1.0) and suggest alternative angles.

Present ALL title options to the user at once, grouped by cluster:

```
### Cluster: DevOps

**Post #1 (Cornerstone):** Primary keyword: "ci/cd for startups" (KGR: 0.82)
A) CI/CD Pipeline Guide for Startups
B) How to Build CI/CD for Your Startup
C) CI/CD for Startups: A Practical Guide

**Post #2 (Cluster):** Primary keyword: "github actions vs gitlab ci" (KGR: 0.19)
A) GitHub Actions vs GitLab CI in 2026
B) Comparing GitHub Actions and GitLab CI
C) GitHub Actions or GitLab CI? A Developer's Take
```

User picks one title per post or requests revisions.

**Do not proceed until every post has an approved title.**

### Phase 3: Per-Post Keyword Maps & Calendar

After all titles are approved:

1. For each post, generate a keyword map with:
   - Primary keyword (from the cluster map)
   - 3-5 secondary keywords (related terms from KEYWORDS.md)
   - 2-3 long-tail keywords (specific questions people search)
   - Placement rules for each

2. Create the directory structure:
   ```
   content/[category]/[blog-title-slug]/
   content/[category]/[blog-title-slug]/media/
   ```

3. Write each per-post `KEYWORDS.md` following the template.

4. Write or update `plans/CONTENT_CALENDER.md`:
   - If new: create from template with all posts
   - If existing: append new posts, preserve existing ones
   - Set status to `title-approved` for all new posts
   - Set dates spread across the planned publishing window
   - Include the Topic Clusters section

## Completion

"Titles approved and content calendar created.
- [N] posts planned across [N] clusters
- [N] cornerstones, [N] cluster posts
- Calendar: plans/CONTENT_CALENDER.md
- Keyword maps: content/[category]/[title]/KEYWORDS.md

Next step: Run `/postical-generating-outline` to research and outline individual posts."
```

- [ ] **Step 2: Verify frontmatter**

Read back the file and confirm:
- `name: postical-generating-title`
- `description:` starts with "Use when" and is under 1024 characters

- [ ] **Step 3: Commit**

```bash
git add skills/postical-generating-title/SKILL.md
git commit -m "feat: add postical-generating-title skill — topic clusters, titles, calendar"
```

---

### Task 5: Skill — postical-generating-outline

**Files:**
- Create: `skills/postical-generating-outline/SKILL.md`

- [ ] **Step 1: Write SKILL.md**

Write `skills/postical-generating-outline/SKILL.md`:

```markdown
---
name: postical-generating-outline
description: Use when creating a detailed outline for a blog post, researching a topic for content, or building the structure and references for a planned article. Requires titles to be approved first.
---

# Postical — Outline & Reference Generation

Deep research and detailed outline for one blog post at a time. Produces an outline with keyword-targeted H2s and a reference file with planned internal and external links.

<HARD-GATE>
Process ONE post at a time. Do NOT start the next outline until the current one is approved by the user.
</HARD-GATE>

## When to Use

- After `/postical-generating-title` has created the content calendar
- When a post has status `title-approved` in the content calendar
- When re-outlining a post that needs a new angle

## Prerequisites

Check that these files exist:
- `contexts/BRAND.md`
- `contexts/PRODUCT.md`
- `contexts/COMPETITORS.md`
- `contexts/WRITING_STYLE.md`
- `contexts/KEYWORDS.md`
- `plans/CONTENT_CALENDER.md`

Read `CONTENT_CALENDER.md` and find posts with status `title-approved`. If none, tell the user: "No posts need outlining. All posts are already outlined or further along."

Ask the user: "Which post would you like to outline?" Present the list of `title-approved` posts. If only one, suggest it.

## The Process

### Phase 1: Deep Research

For the selected post:

1. Read the per-post `KEYWORDS.md` to get the keyword map.
2. Read `contexts/COMPETITORS.md` to identify competitor content on this topic.

3. **Search intent analysis:** Use web search to determine what the searcher is trying to do:
   - Informational ("how does X work")
   - Tutorial ("how to do X")
   - Comparison ("X vs Y")

4. **Competitor content audit:** Search for the primary keyword and read the top 3-5 ranking articles:
   - What do they cover well?
   - What do they miss or get wrong?
   - What's their structure and depth?
   - How good are their code examples (if technical)?

5. **Content gap identification:** Define what THIS article will do better. If there's no clear gap, discuss with the user whether to adjust the angle.

6. Present a brief research summary:
   ```
   ## Research Summary: [Post Title]
   - Search Intent: [informational / tutorial / comparison]
   - Top Competitors: [list 3-5 with brief notes]
   - Content Gap: [What our article will do better]
   ```

### Phase 2: Outline Creation

Build the outline following the template structure:

1. **Hook (2-3 sentences):** One bold opening or reader validation. Primary keyword in the first sentence.

2. **H2 sections:** Each H2 targets a secondary keyword from the keyword map. Annotate which keyword each H2 targets:
   ```
   ## [Conversational H2] ← targets: "secondary keyword"
   ```

3. **Progressive complexity:** Start with the simplest concepts, build toward advanced topics.

4. **Planned code examples:** If this is technical content, note which code examples go in each section with filenames.

5. **For cluster posts:** Include a link back to the parent cornerstone in the outline.

6. **For cornerstone posts:** Plan links to existing cluster posts.

7. **Final section:** NOT titled "Conclusion." Brief reflection, forward thought, or just stop. Primary keyword in last 200 words.

8. Include estimated reading time and target word count:
   - Cornerstone: 3,000-10,000 words, 10-30 min
   - Cluster: 1,000-3,000 words, 4-12 min

Present the outline to the user for approval.

### Phase 3: Reference Compilation

After the outline is approved:

1. **Internal links:** Scan `content/` for existing posts that relate to this topic. Plan 2-4 internal links with:
   - Target post
   - Suggested anchor text
   - Which section the link goes in
   - First internal link within the first 30% of content

2. **External links:** From the research phase, compile 2-4 authoritative external sources:
   - Official documentation (MDN, framework docs)
   - Reputable blog posts
   - YouTube videos
   - GitHub repositories
   - First external link within the first 50% of content

3. Write `REFERENCES.md` following the template.

### Phase 4: Write Output Files

1. Write `content/[category]/[blog-title]/OUTLINE.md`
2. Write `content/[category]/[blog-title]/REFERENCES.md`
3. Update `plans/CONTENT_CALENDER.md` — set this post's status to `outlined`

## Completion

"Outline approved for '[Post Title]'.
- Outline: content/[category]/[slug]/OUTLINE.md
- References: content/[category]/[slug]/REFERENCES.md
- Calendar updated: status → outlined

Next: Run `/postical-generating-outline` again for the next post, or `/postical-generating-affiliate` if this post needs affiliate products, or `/postical-writing` to start writing."
```

- [ ] **Step 2: Verify frontmatter**

Read back the file. Confirm `name: postical-generating-outline` and description is valid.

- [ ] **Step 3: Commit**

```bash
git add skills/postical-generating-outline/SKILL.md
git commit -m "feat: add postical-generating-outline skill — research, outline, references"
```

---

### Task 6: Skill — postical-generating-affiliate

**Files:**
- Create: `skills/postical-generating-affiliate/SKILL.md`

- [ ] **Step 1: Write SKILL.md**

Write `skills/postical-generating-affiliate/SKILL.md`:

```markdown
---
name: postical-generating-affiliate
description: Use when researching affiliate products for a blog post, finding relevant products to recommend, or building an affiliate product list. Optional step — not every post needs affiliates.
---

# Postical — Affiliate Product Research

Research and recommend affiliate products relevant to a blog post. This skill uses browser automation to browse affiliate platforms, extract product data, and build a structured product list.

**This step is optional.** Not every post needs affiliate products. Skip this skill for posts that don't have a monetization angle.

## When to Use

- After a post has been outlined (`outlined` status in calendar)
- When the post topic naturally lends itself to product recommendations
- When the user wants to monetize a post with affiliate links

## When NOT to Use

- Posts that are pure opinion pieces or conceptual explainers
- Posts where product recommendations would feel forced or salesy

## Prerequisites

Check that these files exist for the target post:
- `content/[category]/[slug]/KEYWORDS.md`
- `content/[category]/[slug]/OUTLINE.md`
- `content/[category]/[slug]/REFERENCES.md`
- `plans/CONTENT_CALENDER.md` — post status is `outlined` or later

**Chrome browser automation** is preferred but not required:
- If Chrome MCP tools (`mcp__claude-in-chrome__*`) are available: use browser to browse affiliate platforms directly
- If not available: fall back to web search for product research (less detailed — no pricing or direct links)

Read `CONTENT_CALENDER.md` and find posts with status `outlined` (or `title-approved` if skipping outline). Ask the user which post to work on.

## The Process

### Phase 1: Platform Selection

Ask the user: "Which affiliate platform do you want to use for this post?"

Offer options:
- **(A) Amazon Associates** — widest product selection, most familiar
- **(B) ShareASale** — broad network, many SaaS and tool affiliates
- **(C) Impact** — premium brands, higher commissions
- **(D) CJ Affiliate** — large network, diverse categories
- **(E) PartnerStack** — SaaS-focused affiliate programs
- **(F) Other** — specify the platform
- **(G) Not sure** — I'll research and suggest the best platform for this topic

If the user picks (G), research which platforms have relevant affiliate programs for the post's topic and suggest one.

### Phase 2: Product Research

**If Chrome browser automation is available:**

1. Open Chrome to the selected affiliate platform
2. Search for products relevant to the post's primary keyword and topic
3. For each relevant product, extract:
   - Product name
   - Description (1-2 sentences)
   - Price
   - Rating and review count
   - Affiliate link
   - Whether it's a top seller / best seller
4. Collect 5-10 products, prioritizing top sellers

**If Chrome is NOT available:**

1. Use web search to find products relevant to the topic
2. Search for "[topic] best [product type]", "[topic] tools", "[topic] recommended products"
3. Compile product names, descriptions, and approximate pricing from search results
4. Note: affiliate links and ratings may be unavailable — the user will need to find these manually
5. Flag this limitation to the user

### Phase 3: Product Curation

1. Present the full product list to the user
2. Ask: "Which products should I include in the affiliate list? Any to remove or add?"
3. Prioritize top-selling products at the top of the list
4. Ensure products are genuinely relevant to the post content (no forcing products into unrelated posts)

### Phase 4: Write Output

1. Write `content/[category]/[slug]/AFFILIATE.md` following the template
2. Update `plans/CONTENT_CALENDER.md` — set this post's status to `affiliate-done`

## Completion

"Affiliate products compiled for '[Post Title]'.
- Products: content/[category]/[slug]/AFFILIATE.md
- Calendar updated: status → affiliate-done

Next: Run `/postical-writing` to write the post. Affiliate products will be woven in naturally."
```

- [ ] **Step 2: Verify frontmatter**

Read back the file. Confirm `name: postical-generating-affiliate` and description is valid.

- [ ] **Step 3: Commit**

```bash
git add skills/postical-generating-affiliate/SKILL.md
git commit -m "feat: add postical-generating-affiliate skill — product research via browser"
```

---

### Task 7: Skill — postical-writing

**Files:**
- Create: `skills/postical-writing/SKILL.md`

- [ ] **Step 1: Write SKILL.md**

Write `skills/postical-writing/SKILL.md`:

```markdown
---
name: postical-writing
description: Use when writing a blog post, drafting content from an approved outline, or producing long-form articles. Requires an approved outline and keyword map to exist for the target post.
---

# Postical — Content Writing

Write the full blog post from an approved outline, following the brand's writing style, keyword placement rules, and linking plan.

<HARD-GATE>
Process ONE post at a time. Do NOT start the next post until the current one is approved by the user.
</HARD-GATE>

## When to Use

- After a post has been outlined (`outlined` status) or has affiliate data (`affiliate-done` status)
- When rewriting a post that needs a fresh draft

## Prerequisites

Check that these files exist for the target post:
- `content/[category]/[slug]/OUTLINE.md` (required)
- `content/[category]/[slug]/KEYWORDS.md` (required)
- `content/[category]/[slug]/REFERENCES.md` (required)
- `content/[category]/[slug]/AFFILIATE.md` (optional — use if present)

Read these context files:
- `contexts/BRAND.md` — for voice and brand personality
- `contexts/WRITING_STYLE.md` — for all writing rules, format, and conventions
- `contexts/COMPETITORS.md` — for awareness of what competitors have written

Read `plans/CONTENT_CALENDER.md` and find posts with status `outlined` or `affiliate-done`. Ask the user which post to write.

## The Process

### Phase 1: Gather All Inputs

Read and internalize:
1. The approved outline (OUTLINE.md) — this is the structure to follow
2. The keyword map (KEYWORDS.md) — this is the placement guide
3. The reference plan (REFERENCES.md) — these links must be placed in the content
4. The affiliate products (AFFILIATE.md) — if present, weave mentions naturally
5. The writing style guide (WRITING_STYLE.md) — these rules are non-negotiable

### Phase 2: Write the Content

**For standard posts (under 3,000 words):** Write the full draft in one pass.

**For long posts (3,000+ words):** Write section by section. Present each section for user feedback before continuing.

**While writing, follow these rules strictly:**

**Voice (from WRITING_STYLE.md):**
- Follow the brand's defined voice and perspective
- Use contractions naturally
- 1-3 sentences per paragraph, max 4
- Vary sentence length. Short punchy. Then longer with nuance.
- No em dashes anywhere. Use periods, commas, or parentheses.

**Keyword placement (from KEYWORDS.md):**
- Primary keyword: in first 100 words, at least one H2, last 200 words. 3-5 total appearances.
- Secondary keywords: 1-3 appearances each. H2 headings and section openers.
- Long-tail keywords: at least once each. Natural questions in prose.
- Never stuff keywords. If removing the keyword makes the sentence read better, remove it.

**Linking (from REFERENCES.md):**
- Place all planned internal links. First internal link within 30% of content.
- Place all planned external links. First external link within 50% of content.
- Use natural anchor text that fits the sentence.
- For cluster posts: link back to parent cornerstone.
- For cornerstone posts: link to existing cluster posts.

**Affiliate products (from AFFILIATE.md, if present):**
- Mention products where they naturally fit the content.
- Do not force product mentions. If a product doesn't fit a section, don't include it there.
- Lead with the reader's problem, then the product as a solution. Not the other way around.

**Content format (from WRITING_STYLE.md):**
- Use the defined frontmatter schema
- Follow code block conventions
- Use any custom components as specified

**Things to NEVER do:**
- "In this article, we will..."
- "Let's dive in"
- "without further ado"
- "It's important to note"
- "utilize" (use "use"), "demonstrate" (use "show"), "leverage" (use "use")
- No walls of bold text
- No summary paragraphs restating what was said
- No formal "Conclusion" section
- No em dashes

**Endings:**
- No "In conclusion..." or "To summarize..."
- End with reflection, forward thought, or just stop
- 1-3 sentences max
- Primary keyword in last 200 words

### Phase 3: Self-Review

Before presenting to the user, review the draft against:

**Readability:**
- Every paragraph 1-3 sentences (max 4)
- No back-to-back sentences starting with the same word
- Zero em dashes
- Reads like a human with opinions, not a textbook

**Keywords:**
- Primary keyword appears 3-5 times naturally
- Each H2 targets a searchable phrase
- First 100 words and last 200 words contain primary keyword

**Links:**
- All planned internal links from REFERENCES.md are placed
- All planned external links are placed
- First internal link within 30% of content
- First external link within 50% of content

**Frontmatter:**
- Title includes primary keyword, under 60 characters
- Summary is 120-155 characters with primary keyword
- Date, author, tags all present

Fix any issues found during self-review before presenting to the user.

### Phase 4: Write Output

1. Write `content/[category]/[slug]/CONTENT.md` with frontmatter and full content
2. Present the draft to the user for review
3. Apply any requested changes
4. After user approves, update `plans/CONTENT_CALENDER.md` — set status to `drafted`

## Completion

"Draft approved for '[Post Title]'.
- Content: content/[category]/[slug]/CONTENT.md
- Calendar updated: status → drafted

Next: Run `/postical-reviewing` for a comprehensive review, or `/postical-writing` for the next post."
```

- [ ] **Step 2: Verify frontmatter**

Read back the file. Confirm `name: postical-writing` and description is valid.

- [ ] **Step 3: Commit**

```bash
git add skills/postical-writing/SKILL.md
git commit -m "feat: add postical-writing skill — content drafting with keyword and link placement"
```

---

### Task 8: Skill — postical-reviewing

**Files:**
- Create: `skills/postical-reviewing/SKILL.md`

- [ ] **Step 1: Write SKILL.md**

Write `skills/postical-reviewing/SKILL.md`:

```markdown
---
name: postical-reviewing
description: Use when reviewing written blog content, checking for SEO compliance, auditing internal links across the content repository, or running a content health check. Works on individual posts and the full repository.
---

# Postical — Content Review & Repository Health Check

Comprehensive review of a written blog post plus a repository-wide health audit covering internal link integrity, missing link opportunities, dead external links, and cornerstone/cluster coverage.

## When to Use

- After a post has been written (`drafted` status)
- When you want a health check across all content
- When checking for broken links after renaming or deleting posts
- Periodically to catch link rot in external URLs

## Prerequisites

For post-level review:
- `content/[category]/[slug]/CONTENT.md` (required)
- `content/[category]/[slug]/KEYWORDS.md` (required)
- `content/[category]/[slug]/REFERENCES.md` (required)
- `content/[category]/[slug]/AFFILIATE.md` (optional)
- `contexts/WRITING_STYLE.md` (required)

For repository-wide review:
- `plans/CONTENT_CALENDER.md` (required)
- All per-post `KEYWORDS.md` files (for keyword-to-post mapping)
- All per-post `CONTENT.md` files (for link scanning)

Read `CONTENT_CALENDER.md` and find posts with status `drafted`. Ask the user which post to review.

## The Process

### Phase 1: Post-Level Review

For the selected post, run these checks:

**Style Compliance (from WRITING_STYLE.md):**
- Scan for banned phrases from the DON'Ts list
- Check for AI tells: "In this article", "Let's dive in", "without further ado", "It's important to note", "utilize", "demonstrate", "leverage"
- Verify paragraph length (1-3 sentences, max 4)
- Check for em dashes (zero allowed)
- Verify no back-to-back sentences start with the same word
- Check no formal "Conclusion" section exists

**Keyword Compliance (from per-post KEYWORDS.md):**
- Count primary keyword appearances (target: 3-5)
- Verify primary keyword in: first 100 words, at least one H2, last 200 words
- Count each secondary keyword (target: 1-3 each)
- Verify each long-tail keyword appears at least once
- Flag any keyword stuffing (keyword appears forced or unnatural)

**Frontmatter Check:**
- Title includes primary keyword and is under 60 characters
- Summary is 120-155 characters with primary keyword
- Date is in ISO format (YYYY-MM-DD)
- Author is present
- Tags are present and include primary keyword
- All fields from WRITING_STYLE.md frontmatter schema are present

**Link Verification (from REFERENCES.md):**
- Every planned internal link from REFERENCES.md is placed in the content
- Every planned external link is placed
- First internal link within 30% of content
- First external link within 50% of content
- Affiliate products mentioned naturally (if AFFILIATE.md exists)

Present findings as a checklist:
```
## Post Review: [Title]

### Style ✅/⚠️
- [x] No banned phrases
- [x] No AI tells
- [ ] ⚠️ Paragraph in section 3 has 5 sentences — max is 4
- [x] Zero em dashes

### Keywords ✅/⚠️
- [x] Primary keyword: 4 appearances (target: 3-5) ✅
- [ ] ⚠️ Primary keyword missing from last 200 words
- [x] Secondary keywords: all within range

### Frontmatter ✅/⚠️
- [x] Title: 52 chars with keyword ✅
- [ ] ⚠️ Summary: 163 chars (target: 120-155)

### Links ✅/⚠️
- [x] Internal: 3/3 placed
- [ ] ⚠️ External: 2/4 placed — missing links from REFERENCES.md
```

### Phase 2: Repository-Wide Health Check

Scan ALL content in the repository:

**Internal Link Integrity:**
- Read every `CONTENT.md` in `content/`
- Extract all internal links (links pointing to other posts on the site)
- For each internal link, verify the target post exists in `content/`
- Flag broken links (target post was renamed, moved, or deleted)

**Missing Link Opportunities:**
- Build a keyword-to-post map: for each post, read its `KEYWORDS.md` and map primary + secondary keywords to that post's path
- Scan every `CONTENT.md` for mentions of keywords that belong to OTHER posts
- If a keyword mention exists but no link to the corresponding post exists, flag it as a missing link opportunity
- Present as a table:
  ```
  | In Post | Mention | Should Link To | Section |
  |---------|---------|----------------|---------|
  ```

**Orphan Detection:**
- Find posts that no other post links to — dead-end content with no discoverability
- Every post should be linked to from at least one other post

**Cornerstone/Cluster Linking:**
- Read `CONTENT_CALENDER.md` for cluster assignments
- Verify every cluster post links to its parent cornerstone
- Verify every cornerstone links to all its cluster posts
- Flag missing links in either direction

**Missing Cross-Links:**
- Posts in the same cluster that cover related topics but don't reference each other

**External Link Health:**
- Extract all external URLs from all `CONTENT.md` files
- Use WebFetch to check each URL for availability
- Flag any that return 404, 403, timeout, or redirect to unexpected locations
- Flag links to known low-quality domains

### Phase 3: Repository Health Report

Present the full report:

```markdown
## Repository Health Report

### Internal Links
- Total internal links across all posts: [N]
- Broken: [N] ⚠️
  - [Post] → [target] (reason)
- Orphan posts (no inbound links): [N] ⚠️
  - [Post title]
- Missing link opportunities: [N]
  - [Table of opportunities]

### External Links
- Total external links: [N]
- Dead (404/timeout): [N] ⚠️
  - [URL] in [Post] (status code)

### Cornerstone Coverage
- [Cluster name]: cornerstone links to [X]/[Y] clusters [✅/⚠️]
- [Cluster name]: cornerstone links to [X]/[Y] clusters [✅/⚠️]

### Content Calendar Sync
- Posts in calendar: [N]
- Post directories in content/: [N]
- Status mismatches: [N]
```

### Phase 4: Interactive Fixes

After presenting both reports:

1. Ask the user which issues to fix
2. **Auto-fixable issues** (apply with user permission):
   - Internal link paths for renamed posts (update the link target)
   - Missing link opportunities (add the link with natural anchor text)
   - Summary length issues (shorten to under 155 characters)
   - Missing keywords in specific positions (add naturally)
3. **User-decision issues** (present options):
   - Orphan posts: add links from related posts, or remove the post?
   - Dead external links: find replacement source, or remove the link?
   - Cornerstone gaps: which cluster posts should the cornerstone link to?

Apply approved fixes to the affected `CONTENT.md` files.

### Phase 5: Write Output

1. Update fixed `CONTENT.md` files
2. Update `contexts/WRITING_STYLE.md` — add any new mistakes to the Mistakes table
3. Update `plans/CONTENT_CALENDER.md` — set reviewed post's status to `reviewed`

## Completion

"Review complete for '[Post Title]'.
- [N] post-level issues found, [N] fixed
- [N] repository-wide issues found, [N] fixed
- Calendar updated: status → reviewed

Next: Run `/postical-generating-media-post` to create social media posts and image prompts, or `/postical-reviewing` for the next post."
```

- [ ] **Step 2: Verify frontmatter**

Read back the file. Confirm `name: postical-reviewing` and description is valid.

- [ ] **Step 3: Commit**

```bash
git add skills/postical-reviewing/SKILL.md
git commit -m "feat: add postical-reviewing skill — post review and repository health audit"
```

---

### Task 9: Skill — postical-generating-media-post

**Files:**
- Create: `skills/postical-generating-media-post/SKILL.md`

- [ ] **Step 1: Write SKILL.md**

Write `skills/postical-generating-media-post/SKILL.md`:

```markdown
---
name: postical-generating-media-post
description: Use when creating social media posts and AI image prompts for a blog post, generating platform-specific content for LinkedIn, X, Instagram, Facebook, Reddit, or other platforms. Produces post copy and image generation prompts per platform.
---

# Postical — Social Media Post & Image Prompt Generation

Generate platform-specific social media posts and AI image generation prompts for distributing a blog post across social channels.

## When to Use

- After a post has been reviewed (`reviewed` status)
- When repurposing blog content for social media distribution
- When generating AI image prompts for a post's visuals

## Prerequisites

Check that these files exist:
- `contexts/PLATFORMS.md` (required — defines which platforms to generate for)
- `contexts/BRAND.md` (required — for brand voice and hashtags)
- `content/[category]/[slug]/CONTENT.md` (required — the blog post to repurpose)
- `plans/CONTENT_CALENDER.md`

Read `CONTENT_CALENDER.md` and find posts with status `reviewed`. Ask the user which post to create media for.

Read `contexts/PLATFORMS.md` to know which platforms are active.

## The Process

### Phase 1: Blog Image Prompts

Generate AI image prompts for the blog post itself:

**Hero Image:**
- Create a prompt for the post's featured/hero image
- Style should match the brand's visual identity
- Include the post's topic visually
- Specify dimensions per the site's requirements

**Section Illustrations (if applicable):**
- For posts with abstract concepts, generate prompts for section-specific visuals
- Diagrams, comparisons, or conceptual illustrations

### Phase 2: Platform-Specific Posts

For EACH active platform in PLATFORMS.md, generate:

**LinkedIn:**
- Long-form post (150-300 words)
- Hook in first 2 lines (before "see more" fold)
- Professional tone matching brand voice
- 3-5 relevant hashtags
- CTA aligned with brand goals
- Image prompt: 1200x627 feed image

**X (Twitter):**
- If the content warrants it: a thread (3-7 tweets)
- If not: a single tweet (under 280 characters) with a link
- Conversational, punchy tone
- 2-3 hashtags max
- Image prompt: 1200x675 card image

**Instagram:**
- Caption (100-200 words)
- Carousel concept if applicable (slide-by-slide outline)
- 10-15 hashtags (mix of broad and niche)
- Image prompt: 1080x1080 square post
- Story prompt: 1080x1920 vertical

**Facebook:**
- Post (100-200 words)
- More casual tone than LinkedIn
- 2-3 hashtags
- Image prompt: 1200x630 feed image

**Reddit:**
- Title that follows subreddit norms (not salesy)
- Self-post body or link post with comment
- Suggest relevant subreddits
- No hashtags (Reddit doesn't use them)
- No image (Reddit posts are text-first)

**Other platforms:** Follow the specs defined in PLATFORMS.md for content style, image dimensions, and posting norms.

### Phase 3: Image Prompt Quality

Every AI image prompt must include:
- **Subject:** What the image shows
- **Style:** Photography / Illustration / Flat design / 3D render / Diagram
- **Mood:** Professional / Playful / Technical / Warm
- **Colors:** Brand colors or topic-appropriate palette
- **Dimensions:** Exact pixel dimensions for the target platform
- **Negative prompts (if applicable):** What to avoid (text, watermarks, etc.)

Example prompt format:
```
**Platform:** LinkedIn Feed
**Dimensions:** 1200x627
**Prompt:** A clean, modern illustration of a developer's workspace with multiple monitors showing CI/CD pipeline dashboards. Flat design style, blue and teal color palette, professional mood. No text overlay, no watermarks.
```

### Phase 4: Write Output

1. Write `content/[category]/[slug]/PROMPT.md` following the template structure:
   - Organized by platform
   - Each platform section has: post copy + image prompts
   - Blog section first (hero + section illustrations), then social platforms
2. Update `plans/CONTENT_CALENDER.md` — set status to `media-ready`

## Completion

"Social posts and image prompts generated for '[Post Title]'.
- Platforms: [list of platforms generated for]
- Output: content/[category]/[slug]/PROMPT.md
- Calendar updated: status → media-ready

Next: Generate images using the prompts in PROMPT.md (use your preferred AI image tool: Midjourney, DALL-E, Flux, etc.). Save generated images to content/[category]/[slug]/media/. Then run `/postical-posting [platform]` to post."
```

- [ ] **Step 2: Verify frontmatter**

Read back the file. Confirm `name: postical-generating-media-post` and description is valid.

- [ ] **Step 3: Commit**

```bash
git add skills/postical-generating-media-post/SKILL.md
git commit -m "feat: add postical-generating-media-post skill — social posts and AI image prompts"
```

---

### Task 10: Skill — postical-posting

**Files:**
- Create: `skills/postical-posting/SKILL.md`

- [ ] **Step 1: Write SKILL.md**

Write `skills/postical-posting/SKILL.md`:

```markdown
---
name: postical-posting
description: Use when posting content to a social media platform via browser automation. Takes a platform name as argument (e.g., /postical-posting linkedin). Requires media files and PROMPT.md to exist.
---

# Postical — Social Media Posting

Post content to a social media platform using Chrome browser automation. One platform per invocation.

**Usage:** `/postical-posting [platform-name]`

Examples:
- `/postical-posting linkedin`
- `/postical-posting x`
- `/postical-posting instagram`
- `/postical-posting facebook`
- `/postical-posting reddit`

<HARD-GATE>
ALWAYS confirm with the user before clicking "Post" or "Submit" on any platform. This action is irreversible. Never auto-post without explicit user approval.
</HARD-GATE>

## When to Use

- After `/postical-generating-media-post` has created PROMPT.md (`media-ready` status)
- After the user has generated images and saved them to the `media/` directory
- When ready to publish to a specific platform

## When NOT to Use

- If PROMPT.md doesn't exist for the target post
- If Chrome browser automation tools are not available

## Prerequisites

**Hard requirement: Chrome browser automation.**
Check if `mcp__claude-in-chrome__*` tools are available. If not:
- Tell the user: "Chrome browser automation is required for posting. Please configure the Chrome MCP extension and try again."
- Exit the skill. There is no fallback for this skill.

Check that these files exist:
- `contexts/PLATFORMS.md` (required — platform details and credentials)
- `content/[category]/[slug]/PROMPT.md` (required — post content for the platform)
- `content/[category]/[slug]/media/` directory (check for image files)

Read `plans/CONTENT_CALENDER.md` and find posts with status `media-ready`. Ask the user which post to publish.

Validate that the requested platform exists in PLATFORMS.md. If not: "Platform '[name]' is not configured in PLATFORMS.md. Available platforms: [list]."

## The Process

### Phase 1: Prepare Content

1. Read the platform-specific section from the post's `PROMPT.md`
2. Read platform details from `PLATFORMS.md` (profile URL, handle)
3. Check the `media/` directory for image files
4. If no images are found, ask: "No images found in media/. Do you want to (A) proceed without images, or (B) generate images first and come back?"

### Phase 2: Browser Automation

1. Call `mcp__claude-in-chrome__tabs_context_mcp` to get current browser state
2. Navigate to the platform's posting interface:
   - **LinkedIn:** Navigate to linkedin.com → click "Start a post" or go to post creation URL
   - **X:** Navigate to x.com → click compose or go to compose URL
   - **Instagram:** Navigate to instagram.com → new post flow (note: Instagram web has limited posting capabilities)
   - **Facebook:** Navigate to facebook.com → create post on page
   - **Reddit:** Navigate to the suggested subreddit → create post

3. Fill in the post content from PROMPT.md:
   - Enter the post text/body
   - Upload image(s) from the `media/` directory
   - Add hashtags if applicable
   - Add links to the blog post

4. **DO NOT click Post/Submit yet.**

### Phase 3: User Confirmation

Present a summary to the user:

```
## Ready to Post

**Platform:** [Platform name]
**Post:** [Post title]
**Content preview:** [First 100 chars of post...]
**Image:** [Filename or "no image"]
**Hashtags:** [List]

⚠️ This will publish to your live [Platform] account.

Proceed? (yes/no)
```

Wait for explicit "yes" before clicking Post/Submit.

If the user says no, ask what they want to change. Make adjustments in the browser and re-confirm.

### Phase 4: Post and Record

1. Click the Post/Submit button on the platform
2. Wait for confirmation that the post was published
3. If possible, capture the URL of the published post
4. Update `plans/CONTENT_CALENDER.md` — add `posted-[platform]` status with date

## Platform-Specific Notes

**LinkedIn:** Use the main feed composer. For company pages, navigate to the page first.

**X (Twitter):** For threads, post each tweet sequentially using the reply flow.

**Instagram:** Web posting has limitations. If the user needs full Instagram features (reels, stories), suggest using the mobile app instead and provide the content to copy-paste.

**Reddit:** Follow subreddit rules. Check if the subreddit allows link posts or requires self-posts. Include a genuine comment adding value, not just a link drop.

**Facebook:** Post to the brand's page, not personal profile (unless the user specifies otherwise).

## Completion

"Posted '[Post Title]' to [Platform].
- Post URL: [URL if captured]
- Calendar updated: posted-[platform] on [date]

Run `/postical-posting [next-platform]` to post to another platform."
```

- [ ] **Step 2: Verify frontmatter**

Read back the file. Confirm `name: postical-posting` and description is valid.

- [ ] **Step 3: Commit**

```bash
git add skills/postical-posting/SKILL.md
git commit -m "feat: add postical-posting skill — browser automation for social media posting"
```

---

### Task 11: README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write README.md**

Write `README.md`:

```markdown
# Postical

A content engine plugin for Claude Code. Create, optimize, and distribute blog content at scale.

Postical provides an 8-step pipeline from brand profiling through content writing to social media posting. Each step is a separate skill with clear inputs, outputs, and approval gates.

## Installation

```bash
claude plugins install postical
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
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with installation, quick start, and pipeline overview"
```

---

### Task 12: Final Verification

- [ ] **Step 1: Verify complete file structure**

```bash
find . -type f -not -path './.git/*' -not -path './docs/*' | sort
```

Expected output:
```
./.claude-plugin/plugin.json
./LICENSE
./README.md
./content.md
./package.json
./SKILL.md
./skills/postical-generating-affiliate/SKILL.md
./skills/postical-generating-media-post/SKILL.md
./skills/postical-generating-outline/SKILL.md
./skills/postical-generating-title/SKILL.md
./skills/postical-planning/SKILL.md
./skills/postical-posting/SKILL.md
./skills/postical-reviewing/SKILL.md
./skills/postical-writing/SKILL.md
./templates/.env.template
./templates/BRAND.md.template
./templates/COMPETITORS.md.template
./templates/CONTENT_CALENDER.md.template
./templates/KEYWORDS.md.template
./templates/PLATFORMS.md.template
./templates/WRITING_STYLE.md.template
./templates/per-post/AFFILIATE.md.template
./templates/per-post/CONTENT.md.template
./templates/per-post/KEYWORDS.md.template
./templates/per-post/OUTLINE.md.template
./templates/per-post/PROMPT.md.template
./templates/per-post/REFERENCES.md.template
```

- [ ] **Step 2: Verify all skill frontmatter**

Read each SKILL.md and confirm:
- `name` field matches the directory name
- `description` field starts with "Use when"
- `description` is under 1024 characters
- No YAML syntax errors

```bash
for skill in skills/*/SKILL.md; do echo "=== $skill ==="; head -4 "$skill"; echo; done
```

- [ ] **Step 3: Verify plugin.json**

```bash
cat .claude-plugin/plugin.json | python3 -m json.tool
```

Expected: valid JSON with name "postical", version "1.0.0".

- [ ] **Step 4: Clean up original files**

The original `content.md` and `SKILL.md` at the project root are the workflow documentation that inspired postical. They are not part of the plugin. Ask the user: "The original content.md and SKILL.md files at the project root are your workflow notes, not part of the plugin. Want me to (A) move them to docs/, (B) delete them, or (C) leave them as-is?"

- [ ] **Step 5: Final commit**

```bash
git add -A
git status
git commit -m "feat: postical v1.0.0 — content engine plugin with 8 skills"
```
