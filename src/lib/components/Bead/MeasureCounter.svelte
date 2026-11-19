<!--
@component
Measure button (Z basis) with running counts of 0 and 1. Tapping the bead measures too. No props.
-->
<script lang="ts">
  import { bead } from '$lib/bead/bead.svelte'
</script>

<div class="flex flex-wrap items-center gap-4">
  <button class="btn preset-outlined-primary-500" onclick={() => bead.measure()}>
    Measure (Z basis)
  </button>
  <span class="text-sm">Measured 0: <b>{bead.counts[0]}</b></span>
  <span class="text-sm">Measured 1: <b>{bead.counts[1]}</b></span>
</div>
