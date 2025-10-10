<script lang="ts">
  import '../app.css'
  import SiteHeader from '$lib/components/SiteHeader/SiteHeader.svelte'
  import SiteFooter from '$lib/components/SiteFooter/SiteFooter.svelte'

  let { children } = $props()
</script>

<div class="flex min-h-screen flex-col">
  <SiteHeader />

  <main class="w-full min-w-0 flex-grow">
    {@render children()}
  </main>

  <SiteFooter />
</div>
