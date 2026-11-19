<!--
@component
Renders an exercise where the user can pick an answer from a list of options.
When the user picks an answer, it shows whether the answer is correct or not and provides a justification for the correct answer.

Props:
- `exercise`: the exercise data (see `$lib/bead/exercises`).

```svelte
<Picker exercise={exercise} />
```
-->
<script lang="ts">
  import Callout from '$lib/components/Callout/Callout.svelte'
  import type { ExercisePicker, Exercise } from '$lib/bead/exercises/types'

  let pressedOption = $state<string | null>(null)
  let randAnswer = $state(Math.floor(Math.random() * 2))
  let { exercise }: { exercise: ExercisePicker } = $props()
</script>

<Callout type="question" title={exercise.title}>
  <div class="grid grid-cols-1 items-start gap-4 md:grid-cols-1">
    <div>{exercise.question}</div>
    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-4">
        {#each exercise.options as op (op)}
          <button
            style="width: -webkit-fill-available; padding: 2%;"
            class="btn {pressedOption === op
              ? op === exercise.options[exercise.correctAnswer]
                ? 'preset-tonal-primary'
                : 'preset-filled-warning-500'
              : 'preset-filled-primary-500'}"
            onclick={() => {
              pressedOption = op
              randAnswer = Math.floor(Math.random() * 2)
            }}
          >
            {op}
          </button>
        {/each}
      </div>
      <div>
        {#if pressedOption === exercise.options[exercise.correctAnswer]}
          <p>
            {'Correct! Well done!'}
          </p>
          <p>
            {exercise.justification}
          </p>
        {:else if pressedOption !== null}
          <p>
            {randAnswer === 0 ? 'Not really. Try again!' : 'Incorrect. Keep trying!'}
          </p>
          {#if exercise.hints != null}
            <p>
              Hint: {exercise.hints}
            </p>
          {/if}
        {/if}
      </div>
    </div>
  </div>
</Callout>
