<!--
@component
Names the basis state the bead is closest to, with its Bloch coordinates. No props.
-->
<script lang="ts">
  import { bead } from '$lib/bead/bead.svelte'
  import { ketText, nearestKet } from '$lib/bead/gates'

  const ket = $derived(nearestKet(bead.vector))
  const [x, y, z] = $derived(bead.vector)
</script>

<div class="text-sm">
  <div class="h5">{ket ? ketText(ket) : 'Between basis states'}</div>
  <div class="text-surface-500">
    x {x.toFixed(2)} &middot; y {y.toFixed(2)} &middot; z {z.toFixed(2)}
  </div>
</div>
