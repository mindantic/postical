# Postical — Usage Examples

## Example 1: Starting Fresh

You have a niche and a product. You know what you want to write about but haven't done any research yet.

**Run `/postical-planning` with your context:**

```
/postical-planning

I'm building a content engine for my SaaS product called "DeployBot" — 
it's a one-click deployment platform for indie hackers and small startups. 
We compete with Railway, Render, and Fly.io but we're simpler and cheaper.

My target audience is solo founders and small dev teams (1-5 people) who 
don't want to deal with DevOps. We're based in the US but serve globally.

I want to write around 15-20 blog posts covering topics like deployment 
best practices, cost comparison guides, migration tutorials, and developer 
productivity. The goal is to rank on Google and drive signups.

Our blog uses MDX with Next.js. We post on LinkedIn and X.
```

Postical walks you through Steps 0-3 interactively — asking follow-up questions one at a time about your brand voice, ICP details, affiliate preferences, etc. Each context file is presented for your approval before moving on.

**What happens next:**

```
/postical-generating-title      # Generates topic clusters + 3-5 title options per post
/postical-generating-outline    # Deep research + outline for one post at a time
/postical-writing               # Writes the post from the approved outline
/postical-reviewing             # Reviews content + checks repo health
/postical-generating-media-post # Creates social posts + AI image prompts
/postical-posting linkedin      # Posts to LinkedIn via browser
```

---

## Example 2: You Already Have Research

You have existing files — competitor spreadsheets, keyword exports, brand guidelines, or content briefs from a client. You want postical to use them instead of starting from scratch.

**Run `/postical-planning` and point to your files:**

```
/postical-planning

I'm setting up content for a client. I've already done research and 
have files ready. Please use these as the starting point instead of 
asking me everything from scratch:

- Brand brief: see /docs/client-brief.pdf
- Competitor list with SEO data: see /research/competitors.csv
- Keyword research export from Ahrefs: see /research/keywords.csv  
- Their existing style guide: see /docs/brand-voice.md
- They're active on LinkedIn, Instagram, and X

Please read these files first, then generate the context files 
(BRAND.md, PRODUCT.md, COMPETITORS.md, KEYWORDS.md, WRITING_STYLE.md, 
PLATFORMS.md) based on what's in them. Ask me only about anything 
that's missing or unclear.
```

Postical reads your files, extracts the relevant data, populates the context files, and only asks about gaps — instead of running the full Q&A from zero.

**Supported file formats:**

- PDFs (client briefs, brand guides)
- CSVs (keyword exports, competitor data)
- Markdown files (existing style guides, notes)
- Spreadsheet exports (Ahrefs, SEMrush, DataforSEO)

---

## Example 3: Resuming Work

You've already set up the brand and generated titles. You're coming back to outline and write posts.

```
/postical-generating-outline

Pick up where I left off. What posts need outlining?
```

Postical reads the content calendar, finds posts with `title-approved` status, and asks which one to work on. No re-setup needed — all context is in the files.

---

## Example 4: Review Across All Content

You've written several posts and want a health check across everything.

```
/postical-reviewing

Run a full repository health check across all posts. I want to see 
broken links, missing internal link opportunities, orphan posts, and 
any style violations.
```

Postical scans every post, builds a keyword-to-post map, checks all internal and external links, and presents a full health report with auto-fix suggestions.
