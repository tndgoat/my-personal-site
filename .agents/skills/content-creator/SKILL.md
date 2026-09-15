---
name: content-creator
description: >-
  Automates and streamlines content creation for the my-personal-site repository.
  Activate this skill immediately when the user wants to: write a blog post, draft an article,
  create new content, add a tech note, write about life/mindfulness/philosophy/personal reflections,
  log a cycling ride, add a new ride record, generate route data, create a ride entry, or append
  to rides.json. Also trigger when user says things like "I want to write about X", "create a post
  on X", "I did a ride today", "add a new cycling log", "draft something for my blog", or "let me
  journal this ride". Use this skill even if the user only gives a rough idea — the skill handles
  the full workflow from input gathering to file creation.
---

# Content Creator Skill

This skill automates two distinct content creation workflows for `my-personal-site`:

- **Workflow A — Blog Authoring**: Creates a new Markdown post under `src/content/blog/`
- **Workflow B — Cycling Log**: Appends a new ride to `src/data/rides.json` and creates its companion `src/content/rides/<id>.md`

Read the relevant reference file before executing:
- Blog: [`references/blog-templates.md`](./references/blog-templates.md)
- Rides: [`references/rides-templates.md`](./references/rides-templates.md)

---

## Disambiguation

If the user's intent is ambiguous (e.g., "create new content"), ask exactly one clarifying question:

> "Should I create a **blog post** or a **cycling ride log**?"

Once the workflow is clear, proceed without further interruption unless required inputs are missing.

---

## Workflow A: Blog Authoring

### Required Inputs

Collect all of these before writing. If the user's initial message already answers some, extract them directly — only ask about what's missing.

| Field | Description | Default |
|---|---|---|
| `title` | Full post title (display-ready) | — required — |
| `category` | One of: `Tech`, `Life`, `Mindfulness`, `Philosophy`, `Reflections` | `Tech` |
| `topic_summary` | 1–3 sentences describing what the post covers | — required — |
| `tags` | Comma-separated list of relevant tags | Inferred from category + topic |
| `cover_image` | Filename in `public/images/` (e.g., `my-cover.png`) | `null` (omit field) |
| `excerpt` | Short 1-sentence teaser for the listing page | Auto-generated from topic_summary |

### Procedure

**Step 1 — Derive the slug.**
Convert `title` to a URL-safe slug: lowercase, spaces to hyphens, strip special characters.

```
"My Journey with Go Generics" → "my-journey-with-go-generics"
```

**Step 2 — Check for filename collision.**
Verify `src/content/blog/<slug>.md` does not already exist. If it does, append `-2` (or next available number) to the slug and inform the user.

**Step 3 — Render the frontmatter block.**
Use the exact template from `references/blog-templates.md` for the chosen category. Set `date` to today's date in `YYYY-MM-DD` format.

**Step 4 — Generate the post body.**
Follow the **Writing Voice** rules below and the category-specific body structure from `references/blog-templates.md`. The body must:
- Open with a personal hook (anecdote, provocative question, or vivid scene) — never start with a generic definition.
- Use H2 (`##`) for main sections, H3 (`###`) for sub-points.
- Minimum 3 substantive sections.
- Close with an **"Actionable Takeaway"** or **"Closing Thought"** section (category-appropriate).
- Length: 400–900 words for Tech; 300–700 words for other categories.

**Step 5 — Write the file.**
Create `src/content/blog/<slug>.md` with the rendered content.

**Step 6 — Confirm.**
Report to the user:
```
✓ Created: src/content/blog/<slug>.md
  Title: <title>
  Category: <category>
  Tags: <tags>
```

---

## Workflow B: Cycling Log

### Required Inputs

| Field | Description | Default |
|---|---|---|
| `title` | Ride title (e.g., "Ride 427") | Auto: "Ride <next_id>" |
| `date` | Date of ride (`YYYY-MM-DD`) | Today |
| `distance` | Distance in miles (decimal) | — required — |
| `avg_speed` | Average speed in mph (decimal) | — required — |
| `elevation_gain` | Elevation gain in feet (integer) | — required — |
| `images` | Array of filenames in `public/images/` | `[]` (empty) |
| `journal_notes` | User's raw notes/feelings about the ride | Optional; used to generate journal |

### Procedure

**Step 1 — Determine the next ride ID.**
Read `src/data/rides.json`. The new `id` = `max(existing ids) + 1`.

**Step 2 — Generate mock 2D route coordinates.**
Since GPS/Strava integration is not yet available, generate a realistic mock coordinate array using the algorithm in `references/rides-templates.md`. The array must have 25–45 `[x, y]` pairs within a `[0, 100]` bounding box. The shape should look like a plausible cycling route (not a straight line, not a random cloud).

**Step 3 — Build the JSON record.**
Construct the new ride object following the exact schema in `references/rides-templates.md` and **append** it to the beginning of the array in `src/data/rides.json` (newest first).

**Step 4 — Create the companion Markdown file.**
Create `src/content/rides/<id>.md` using the frontmatter and body templates from `references/rides-templates.md`. If `journal_notes` were provided, weave them into the journal prose authentically — keep the user's voice, don't sanitize the personality out.

**Step 5 — Confirm.**
Report to the user:
```
✓ Appended ride #<id> to: src/data/rides.json
✓ Created journal:        src/content/rides/<id>.md
  Distance: <distance> mi  |  Avg Speed: <avg_speed> mph  |  Elevation: <elevation_gain> ft
```

---

## Writing Voice

Apply this voice consistently across **both** workflows:

- **Conversational but grounded**: Write like explaining to a smart friend, not presenting at a conference. Use "I", "you", contractions freely.
- **Reflective**: Don't just state facts. Show what you noticed, questioned, or learned.
- **Structured for scannability**: H2 headings should be clear and specific (not "Introduction"). Use short paragraphs (2–4 sentences max).
- **Actionable**: Every piece ends with something the reader can do, think, or try.
- **Honest**: Acknowledge trade-offs, failures, and uncertainty. Avoid hype.

**Tone by category:**
| Category | Tone |
|---|---|
| Tech | Precise but not dry. Show curiosity about *why* things work. |
| Life | Warm, observational, slightly wry. |
| Mindfulness | Slow-paced, spacious. No jargon. |
| Philosophy | Tentative and questioning. Acknowledge complexity. |
| Reflections | Intimate. First-person narrative. Specific details > generalizations. |

---

## Validation

After creating any file, verify it exists and is non-empty:

```bash
# Blog
ls -lh src/content/blog/<slug>.md

# Ride
ls -lh src/content/rides/<id>.md
python3 -c "import json; data=json.load(open('src/data/rides.json')); print('Rides count:', len(data)); print('Latest ID:', data[0]['id'])"
```

If a validation check fails, diagnose and fix before reporting success to the user.
