<script lang="ts">
  import { page } from '$app/state'
  import { parentSlug } from '$lib/content'
  const TEXT_MAP: any = {
    // map section tags to their text title
    codedocs: 'Code Documentation',
  }

  const titleCase = (str: string) => `${str.at(0)?.toUpperCase()}${str.substring(1)}`

  const section = $derived(page.data?.section)
  const name = $derived(TEXT_MAP[section] ?? titleCase(section))
  const path = $derived('/' + parentSlug(page.data?.slug))
</script>

<a href={path} class="anchor text-secondary-500 flex items-center gap-2">
  <span>← Back to {name}</span>
</a>
