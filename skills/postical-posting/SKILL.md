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
