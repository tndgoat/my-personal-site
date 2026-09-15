---
title: "Building a Minimalist Personal Site with Next.js App Router and Markdown"
slug: "building-a-minimalist-personal-site-with-nextjs-app-router-and-markdown"
date: "2026-09-15"
category: "Tech"
tags: ["Next.js", "Markdown", "Architecture", "Simplicity", "Frontend"]
excerpt: "I ditched the headless CMS, deleted the dashboard, and started writing Markdown files — turns out that's all I ever needed."
coverImage: "/images/blog/minimalist-stack.webp"
---

At some point last year I had a Notion database, a Contentful space, and a half-configured Sanity studio all pointed at the same blog that had three posts in it. The overhead had completely eclipsed the actual writing. I wasn't thinking about *what* to say anymore — I was thinking about content types and webhook configurations.

So I deleted all of it and wrote some Markdown.

## Why Headless CMSs Feel Like Overkill for a Personal Site

Headless CMSs are genuinely excellent tools. For a team with non-technical editors, a content approval workflow, and scheduled publishing — they're the right call. That's not what a personal site is.

For a single developer writing for themselves, a headless CMS introduces:

- A login screen you visit twice a year
- A vendor relationship to manage (pricing tiers, API limits, potential sunset)
- A content model you have to design before you write a single word
- A build webhook that silently breaks when you change your schema

None of those things make writing better. They just exist between you and the blank page.

## The Stack I Landed On

The whole content layer is three things: a folder, some Markdown files, and two Node.js functions.

```
src/
└── content/
    └── blog/
        ├── hello-golang.md
        └── this-post.md
```

Each file has a frontmatter block at the top and the post body below it:

```markdown
---
title: "My Post Title"
date: "2026-09-15"
tags: ["Next.js", "Markdown"]
excerpt: "One sentence that earns the click."
---

The actual content starts here...
```

On the Next.js side, two functions do all the heavy lifting:

```typescript
// src/lib/blog.ts
export function getAllPosts(): BlogPost[] {
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(contentDir, filename), 'utf-8')
      );
      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title,
        date: data.date,
        tags: data.tags ?? [],
        excerpt: data.excerpt,
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
```

That's it. No API calls. No rate limits. No environment variables for content. The files are co-located with the code, version-controlled with git, and deployable to any static host without a webhook in sight.

## What You Actually Gain

**Speed.** `getAllPosts()` runs at build time. By the time a user hits your blog page, the HTML is already sitting on a CDN.

**Portability.** Your content is plain text. It will still be readable in 20 years regardless of what happens to any SaaS company.

**Ownership.** Your posts live in your repository. You can grep them, batch-edit them, back them up, or migrate them with a shell script.

**Writing flow.** Open a file, write, save, commit. That's the entire publishing workflow.

## The Honest Trade-offs

This approach isn't for everyone. If you need any of the following, a CMS starts making sense again:

- **Non-developer collaborators** — your editor can't push to a git repo
- **Rich media management** — inline image transforms, focal point cropping, etc.
- **Scheduled publishing** — Markdown doesn't know what time it is
- **Content preview without a deploy** — you'd need to wire up draft mode

For a solo developer writing technical posts or personal reflections, none of these matter. But be honest with yourself before assuming they don't.

## Actionable Takeaway

If you have a personal site with a CMS you haven't touched in months, try this: create a `src/content/blog/` folder, write one post as a `.md` file, and wire up `gray-matter` to read it. The whole setup takes about 30 minutes. Then write the next post and notice how much faster the feedback loop feels — no save to CMS, no wait for webhook, just refresh and there it is.

You might find you don't miss the dashboard at all.
