<script lang="ts">
  import '../app.css'
  import SiteHeader from '$lib/content/SiteHeader.svelte'
  import SiteFooter from '$lib/content/SiteFooter.svelte'

  let { children } = $props()
</script>

<div class="flex min-h-screen flex-col">
  <SiteHeader />

  <main class="min-h-0 flex-1 overflow-y-auto">
    {@render children()}
  </main>

  <SiteFooter />
</div>
