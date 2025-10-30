<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton-svelte'
  let { name, role, imgSrc, children, tags } = $props<{
    name: string
    role: string
    imgSrc: string
    children: () => any
    tags?: string[]
  }>()
</script>

<div
  class="bg-surface-200-800 text-surface-700-300 flex flex-col items-center rounded-xl p-8 text-lg"
>
  <Avatar size="size-38 border-1 border-surface-600 mb-6" src={imgSrc} {name} />
  <div>
    <div class="text-center">
      <h3 class="h5 text-2xl">{name}</h3>
      <p class="text-secondary-600 mb-6 text-base">{role}</p>
    </div>
    <p class="text-center text-lg">
      {@render children()}
    </p>
  </div>
  {#if tags}
    <div class="mt-10 flex flex-wrap gap-3">
      {#each tags as tag}
        <span class="badge preset-outlined-secondary-500 text-surface-950-50 text-sm">
          {tag}
        </span>
      {/each}
    </div>
  {/if}
</div>
