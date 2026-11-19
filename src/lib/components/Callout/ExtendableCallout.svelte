<!--
@component
Renders an exercise where the user can pick an answer from a list of options.
When the user picks an answer, it shows whether the answer is correct or not and provides a justification for the correct answer.

Props:
- `exercise`: the exercise data (see `$lib/bead/exercises`).

```svelte
<Picker exercise={exercise} />
```
-->
<script lang="ts">
  import Callout from '$lib/components/Callout/Callout.svelte'
  import type { Snippet } from 'svelte'

  let collapsed = $state<boolean>(true)
  let {
    type,
    title,
    shortExplanation,
    children,
  }: { type: string; title: string; shortExplanation: string; children?: Snippet } = $props()
</script>

<Callout {type} {title}>
  <div class="grid grid-cols-1 items-start gap-4 md:grid-cols-1">
    <div>
      {shortExplanation}
    </div>
    <button
      style="padding: 1%;"
      class="btn {collapsed ? 'preset-filled-primary-500' : 'preset-tonal-primary'}"
      onclick={() => {
        collapsed = !collapsed
      }}
    >
      {#if collapsed}
        Show more...
      {:else}
        Show less
      {/if}
    </button>
    <div>
      {#if !collapsed}
        {@render children?.()}
      {/if}
    </div>
  </div>
</Callout>
