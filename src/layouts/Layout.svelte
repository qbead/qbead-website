<script lang="ts">
  import Article from './Article.svelte'
  import Literate from './Literate.svelte'
  import Lesson from './Lesson.svelte'
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
{:else if layout == 'lesson'}
  <Lesson>
    {@render children()}
  </Lesson>
{:else}
  {@render children()}
{/if}
