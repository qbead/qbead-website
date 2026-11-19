<!--
@component
Gates applied since the last reset, plus a "Reset to |0>" button. No props.
-->
<script lang="ts">
  import { bead } from '$lib/bead/bead.svelte'
  import { GATES } from '$lib/bead/gates'

  const current = $derived(bead.runs[bead.runs.length - 1])
</script>

<div class="flex flex-wrap items-center gap-2">
  <span class="text-sm">Gates applied:</span>
  {#each current.gates as g, i (i)}
    <span class="badge preset-outlined-secondary-500">{GATES[g].label}</span>
  {:else}
    <span class="text-surface-500 text-sm">none yet</span>
  {/each}
  <button class="btn btn-sm preset-outlined-primary-500 ml-auto" onclick={() => bead.reset()}>
    Reset to |0&#x27e9;
  </button>
</div>
