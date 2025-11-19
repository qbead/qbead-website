<script lang="ts">
  let { items, selection, onSelect } = $props<{
    items: { label: string; value: string }[]
    selection?: string
    onSelect?: (value: string) => void
  }>()

  const select =
    (value: string = '') =>
    () => {
      onSelect?.(value)
    }
</script>

<div class="selector">
  <select
    class="border-surface-200-800 w-full rounded border-1 p-2 px-3 lg:hidden"
    onchange={(e) => select((e.target as HTMLSelectElement)?.value)()}
    bind:value={selection}
  >
    {#each items as item}
      <option value={item.value}>{item.label}</option>
    {/each}
  </select>
  <menu class="hidden flex-col gap-1 lg:flex">
    {#each items as item}
      <li>
        <button
          class="anchor text-left capitalize"
          class:text-surface-500={selection !== item.value}
          onclick={select(item.value)}
        >
          {item.label}
        </button>
      </li>
    {/each}
  </menu>
</div>
