<script lang="ts">
  import '../app.css'
  import SiteHeader from '$lib/global/SiteHeader.svelte'
  import SiteFooter from '$lib/global/SiteFooter.svelte'
  import ScrollBlocker from '$lib/components/ScrollBlocker/ScrollBlocker.svelte'

  let { children } = $props()
</script>

<ScrollBlocker />

<div class="flex min-h-screen flex-col">
  <SiteHeader />

  <main class="min-h-0 flex-1 overflow-y-auto">
    {@render children()}
  </main>

  <SiteFooter />
</div>
