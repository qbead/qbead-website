<script lang="ts">
  import { BlochSphere } from '@qbead/bloch-sphere'
  import { onMount, onDestroy } from 'svelte'
  let blochSphereElement: HTMLDivElement

  let {
    options,
    instance,
    created,
  }: {
    options: any
    instance: BlochSphere
    created?: (instance: BlochSphere) => void
  } = $props()

  const onResize = () => {
    instance.resize()
  }

  onMount(() => {
    const opts = {
      backgroundColor: '#272c42',
      ...options,
    }
    instance = new BlochSphere(opts)
    instance.attach(blochSphereElement)
    created?.(instance)
  })

  onDestroy(() => {
    instance?.dispose()
  })
</script>

<svelte:window on:resize={onResize} />

<div bind:this={blochSphereElement} class="bloch-sphere-element"></div>

<style>
  .bloch-sphere-element {
    position: relative;
    aspect-ratio: 1;
    width: 100%;
    overflow: hidden;
  }
</style>
