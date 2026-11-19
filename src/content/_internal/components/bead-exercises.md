---
title: Bead Pairing and Exercises
layout: article
section: _internal
description: How to pair a Qbead on any page and build interactive bead exercises for lessons
robots: false
---

# Bead Pairing and Exercises

Readers can pair a physical Qbead (over Bluetooth) and use it inside lessons. A paired bead drives a live Bloch sphere, a gate history, task checklists, predictions and quizzes. Everything is optional: without a bead the page shows its normal content.

The bead must run the [Gate Trainer sketch](/codedoc/Gate_Trainer.ino) (`examples/Gate_Trainer` in the [firmware repo](https://github.com/qbead/firmware)). Pairing needs Web Bluetooth, which means Chrome or Edge (not Firefox or Safari).

## How the pieces fit

```
src/lib/bead/                 core, no UI
  gates.ts                    gate maths, basis states (pure)
  golf.ts                     Gate Golf levels, solver and scoring (pure)
  sphere-canvas.ts            the live Bloch sphere renderer (2D canvas)
  protocol.ts                 parse/build the bead's text lines (pure)
  link.ts, ble.ts             transport interface and the Bluetooth implementation
  bead.svelte.ts              the shared store: `bead`
  exercises/                  exercises as plain data
src/lib/components/Bead/      small widgets that read the store
```

There is one shared `bead` store per page, so every widget and exercise sees the same connection.

## Pair a bead on any page

```svelte
<script>
  import BeadPairing from '$lib/components/Bead/BeadPairing.svelte'
</script>

<BeadPairing />
```

`BeadPairing` has no props. It handles the unsupported-browser notice, cancelled pickers and disconnects.

## Use an existing exercise in a lesson

Wrap the plain-text version of the exercise in `BeadExercise`. Readers without a bead see the wrapped content; readers with a bead see the interactive exercise.

```svelte
<script>
  import Callout from '$lib/components/Callout/Callout.svelte'
  import BeadExercise from '$lib/components/Bead/BeadExercise.svelte'
  import { gatesXY } from '$lib/bead/exercises'
</script>

<BeadExercise exercise={gatesXY}>

<Callout type="question" title="Try it yourself">

1. Apply X, then Y ...

</Callout>

</BeadExercise>
```

Remember the usual rules: one `<script>` per markdown file, blank lines around every tag, straight apostrophes.

## Widgets

| Widget | Shows | Props |
|---|---|---|
| `BeadSphere` | Live Bloch sphere, as on the gate trainer: state arrow and trail, armed gate's axis and arc, target, gate banner with progress | none |
| `GatePicker` | Buttons that arm a gate on the bead | `gates` (optional) |
| `GateHistory` | Gates applied since the last reset, and a reset button | none |
| `KetReadout` | Nearest basis state and x, y, z | none |
| `MeasureCounter` | Measure button and counts of 0 and 1 | none |
| `TaskList` | Checklist that ticks off automatically | `tasks` |
| `ChallengeRunner` | Round-by-round predictions and target challenges with a score | `challenges` |
| `BeadExercise` | Renders the widgets an exercise lists (names or components), or shows its children when unpaired | `exercise` |

Every widget is also usable on its own. The sphere and the widgets only work while a bead is live, so put them inside a `BeadExercise` or behind `{#if bead.status === 'live'}`.

## Gate Golf

`GateGolf` is a complete game, not a widget: use it directly, outside `BeadExercise`. Without a bead it shows each level's task and learning outcome to read; with a bead the reader presses Play and solves the levels on the live sphere. Stars are remembered in the reader's browser.

```svelte
<script>
  import GateGolf from '$lib/components/Bead/GateGolf.svelte'
</script>

<GateGolf />
```

It plays the ten levels of the Quantum Gates lesson by default. Pass `levels` for your own (see `GolfLevel` in `src/lib/bead/golf.ts`). The par is computed from the allowed gates, and a level whose target cannot be reached is an "impossible" level: set `hidePar: true` on it so the par does not give that away.

## Write a new exercise

An exercise is a plain object in `src/lib/bead/exercises/`. Add a file and export it from `index.ts`.

```ts
import { ran, type Exercise } from './types'

export const myExercise: Exercise = {
  id: 'my-exercise',
  title: 'Try it yourself',
  widgets: ['picker', 'history', 'tasks'],
  tasks: [
    {
      text: 'Apply H, then Z, then H.',
      done: (runs) => ran(runs, 'H', 'Z', 'H'),
    },
  ],
}
```

- `widgets` is the list of widgets shown below the sphere, in order. Each entry is a built-in name (`'picker'`, `'history'`, `'readout'`, `'measure'`, `'tasks'`, `'challenges'`) or a Svelte component. `tasks` is required if it contains `tasks`; `challenges` is required if it contains `challenges`.
- `ran(runs, 'H', 'Z', 'H')` is true if some run that started from |0> begins with those gates in that order. A **run** is the gates applied since the bead was last set to a known state; the reset button starts a new run. Tasks are checked against all runs of the page session, so keep them specific.
- Task text is plain text (it is rendered by a Svelte component, not markdown), so write kets with Unicode, for example `|+⟩`.

### Challenges and quizzes

A challenge list works for both exercises and quizzes. Use `widgets: ['challenges']`.

```ts
challenges: [
  // predict where H takes |0>, then apply it
  { kind: 'predict', start: '0', gate: 'H' },
  // reach |1> from |0> using only H and Z; 3 is the fewest gates possible
  { kind: 'target', start: '0', target: '1', gates: ['H', 'Z'], par: 3 },
]
```

Basis states are named `'0'`, `'1'`, `'+'`, `'-'`, `'+i'`, `'-i'`. For `predict`, the page sets the bead to `start`, the reader picks a result, the page arms the gate, and the reader turns the bead. For `target`, only the listed `gates` are offered and the round ends when the bead reaches `target`. Check that `par` is really the shortest sequence before you publish.

Several runners can be on one page. A runner only reacts after the reader presses **Start**, and starting one takes the bead over from the others.

## Write a new widget

1. Create `src/lib/components/Bead/MyWidget.svelte` with a `<!-- @component -->` header describing its props.
2. Read what you need from `bead` (`status`, `vector`, `armed`, `runs`, `counts`, `controller`) and call its methods (`arm`, `cancel`, `measure`, `setKet`, `reset`). To react to events, subscribe with `bead.on('gate' | 'measure' | 'state', fn)` inside an `$effect` and return the unsubscribe function.
3. Put the component straight into an exercise's `widgets` list. No existing file needs editing:

```ts
import MyWidget from '$lib/components/Bead/MyWidget.svelte'

export const myExercise: Exercise = {
  id: 'my-exercise',
  title: 'Try it yourself',
  widgets: ['picker', MyWidget, 'history'],
}
```

The component is rendered without props, so it should read what it needs from `bead`. Registering a shortcut name (add it to the `Widget` type in `exercises/types.ts` and a branch in `BeadExercise.svelte`) is optional and only worth it for a widget used in many exercises.

## Add another transport (USB, a simulator)

The store only talks to a `BeadLink` (see `src/lib/bead/link.ts`). Implement a `Connect` function that returns one and pass it to `bead.connect(myConnect)`. Incoming text is passed to `handlers.onText`; the store handles line splitting and parsing.

## The bead protocol

The bead and the page exchange one text line at a time.

| Page sends | Meaning |
|---|---|
| `HELLO` | The bead answers `READY` |
| `LEVEL x y z` | Free-play start state |
| `SET x y z` | Set the state |
| `ARM X`, `ARM Y`, `ARM Z`, `ARM H`, `ARM S`, `ARM D`, `ARM T` | Arm a gate (`D` is S-dagger) |
| `CANCEL` | Cancel the armed gate |
| `MEASURE` | Measure in the Z basis |

| Bead sends | Meaning |
|---|---|
| `READY ...` | Ready |
| `S x y z p g o v` | Status about 15 times per second: state, progress, armed gate (`-` for none), and two axis-warning flags |
| `DONE G x y z` | Gate `G` finished, new state |
| `MEAS b x y z` | Measured bit `b`, new state |

The full list is at the top of the [Gate Trainer sketch](/codedoc/Gate_Trainer.ino).

## Troubleshooting

- **No pairing button, a warning instead:** the browser has no Web Bluetooth. Use Chrome or Edge.
- **The device picker shows nothing:** make sure the bead is on and running the Gate Trainer sketch; forget old "qbead" devices in the system Bluetooth settings.
- **Tasks never tick:** tasks only count runs that start from |0>. Press the reset button and try again.
