---
title: Managing Images and Assets
layout: article
section: _internal
description: Guide to adding and managing images, videos, and media files
robots: false
---

# Managing Images and Assets

Learn how to add, reference, and optimize images and other media files for the Qbead website.

## Where to Store Assets

All static assets go in the `/static/` directory.

**Important**: The `/static/` prefix is removed in URLs. A file at `/static/qbeadmedia/image.jpg` is referenced as `/qbeadmedia/image.jpg`.

## Adding an Image

### Step 1: Place Image in Static Directory

```bash
# For lesson content
cp my-diagram.png static/qbeadmedia/my-diagram.png
```

### Step 2: Reference in Markdown

```markdown
![Description of image](/qbeadmedia/my-diagram.png)
```

**Syntax breakdown:**
- `!` - Marks this as an image
- `[Description]` - Alt text for accessibility
- `(/path/to/image)` - Path starting with `/`

### Common Mistakes

```markdown
# Wrong: - includes "static"
![Image](static/qbeadmedia/image.jpg)

# Wrong: - relative path
![Image](../../../static/qbeadmedia/image.jpg)

# Wrong: - no leading slash
![Image](qbeadmedia/image.jpg)

# Right:
![Image](/qbeadmedia/image.jpg)
```

## Common Image Patterns

### Basic Image

```markdown
![Stock image](https://lipsum.app/random/800x450)
```

![Stock image](https://lipsum.app/random/800x450)

### Image with Caption

```html
<figure>
  <img src="https://lipsum.app/random/800x450" alt="Bloch sphere visualization" />
  <figcaption class="text-sm text-gray-500 mt-2">
    Figure 1: The Bloch sphere represents all possible qubit states
  </figcaption>
</figure>
```

<figure>
  <img src="https://lipsum.app/random/800x450" alt="Bloch sphere visualization" />
  <figcaption class="text-sm text-gray-500 mt-2">
    Figure 1: The Bloch sphere represents all possible qubit states
  </figcaption>
</figure>

### Centered Image

```html
<div class="flex justify-center">
  <img src="https://lipsum.app/random/800x450" alt="Description" class="max-w-2xl" />
</div>
```

<div class="flex justify-center">
  <img src="https://lipsum.app/random/800x450" alt="Description" class="max-w-2xl" />
</div>

### Responsive Image Sizes

```html
<img
  src="https://lipsum.app/random/800x450"
  alt="Complex quantum circuit"
  class="w-full md:w-2/3 lg:w-1/2"
/>
```

<img
  src="https://lipsum.app/random/800x450"
  alt="Complex quantum circuit"
  class="w-full md:w-2/3 lg:w-1/2"
/>

This makes the image:
- Full width on mobile
- 2/3 width on tablets
- 1/2 width on desktop

### Side-by-Side Images

```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <figure>
    <img src="https://lipsum.app/random/800x450?1" alt="Before measurement" />
    <figcaption class="text-sm text-center mt-2">Before</figcaption>
  </figure>

  <figure>
    <img src="https://lipsum.app/random/800x450?2" alt="After measurement" />
    <figcaption class="text-sm text-center mt-2">After</figcaption>
  </figure>
</div>
```

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <figure>
    <img src="https://lipsum.app/random/800x450?1" alt="Before measurement" />
    <figcaption class="text-sm text-center mt-2">Before</figcaption>
  </figure>

  <figure>
    <img src="https://lipsum.app/random/800x450?2" alt="After measurement" />
    <figcaption class="text-sm text-center mt-2">After</figcaption>
  </figure>
</div>

### Image Gallery Grid

```html
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <img src="https://lipsum.app/random/800x450?1" alt="Description 1" class="rounded-lg" />
  <img src="https://lipsum.app/random/800x450?2" alt="Description 2" class="rounded-lg" />
  <img src="https://lipsum.app/random/800x450?3" alt="Description 3" class="rounded-lg" />
  <img src="https://lipsum.app/random/800x450?4" alt="Description 4" class="rounded-lg" />
</div>
```

<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <img src="https://lipsum.app/random/800x450?1" alt="Description 1" class="rounded-lg" />
  <img src="https://lipsum.app/random/800x450?2" alt="Description 2" class="rounded-lg" />
  <img src="https://lipsum.app/random/800x450?3" alt="Description 3" class="rounded-lg" />
  <img src="https://lipsum.app/random/800x450?4" alt="Description 4" class="rounded-lg" />
</div>

### Image as Link

```markdown
[![Click to see full size](https://lipsum.app/random/800x450)](https://lipsum.app/random/800x450)
```

[![Click to see full size](https://lipsum.app/random/800x450)](https://lipsum.app/random/800x450)

### Background Image Section

```html
<div
  class="bg-cover bg-center h-96 flex items-center justify-center text-white"
  style="background-image: url('https://lipsum.app/id/1/800x450')">
  <h2 class="text-5xl font-bold">Welcome to QBead</h2>
</div>
```

<div
  class="bg-cover bg-center h-96 flex items-center justify-center text-white"
  style="background-image: url('https://lipsum.app/id/1/800x450')">
  <h2 class="text-5xl font-bold">Welcome to QBead</h2>
</div>

## Videos

### Embedding Videos

**Local video files:**

```html
<video controls class="w-full max-w-3xl mx-auto my-8">
  <source src="/qbeadmedia/demo.mp4" type="video/mp4">
  Your browser doesn't support video playback.
</video>
```

**YouTube embed:**

```html
<div class="aspect-video my-8">
  <iframe
    width="100%"
    height="100%"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=rnWDr4-CFH3RhuSH"
    title="Video title"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    class="rounded-lg"></iframe>
</div>
```

<div class="aspect-video my-8">
  <iframe
    width="100%"
    height="100%"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=rnWDr4-CFH3RhuSH"
    title="Video title"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    class="rounded-lg"></iframe>
</div>
