import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeToc from '@jsdevtools/rehype-toc'
import { sveltex } from '@nvl/sveltex'
import rehypeImageToolkit from 'rehype-image-toolkit'
import remarkGfm from 'remark-gfm'
import rehypeStripExtensions from './plugins/rehype-strip-extension.js'
// import { resolve } from 'path'
// import { mdsvex } from 'mdsvex'
// import remarkMath from 'remark-math'
// import rehypeKatexSvelte from 'rehype-katex-svelte'
// const layout = {
//   lesson: resolve('./src/markdown-layouts/lesson.svelte'),
//   _: resolve('./src/markdown-layouts/default.svelte'),
// }

const config = {
  preprocess: [
    vitePreprocess(),
    await sveltex(
      {
        markdownBackend: 'unified',
        codeBackend: 'shiki',
        mathBackend: 'mathjax',
      },
      {
        extensions: ['.sveltex', '.md'],
        code: {
          shiki: {
            theme: 'catppuccin-frappe',
          },
        },
        math: {
          delims: {
            doubleDollarSignsDisplay: 'always',
          },
        },
        verbatim: { Tex: { type: 'tex', aliases: ['TeX'] } },
        markdown: {
          directives: {
            enabled: false,
            bracesArePartOfDirective: false,
          },
          components: [
            {
              name: 'BackLink',
              importPath: '$lib/components/BackLink/BackLink.svelte',
            },
          ],
          remarkPlugins: [
            remarkGfm,
          ],
          retextPlugins: [],
          rehypePlugins: [
            rehypeImageToolkit,
            rehypeSlug,
            rehypeAutolinkHeadings,
            [
              rehypeToc,
              {
                headings: ['h2', 'h3', 'h4', 'h5', 'h6'],
                customizeTOC(toc) {
                  toc.children.push({
                    type: 'element',
                    tagName: 'BackLink',
                    properties: {},
                    children: [],
                  })
                },
              },
            ],
            [rehypeStripExtensions, { extensions: ['md', 'svelte', 'sveltex'] }],
          ],
        },
      }
    ),
    // mdsvex({
    //   extensions: ['.md'],
    //   layout,
    //   highlight: {
    //     highlighter: (code, lang) => {
    //       let escaped = code.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')
    //       return `<Components.CodeBlock lang="${lang}" code={\`${escaped}\`}/>`
    //     },
    //   },
    //   smartypants: {
    //     dashes: 'oldschool',
    //   },
    //   remarkPlugins: [remarkMath],
    //   rehypePlugins: [
    //     rehypeKatexSvelte,
    //     rehypeSlug,
    //     rehypeAutolinkHeadings,
    //     [
    //       rehypeToc,
    //       {
    //         headings: ['h2', 'h3', 'h4', 'h5', 'h6'],
    //       },
    //     ],
    //   ],
    // }),
  ],
  kit: {
    adapter: adapter({
      fallback: 'index.html', // may differ from host to host
    }),
    prerender: { entries: ['*'], handleHttpError: 'warn' },
  },
  extensions: ['.svelte', '.svx', '.md', '.sveltex'],
}

export default config
