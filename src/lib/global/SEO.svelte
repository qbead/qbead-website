<script lang="ts">
  import SITE_META from './site-metadata.json'
  import { page } from '$app/state'

  let title = page.data?.metadata?.title
  let description = page.data?.metadata?.description
  let robots =
    page.data?.metadata?.robots === false ? 'noindex, nofollow' : page.data?.metadata?.robots

  let metaTitle = $derived(
    title ? SITE_META.titleTemplate.replace('%s', title) : SITE_META.defaultTitle
  )

  let metaDescription = $derived(description ? description : SITE_META.defaultDescription)
</script>

<svelte:head>
  <title>{metaTitle}</title>
  <meta name="description" content={metaDescription} />
  <meta property="og:title" content={metaTitle} />
  <meta property="og:description" content={metaDescription} />
  {#if robots !== true}
    <meta name="robots" content={robots} />
  {/if}
</svelte:head>
