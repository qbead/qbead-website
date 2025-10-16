<script lang="ts">
  let { children } = $props()
  // Add noindex, nofollow to prevent search engines from indexing internal routes
</script>

<svelte:head>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

{@render children()}
