<!--
@component
Buttons that arm a gate on the bead. The reader then rotates the bead about the shown axis.

Props:
- `gates` (optional): which gates to offer. Defaults to X, Y, Z, H, S.
-->
<script lang="ts">
  import { bead } from '$lib/bead/bead.svelte'
  import { GATES, type GateName } from '$lib/bead/gates'

  let { gates = ['X', 'Y', 'Z', 'H', 'S'] }: { gates?: GateName[] } = $props()
</script>

<div class="flex flex-col gap-2">
  <div class="flex flex-wrap gap-2">
    {#each gates as g (g)}
      <button
        class="btn {bead.armed === g ? 'preset-filled-primary-500' : 'preset-tonal-primary'}"
        onclick={() => bead.arm(g)}
      >
        {GATES[g].label}
      </button>
    {/each}
  </div>
  <p class="text-surface-500 text-sm">
    {#if bead.armed}
      Now turn your Qbead about the orange axis until the gate completes. Press the button again to
      cancel.
    {:else}
      Pick a gate, then turn your Qbead about the orange axis it shows.
    {/if}
  </p>
</div>
