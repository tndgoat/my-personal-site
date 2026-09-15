# Blog Templates Reference

Templates and structural guidance for Workflow A (Blog Authoring).
Read this file whenever executing a blog creation task.

---

## Frontmatter Templates

### Tech Category

```markdown
---
title: "Your Title Here"
slug: "your-title-here"
date: "YYYY-MM-DD"
category: "Tech"
tags: ["Tag1", "Tag2", "Tag3"]
excerpt: "One punchy sentence that makes a reader want to click."
coverImage: "/images/filename.png"
---
```

> Omit `coverImage` entirely if no image is provided — do not leave it as `null` or empty string.

### Life Category

```markdown
---
title: "Your Title Here"
slug: "your-title-here"
date: "YYYY-MM-DD"
category: "Life"
tags: ["Tag1", "Tag2"]
excerpt: "A sentence that opens a door, not closes one."
coverImage: "/images/filename.png"
---
```

### Mindfulness / Philosophy / Reflections

```markdown
---
title: "Your Title Here"
slug: "your-title-here"
date: "YYYY-MM-DD"
category: "Mindfulness"
tags: ["Tag1", "Tag2"]
excerpt: "A question, image, or observation that draws the reader in."
---
```

> For introspective categories, `coverImage` is optional and often omitted intentionally.

---

## Tag Suggestions by Category

Use as starting points; always customize to the actual topic.

| Category | Common Tags |
|---|---|
| Tech | `TypeScript`, `Go`, `Next.js`, `Architecture`, `Performance`, `Backend`, `Frontend`, `Testing`, `DevTools` |
| Life | `Habits`, `Routine`, `Simplicity`, `Work`, `Learning`, `Growth` |
| Mindfulness | `Focus`, `Presence`, `Slow Living`, `Attention`, `Rest` |
| Philosophy | `Meaning`, `Identity`, `Questions`, `Uncertainty`, `Time` |
| Reflections | `Journal`, `Personal`, `Memory`, `Change` |

---

## Body Structure Templates

### Tech Post Body

Structure for technical writing. Must include actual code or concrete examples when relevant.

```markdown
<!-- OPENING HOOK: Start with the problem, not the solution. -->
<!-- Show a scenario where the reader would have hit this exact issue. -->

## The Problem (or: Why I Started Looking)

<!-- 2–4 sentences: what was broken, confusing, or unsatisfying. -->
<!-- Make it specific. "I was building X and noticed Y" beats "Many developers face Z." -->

## What I Tried First

<!-- Optional section for failed attempts. Makes the eventual solution more satisfying. -->
<!-- Be honest about wrong turns. -->

## The Approach

<!-- Core technical explanation. Use H3 sub-sections for multi-step processes. -->

### Step 1: ...

<!-- Code block if applicable: -->
```language
// code here
```

<!-- 2–3 sentences explaining WHY this works, not just what it does. -->

### Step 2: ...

<!-- Continue pattern. -->

## Trade-offs and Limitations

<!-- What does this approach NOT handle? When would you choose differently? -->
<!-- This section builds trust. Skipping it makes the post feel like marketing. -->

## Actionable Takeaway

<!-- One concrete thing the reader can do RIGHT NOW. -->
<!-- Example: "Try replacing X with Y in your next project and notice..." -->
```

---

### Life Post Body

```markdown
<!-- OPENING: A specific moment, image, or observation. Not a thesis statement. -->
<!-- Example: "It was 6:47am and I was watching steam curl off my coffee..." -->

## What I Noticed

<!-- The observation that sparked the post. Sensory, concrete, present-tense. -->

## The Thread I Pulled

<!-- What deeper thing did this connect to? The reflection. -->
<!-- This is where the post finds its meaning — let it breathe. -->

## What I'm Doing About It

<!-- Practical or behavioral: a habit, a decision, a question you're sitting with. -->
<!-- Authenticity > inspiration. "I'm trying X, uncertain if it'll work" is great. -->

## Closing Thought

<!-- Leave the reader with something to carry, not a bow to tie. -->
<!-- A question, an image, or a sentence that opens outward. -->
```

---

### Mindfulness Post Body

```markdown
<!-- OPENING: Slow. Sensory. Set a scene, not an agenda. -->

## The Invitation

<!-- What are you inviting the reader to pay attention to? -->
<!-- Keep sentences short. Whitespace is part of the content. -->

## What Gets in the Way

<!-- Honest about the obstacles: noise, habit, resistance. -->
<!-- No toxic positivity. -->

## A Simple Practice

<!-- One concrete, low-barrier thing to try. -->
<!-- Include duration, setting, and what to notice. -->

## Closing Thought

<!-- Quiet. Non-prescriptive. Let the reader finish the thought themselves. -->
```

---

### Philosophy Post Body

```markdown
<!-- OPENING: Pose the question you're genuinely uncertain about. -->
<!-- Example: "I keep wondering whether growth requires loss, or if that's a story I tell myself." -->

## The Tension

<!-- Two positions, two intuitions, two framings that pull in opposite directions. -->
<!-- Don't resolve it yet. Sit in the tension. -->

## What the Thinkers Say

<!-- Optional: Reference a philosopher, book, or idea — but briefly, in your own words. -->
<!-- Don't name-drop. Explain why it matters to the question. -->

## Where I Land (For Now)

<!-- Your tentative position. Use "I think", "it seems to me", "I'm not sure but..." -->
<!-- Philosophy posts should feel like thinking-in-progress, not lectures. -->

## The Open Question

<!-- End with what you still don't know. An invitation to think further. -->
```

---

### Reflections Post Body

```markdown
<!-- OPENING: Specific memory or moment. Date, place, sensory detail. -->
<!-- Example: "September 2023. I was sitting in the airport in Singapore..." -->

## The Memory

<!-- Recreate the scene. What did it feel like in the moment? -->
<!-- Specific names, places, weather, objects > vague emotions. -->

## What It Means Now

<!-- Looking back: what did you understand then that you didn't? Or vice versa? -->
<!-- Time as a lens. -->

## What Remained

<!-- What changed, what stayed, what you carry forward. -->
<!-- This is the emotional core of the post. Take your time here. -->

## A Note to Future Self

<!-- Optional: Direct address to yourself. Feels intimate, works powerfully for Reflections. -->
```

---

## Worked Example: Tech Post

**Input:** Title = "Why I Stopped Using useEffect for Data Fetching", Category = Tech, Tags = ["React", "Next.js", "Performance"]

**Generated frontmatter:**

```markdown
---
title: "Why I Stopped Using useEffect for Data Fetching"
slug: "why-i-stopped-using-useeffect-for-data-fetching"
date: "2026-09-15"
category: "Tech"
tags: ["React", "Next.js", "Performance"]
excerpt: "useEffect seemed like the obvious choice — until I actually looked at what it was doing to my users."
---
```

**Opening hook (do NOT copy verbatim — generate fresh each time):**

> I'd been doing it for years. Component mounts, useEffect fires, data loads, spinner disappears. It felt natural. Then I profiled a page and watched three sequential waterfalls stack up like a bad joke. The data was there. The pattern was the problem.
