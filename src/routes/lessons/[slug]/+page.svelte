<script>
  export let data;
  const { metadata, content } = data;
  const { title, date } = metadata;
</script>

<svelte:head>
  <title>Lessons | {title}</title>
  <meta property="og:title" content={title} />
</svelte:head>

<div class="container h-full px-6">
  <article>
    <h1>{title}</h1>
    <time>{date}</time>
    <svelte:component this={content} />
  </article>
</div>
