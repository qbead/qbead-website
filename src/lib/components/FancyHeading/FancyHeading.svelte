<script lang="ts">
  let {
    title,
    highlightText,
    altText,
    children,
    class: className,
  } = $props<{
    title: string
    highlightText?: string
    altText?: string
    class?: string
    children?: () => any
  }>()

  const highlightedHTML = $derived.by(() => {
    if (!highlightText || !title) return title
    const pattern = new RegExp(`(${highlightText})`, 'gi')
    return title.replace(pattern, '<span class="text-primary-500">$1</span>')
  })
</script>

<div class="not-prose text-center {className}">
  {#if altText}
    <span
      class="badge preset-outlined-surface-500 text-surface-950-50 border-surface-200-800 mb-4 text-sm"
    >
      {altText}
    </span>
  {/if}
  <h2 class="h2 mb-6">
    {@html highlightedHTML}
  </h2>
  {#if children}
    <p class="m-auto max-w-3xl text-lg">
      {@render children()}
    </p>
  {/if}
</div>
