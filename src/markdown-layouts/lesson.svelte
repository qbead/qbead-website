<script context="module">
  import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte'
  export { CodeBlock }
</script>

<script lang="ts">
  import SEO from '$lib/components/SEO/SEO.svelte'
  export let title: string
  export let description: string
  export let date: string
</script>

<SEO {title} {description} />

<div class="outer-container layout-lesson py-36">
  <article class="typography prose prose-lg max-w-full">
    <h1>{title}</h1>
    <p class="date">on: {date}</p>
    <slot>
      <!-- the mdsvex content will be slotted in here -->
    </slot>
  </article>
</div>
