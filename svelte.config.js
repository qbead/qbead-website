import { mdsvex } from 'mdsvex'
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkMath from 'remark-math'
import rehypeKatexSvelte from 'rehype-katex-svelte'
import rehypeToc from '@jsdevtools/rehype-toc'
import { resolve } from 'path'

const layout = {
  lesson: resolve('./src/markdown-layouts/lesson.svelte'),
  _: resolve('./src/markdown-layouts/default.svelte'),
}

const config = {
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.md'],
      layout,
      highlight: {
        highlighter: (code, lang) => {
          let escaped = code.replace(/\\/g, '\\\\').replace(/`/g, '\\`')
          return `<Components.CodeBlock lang="${lang}" code={\`${escaped}\`}/>`
        },
      },
      smartypants: {
        dashes: 'oldschool',
      },
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeKatexSvelte,
        rehypeSlug,
        rehypeAutolinkHeadings,
        [
          rehypeToc,
          {
            headings: ['h2', 'h3', 'h4', 'h5', 'h6'],
          },
        ],
      ],
    }),
  ],
  kit: {
    adapter: adapter({
      fallback: 'index.html', // may differ from host to host
    }),
    prerender: { entries: ['*'] },
  },
  extensions: ['.svelte', '.svx', '.md'],
}

export default config
