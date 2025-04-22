import { mdsvex } from 'mdsvex'
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkMath from 'remark-math'
import rehypeKatexSvelte from 'rehype-katex-svelte'

const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: {
				book: 'src/markdown-layouts/book.svelte',
				_: 'src/markdown-layouts/default.svelte',
			},
			highlight: {
				highlighter: (code, lang) => {
					let escaped = code.replace(/\\/g, '\\\\').replace(/`/g, '\\`')
					return `<Components.CodeBlock lang="${lang}" code={\`${escaped}\`}/>`
				},
			},
			remarkPlugins: [remarkMath],
			rehypePlugins: [rehypeKatexSvelte, rehypeSlug, rehypeAutolinkHeadings],
		}),
	],
	kit: {
		adapter: adapter({
			fallback: 'index.html', // may differ from host to host
		}),
	},
	extensions: ['.svelte', '.svx', '.md'],
}

export default config
