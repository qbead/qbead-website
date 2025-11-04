<script lang="ts">
  import IconAlert from '@lucide/svelte/icons/alert-circle'
  import IconInfo from '@lucide/svelte/icons/info'

  let {
    title,
    type = 'info',
    children,
  } = $props<{
    title?: string
    type?: 'info' | 'plain' | 'alert'
    children: () => any
  }>()

  const icons: any = {
    info: {
      color: 'text-primary-500',
      component: IconInfo,
    },
    alert: {
      color: 'text-warning-500',
      component: IconAlert,
    },
  }

  let IconChoice = $derived.by(() => {
    return icons[type]
  })
</script>

{#snippet icon(IconChoice: any)}
  {#if type !== 'plain'}
    <div class="bg-surface-200-800 rounded-2xl p-3 {IconChoice.color}">
      <IconChoice.component size="32" />
    </div>
  {/if}
{/snippet}

<aside class="bg-surface-100-900 text-surface-700-300 mb-8 flex flex-col gap-8 rounded-lg p-8">
  {#if title}
    <div class=" h4 flex items-center gap-6 {IconChoice.color}">
      {@render icon(IconChoice)}
      <span>{title}</span>
    </div>
    <div class="content">
      {@render children()}
    </div>
  {:else}
    <div class="flex items-center gap-6">
      {@render icon(IconChoice)}
      <div class="content">
        {@render children()}
      </div>
    </div>
  {/if}
</aside>

<style>
  .content :global(p:first-of-type) {
    margin-block-start: 0;
  }
  .content :global(p:last-child) {
    margin-block-end: 0;
  }
</style>
