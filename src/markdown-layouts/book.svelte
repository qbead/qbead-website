<script context="module">
  import { CodeBlock } from "@skeletonlabs/skeleton";
  export { CodeBlock };
</script>

<script>
  export let title;
  export let date;
</script>

<svelte:head>
  <title>Lessons | {title}</title>
  <meta property="og:title" content={title} />
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <article>
    <h1>{title}</h1>
    <p class="date">on: {date}</p>
    <slot>
      <!-- the mdsvex content will be slotted in here -->
    </slot>
  </article>
</div>
