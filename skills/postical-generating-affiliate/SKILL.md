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
