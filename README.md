# Qbead Website

The following is internal documentation for how to maintain the
qbead website.

This is a work in progress.

## Repo Structure

- `/src/`
  - `content/`: Where to place markdown content.
  - `layouts/`: Layouts for various page types.
  - `lib/`: Reusable components and utilities.
    - `components/`: Reusable components.
    - `global/`: Global website elements.
  - `routes/`: SvelteKit managed routes.
    - `+page.svelte`: The Homepage.
    - `...`
  - `app.css`: Global styles.
- `/static/`: Static assets (eg: images)
- `/tools/`: Build tools
  - `literate.js`: Script to generate "literate programming" markdown files from source code.
- `Makefile`: Makefile that creates literate programming codedocs from an external git repo.

## Developing

### Prerequisites

This project uses the [bun](https://bun.sh) runtime.

Install with:

```sh
curl -fsSL https://bun.sh/install | bash
```

### Setup

Install dependencies:

```sh
bun install
```

### Develop

```bash
bun run dev
```

## Building

Building happens automatically via cloudflare pages. But if you want
a local build of the project you can run:

```bash
bun run build
```

You can preview the production build with `bun run preview`.

