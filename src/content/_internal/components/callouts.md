---
title: Callouts and Alerts
layout: article
section: _internal
description: Guide to using callout components for highlighted information boxes
robots: false
---

<script>
  import Callout from '$lib/components/Callout/Callout.svelte'
</script>

# Callouts and Alerts

Callouts are highlighted information boxes used to draw attention to important content, notes, warnings, or additional information.

## Basic Usage

### Importing

Add at the top of your markdown file (in the `<script>` section):

```svelte
<script>
  import Callout from '$lib/components/Callout/Callout.svelte'
</script>
```

### Simple Callout

```svelte
<Callout type="info" title="Key Concept">
  This is an important piece of information that deserves attention.
</Callout>
```

## Callout Types

The Callout component supports different types for different purposes:

### Info (Default)

Use for general information, tips, or important concepts:

<Callout type="info" title="Key Concept">

Quantum superposition allows a qubit to exist in multiple states simultaneously until measured.

</Callout>

**Code:**
```svelte
<Callout type="info" title="Key Concept">
  Quantum superposition allows a qubit to exist in multiple states simultaneously until measured.
</Callout>
```

### Alert/Warning

Use for warnings, cautions, or important considerations:

<Callout type="alert" title="Important Warning">

Always ground yourself before handling the QBead to prevent electrostatic discharge damage.

</Callout>

**Code:**
```svelte
<Callout type="alert" title="Important Warning">
  Always ground yourself before handling the QBead to prevent electrostatic discharge damage.
</Callout>
```

### Question

Use for thought-provoking questions or exercises:

<Callout type="question" title="Think About It">

What would happen if we measured the qubit in a different basis? How would the probabilities change?

</Callout>

**Code:**
```svelte
<Callout type="question" title="Think About It">
  What would happen if we measured the qubit in a different basis? How would the probabilities change?
</Callout>
```

### Book/Reading

Use for additional reading, references, or related content:

<Callout type="book" title="Further Reading">

For a deeper dive into quantum entanglement, see Nielsen and Chuang's "Quantum Computation and Quantum Information", Chapter 2.

</Callout>

**Code:**
```svelte
<Callout type="book" title="Further Reading">
  For a deeper dive into quantum entanglement, see Nielsen and Chuang's "Quantum Computation and Quantum Information", Chapter 2.
</Callout>
```

### Plain

Use for custom styling or when you don't need an icon:

<Callout type="plain" title="Note">

This is a plain callout without an icon, useful for custom use cases.

</Callout>

**Code:**
```svelte
<Callout type="plain" title="Note">
  This is a plain callout without an icon, useful for custom use cases.
</Callout>
```

## Without Title

Callouts can be used without a title for simpler content:

<Callout type="info">

This callout has no title, just the icon and content.

</Callout>

**Code:**
```svelte
<Callout type="info">
  This callout has no title, just the icon and content.
</Callout>
```

## With Markdown Content

Callouts support full markdown formatting inside:

<Callout type="info" title="Markdown Support">

You can use **bold**, *italic*, and `code` formatting.

You can also include:
- Lists
- Links: [quantum computing](https://en.wikipedia.org/wiki/Quantum_computing)
- Math: $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$

</Callout>

**Code:**
```svelte
<Callout type="info" title="Markdown Support">

You can use **bold**, *italic*, and `code` formatting.

You can also include:
- Lists
- Links: [quantum computing](https://en.wikipedia.org/wiki/Quantum_computing)
- Math: $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$

</Callout>
```

**Important:** Leave blank lines between the opening/closing tags and your markdown content.
