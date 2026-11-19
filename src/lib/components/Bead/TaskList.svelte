<!--
@component
Checklist that ticks each task when its `done` check passes against the bead's runs.

Props:
- `tasks`: the tasks to show (see `Task` in `$lib/bead/exercises/types`).
-->
<script lang="ts">
  import IconCheck from '@lucide/svelte/icons/circle-check'
  import IconCircle from '@lucide/svelte/icons/circle'
  import { bead } from '$lib/bead/bead.svelte'
  import type { Task } from '$lib/bead/exercises/types'

  let { tasks }: { tasks: Task[] } = $props()
</script>

<ol class="flex flex-col gap-2">
  {#each tasks as task, i (i)}
    {@const done = task.done(bead.runs)}
    <li class="flex items-start gap-3">
      {#if done}
        <IconCheck size="20" class="text-success-500 mt-1 shrink-0" />
      {:else}
        <IconCircle size="20" class="text-surface-500 mt-1 shrink-0" />
      {/if}
      <span class={done ? 'text-surface-500 line-through' : ''}>{task.text}</span>
    </li>
  {/each}
</ol>
