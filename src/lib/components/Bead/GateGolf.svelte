<!--
@component
Gate Golf, as on the gate trainer page: steer the qubit from a start state to a target state in as
few gates as possible, using only the gates a level allows.

Without a paired bead it shows each level's task and learning outcome to read. With a bead the
reader presses Play and solves the levels on the live sphere: gates used against par,
Restart, "Impossible!", Show solution, stars (remembered in this browser) and the bead's victory
animation. The learning outcome is revealed once a level is solved.

Props:
- `levels` (optional): the levels to play (see `GolfLevel` in `$lib/bead/golf`). Defaults to the
  ten levels of the Quantum Gates lesson.
-->
<script lang="ts">
  import { onMount } from 'svelte'
  import { bead } from '$lib/bead/bead.svelte'
  import { GATES, ketText, nearestKet, type GateName } from '$lib/bead/gates'
  import { GATE_GOLF_LEVELS, golfStars, solve, type GolfLevel } from '$lib/bead/golf'
  import BeadSphere from './BeadSphere.svelte'
  import GatePicker from './GatePicker.svelte'

  let { levels = GATE_GOLF_LEVELS }: { levels?: GolfLevel[] } = $props()

  const STORAGE_KEY = 'qbead.gateGolf.best'
  const id = $props.id()
  const live = $derived(bead.status === 'live')
  const active = $derived(live && bead.controller === id)

  let open = $state(0)
  const level = $derived(levels[open])
  const solution = $derived(solve(level.start, level.target, level.gates))
  const par = $derived(solution ? solution.length : null)

  let used = $state<GateName[]>([])
  let penalty = $state(0)
  let peeked = $state(false)
  let message = $state('')
  let result = $state<{ stars: number; title: string; sub: string } | null>(null)
  let best = $state<Record<number, number>>({})

  const label = (g: GateName) => GATES[g].label
  const gateList = (gates: GateName[]) => gates.map(label).join(', ')

  onMount(() => {
    try {
      best = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}
    } catch {
      best = {}
    }
  })

  function load(i: number) {
    open = i
    used = []
    penalty = 0
    peeked = false
    message = ''
    result = null
    if (active) bead.setKet(level.start, level.target)
  }

  function play() {
    bead.controller = id
    load(open)
  }

  function win(claimedImpossible: boolean) {
    const stars = golfStars({ par, gatesUsed: used.length, claimedImpossible, penalty, peeked })
    best[open] = Math.max(best[open] || 0, stars)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(best))
    } catch {
      // stars are a convenience; ignore storage errors
    }
    bead.celebrate(stars)
    message = ''
    result = {
      stars,
      title: claimedImpossible
        ? 'Correct: it is impossible!'
        : stars === 3
          ? 'Perfect: you hit par!'
          : 'Solved!',
      sub: claimedImpossible
        ? 'The target cannot be reached with these gates.'
        : `${used.length} ${used.length === 1 ? 'gate' : 'gates'} (${used.map(label).join(' → ')}), par ${par}`,
    }
  }

  function claimImpossible() {
    if (result) return
    if (!solution) return win(true)
    penalty++
    message = 'It is possible! Keep looking. (−1 star)'
  }

  function showSolution() {
    peeked = true
    message = solution
      ? `Shortest solution: ${solution.map(label).join(' → ')} (par ${par}). At most 1 star for this level now.`
      : 'No solution: the target cannot be reached with these gates. Press "Impossible!".'
  }

  $effect(() =>
    bead.on('gate', ({ gate, vector }) => {
      if (!active || result) return
      used.push(gate)
      if (nearestKet(vector) === level.target) win(false)
      else if (used.length >= (par ?? 2) + 4)
        message = 'That is already a lot more gates than needed. Maybe restart?'
    })
  )
</script>

{#snippet stars(n: number, size = '')}
  <span class="whitespace-nowrap {size}" aria-label="{n} of 3 stars">
    {#each [1, 2, 3] as i (i)}
      <span class={i <= n ? 'text-warning-500' : 'text-surface-500 opacity-40'}>&#9733;</span>
    {/each}
  </span>
{/snippet}

<div class="my-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
  {#each levels as l, i (i)}
    <button
      class="btn !m-0 flex w-full flex-col gap-0 {open === i
        ? 'preset-filled-primary-500'
        : 'preset-tonal-primary'}"
      onclick={() => load(i)}
      title={l.title}
    >
      <span>Level {i + 1}</span>
      {#if best[i]}{@render stars(best[i], 'text-xs')}{/if}
    </button>
  {/each}
</div>

<div class="rounded-container border-surface-200-800 border px-6 py-4">
  <p class="!mt-0">
    <b>Level {open + 1} - {level.title}</b>
  </p>
  <p>
    <b>Task:</b>
    {ketText(level.start)} &rarr; {ketText(level.target)} with {gateList(level.gates)} &middot;
    <b>Par:</b>
    {level.hidePar || par === null ? 'hidden' : par}
  </p>
  <p><b>What you do:</b> {level.task}</p>

  {#if !live}
    <p class="!mb-0"><b>Learning outcome:</b> {level.lesson}</p>
  {:else}
    <div class="mt-4 grid grid-cols-1 items-start gap-6 md:grid-cols-2">
      <BeadSphere />
      <div class="flex flex-col gap-4">
        {#if !active}
          <p class="!m-0">
            Your Qbead shows the current state in blue and the target in green. Pick a gate, then
            roll the Qbead around the orange axis.
          </p>
          <button class="btn preset-filled-primary-500 self-start" onclick={play}>
            Play Gate Golf
          </button>
        {:else if result}
          <div class="text-3xl">{@render stars(result.stars)}</div>
          <p class="h5 !m-0">{result.title}</p>
          <p class="text-surface-500 !m-0 text-sm">{result.sub}</p>
          <p class="!m-0"><b>Learning outcome:</b> {level.lesson}</p>
          <div class="flex flex-wrap gap-2">
            <button class="btn preset-outlined-primary-500" onclick={() => load(open)}>
              Play again
            </button>
            {#if open < levels.length - 1}
              <button class="btn preset-filled-primary-500" onclick={() => load(open + 1)}>
                Next level &rarr;
              </button>
            {/if}
          </div>
        {:else}
          <div class="flex flex-wrap items-center gap-2 text-sm">
            <span>Gates used: <b>{used.length}</b></span>
            {#each used as g, i (i)}
              <span class="badge preset-outlined-secondary-500">{label(g)}</span>
            {/each}
          </div>
          <GatePicker gates={level.gates} />
          <div class="flex flex-wrap gap-2">
            <button class="btn preset-outlined-primary-500" onclick={() => load(open)}>
              Restart
            </button>
            <button class="btn preset-outlined-primary-500" onclick={claimImpossible}>
              Impossible!
            </button>
            <button class="btn preset-tonal-primary" onclick={showSolution}>Show solution</button>
          </div>
          {#if message}
            <p class="text-warning-500 !m-0" role="status">{message}</p>
          {/if}
        {/if}
      </div>
    </div>
  {/if}
</div>
