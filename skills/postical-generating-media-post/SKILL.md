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
