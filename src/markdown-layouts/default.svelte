<script context="module">
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte'
	export { CodeBlock }
</script>

<div class="container mx-auto px-4 py-8">
	<article>
		<slot>
			<!-- the content will be slotted in here -->
		</slot>
	</article>
</div>
