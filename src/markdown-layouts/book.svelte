<script context="module">
  import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte'
  export { CodeBlock }
</script>

<script>
  export let title
  export let date
</script>

<svelte:head>
  <title>Lessons | {title}</title>
  <meta property="og:title" content={title} />
</svelte:head>

<div class="main-content layout-book">
  <article class="prose">
    <h1>{title}</h1>
    <p class="date">on: {date}</p>
    <slot>
      <!-- the mdsvex content will be slotted in here -->
    </slot>
  </article>
</div>
