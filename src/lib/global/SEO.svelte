<script lang="ts">
  import SITE_META from './site-metadata.json'

  let { title = '', description = '' } = $props()

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
</svelte:head>
