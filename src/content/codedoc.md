---
title: Code Documentation
highlight: Documentation
keywords: code, api, docs, qbead
---
<script>
  import { getAllContent } from '$lib/content.ts'
  import FancyHeader from '$lib/components/FancyHeading/FancyHeading.svelte'

  const pages = getAllContent('codedoc')
</script>

<FancyHeader title={title} highlightText={highlight} altText="Docs"/>

<ol>
{#await pages then pages}
  {#each pages as entry}
    <li><a href={entry.slug}>{entry.metadata.title || entry.slug}</a></li>
  {/each}
{/await}
</ol>
