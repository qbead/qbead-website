---
title: Lesson Layout Example
layout: lesson
section: _internal
topics: documentation, examples, layouts
difficulty: Beginner
objectives:
  - Understand when to use lesson layout
  - Learn lesson-specific frontmatter properties
  - See lesson features demonstrated on this page
headerImage: https://lipsum.app/random/1600x900
description: Documentation for the lesson layout (demonstrated by this page)
robots: false
nextLesson: _internal/layouts/literate-layout
---

# Lesson Layout

This page uses `layout: lesson` - notice the header image above, difficulty badge, topics, and objectives section. The lesson layout is specifically designed for educational content.

## When to Use

Use the lesson layout for:
- All educational content in the `/lessons/` directory
- Tutorial-style pages
- Step-by-step guides with learning objectives
- Content that needs difficulty levels and topic categorization

## Lesson Layout Features

### Header Section
- **Header image** - Large visual at the top (set with `headerImage`)
- **Difficulty badge** - Shows lesson difficulty level
- **Topics chips** - Clickable topic tags for filtering
- **Learning objectives** - Numbered list of what students will learn

### Navigation
- **"Next Lesson" callout** - Appears at bottom if `nextLesson` is set
- **Lesson gallery integration** - Automatically appears in `/lessons` gallery
- **Topic filtering** - Lessons can be filtered by topics in the gallery

## Required Frontmatter

````yaml
---
title: Your Lesson Title
layout: lesson
section: lessons  # Makes lessons nav item active
topics: quantum mechanics, programming
difficulty: Beginner  # or Intermediate, Advanced
objectives:
  - First learning objective
  - Second learning objective
  - Third learning objective
headerImage: /qbeadmedia/my-lesson-image.jpg
description: Brief description for search engines
keywords: relevant, seo, keywords
nextLesson: lessons/next-lesson-slug  # Optional
---
````

### Property Details

| Property | Required | Description | Example |
|----------|----------|-------------|---------|
| `title` | Yes | Lesson title | `"Introduction to Qubits"` |
| `layout` | Yes | Must be `lesson` | `lesson` |
| `topics` | Yes | Comma-separated topics | `"quantum mechanics, hardware"` |
| `difficulty` | Yes | Difficulty level | `Beginner`, `Intermediate`, or `Advanced` |
| `objectives` | Yes | List of learning goals | See example above |
| `headerImage` | Yes | Path to header image | `/qbeadmedia/image.jpg` |
| `description` | Recommended | SEO description | Brief summary |
| `nextLesson` | Optional | Path to next lesson | `lessons/lesson-2` |

## Topic Naming Conventions

Topics should be:
- **Lowercase** (automatically capitalized in UI)
- **Comma-separated** in frontmatter
- **Consistent** across lessons (check existing lessons)

Good examples:
```yaml
topics: quantum mechanics, theory
topics: programming, hardware
topics: advanced math, visualization
```

Avoid:
```yaml
topics: Quantum Mechanics And Theory  # Don't use capitals or "and"
topics: programming  # Too broad by itself
topics: qm, prog  # Use full words
```

## Creating Lesson Chains

The `nextLesson` property creates a chain of lessons and affects sorting in the gallery:

```yaml
# lesson-1.md
nextLesson: lessons/lesson-2
```

```yaml
# lesson-2.md
nextLesson: lessons/lesson-3
```

This creates: Lesson 1 → Lesson 2 → Lesson 3

**Gallery behavior:**
- Lessons are sorted by their chain order
- Unconnected lessons appear at the top
- Next lesson link appears at bottom of each lesson

## Gallery Display

Lessons with `layout: lesson` automatically appear in the lesson gallery at `/lessons`:
