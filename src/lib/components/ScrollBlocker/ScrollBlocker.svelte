<script lang="ts">
  // utility to monitor body scroll and block interaction on children
  // when the page is scrolling
  import { onMount, onDestroy } from 'svelte'

  let delay = 500 // milliseconds

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
