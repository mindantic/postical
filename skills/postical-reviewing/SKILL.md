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
