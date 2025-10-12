<script lang="ts">
  // utility to monitor body scroll and block interaction on children
  // when the page is scrolling
  import { onMount, onDestroy } from 'svelte'
  let {
    children,
  }: {
    children: () => any
  } = $props()

  let timeout = 100 // milliseconds

  let isScrolling = $state(false)
  let scrollTimeout: ReturnType<typeof setTimeout>

  const handleScroll = () => {
    isScrolling = true
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      isScrolling = false
    }, timeout)
  }

  onDestroy(() => {
    clearTimeout(scrollTimeout)
  })
</script>

<svelte:window onscroll={handleScroll} />

<div class="scroll-blocker" class:active={isScrolling}>
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .scroll-blocker {
    position: relative;
  }

  .scroll-blocker.active::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(2px);
    z-index: 1;
  }
</style>
