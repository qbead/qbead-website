import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkMath from "remark-math";
import rehypeKatexSvelte from "rehype-katex-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: [".md"],
      layout: {
        book: "./src/markdown-layouts/book.svelte",
        _: "./src/markdown-layouts/book.svelte",
      },
      highlight: {
        highlighter: (code, lang) => {
          let escaped = code.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
          return `<Components.CodeBlock language="${lang}" code={\`${escaped}\`}/>`;
        },
      },
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatexSvelte, rehypeSlug, rehypeAutolinkHeadings],
    }),
  ],
  kit: {
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      fallback: '200.html' // may differ from host to host
    }),
  },
};
export default config;
