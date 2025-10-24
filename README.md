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

## Development builds

Development builds are automatically published as:

```
<branch>.qbead-website.pages.dev
```

The `main` branch is a development branch. So to view what's on the `main` branch:

[https://main.qbead-website.pages.dev/](https://main.qbead-website.pages.dev/)

## Production build

Any changes to the `production` branch trigger a production build that will go live.

The workflow should be:

1. Commit changes (pull requests, etc) to `main`
2. Check that the changes built correctly and [https://main.qbead-website.pages.dev/](https://main.qbead-website.pages.dev/) looks alright.
3. [Create a pull request from main to production](https://github.com/qbead/qbead-website/compare/production...main?expand=1)
4. Merge the pull request

## Literate Programming Rendering

As part of the build process, external repos are fetched and their
source code is processed by `make` to create literate programming conent.

The flow of execution is: `bun -> make -> literate.js`.

To customize what repos are pulled in, you should edit `package.json`:

```json
"scripts": {
  "codedocs:my_repo_name": "make REPO_URL=https://github.com/qbead/my-repo SRC_DIR=src OUT_DIR=some-folder-under-codedoc",
  ...
  "codedocs": "bun run codedoc:some_other_name && bun run codedocs:my_repo_name",
}
```

All content will be rendered inside the `src/content/codedoc/` directory,
and if specified with `OUT_DIR`, it will be nested in further subdirectories.

## Developing locally

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

