<script context="module" lang="ts">
  import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte'
  export { CodeBlock }
</script>

<script lang="ts">
  import SEO from '$lib/components/SEO/SEO.svelte'
  export let title: string
  export let description: string
</script>

<SEO {title} {description} />

<div class="outer-container layout-default py-36">
  <article class="typography prose prose-lg max-w-full">
    <slot>
      <!-- the content will be slotted in here -->
    </slot>
  </article>
</div>
