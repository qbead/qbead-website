<script lang="ts">
  import { page } from '$app/state'

  const headerImage = $derived(page.data?.metadata?.headerImage)
  const title = $derived(page.data?.metadata?.title)
  const description = $derived(page.data?.metadata?.description)
</script>

<div class="layout-lesson centered-layout md:py-28 xl:pl-[28rem]">
  <article class="typography prose prose-lg with-toc text-surface-600-400 max-w-3xl">
    <div
      class="bg-surface-100-900 border-surface-50-950 -mx-10 mb-10 border-b-0 md:rounded-md md:border-1 xl:mb-0"
    >
      {#if headerImage}
        <img class="header-image mt-0 mb-12 md:rounded-t-md" src={headerImage} />
      {/if}
      <div class="p-10 pb-4">
        <h1>{title}</h1>
        {#if description}
          <p>{description}</p>
        {/if}
      </div>
    </div>
    <slot>
      <!-- the mdsvex content will be slotted in here -->
    </slot>
  </article>
</div>
