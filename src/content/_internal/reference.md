---
layout: article # this is the default
title: The title of the browser tab
description: Description for search engines
section: about # what nav item to highlight
robots: false # will hide from search engines
---

<script>
  import BlochSphereElement from '$lib/components/BlochSphereElement/BlochSphereElement.svelte'
  import { QubitDisplay, BlochVector } from '@qbead/bloch-sphere'

  const myItems = ['One', 'Two', 'Three']

  let redOrGreen = false
</script>

# Reference for creating content

## Frontmatter

Metadata for every page is created by frontmatter; a yaml formatted
section at the top of the markdown file, enclosed in three dashes `---`.

Key properties include:

- `layout`: Controls the page layout. `article` (default), `base` (plain), `literate` (literate code layout).
- `section`: A label specifying which group content belongs to. (Relates to the top-nav of the website.)

Frontmatter is important for SEO. [HTML metadata](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name)
is controlled through frontmatter. Some important metadata to keep in mind is:

- `title`: The page title
- `description`: A description for the page
- `author`: The page author (if applicable)
- `keywords`: Keywords people might use to search for this page
- `robots`: Controls web-crawlers. You may specify a string value, or `false` to specify `noindex, nofollow`

## Basic Content

Here is an example of basic markdown content. You can create paragraphs which are just blocks of text separated by empty linebreaks.

Content can also have [links](https://en.wikipedia.org/wiki/Markdown). (Created
with `[text](<link>)`). Content can be *italicized*, **bold**, ***both***.

> You can also have blockquote text.

### Headings

Headings can be created for title, subtitles, sub-subtitles, etc. This is
specified by the number of `#`s prepended to the text. Generally a page should
have one H1 at the top.

### Lists

Lists can be ordered,

1. this
2. is
3. an
4. ordered
5. list

or unordered

- this
- is
- an
- un-ordered
- list

## Website Nav Menu

Nav items will show as highlighted when the current page's `section`
frontmatter variable matches the nav item's section.

The code that controls this is in: `src/lib/global/SiteHeader.svelte`

## Math

Math can be rendered inline by surounding it with `$`s, or as a block
by using double `$$`.

Here is some inline math: $a^2 + b^2 = c^2$.

Here is a block:

$$
i\hbar {\frac {\partial }{\partial t}}\Psi (x,t)=\left[-{\frac {\hbar ^{2}}{2m}}{\frac {\partial ^{2}}{\partial x^{2}}}+V(x,t)\right]\Psi (x,t).
$$

It is also possible to colorize equations.

\[
\definecolor{mint}{RGB}{170,255,195}
\definecolor{sky}{RGB}{160,210,255}
\definecolor{rose}{RGB}{255,190,210}
\definecolor{lavender}{RGB}{220,200,255}

\textcolor{rose}{f(x)} =
\textcolor{sky}{\int_a^b}
\textcolor{mint}{(x^2 + 3x + 2)}\, dx
\]

## Code blocks

Code blocks are highlighted using the [shiki library](https://shiki.style/languages),
which [supports many languages](https://shiki.style/languages).

To create a codeblock, create a "fence" of backticks with the language label. For example:

````text
```python
somePython()
```
````

Code can also be highlighted inline by `{js} someCode().then(t => t*t)` adding
the language label surrounded by `{}`s. (example: ``{md} {js} hello() ``)

### Code Examples

Here are some examples of various languages.

```bash
echo "some shell command"
```

```python
def fibonacci(n: int) -> list[int]:
    """Return the first n Fibonacci numbers."""
    seq = [0, 1]
    for _ in range(2, n):
        seq.append(seq[-1] + seq[-2])
    return seq[:n]

if __name__ == "__main__":
    nums = fibonacci(10)
    print("Fibonacci:", nums)
```

```js
export const fibonacci = n => {
  const seq = [0, 1]
  for (let i = 2; i < n; i++)
    seq.push(seq[i - 1] + seq[i - 2])
  return seq.slice(0, n)
}

console.log('Fibonacci:', fibonacci(10))
```

```cpp
const int LED_PIN = 13;

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  delay(500); // wait half a second
  digitalWrite(LED_PIN, LOW);
  delay(500);
}
```

## HTML

HTML can easily be placed into the page when needed. The main use for this will
be for styling, and embedding.

Importantly, **markdown content** can be placed inside html blocks as long as
it is separated from the html tags by empty lines.

Utility classes are provided by tailwindcss. Consult [their documentation](https://v3.tailwindcss.com/docs/aspect-ratio) for
information about all of their supported class names.

### Color Palette

Here is a [color palette for your reference](./color-palette).

### Example: Aligning text

<div class="text-left">

This paragraph is aligned to the left *(default)*.

</div>

<div class="text-center">

This paragraph is centered **horizontally**.

</div>

<div class="text-right">

This paragraph is aligned to the **right**.

</div>

### Example: Text and background color

<div class="text-rose-500 bg-warning-200 border-pink-300 border-4 rounded-2xl px-4">

A colorful box using: `text-rose-500 bg-warning-200 border-pink-300 border-4 rounded-2xl px-4`

</div>

### Example: Adding padding

<div class="px-4 py-8 bg-surface-900">

Some padding with `px-4 py-8`

</div>

### Example: Responsive styling

<div class="text-left md:text-center lg:text-right">

This text aligns left on small screens, center on medium, and right on large screens.

</div>

### Example: Buttons

You can find more [UI elements at the v3 skeleton.dev documentation](https://v3.skeleton.dev/docs/tailwind/buttons).

<div class="space-y-4">
  <div class="flex gap-4">
    <button type="button" class="btn preset-filled-primary-500">Button</button>
    <button type="button" class="btn preset-tonal-primary">Button</button>
    <button type="button" class="btn preset-outlined-primary-500">Button</button>
  </div>
  <div class="flex gap-4">
    <button type="button" class="btn preset-filled-secondary-500">Button</button>
    <button type="button" class="btn preset-tonal-secondary">Button</button>
    <button type="button" class="btn preset-outlined-secondary-500">Button</button>
  </div>
  <div class="flex gap-4">
    <button type="button" class="btn preset-filled-tertiary-500">Button</button>
    <button type="button" class="btn preset-tonal-tertiary">Button</button>
    <button type="button" class="btn preset-outlined-tertiary-500">Button</button>
  </div>
  <div class="flex gap-4">
    <button type="button" class="btn preset-filled-success-500">Button</button>
    <button type="button" class="btn preset-tonal-success">Button</button>
    <button type="button" class="btn preset-outlined-success-500">Button</button>
  </div>
  <div class="flex gap-4">
    <button type="button" class="btn preset-filled-warning-500">Button</button>
    <button type="button" class="btn preset-tonal-warning">Button</button>
    <button type="button" class="btn preset-outlined-warning-500">Button</button>
  </div>
  <div class="flex gap-4">
    <button type="button" class="btn preset-filled-error-500">Button</button>
    <button type="button" class="btn preset-tonal-error">Button</button>
    <button type="button" class="btn preset-outlined-error-500">Button</button>
  </div>
  <div class="flex gap-4">
    <button type="button" class="btn preset-filled-surface-500">Button</button>
    <button type="button" class="btn preset-tonal-surface">Button</button>
    <button type="button" class="btn preset-outlined-surface-500">Button</button>
  </div>
</div>

## Dynamic Content with Svelte

Markdown in this website is rendered by [sveltex](https://sveltex.dev/docs/)
which is a svelte preprocessor. Markdown files are, themselves, svelte components.
What that means is that any [svelte](https://svelte.dev/docs/svelte/overview) functionality can be used in markdown files.

**The only restriction is that there can only be one `<script>` tag in
the markdown file. So it's best to keep it at the top.

### Frontmatter

Frontmatter variables (spoken about earlier) are acessible as svelte
variables. For example, `{title}` can access the title of this page...
which is: "{title}".

### Example: Rendering a collection of items

Say we have in our `<script>` element:

```js
const myItems = ['One', 'Two', 'Three']
```

We can render that into a list using:

```svelte
<ul>
{#each myItems as item}
<li>{item}</li>
{/each}
</ul>
```

Like so:

<ul>
{#each myItems as item}
<li>{item}</li>
{/each}
</ul>

### Example: Interactivity

One could toggle between red or green background of a button:

<button class="btn btn-lg text-surface-50 bg-red-800 bg-green-800" class:bg-red-800={redOrGreen} class:bg-green-800={!redOrGreen} on:click={() => redOrGreen = !redOrGreen}>
Click me!
</button>

```svelte
<button class="btn btn-lg text-surface-50 bg-red-800 bg-green-800" class:bg-red-800={redOrGreen} class:bg-green-800={!redOrGreen} on:click={() => redOrGreen = !redOrGreen}>
Click me!
</button>
```

## Bloch sphere (and other components and libraries)

There is a convinience component called `BlochSphereElement` that can
be used to create a bloch sphere widget.

The page must include the needed assets. For example:

```svelte
<script>
  import BlochSphereElement from '$lib/components/BlochSphereElement/BlochSphereElement.svelte'
  import { QubitDisplay, BlochVector } from '@qbead/bloch-sphere'
</script>
```

And then a bloch sphere can be created, with options, and
a callback function to further modify functionality of the instance.

```svelte
<BlochSphereElement options={{
  fontSize: 1,
  showGrid: true,
}} created={(blochSphere) => {
  let state = BlochVector.random()
  const qubitArrow = new QubitDisplay(state)
  blochSphere.add(qubitArrow)
}} />
```

<BlochSphereElement options={{
  fontSize: 1,
  showGrid: true,
}} created={(blochSphere) => {
  let state = BlochVector.random()
  const qubitArrow = new QubitDisplay(state)
  blochSphere.add(qubitArrow)
}} />

### Example: Bloch sphere at the side

```svelte
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

  <div>
  Here is some content that can be anything. The
  layout will collapse to single column on small screens.
  </div>

  <figure>
    <BlochSphereElement options={{
      fontSize: .8,
      showGrid: false,
    }} created={(blochSphere) => {
      let state = BlochVector.random()
      const qubitArrow = new QubitDisplay(state)
      // hide the labels
      qubitArrow.angleIndicators.visible = false
      qubitArrow.arrow.label.visible = false
      blochSphere.add(qubitArrow)
    }} />
    <figcaption class="text-sm text-gray-500">
      Figure 1. A bloch sphere without grid
    </figcaption>
  </figure>
</div>
```

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

  <div>
  Here is some content that can be anything. The
  layout will collapse to single column on small screens.
  </div>

  <figure>
    <BlochSphereElement options={{
      fontSize: .8,
      showGrid: false,
    }} created={(blochSphere) => {
      let state = BlochVector.random()
      const qubitArrow = new QubitDisplay(state)
      // hide the labels
      qubitArrow.angleIndicators.visible = false
      qubitArrow.arrow.label.visible = false
      blochSphere.add(qubitArrow)
    }} />
    <figcaption class="text-sm text-gray-500">
      Figure 1. A bloch sphere without grid
    </figcaption>
  </figure>
</div>