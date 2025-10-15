<script>
  // @ts-nocheck

  import { onMount } from 'svelte'
  import { page } from '$app/state'

  onMount(() => {
    console.error('Error page mounted with error:', page.error)
  })
</script>

<div class="outer-container py-36">
  <article class="flex flex-col text-lg">
    {#if page.status === 404}
      <h1 class="h1 mb-8">Page Not Found</h1>
      <p>The page you are looking for does not exist. All that remains is vacuum.</p>
    {:else}
      <h1 class="h1 mb-8">An Error Occurred</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <pre>
        status: {page.status}
        {page.error?.message}
        {page.error?.stack}
      </pre>
    {/if}
  </article>
</div>
