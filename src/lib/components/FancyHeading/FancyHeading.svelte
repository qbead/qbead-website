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
    children: () => any
  }>()

  let preText = $derived(title.replace(highlightText, ' '))
</script>

<div class="text-center {className}">
  {#if altText}
    <span
      class="badge preset-outlined-surface-500 text-surface-950-50 border-surface-200-800 mb-4 text-sm"
    >
      {altText}
    </span>
  {/if}
  <h2 class="h2 mb-6">{preText}<span class="text-primary-500">{highlightText}</span></h2>
  <p class="m-auto max-w-3xl text-lg">
    {@render children()}
  </p>
</div>
