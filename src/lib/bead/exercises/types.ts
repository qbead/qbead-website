/**
 * Exercises are plain data. A `BeadExercise` component renders the widgets an exercise names,
 * so reusing an exercise in another lesson is one import, and a new exercise is one new file.
 */
import type { Component } from 'svelte'
import type { GateName, KetName, Run } from '../gates'

/** A checklist item. `done` is evaluated against all runs of the page session. */
export type Task = {
  /** Plain text (no markdown or math: write kets with Unicode, e.g. |0⟩). */
  text: string
  done: (runs: Run[]) => boolean
}

/** One round of a challenge sequence. */
export type Challenge =
  /** The reader predicts where `gate` takes the basis state `start`, then applies it. */
  | { kind: 'predict'; start: KetName; gate: GateName }
  /** The reader reaches `target` from `start` using only `gates`. `par` is the best gate count. */
  | { kind: 'target'; start: KetName; target: KetName; gates: GateName[]; par: number }

/**
 * Built-in widget shortcuts an exercise can show below the sphere, in the order listed:
 * `picker` (gate buttons), `history` (gates applied + reset), `readout` (nearest basis state),
 * `measure` (measure button + counts), `tasks` (checklist from `tasks`),
 * `challenges` (round-by-round runner from `challenges`).
 * An exercise's `widgets` list may also hold any Svelte component directly (see `Exercise`).
 */
export type Widget = 'picker' | 'history' | 'readout' | 'measure' | 'tasks' | 'challenges'

export type Exercise = {
  /** Unique id, e.g. `gates-xy`. */
  id: string
  /** Heading of the interactive box. */
  title: string
  /**
   * Widgets shown below the sphere, in order. Each entry is a built-in shortcut name or a Svelte
   * component (rendered without props), so a new widget needs no change to existing code.
   */
  widgets: (Widget | Component<any>)[]
  /** Required if `widgets` includes `tasks`. */
  tasks?: Task[]
  /** Required if `widgets` includes `challenges`. */
  challenges?: Challenge[]
}

/**
 * True if some run that started from |0> begins with exactly these gates.
 * For example `ran(runs, 'H', 'X')`: the reader applied H then X starting from |0>.
 */
export function ran(runs: Run[], ...gates: GateName[]): boolean {
  return runs.some((r) => r.start === '0' && gates.every((g, i) => r.gates[i] === g))
}


export type ExercisePicker = {
  id: string
  title: string
  question: string
  options: string[]
  correctAnswer: number
  justification: string
  hints?: string
}