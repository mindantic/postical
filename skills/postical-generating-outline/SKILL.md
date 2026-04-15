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

**Dependency check (run before any work):**

1. **DataforSEO MCP:** Check if `mcp__dataforseo__*` tools are available. If not, warn the user: "DataforSEO MCP is not configured. Deep research will use web search only, which may be less thorough. To set it up, run `/postical-planning` again." Proceed with web search fallback.
2. **Context7 MCP** (optional): Check if `mcp__plugin_context7_context7__*` tools are available. If not, no warning needed — fall back to web search silently for library documentation.

**File prerequisites:**

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
