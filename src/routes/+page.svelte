<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte'

	// Source Code
	const exampleConsole = `npx sv create my-skeleton-app`
	const exampleHtml = `<div class="bg-green-500">Hello World</div>`
	const exampleCss = `.foobar { background: green; }`
	const exampleJavascript = `const foo = 'bar';`
</script>

<div class="space-y-4 p-10">
	<CodeBlock code={exampleConsole} />
	<CodeBlock code={exampleHtml} lang="html" />
	<CodeBlock code={exampleCss} lang="css" />
	<CodeBlock code={exampleJavascript} lang="js" />
</div>
