<!--
@component
Card for pairing a Qbead over Bluetooth. Drop it anywhere (it has no props); once a bead is paired,
every `BeadExercise` on the page switches to its interactive view. Pairing is optional:
the page works as plain reading without it.
-->
<script lang="ts">
  import { onMount } from 'svelte'
  import Callout from '$lib/components/Callout/Callout.svelte'
  import { bead } from '$lib/bead/bead.svelte'

  onMount(() => bead.detect())
</script>

<Callout type="info" title="Pair your Qbead (optional)">
  <p>
    Have a Qbead running the <a class="anchor" href="/codedoc/Gate_Trainer.ino"
      >Gate Trainer sketch</a
    >? Pair it and the "Try it yourself" sections of this page turn into hands-on exercises with a
    live Bloch sphere. Without a Qbead you can read on as usual.
  </p>
  <div class="mt-4 flex flex-wrap items-center gap-4">
    {#if bead.status === 'unsupported'}
      <p class="text-warning-500">
        This browser has no Web Bluetooth. Use Chrome or Edge on a computer or Android phone to pair
        a Qbead.
      </p>
    {:else if bead.status === 'idle'}
      <button class="btn preset-filled-primary-500" onclick={() => bead.connect()}>
        Pair a Qbead
      </button>
    {:else if bead.status === 'connecting'}
      <p>Choose your Qbead in the browser dialog ...</p>
    {:else if bead.status === 'waiting'}
      <p>Connected. Waiting for the Qbead to answer ...</p>
      <button class="btn preset-outlined-primary-500" onclick={() => bead.disconnect()}>
        Cancel
      </button>
    {:else}
      <p class="text-success-500">Qbead paired. The exercises below are now interactive.</p>
      <button class="btn preset-outlined-primary-500" onclick={() => bead.disconnect()}>
        Disconnect
      </button>
    {/if}
  </div>
  {#if bead.error}
    <p class="text-warning-500 mt-4">{bead.error}</p>
  {/if}
</Callout>
