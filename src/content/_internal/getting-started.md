---
title: Getting Started Guide
layout: article
section: _internal
description: Quick start guide for creating content on the Qbead website
robots: false
---

# Getting Started

This quick start guide will help you create your first page in 5 minutes.

## Basic Concepts

### Content Structure

All website content lives in markdown (`.md`) files within the `src/content/` directory:

- **Regular pages**: Place directly in `src/content/` (e.g., `about.md`, `team.md`)
- **Lessons**: Place in `src/content/lessons/` directory

### How Routing Works

Markdown files automatically become pages on the website:

| File Path | URL |
|-----------|-----|
| `src/content/about.md` | `/about` |
| `src/content/lessons/intro.md` | `/lessons/intro` |

The system uses **file-based routing** - the file path determines the URL.

### Frontmatter

Every markdown file needs **frontmatter** at the top - metadata wrapped in `---`:

```yaml
---
title: My Page Title
layout: article
section: about
description: A description for search engines
---
```

## Create Your First Page

### Step 1: Create the File

Create a new file: `src/content/my-first-page.md`

### Step 2: Add Frontmatter

Add this to the top of your file:

```yaml
---
title: My First Page
layout: article
description: This is my first page on the Qbead website
---
```

### Step 3: Add Content

Below the frontmatter, write your content using [markdown](./markdown-reference.md):

```markdown
# Welcome to My Page

This is a paragraph with **bold text** and *italic text*.

## A Subheading

Here's a list:
- First item
- Second item
- Third item

Check out this cool [quantum computing link](https://en.wikipedia.org/wiki/Quantum_computing)!
```

### Step 4: Preview Your Page

1. Start the development server:
   ```bash
   bun run dev
   ```

2. Open your browser to: `http://localhost:5173/my-first-page`

3. You should see your new page!

## Preview on a Branch

When you push changes to GitHub, a preview build is automatically created:

```
https://<branch-name>.qbead-website.pages.dev/
```

For example, if your branch is called `add-new-lesson`, view it at:
```
https://add-new-lesson.qbead-website.pages.dev/
```

## Common Patterns

### Adding an Image

1. Place image in `/static/qbeadmedia/` directory
2. Reference it in your markdown:
   ```markdown
   ![Description of image](/qbeadmedia/my-image.jpg)
   ```

**Note**: Path starts with `/` (no "static" in the path)

### Creating a Lesson

Lessons have additional frontmatter properties:

```yaml
---
title: Introduction to Qubits
layout: lesson
topics: quantum mechanics, basics
difficulty: Beginner
objectives:
  - Understand what a qubit is
  - Learn about superposition
  - Visualize quantum states
headerImage: /qbeadmedia/qubit-intro.jpg
description: Learn the fundamentals of qubits
---
```

See the [Creating Lessons guide](./workflows/creating-lessons.md) for the complete workflow.

### Using Math

Inline math: `$E = mc^2$` renders as $E = mc^2$

Block math:
```
$$
|\psi\rangle = \alpha|0\rangle + \beta|1\rangle
$$
```

Renders as:

$$
|\psi\rangle = \alpha|0\rangle + \beta|1\rangle
$$

### Code Blocks

Use triple backticks with a language:

````markdown
```python
def hello():
    print("Hello, quantum world!")
```
````

## Next Steps

Now that you've created a basic page, you can learn about:

- **[Creating Lessons](./workflows/creating-lessons.md)** - Step-by-step lesson creation
- **[Markdown Reference](./markdown-reference.md)** - All markdown syntax with examples
- **[Managing Assets](./workflows/managing-assets.md)** - Adding images and media
- **[Layouts](./layouts/article-layout.md)** - Different page layouts
- **[Components](./components/bloch-sphere.md)** - Interactive elements
