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

**Dependency check (run before any work):**

1. **DataforSEO MCP (REQUIRED):** Check if `mcp__dataforseo__*` tools are available. If not, stop and tell the user: "DataforSEO MCP server is required but not configured. Run `/postical-planning` first — it will guide you through setup."

**File prerequisites:**

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
