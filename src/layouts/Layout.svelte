<script lang="ts">
  import Article from './Article.svelte'
  import Literate from './Literate.svelte'
  import { page } from '$app/state'

  const { children } = $props()
  const layout = $derived(page.data?.layout)
</script>

{#if layout == 'article'}
  <Article>
    {@render children()}
  </Article>
{:else if layout == 'literate'}
  <Literate>
    {@render children()}
  </Literate>
{:else}
  {@render children()}
{/if}
