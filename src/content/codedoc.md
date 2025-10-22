<script>
  import { getAllContent } from '$lib/content.ts'

  const pages = getAllContent('codedoc')
</script>

# Code Docs

<ol>
{#await pages then pages}
  {#each pages as entry}
    <li><a href={entry.slug}>{entry.metadata.title || entry.slug}</a></li>
  {/each}
{/await}
</ol>
