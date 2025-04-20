<script context="module">
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte'
	export { CodeBlock }
</script>

<div class="mx-auto max-w-5xl px-4 py-8">
	<article class="prose">
		<slot>
			<!-- the content will be slotted in here -->
		</slot>
	</article>
</div>
