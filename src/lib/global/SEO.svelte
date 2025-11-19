<script lang="ts">
  import {
    PUBLIC_DEFAULT_TITLE,
    PUBLIC_DEFAULT_DESCRIPTION,
    PUBLIC_TITLE_TEMPLATE,
  } from '$env/static/public'
  import { page } from '$app/state'

  let title = $derived(page.data?.metadata?.title)
  let description = $derived(page.data?.metadata?.description)

  let robots = $derived(
    page.data?.metadata?.robots === false ? 'noindex, nofollow' : page.data?.metadata?.robots
  )

  let metaTitle = $derived(
    title ? PUBLIC_TITLE_TEMPLATE.replace('%s', title) : PUBLIC_DEFAULT_TITLE
  )

  let metaDescription = $derived(description ? description : PUBLIC_DEFAULT_DESCRIPTION)
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
