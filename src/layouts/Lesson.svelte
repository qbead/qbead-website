<script lang="ts">
  import { page } from '$app/state'
  import IconBook from '@lucide/svelte/icons/book'
  import IconTarget from '@lucide/svelte/icons/target'
  import IconSubtitles from '@lucide/svelte/icons/subtitles'

  const splitkeywords = (str: string) => str?.split(/,\s+/)

  const headerImage = $derived(page.data?.metadata?.headerImage)
  const title = $derived(page.data?.metadata?.title)
  const description = $derived(page.data?.metadata?.description)
  const difficulty = $derived(page.data?.metadata?.difficulty)
  const objectives = $derived(page.data?.metadata?.objectives)
  const topics = $derived(splitkeywords(page.data?.metadata?.keywords))
</script>

<div class="layout-lesson centered-layout py-12 md:py-28 xl:pl-[26rem]">
  <article class="typography prose prose-lg with-toc text-surface-600-400 max-w-4xl">
    <div
      class="bg-surface-100-900 border-surface-200-800 not-prose mb-10 flex flex-col gap-12 rounded-lg border-1 p-8"
    >
      <section>
        <div class="mb-12">
          <h1 class="mb-6">{title}</h1>
          {#if difficulty}
            <div
              class="badge preset-outlined-surface-500 text-surface-950-50 border-surface-200-800 text-sm"
            >
              <IconBook size="12" />
              <span>Difficulty: {difficulty}</span>
            </div>
          {/if}
        </div>
        {#if headerImage}
          <img class="header-image mt-0 mb-12 rounded-md" src={headerImage} />
        {/if}
        {#if description}
          <p class="text-surface-700-300">{description}</p>
        {/if}
      </section>

      {#if objectives?.length}
        <section>
          <h4 class="mb-4 flex items-center gap-3">
            <IconTarget />
            Objectives
          </h4>
          <ol class="not-prose ml-5 list-decimal text-base">
            {#each objectives as obj}
              <li class="my-1">{obj}</li>
            {/each}
          </ol>
        </section>
      {/if}

      {#if topics?.length}
        <section>
          <h4 class="mb-4 flex items-center gap-3">
            <IconSubtitles />
            Topics Covered
          </h4>
          <ul class="not-prose m-0 flex list-none justify-start gap-2 p-0">
            {#each topics as topic}
              <div class="badge preset-outlined-secondary-500 text-surface-950-50 mb-4 text-sm">
                {topic}
              </div>
            {/each}
          </ul>
        </section>
      {/if}
    </div>
    <slot>
      <!-- the mdsvex content will be slotted in here -->
    </slot>
  </article>
</div>
