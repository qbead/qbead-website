---
title: Interactive Elements with Svelte 5
layout: article
section: _internal
description: Guide to creating interactive content using Svelte 5 runes
robots: false
---

<script>
  import { Slider } from '@skeletonlabs/skeleton-svelte'
  // Svelte 5 runes for reactivity
  let count = $state(0)
  let name = $state('')
  let doubled = $derived(count * 2)
  let isVisible = $state(false)
  let isActive = $state(false)


  let theta = $state(Math.PI / 4)
  let phi = $state(0)

  // Compute probability of measuring |0>
  let prob0 = $derived(Math.cos(theta / 2) ** 2)
  let prob1 = $derived(Math.sin(theta / 2) ** 2)
</script>

# Interactive Elements with Svelte 5

Markdown files on this site are Svelte components, which means you can add interactivity using Svelte 5's runes system.

**Note**: You don't _need_ do use `.md` files only. If you only want a page to be html... you can use a `.svelte` file. However, if you're making a component that should be reusable, then put it in the `src/lib/components/` directory.

## Important Note

This project uses **Svelte 5 with the runes system**.

**Resources:**
- [Svelte 5 Documentation](https://svelte.dev/docs)
- [Svelte 5 Tutorial](https://svelte.dev/tutorial)

## Quick Start

### Step 1: Add Script Tag

Add a `<script>` tag at the top of your markdown file (after frontmatter):

```svelte
<script>
  let count = $state(0)
</script>
```

**Note:** Only **one** `<script>` tag allowed per file!

### Step 2: Use in Content

Reference your variables in markdown:

```markdown
# Interactive Counter

The count is: {count}

<button onclick={() => count++}>Increment</button>
```

## Svelte 5 - The tip of the iceberg

Runes are special functions that begin with `$`. They're Svelte 5's way of handling reactivity.

### $state() - Reactive Variables

Use `$state()` for values that should trigger updates when changed:

```javascript
let count = $state(0)
let name = $state('Alice')
let isVisible = $state(true)
```

**Live example:**

Current count: {count}

<button class="btn preset-filled-primary-500" onclick={() => count++}>
  Increment
</button>
<button class="btn preset-outlined-primary-500" onclick={() => count--}>
  Decrement
</button>
<button class="btn preset-tonal-primary" onclick={() => count = 0}>
  Reset
</button>

**Code:**
```svelte
<script>
  let count = $state(0)
</script>

Current count: {count}

<button onclick={() => count++}>Increment</button>
<button onclick={() => count--}>Decrement</button>
<button onclick={() => count = 0}>Reset</button>
```

### $derived() - Computed Values

Use `$derived()` for values that depend on other state:

```javascript
let count = $state(0)
let doubled = $derived(count * 2)
let isEven = $derived(count % 2 === 0)
```

**Live example:**

Count: {count} | Doubled: {doubled} | Even: {count % 2 === 0 ? 'Yes' : 'No'}

<button class="btn preset-filled-secondary-500" onclick={() => count++}>
  Increment
</button>

**Code:**
```svelte
<script>
  let count = $state(0)
  let doubled = $derived(count * 2)
</script>

Count: {count}
Doubled: {doubled}
Even: {count % 2 === 0 ? 'Yes' : 'No'}

<button onclick={() => count++}>Increment</button>
```

### $effect() - Side Effects

Use `$effect()` for actions that should run when state changes:

```javascript
let count = $state(0)

$effect(() => {
  console.log(`Count changed to: ${count}`)
})
```

**Common use cases:**
- Logging for debugging
- Updating browser APIs (localStorage, etc.)
- Triggering animations
- Syncing with external systems

## Practical Examples

### Example 1: Input Field

<div class="bg-surface-100-900 p-6 rounded-lg my-8">

Enter your name: <input
  type="text"
  bind:value={name}
  class="input"
  placeholder="Your name"
/>

{#if name}
  <p class="mt-4">Hello, <strong>{name}</strong>!</p>
{/if}

</div>

**Code:**
```svelte
<script>
  let name = $state('')
</script>

Enter your name: <input
  type="text"
  bind:value={name}
  placeholder="Your name"
/>

{#if name}
  <p>Hello, <strong>{name}</strong>!</p>
{/if}
```

### Example 2: Toggle Visibility

<div class="bg-surface-100-900 p-6 rounded-lg my-8">

<button class="btn preset-filled-tertiary-500 mb-4" onclick={() => { isVisible = !isVisible }}>
  Toggle Content
</button>
{#if isVisible}
  <p>This content can be toggled on and off!</p>
{/if}
</div>

**Code:**
```svelte
<script>
  let isVisible = $state(false)
</script>

<button onclick={() => isVisible = !isVisible}>
  Toggle Content
</button>

{#if isVisible}
  <p>This content can be toggled on and off!</p>
{/if}
```

### Example 3: Conditional Styling

<button
  class="btn"
  class:preset-filled-success-500={isActive}
  class:preset-outlined-surface-500={!isActive}
  onclick={() => isActive = !isActive}>
  {isActive ? 'Active' : 'Inactive'}
</button>

**Code:**
```svelte
<script>
  let isActive = $state(false)
</script>

<button
  class="btn"
  class:preset-filled-success-500={isActive}
  class:preset-outlined-surface-500={!isActive}
  onclick={() => isActive = !isActive}
>
  {isActive ? 'Active' : 'Inactive'}
</button>
```

### Example 4: List Iteration

**Code:**
```svelte
<script>
  const topics = ['Quantum Mechanics', 'Superposition', 'Entanglement']
</script>

<ul>
  {#each topics as topic}
    <li>{topic}</li>
  {/each}
</ul>
```

Result:
<ul>
  {#each ['Quantum Mechanics', 'Superposition', 'Entanglement'] as topic}
    <li>{topic}</li>
  {/each}
</ul>

## Quantum Computing Example

Here's a practical example for lessons:

```svelte
<script>
  import { Slider } from '@skeletonlabs/skeleton-svelte'
  let theta = $state(Math.PI / 4)
  let phi = $state(0)

  // Compute probability of measuring |0>
  let prob0 = $derived(Math.cos(theta / 2) ** 2)
  let prob1 = $derived(Math.sin(theta / 2) ** 2)
</script>

## Qubit State Explorer

Adjust the angles to explore different qubit states:

**theta:** <Slider
  name="theta"
  min="0"
  max={Math.PI}
  step="0.01"
  onValueChange={(e) => (theta = e.value)}
/>

**phi:** <Slider
  name="phi"
  min={0}
  max={2 * Math.PI}
  step={0.01}
  onValueChange={(e) => (phi = e.value)}
/>

### Measurement Probabilities

- **P(|0>):** {(prob0 * 100).toFixed(1)}%
- **P(|1>):** {(prob1 * 100).toFixed(1)}%

### State Vector

$$
|\psi\rangle = \cos(\theta/2)|0\rangle + e^{i\phi}\sin(\theta/2)|1\rangle
$$
```

Result:

## Qubit State Explorer

Adjust the angles to explore different qubit states:

**theta:** <Slider
  name="theta"
  min="0"
  max={Math.PI}
  step="0.01"
  onValueChange={(e) => (theta = e.value)}
/>

**phi:** <Slider
  name="phi"
  min={0}
  max={2 * Math.PI}
  step={0.01}
  onValueChange={(e) => (phi = e.value)}
/>

### Measurement Probabilities

- **P(|0>):** {(prob0 * 100).toFixed(1)}%
- **P(|1>):** {(prob1 * 100).toFixed(1)}%

### State Vector

$$
|\psi\rangle = \cos(\theta/2)|0\rangle + e^{i\phi}\sin(\theta/2)|1\rangle
$$

## Accessing Frontmatter

Frontmatter variables are automatically available:

```yaml
---
title: My Lesson
author: Dr. Jane Smith
---
```

```markdown
# {title}

By {author}
```

## Control Flow

### Conditional Rendering

```svelte
{#if condition}
  <p>Shown when true</p>
{:else if otherCondition}
  <p>Shown when other condition true</p>
{:else}
  <p>Shown otherwise</p>
{/if}
```

### Loops

```svelte
{#each items as item}
  <p>{item}</p>
{/each}

{#each items as item, index}
  <p>{index + 1}. {item}</p>
{/each}
```

## Event Handlers

Common event handlers:

```svelte
<button onclick={() => count++}>Click</button>
<input oninput={(e) => name = e.target.value} />
<div onmouseenter={() => hover = true}>Hover</div>
<form onsubmit={(e) => { e.preventDefault(); handleSubmit() }}>
```

## Resources

- [Official Svelte 5 Docs](https://svelte.dev/docs)
- [Tutorial](https://svelte.dev/tutorial)
- [Svelte REPL](https://svelte.dev/repl) - Try code online
