<script lang="ts">
  import '../app.css'
  import SEO from '$lib/global/SEO.svelte'
  import SiteHeader from '$lib/global/SiteHeader.svelte'
  import SiteFooter from '$lib/global/SiteFooter.svelte'
  import ScrollBlocker from '$lib/components/ScrollBlocker/ScrollBlocker.svelte'
  import Layout from '../layouts/Layout.svelte'

  const { children } = $props()
</script>

<SEO />
<ScrollBlocker />

<div class="flex min-h-screen flex-col">
  <SiteHeader />

  <main class="min-h-0 flex-1 overflow-y-auto">
    <Layout {children}></Layout>
  </main>

  <SiteFooter />
</div>
