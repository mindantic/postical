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

1. **DataforSEO MCP (REQUIRED):** Check if `mcp__dataforseo__*` tools are available. If not available, tell the user:

   "Postical requires the DataforSEO MCP server for competitor analysis and keyword research. It is not currently configured.

   Would you like me to help you set it up? I need your permission to install it.

   **What's needed:**
   - A DataforSEO account (sign up at https://dataforseo.com — pay-as-you-go pricing)
   - The official MCP server: github.com/dataforseo/mcp-server-typescript

   **Shall I proceed with the installation?** (yes/no)"

   If the user says yes, guide them through installing and configuring the DataforSEO MCP server in their Claude Code settings. If the user says no, **stop the pipeline.** Do not proceed without DataforSEO.

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
