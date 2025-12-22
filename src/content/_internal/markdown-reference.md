---
title: Markdown Reference
layout: article
section: _internal
description: Complete markdown syntax reference with rendered examples
robots: false
---

# Markdown Reference

This is the markdown syntax reference. For layout examples, see [Layouts](./layouts/article-layout.md). For interactive components, see [Components](./components/bloch-sphere.md).

## Navigation

- [Getting Started](./getting-started.md) - Quick start guide
- [Content Overview](./overview.md) - Main documentation hub
- [Creating Lessons](./workflows/creating-lessons.md) - Step-by-step workflow

## Common Gotcha

**Important**: There is a bug that prevents page rendering when content has a "curly apostrophe": <abbr class="bg-surface-200-800 p-2">&#x2018;</abbr>

Always use straight apostrophes (') instead of curly ones (').

## Headings

Headings are created with `#` symbols. The number of `#`s determines the level:

### Syntax

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

### Rendered Example

# Example Heading 1
## Example Heading 2
### Example Heading 3
#### Example Heading 4
##### Example Heading 5
###### Example Heading 6

**Best practice**: Use one H1 per page (the title), then H2s for sections, H3s for subsections, etc.

## Text Formatting

### Syntax

```markdown
This is **bold text**.
This is *italic text*.
This is ***bold and italic***.
This is ~~strikethrough~~.
```

### Rendered Example

This is **bold text**.
This is *italic text*.
This is ***bold and italic***.
This is ~~strikethrough~~.

## Links

### Syntax

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Hover text")
[Internal link](/about)
```

### Rendered Example

[Link to Wikipedia](https://en.wikipedia.org/wiki/Quantum_computing)
[Link with title](https://example.com "This is hover text")
[Internal link to overview](./overview.md)

## Images

### Syntax

```markdown
![Alt text](/path/to/image.jpg)
![Alt text with title](/path/to/image.jpg "Image title")
```

### Rendered Example

![Qbead Logo](/Qbead-logo-mark-dark-mode-white-rgb-128px.png "Qbead")

**Remember**: Paths start with `/` from the static directory (no "static" in the path).

## Lists

### Unordered Lists

#### Syntax

```markdown
- First item
- Second item
- Third item
  - Nested item
  - Another nested item
- Fourth item
```

#### Rendered Example

- First item
- Second item
- Third item
  - Nested item
  - Another nested item
- Fourth item

### Ordered Lists

#### Syntax

```markdown
1. First step
2. Second step
3. Third step
   1. Sub-step A
   2. Sub-step B
4. Fourth step
```

#### Rendered Example

1. First step
2. Second step
3. Third step
   1. Sub-step A
   2. Sub-step B
4. Fourth step

## Blockquotes

### Syntax

```markdown
> This is a blockquote.
> It can span multiple lines.
>
> It can also have multiple paragraphs.
```

### Rendered Example

> This is a blockquote.
> It can span multiple lines.
>
> It can also have multiple paragraphs.

## Code

### Inline Code

#### Syntax

```markdown
Use `code` for inline code snippets.
```

#### Rendered Example

Use `code` for inline code snippets. For example, `const x = 42` is JavaScript.

You can also specify language: `{js} console.log('Hello')` or `{python} print("Hello")`

### Code Blocks

#### Syntax

````markdown
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```
````

#### Rendered Examples

**Python:**

```python
def fibonacci(n: int) -> int:
    """Calculate the nth Fibonacci number."""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Example usage
print(fibonacci(10))  # Output: 55
```

**JavaScript:**

```js
export const fibonacci = (n) => {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

console.log(fibonacci(10)) // Output: 55
```

**C++ (Arduino):**

```cpp
const int LED_PIN = 13;

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  delay(500);  // Wait half a second
  digitalWrite(LED_PIN, LOW);
  delay(500);
}
```

**Bash:**

```bash
#!/bin/bash
echo "Building project..."
bun run build
echo "Build complete!"
```

See [Shiki language support](https://shiki.style/languages) for all supported languages.

## Tables

### Syntax

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1    | Data     | More     |
| Row 2    | Data     | More     |
```

### Rendered Example

| Qubit State | Probability | Angle |
|-------------|-------------|-------|
| \|0>        | 50%         | 0 deg |
| \|1>        | 50%         | 180 deg |

## Math

Math rendering uses MathJax.

### Inline Math

#### Syntax

```markdown
The equation $E = mc^2$ is Einstein's famous formula.
```

#### Rendered Example

The equation $E = mc^2$ is Einstein's famous formula. A qubit state is $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$.

### Block Math

#### Syntax

```markdown
$$
|\psi\rangle = \alpha|0\rangle + \beta|1\rangle
$$
```

#### Rendered Example

$$
|\psi\rangle = \alpha|0\rangle + \beta|1\rangle
$$

### Complex Math Example

Schrödinger equation:

$$
i\hbar {\frac {\partial }{\partial t}}\Psi (x,t)=\left[-{\frac {\hbar ^{2}}{2m}}{\frac {\partial ^{2}}{\partial x^{2}}}+V(x,t)\right]\Psi (x,t)
$$

### Colored Math

You can colorize equations:

\[
\definecolor{mint}{RGB}{170,255,195}
\definecolor{sky}{RGB}{160,210,255}
\definecolor{rose}{RGB}{255,190,210}

\textcolor{rose}{f(x)} =
\textcolor{sky}{\int_a^b}
\textcolor{mint}{(x^2 + 3x + 2)}\, dx
\]

## Horizontal Rules

### Syntax

```markdown
---
```

### Rendered Example

Content above the line.

---

Content below the line.

## HTML in Markdown

You can use HTML when you need more control over styling. **Important**: Separate HTML tags from markdown content with empty lines.

### Example: Text Alignment

<div class="text-center">

This paragraph is **centered** using HTML and Tailwind classes.

</div>

<div class="text-right">

This paragraph is aligned to the right.

</div>

### Example: (Ugly) Colored Box

<div class="text-rose-500 bg-warning-200 border-pink-300 border-4 rounded-2xl p-4">

A "colorful" box using Tailwind CSS classes: `text-rose-500 bg-warning-200 border-pink-300 border-4 rounded-2xl p-4`

</div>

### Example: Responsive Grid

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">

<div>

**Column 1**: This layout adapts to screen size. On mobile, columns stack vertically.

</div>

<div>

**Column 2**: On larger screens, this appears side-by-side with column 1.

</div>

</div>

### Tailwind Resources

This site uses Tailwind CSS classes for styling. Learn more:
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Skeleton UI Components](https://v3.skeleton.dev/docs) (some don't behave well inside markdown due to limitations with the renderer and conflicting special characters)

**Note**: CSS is processed by PostCSS in this project.

## Images with Captions

### Example

```html
<figure>
  <img src="/path/to/image.jpg" alt="Description" />
  <figcaption class="text-sm text-gray-500 text-center mt-2">
    Figure 1: Caption text here
  </figcaption>
</figure>
```
