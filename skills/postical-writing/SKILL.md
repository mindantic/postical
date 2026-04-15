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
