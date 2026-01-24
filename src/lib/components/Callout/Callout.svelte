<script lang="ts">
  import { type Icon } from '@lucide/svelte'
  import IconAlert from '@lucide/svelte/icons/alert-circle'
  import IconInfo from '@lucide/svelte/icons/info'
  import IconQuestion from '@lucide/svelte/icons/circle-question-mark'
  import BookOpen from '@lucide/svelte/icons/book-open'

  let {
    title,
    type = 'info',
    icon,
    iconColor,
    color,
    children,
  } = $props<{
    title?: string
    type?: 'info' | 'plain' | 'alert' | 'question' | 'book'
    icon?: typeof Icon
    iconColor?: string
    color?: string
    children: () => any
  }>()

  const icons: any = {
    info: {
      color: color ?? 'text-primary-500',
      iconColor: iconColor ?? color ?? 'text-primary-500',
      component: IconInfo,
    },
    question: {
      color: color ?? 'text-secondary-500',
      iconColor: iconColor ?? color ?? 'text-secondary-500',
      component: IconQuestion,
    },
    alert: {
      color: color ?? 'text-warning-500',
      iconColor: iconColor ?? color ?? 'text-warning-500',
      component: IconAlert,
    },
    book: {
      color: color ?? 'text-secondary-500',
      iconColor: iconColor ?? color ?? 'text-secondary-500',
      component: BookOpen,
    },
  }

  let IconChoice = $derived.by(() => {
    if (icon) {
      return {
        color,
        iconColor: iconColor ?? color,
        component: icon,
      }
    }
    return icons[type]
  })
</script>

{#snippet iconBlock(IconChoice: any)}
  {#if type !== 'plain'}
    <div class="bg-surface-200-800 rounded-2xl p-3 {IconChoice.iconColor}">
      <IconChoice.component size="32" />
    </div>
  {/if}
{/snippet}

<aside class="bg-surface-100-900 text-surface-700-300 mb-8 flex flex-col gap-8 rounded-lg p-8">
  {#if title}
    <div class="h4 flex items-center gap-6 {IconChoice?.color}">
      {@render iconBlock(IconChoice)}
      <span>{title}</span>
    </div>
    <div class="content">
      {@render children()}
    </div>
  {:else}
    <div class="flex items-start gap-6">
      {@render iconBlock(IconChoice)}
      <div class="content flex-1 pt-3">
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
