# Rides Templates Reference

Templates and algorithms for Workflow B (Cycling Log & Route Generator).
Read this file whenever executing a ride creation task.

---

## JSON Record Schema

Each ride entry in `src/data/rides.json` must conform exactly to this shape:

```json
{
  "id": 427,
  "title": "Ride 427",
  "distance": 38.50,
  "avgSpeed": 16.80,
  "elevationGain": 742,
  "date": "2026-09-15",
  "coordinates": [
    [10.0, 45.2],
    [14.3, 52.7],
    "..."
  ]
}
```

**Field rules:**
- `id`: integer, must be exactly `max(existing ids) + 1`.
- `title`: string. Default to `"Ride <id>"` if user does not provide a custom name.
- `distance`: float, 2 decimal places, in miles.
- `avgSpeed`: float, 2 decimal places, in mph.
- `elevationGain`: integer, in feet.
- `date`: string, format `"YYYY-MM-DD"`.
- `coordinates`: array of `[x, y]` pairs (floats, 1 decimal place). See algorithm below.

**Insertion position:** Prepend the new record at index `0` of the array (newest first), keeping existing records intact.

---

## Mock Coordinate Generation Algorithm

Since Strava/GPX integration is not yet available, use this algorithm to generate a realistic-looking 2D route.

### Principles

- Produce **25–45 coordinate pairs**.
- All values must stay within the bounding box `[5, 95]` × `[5, 95]` (padding keeps the SVG polyline away from edges).
- The route should form a **recognizable loop or out-and-back shape** — not a random scatter, not a straight line.
- Coordinates represent arbitrary 2D space for the SVG canvas, not real GPS. Scale doesn't matter, shape does.

### Algorithm: Biased Random Walk with Loop Closure

Use the following step-by-step logic to generate coordinates:

```
1. Choose a random starting point near the center:
   start = [random(35, 65), random(35, 65)]

2. Choose a loop shape type randomly:
   - Type A: "Lollipop loop" (straight out, large loop, straight back)
   - Type B: "Figure-8" (two connected loops)
   - Type C: "Out-and-back with detour" (go out, veer, come back)

3. Generate waypoints for the chosen shape (8–12 key waypoints).
   Each waypoint is relative to the previous one using:
     dx = random(-20, 20), dy = random(-20, 20)
   with a "shape bias" vector nudging the walk toward the next
   intended corner of the loop.

4. Interpolate between waypoints with micro-jitter:
   - Between each pair of waypoints, add 3–5 intermediate steps.
   - Each intermediate step adds small random noise:
     noise_x = random(-3, 3), noise_y = random(-3, 3)
   - This creates the organic, road-like variation of a real route.

5. Clamp all coordinates to [5, 95]:
   x = max(5, min(95, x))
   y = max(5, min(95, y))

6. Round each value to 1 decimal place.

7. The final coordinate array represents the full polyline path.
```

### Pre-built Example Coordinate Sets

Use one of these verbatim when a simple, reliable example is needed. Vary choice per ride.

**Example A — Lollipop Loop (32 points):**
```json
[
  [50.0, 50.0], [48.2, 44.1], [45.7, 38.5], [42.3, 33.2], [39.8, 28.6],
  [36.1, 24.9], [33.5, 22.1], [30.2, 20.8], [27.6, 22.4], [25.9, 25.7],
  [25.1, 29.8], [25.8, 34.0], [27.9, 37.5], [31.2, 40.1], [34.8, 41.2],
  [38.6, 40.6], [41.7, 38.4], [43.9, 35.3], [44.8, 32.1], [43.7, 29.2],
  [41.1, 27.5], [38.3, 27.9], [36.5, 30.4], [36.8, 34.1], [39.0, 36.8],
  [42.5, 37.2], [45.3, 35.0], [47.0, 31.5], [47.2, 37.2], [48.1, 42.8],
  [49.4, 46.9], [50.0, 50.0]
]
```

**Example B — Out-and-Back with Detour (28 points):**
```json
[
  [20.0, 50.0], [25.3, 48.6], [30.7, 47.9], [36.1, 47.2], [41.5, 46.8],
  [46.9, 46.4], [52.2, 47.1], [57.4, 48.2], [62.5, 50.1], [66.8, 53.4],
  [70.2, 57.9], [73.1, 61.2], [74.8, 64.6], [74.2, 67.3], [71.5, 69.0],
  [68.1, 67.8], [65.4, 64.5], [63.2, 61.0], [60.1, 58.2], [55.0, 55.9],
  [49.8, 54.1], [44.5, 52.7], [39.2, 51.8], [34.0, 51.2], [28.8, 50.9],
  [24.1, 50.7], [21.5, 50.4], [20.0, 50.0]
]
```

**Example C — Wandering Loop (38 points):**
```json
[
  [55.0, 30.0], [59.2, 27.4], [63.8, 25.1], [68.1, 24.3], [71.9, 25.8],
  [74.6, 28.9], [76.0, 33.2], [75.8, 37.8], [73.9, 41.7], [70.7, 44.5],
  [67.1, 46.0], [63.3, 46.2], [59.8, 45.1], [57.0, 42.8], [55.2, 49.4],
  [52.8, 55.7], [49.5, 61.2], [45.3, 65.8], [40.6, 69.1], [35.8, 70.9],
  [31.1, 70.5], [27.2, 68.2], [24.5, 64.3], [23.4, 59.8], [24.1, 55.1],
  [26.8, 51.0], [30.7, 47.9], [35.1, 45.8], [39.8, 44.9], [44.2, 44.2],
  [47.5, 41.6], [49.1, 37.5], [49.4, 33.2], [50.2, 29.1], [51.8, 26.3],
  [53.1, 27.2], [54.2, 28.7], [55.0, 30.0]
]
```

When generating fresh coordinates (rather than using an example), apply the biased random walk algorithm above and verify the result looks plausible by reviewing the first 5 and last 5 points — the route should clearly start and end near the same general area for a loop, or mirror symmetrically for an out-and-back.

---

## Markdown Frontmatter Template

```markdown
---
images:
  - "/images/filename1.jpg"
  - "/images/filename2.jpg"
---
```

**Rules:**
- If no images are provided by the user, output an empty frontmatter block:
  ```markdown
  ---
  images: []
  ---
  ```
- All image paths must begin with `/images/` (the `public/` prefix is implicit in Next.js static serving).
- Do not fabricate image filenames. Only include images the user explicitly mentions.

---

## Journal Body Template

The body below the frontmatter is a reflective, first-person cycling journal entry.

### Structure

```markdown
One or two opening sentences that drop the reader directly into the ride.
No "Today I went for a ride." — open with sensation, weather, a detail.

**Highlights of today's ride:**
- Bullet one: a specific moment, observation, or achievement.
- Bullet two: something that was hard, surprising, or funny.
- Bullet three: a discovery — a street, a view, a coffee stop.

One closing sentence: a forward-looking thought, a lingering feeling, or
a commitment for next time.
```

### Tone Guidelines for Ride Journals

- **Physical and sensory**: mention legs, breath, gradient, sound of tires, temperature.
- **Specific**: name the approximate area, the climb, the weather. Avoid "nice route."
- **Honest about difficulty**: if it was hard, say so. If you bonked, say so.
- **Curious**: something noticed on the road — wildlife, architecture, another cyclist.
- **Brief**: journal entries are 80–160 words. Dense, not padded.

---

## Worked Example: Full Ride Entry

**Input from user:**
- Distance: 45.3 mi
- Avg Speed: 17.2 mph
- Elevation: 1,240 ft
- Images: `morning-grind.jpg`
- Notes: "brutal headwind on the way back, almost quit at mile 30, glad I didn't"

**Generated JSON record** (appended at index 0 of `rides.json`):
```json
{
  "id": 427,
  "title": "Ride 427",
  "distance": 45.30,
  "avgSpeed": 17.20,
  "elevationGain": 1240,
  "date": "2026-09-15",
  "coordinates": [
    [55.0, 30.0], [59.2, 27.4], [63.8, 25.1], [68.1, 24.3], [71.9, 25.8],
    [74.6, 28.9], [76.0, 33.2], [75.8, 37.8], [73.9, 41.7], [70.7, 44.5],
    [67.1, 46.0], [63.3, 46.2], [59.8, 45.1], [57.0, 42.8], [55.2, 49.4],
    [52.8, 55.7], [49.5, 61.2], [45.3, 65.8], [40.6, 69.1], [35.8, 70.9],
    [31.1, 70.5], [27.2, 68.2], [24.5, 64.3], [23.4, 59.8], [24.1, 55.1],
    [26.8, 51.0], [30.7, 47.9], [35.1, 45.8], [39.8, 44.9], [44.2, 44.2],
    [47.5, 41.6], [49.1, 37.5], [49.4, 33.2], [50.2, 29.1], [51.8, 26.3],
    [53.1, 27.2], [54.2, 28.7], [55.0, 30.0]
  ]
}
```

**Generated `src/content/rides/427.md`** (do NOT copy verbatim — generate fresh each time):
```markdown
---
images:
  - "/images/morning-grind.jpg"
---
Cold start, strong legs — then mile 22 the wind turned and everything
changed. A steady 18mph headwind for the entire return leg, the kind
that makes you question your life choices.

**Highlights of today's ride:**
- The first 20 miles felt effortless; kept a steady 19mph without pushing.
- Mile 30 was the low point — considered cutting the route short at the park entrance.
- Held on, dropped cadence, accepted the suffering. The last 5 miles home felt like a gift.

Glad I didn't quit. That's the version of this ride I'll remember.
```

---

## Notes on Consistency

- The `id` in the JSON record and the `<id>.md` filename must always match exactly.
- After writing both files, always run the validation commands specified in `SKILL.md` to confirm correctness.
- Never modify existing ride records in `rides.json` — only prepend new ones.
