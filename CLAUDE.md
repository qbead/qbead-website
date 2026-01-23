# CLAUDE.md

## Project Overview

QBead educational website built with SvelteKit + Svelte 5. Content is authored as markdown files that are compiled as Svelte components. Uses Tailwind CSS (via Skeleton UI v3) for styling and Cloudflare Pages for deployment.

## Commands

- `bun install` - Install dependencies
- `bun run dev` - Start dev server (localhost:5173)
- `bun run build` - Production build
- `bun run preview` - Preview production build
- `bun run codedocs` - Generate literate programming docs from external repos

## Repo Structure

```
src/
  content/          # Markdown content (becomes pages via file-based routing)
    lessons/        # Educational lesson pages
    _internal/      # Internal docs (robots: false)
    codedoc/        # Auto-generated literate programming docs
  layouts/          # Layout templates (article, lesson, literate, minimal)
  lib/components/   # Reusable Svelte components
  lib/global/       # Global website elements
  routes/           # SvelteKit routes
  app.css           # Global styles
static/             # Static assets (referenced without /static prefix)
  qbeadmedia/       # Images and media
tools/              # Build tools (literate.js)
```

## Branching & Deployment

- `main` - Development branch. Preview at: `https://main.qbead-website.pages.dev/`
- `production` - Live site. Merge main -> production via PR to deploy.
- Feature branches get previews at: `https://<branch-name>.qbead-website.pages.dev/`

## Creating Content

### File-Based Routing

| File Path | URL |
|-----------|-----|
| `src/content/about.md` | `/about` |
| `src/content/lessons/intro.md` | `/lessons/intro` |

### Frontmatter (Required at top of every .md file)

```yaml
---
title: Page Title                    # Required
layout: article                      # article (default) | lesson | literate | minimal
section: about                       # Nav highlight: about | lessons | team
description: SEO description         # Recommended, 150-160 chars
keywords: quantum, education         # Optional
robots: false                        # Set false for drafts/internal pages
author: Name                         # Optional
---
```

### Lesson-Specific Frontmatter

```yaml
---
title: Lesson Title
layout: lesson
section: lessons
topics: quantum mechanics, theory    # Lowercase, comma-separated, 2-4 topics
difficulty: Beginner                 # Beginner | Intermediate | Advanced (case-sensitive)
objectives:                          # 3-5 items, start with action verbs
  - Define quantum superposition
  - Visualize states on the Bloch sphere
headerImage: /qbeadmedia/lessons/image.jpg  # 1600x900 min, 16:9, <500KB
description: SEO description
nextLesson: lessons/next-lesson-slug  # Creates lesson chain navigation
---
```

### Layouts

- **article** - Default. Centered prose, readable width. For about/team/docs pages.
- **lesson** - Header image, difficulty badge, topics chips, objectives, gallery integration.
- **literate** - For auto-generated code docs. Text in `<div class="literate-text">`, code blocks need `class=codeblock`.
- **minimal** - No automatic styling. Full control. Use for one-off custom pages.

## Formatting Reference

### Math (MathJax)

- Inline: `$E = mc^2$`
- Block: `$$\n|\psi\rangle = \alpha|0\rangle + \beta|1\rangle\n$$`
- Colored math uses `\definecolor` and `\textcolor`

### Code Blocks

````markdown
```python
def hello():
    print("Hello")
```
````

Uses Shiki for syntax highlighting. Supports all common languages.

### Images

Store in `/static/qbeadmedia/`. Reference as `/qbeadmedia/filename.jpg` (no "static" prefix).

```markdown
![Alt text](/qbeadmedia/image.jpg)
```

Image with caption:
```html
<figure>
  <img src="/qbeadmedia/image.jpg" alt="Description" />
  <figcaption class="text-sm text-gray-500 text-center mt-2">Caption</figcaption>
</figure>
```

### HTML + Tailwind in Markdown

HTML blocks must have blank lines separating them from markdown content:

```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">

<div>

**Column 1** content with markdown.

</div>

<div>

**Column 2** content.

</div>

</div>
```

## Components

### Callout

```svelte
<script>
  import Callout from '$lib/components/Callout/Callout.svelte'
</script>

<Callout type="info" title="Key Concept">

Content here (blank lines required around content).

</Callout>
```

Types: `info`, `alert`, `question`, `book`, `plain`

### Bloch Sphere

```svelte
<script>
  import BlochSphereElement from '$lib/components/BlochSphereElement/BlochSphereElement.svelte'
  import { QubitDisplay, BlochVector, OperatorDisplay, gates } from '@qbead/bloch-sphere'
</script>

<BlochSphereElement options={{
  fontSize: 1,
  showGrid: true,
}} created={(blochSphere) => {
  let state = BlochVector.fromAngles(Math.PI/4, 0)
  const qubit = new QubitDisplay(state)
  blochSphere.add(qubit)
}} />
```

Common states: `BlochVector.ZERO`, `.ONE`, `.PLUS`, `.MINUS`, `.PLUS_I`, `.MINUS_I`, `.random()`, `.fromAngles(theta, phi)`

### Interactive Elements (Svelte 5 Runes)

Only one `<script>` tag per file. Uses Svelte 5 syntax:

```svelte
<script>
  let count = $state(0)           // Reactive variable
  let doubled = $derived(count * 2) // Computed value
</script>

Count: {count}
<button onclick={() => count++}>Increment</button>

{#if count > 5}
  <p>Count is high!</p>
{/if}

{#each items as item}
  <p>{item}</p>
{/each}
```

Event handlers use `onclick`, `oninput` (not `on:click`). Skeleton UI components available (e.g., `Slider` from `@skeletonlabs/skeleton-svelte`).

## Known Gotchas

- **Curly apostrophes** cause a 500 error ("duplicate script tag"). Always use straight quotes/apostrophes.
- **Callout content** needs blank lines between opening/closing tags and markdown content.
- **Lesson not in gallery?** Check: file is in `src/content/lessons/`, layout is exactly `lesson`, all required fields present, difficulty is capitalized correctly.
- **Branch previews** don't work with `/` in branch names. Use hyphens.
- **Clean rebuild**: `rm -rf node_modules .svelte-kit codedoc_tmp && bun install && bun run codedocs:clean && bun run dev`
