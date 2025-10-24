<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton-svelte'
  let { name, role, imgSrc, children, tags } = $props<{
    name: string
    role: string
    imgSrc: string
    children: () => any
    tags: string[]
  }>()
</script>

<div
  class="bg-secondary-100-900 text-surface-700-300 flex flex-col items-center gap-10 rounded-xl p-8 text-lg"
>
  <Avatar size="size-38" src={imgSrc} {name} />
  <div class="">
    <div class="text-center">
      <h3 class="h5 mb-2 text-2xl">{name}</h3>
      <p class="text-primary-500 mb-6">{role}</p>
    </div>
    <p class="text-xl">
      {@render children()}
    </p>
  </div>
  <div class="flex flex-wrap gap-3">
    {#each tags as tag}
      <span class="badge preset-outlined-secondary-500 text-surface-950-50">
        {tag}
      </span>
    {/each}
  </div>
</div>
