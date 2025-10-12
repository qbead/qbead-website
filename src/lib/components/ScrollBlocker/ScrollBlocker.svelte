<script lang="ts">
  // utility to monitor body scroll and block interaction on children
  // when the page is scrolling
  import { onMount, onDestroy } from 'svelte'

  let delay = 100 // milliseconds

  let scrollTimeout: ReturnType<typeof setTimeout>

  const handleScroll = () => {
    document.body.classList.add('scrolling')
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      document.body.classList.remove('scrolling')
    }, delay)
  }

  onDestroy(() => {
    clearTimeout(scrollTimeout)
  })
</script>

<svelte:window onscroll={handleScroll} />

<style>
  :global(.scroll-block) {
    position: relative;
  }

  :global(body.scrolling .scroll-block)::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
</style>
