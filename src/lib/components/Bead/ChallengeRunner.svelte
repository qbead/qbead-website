<!--
@component
Runs a list of challenges one round at a time with a score. Used by exercises that include the
`challenges` widget, including the closing quiz.

Props:
- `challenges`: the rounds (see `Challenge` in `$lib/bead/exercises/types`).

Several runners can be on one page, so a runner only reacts after the reader presses Start,
and starting one takes the bead over from any other (`bead.controller`).
-->
<script lang="ts">
  import { bead } from '$lib/bead/bead.svelte'
  import { GATES, KET_NAMES, gateResult, ketText, nearestKet, type KetName } from '$lib/bead/gates'
  import type { Challenge } from '$lib/bead/exercises/types'
  import GatePicker from './GatePicker.svelte'

  let { challenges }: { challenges: Challenge[] } = $props()

  const id = $props.id()
  const active = $derived(bead.controller === id)

  let index = $state(0)
  let score = $state(0)
  let guess = $state<KetName | null>(null)
  let correct = $state<boolean | null>(null)
  let used = $state(0)

  const current = $derived(challenges[index])
  const finished = $derived(index >= challenges.length)
  const expected = $derived(
    current?.kind === 'predict' ? gateResult(current.start, current.gate) : null
  )

  function startRound() {
    guess = null
    correct = null
    used = 0
    if (current) bead.setKet(current.start, current.kind === 'target' ? current.target : null)
  }

  function start() {
    bead.controller = id
    index = 0
    score = 0
    startRound()
  }

  function next() {
    index++
    startRound()
  }

  function choose(ket: KetName) {
    if (current?.kind !== 'predict') return
    guess = ket
    bead.arm(current.gate)
  }

  // mark the target of the current round on the sphere while this runner drives the bead
  $effect(() => {
    if (!active) return
    bead.target = current?.kind === 'target' && !finished ? current.target : null
    return () => {
      // another runner that took over sets its own target
      if (bead.controller === id) bead.target = null
    }
  })

  $effect(() =>
    bead.on('gate', ({ vector }) => {
      if (!active || !current || correct !== null) return
      used++
      if (current.kind === 'predict') {
        correct = guess !== null && guess === expected
      } else if (nearestKet(vector) === current.target) {
        correct = true
      }
      if (correct) score++
    })
  )
</script>

{#if !active}
  <button class="btn preset-filled-primary-500 self-start" onclick={start}>
    Start ({challenges.length} rounds)
  </button>
{:else if finished}
  <p class="h5">Done! You scored {score} out of {challenges.length}.</p>
  <button class="btn preset-filled-primary-500 self-start" onclick={start}>Play again</button>
{:else}
  <div class="text-surface-500 text-sm">
    Round {index + 1} of {challenges.length} &middot; Score {score}
  </div>

  {#if current.kind === 'predict'}
    <p>
      The Qbead is in {ketText(current.start)}. Where will the <b>{GATES[current.gate].label}</b>
      gate take it?
    </p>
    {#if !guess}
      <div class="flex flex-wrap gap-2">
        {#each KET_NAMES as k (k)}
          <button class="btn preset-tonal-primary" onclick={() => choose(k)}>{ketText(k)}</button>
        {/each}
      </div>
    {:else if correct === null}
      <p>
        You predicted {ketText(guess)}. Now apply the gate: turn your Qbead about the orange axis.
      </p>
    {:else if correct}
      <p class="text-success-500">
        Correct! {GATES[current.gate].label} takes {ketText(current.start)} to {ketText(guess)}.
      </p>
    {:else}
      <p class="text-warning-500">
        Not quite: the Qbead went to {expected ? ketText(expected) : '?'}, you predicted {ketText(
          guess
        )}.
      </p>
    {/if}
  {:else}
    <p>
      Start at {ketText(current.start)} and reach {ketText(current.target)}. Par: {current.par}
      {current.par === 1 ? 'gate' : 'gates'}. Gates used: {used}.
    </p>
    {#if correct}
      <p class="text-success-500">
        Reached {ketText(current.target)} in {used}
        {used === 1 ? 'gate' : 'gates'} (par {current.par}).
      </p>
    {:else}
      <GatePicker gates={current.gates} />
    {/if}
  {/if}

  <div class="flex gap-2">
    {#if correct !== null}
      <button class="btn preset-filled-primary-500" onclick={next}>
        {index + 1 === challenges.length ? 'See score' : 'Next round'}
      </button>
    {:else if current.kind === 'target'}
      <button class="btn preset-outlined-primary-500" onclick={next}>Skip</button>
    {/if}
  </div>
{/if}
