---
title: Frontmatter Reference
layout: article
section: _internal
description: Complete reference for all frontmatter properties
robots: false
---

# Frontmatter Guide

Complete reference for all frontmatter properties used on the Qbead website.

## What is Frontmatter?

Frontmatter is metadata placed at the top of markdown files, enclosed in three dashes (`---`). It uses YAML syntax to define page properties.

**Structure:**

```yaml
---
property: value
another: value
list_property:
  - item 1
  - item 2
---

# Your content starts here
```

**Important:** Frontmatter must be the **very first** thing in your file (before any content or blank lines).

## Universal Properties

These properties work on all pages, regardless of layout:

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| `title` | string | **Yes** | Page title (browser tab, H1, SEO) | `"About QBead"` |
| `layout` | string | No | Layout template to use | `article`, `lesson`, `literate`, `minimal` |
| `section` | string | No | Which nav item to highlight | `about`, `lessons`, `team` |
| `description` | string | Recommended | SEO meta description (150-160 chars) | `"Learn about quantum computing"` |
| `keywords` | string | No | SEO keywords (comma-separated) | `"quantum, education, qubits"` |
| `robots` | boolean/string | No | Search engine crawling control | `false` or `"noindex, nofollow"` |
| `author` | string | No | Content author name | `"Dr. Jane Smith"` |

### Property Details

#### title (Required)

The page title appears in:
- Browser tab
- Search engine results
- Page header (H1)
- Navigation (if applicable)

```yaml
title: Understanding Quantum Superposition
```

**Best practices:**
- 50-60 characters for SEO
- Descriptive and specific
- Title case or sentence case
- No punctuation at end

#### layout (Optional)

Specifies which layout template to use. Default is `article` if omitted.

```yaml
layout: article  # Standard documentation
layout: lesson   # Educational content
layout: literate # Code documentation
layout: minimal  # Full control layout
```

See [Layout Documentation](../layouts/article-layout.md) for details on each layout.

#### section (Optional)

Highlights the corresponding navigation item:

```yaml
section: about    # Highlights "About" nav
section: lessons  # Highlights "Lessons" nav
section: team     # Highlights "Team" nav
```

If omitted, nav highlighting is based on URL path.

#### description (Recommended)

SEO meta description shown in search results:

```yaml
description: Discover how quantum systems can exist in multiple states simultaneously through interactive visualizations
```

**Best practices:**
- 150-160 characters (optimal for Google)
- Compelling and informative
- Include main keyword
- Complete sentences
- No special characters

#### keywords (Optional)

SEO keywords for search engines:

```yaml
keywords: quantum superposition, qubit states, Bloch sphere, quantum measurement
```

**Best practices:**
- 5-10 keywords maximum
- Most important first
- Comma-separated
- Use phrases, not single words
- Match actual page content

#### robots (Optional)

Controls search engine crawling:

```yaml
robots: false  # Same as "noindex, nofollow"
robots: "noindex, follow"  # Don't index but follow links
robots: "index, nofollow"  # Index but don't follow links
```

**Use cases:**
- `robots: false` for draft content
- `robots: false` for internal documentation
- Omit for normal public pages

## Lesson-Specific Properties

Additional properties required when using `layout: lesson`:

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| `topics` | string | **Yes** | Comma-separated topics | `"quantum mechanics, theory"` |
| `difficulty` | string | **Yes** | Difficulty level | `Beginner`, `Intermediate`, `Advanced` |
| `objectives` | array | **Yes** | Learning objectives list | See below |
| `headerImage` | string | **Yes** | Path to header image | `"/qbeadmedia/lessons/image.jpg"` |
| `nextLesson` | string | No | Path to next lesson | `"lessons/lesson-2"` |

### Lesson Property Details

#### topics (Required for Lessons)

Comma-separated list of topics for filtering:

```yaml
topics: quantum mechanics, programming, hardware
```

**Guidelines:**
- Lowercase (UI auto-capitalizes)
- 2-4 topics per lesson
- Use full words, not abbreviations
- Be consistent across lessons

**Check existing topics:**
```bash
grep "topics:" src/content/lessons/*.md | sort | uniq
```

**Common topics:**
- quantum mechanics
- theory
- programming
- hardware
- experiments
- advanced math
- visualization

#### difficulty (Required for Lessons)

Must be exactly one of these values:

```yaml
difficulty: Beginner      # No prerequisites
difficulty: Intermediate  # Basic QM knowledge required
difficulty: Advanced      # Strong QM/math background needed
```

**Case-sensitive!** Use exact capitalization.

#### objectives (Required for Lessons)

YAML list of learning objectives:

```yaml
objectives:
  - Define quantum superposition and its significance
  - Visualize superposition states on the Bloch sphere
  - Understand the measurement problem
  - Apply superposition concepts to simple examples
```

**Best practices:**
- 3-5 objectives per lesson
- Start with action verbs (Define, Explain, Apply, Create)
- Be specific and measurable
- Order from simple to complex

**Good action verbs:**
- Beginner: Define, Identify, List, Describe, Explain
- Intermediate: Apply, Demonstrate, Calculate, Compare
- Advanced: Analyze, Evaluate, Design, Synthesize

#### headerImage (Required for Lessons)

Path to lesson header image:

```yaml
headerImage: /qbeadmedia/lessons/superposition.jpg
```

**Requirements:**
- Starts with `/` (from static root)
- 1600x900px minimum (16:9 ratio)
- JPG format, < 500KB
- Located in `/static/qbeadmedia/lessons/`

#### nextLesson (Optional)

Creates lesson chains and affects gallery sorting:

```yaml
nextLesson: lessons/quantum-entanglement
```

**Path format:** `lessons/filename-without-extension`

**Example chain:**
```yaml
# lesson-1.md
nextLesson: lessons/lesson-2

# lesson-2.md
nextLesson: lessons/lesson-3

# lesson-3.md
# (no nextLesson - end of chain)
```
