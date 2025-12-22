---
title: Creating a Lesson
layout: article
section: _internal
description: Step-by-step guide to create educational lesson content
robots: false
---

# Creating a Lesson

Complete workflow for creating educational lesson content on the Qbead website.

## Overview

Lessons are special educational pages with:
- Learning objectives
- Difficulty levels
- Topic categorization
- Header images
- Lesson chain navigation

## Step 1: Create the File

Navigate to the lessons directory and create your file:

```bash
cd src/content/lessons/
touch quantum-superposition.md
```

**Naming conventions:**
- Use **kebab-case** (lowercase with hyphens)
- Be descriptive but concise
- Good: `quantum-superposition.md`, `intro-to-qubits.md`
- Avoid: `lesson1.md`, `QM_Basics.md`

## Step 2: Add Frontmatter

Add complete frontmatter at the top of your file:

```yaml
---
title: Understanding Quantum Superposition
layout: lesson
section: lessons
topics: quantum mechanics, theory, basics
difficulty: Beginner
objectives:
  - Define quantum superposition and its significance
  - Visualize superposition states on the Bloch sphere
  - Understand the measurement problem
  - Apply superposition concepts to simple examples
headerImage: /qbeadmedia/lessons/superposition.jpg
description: Discover how quantum systems can exist in multiple states simultaneously through interactive visualizations
keywords: quantum superposition, qubit states, Bloch sphere, quantum measurement
nextLesson: lessons/quantum-entanglement
---
```

### Frontmatter Properties Explained

| Property | Required | Description |
|----------|----------|-------------|
| `title` | Yes | Lesson title (shown in gallery and page header) |
| `layout` | Yes | Must be `lesson` |
| `section` | Yes | Use `lessons` to highlight lessons nav |
| `topics` | Yes | Comma-separated topics for filtering |
| `difficulty` | Yes | `Beginner`, `Intermediate`, or `Advanced` |
| `objectives` | Yes | YAML list of learning goals |
| `headerImage` | Yes | Path to header image (starts with `/`) |
| `description` | Recommended | SEO description (150-160 chars) |
| `keywords` | Recommended | SEO keywords |
| `nextLesson` | Optional | Path to next lesson (creates chain) |

### Choosing Topics

Check existing lessons first for consistency:

```bash
grep "topics:" src/content/lessons/*.md
```

**Good topics:**
- quantum mechanics
- programming
- hardware
- theory
- experiments
- advanced math

**Topic guidelines:**
- Lowercase (UI auto-capitalizes)
- Use full words, not abbreviations
- 2-4 topics per lesson
- Be consistent across similar lessons

### Difficulty Levels

- **Beginner**
- **Intermediate**
- **Advanced**

## Step 3: Write Content

Your time to shine!

## Step 4: Add Interactive Components

Import components at the top of your file (after frontmatter):

```svelte
<script>
  import BlochSphereElement from '$lib/components/BlochSphereElement/BlochSphereElement.svelte'
  import { QubitDisplay, BlochVector } from '@qbead/bloch-sphere'
</script>
```

Then use in your content:

```svelte
<BlochSphereElement options={{
  fontSize: 1,
  showGrid: true,
}} created={(blochSphere) => {
  let state = BlochVector.fromAngles(Math.PI/4, Math.PI/4)
  const qubit = new QubitDisplay(state)
  blochSphere.add(qubit)
}} />
```

See [Bloch Sphere Component](../components/bloch-sphere.md) for more examples.

## Step 5: Add Images

Place your header image in `/static/qbeadmedia/lessons/`:

```bash
cp my-image.jpg static/qbeadmedia/lessons/superposition.jpg
```

Reference in frontmatter:
```yaml
headerImage: /qbeadmedia/lessons/superposition.jpg
```

**Image guidelines:**
- Minimum size: 800x450px
- Aspect ratio: 16:9 or similar
- Format: JPG or PNG
- Size: < 500KB (optimize first)

## Step 6: Create Lesson Chain

Link lessons together with `nextLesson`:

```yaml
# lesson-1.md
nextLesson: lessons/lesson-2

# lesson-2.md
nextLesson: lessons/lesson-3

# lesson-3.md
# (no nextLesson - this is the last one)
```

**Gallery behavior:**
- Lessons sort by chain order
- "Next Lesson" button appears at bottom
- Unconnected lessons appear at top

## Step 7: Preview Locally

Start the development server:

```bash
bun run dev
```

Check your lesson:
- Individual page: `http://localhost:5173/lessons/quantum-superposition`
- Gallery view: `http://localhost:5173/lessons`

## Step 8: Check Branch Preview

Push to GitHub and check the branch preview:

```
https://<your-branch>.qbead-website.pages.dev/lessons/quantum-superposition
```

Verify everything looks good before merging.
