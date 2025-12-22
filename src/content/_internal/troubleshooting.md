---
title: Troubleshooting Guide
layout: article
section: _internal
description: Solutions to common issues when managing content on the Qbead website
robots: false
---

# Troubleshooting Guide

Common issues and solutions for content creators working on the Qbead website.

## 500 Error about not having a single script tag

```
[plugin:vite-plugin-svelte:compile] /.../src/content/about.md:23:0 A component can have a single top-level <script> element and/or a single top-level <script module> element
https://svelte.dev/e/script_duplicate
about.md:10:0
21 | </script>
22 |
23 |
```

But... you do?

It's a [bug caused by non-ascii characters](https://github.com/nvlang/sveltex/issues/25).

Could happen when content has a "curly apostrophe":
<abbr class="bg-surface-200-800 p-2">&#x2018;</abbr> so be careful to check your content for punctuation that isn't plain.

## Build errors

If something seems off about the build, try "turning it off and on again".

`Ctrl+c`

```bash
# Reinstall dependencies
rm -rf node_modules
rm -rf .svelte-kit
rm -rf codedoc_tmp
bun install
bun run codedocs:clean
# restart dev server
bun run dev
```

Hard Refresh Browser

**Windows/Linux:** Ctrl + Shift + R
**Mac:** Cmd + Shift + R

Or open DevTools (F12) and right-click refresh button → "Empty Cache and Hard Reload"

## Callout Not Rendering

### Check Blank Lines

```svelte
<!-- Wrong: - no blank lines -->
<Callout type="info" title="Title">
Content here
</Callout>

<!-- Right: - blank lines present -->
<Callout type="info" title="Title">

Content here

</Callout>
```

### Check Import

```svelte
<script>
  import Callout from '$lib/components/Callout/Callout.svelte'
</script>
```

## Interactive Elements Not Working

### Check Svelte 5 Syntax

```svelte
<!-- Wrong: - Svelte 4 syntax -->
<script>
  let count = 0
</script>
<button on:click={() => count++}>

<!-- Right: - Svelte 5 syntax -->
<script>
  let count = $state(0)
</script>
<button onclick={() => count++}>
```

See [Interactive Elements Guide](./components/interactive.md) for details.

## Lessons Not Appearing in Gallery

### Check Required Properties

Lessons need ALL of these:

```yaml
---
title: Lesson Title
layout: lesson  # MUST be exactly "lesson"
topics: quantum mechanics
difficulty: Beginner  # MUST be: Beginner, Intermediate, or Advanced
objectives:
  - First objective
headerImage: /qbeadmedia/lessons/image.jpg
---
```

### Check File Location

Must be in `src/content/lessons/` directory:

```bash
# Wrong:
src/content/my-lesson.md

# Right:
src/content/lessons/my-lesson.md
```

## Branch Preview Not Working

### Check Branch Name

Preview URL format: `https://<branch-name>.qbead-website.pages.dev/`

- Branch names with `/` won't work well
- Use hyphens instead: `feature-new-lesson`

### Check Build Status

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click on "Compute & AI -> Workers & Pages -> qbead-website
3. Look for failed builds
4. Click on failed build to see error logs
