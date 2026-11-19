/**
 * Gate Golf: reach a target state from a start state in as few gates as possible, using only the
 * gates a level allows. Levels and scoring follow the gate trainer page (the original gate trainer web app).
 *
 * Pure data and functions; the `GateGolf` component plays it with a paired bead.
 */
import { gateResult, type GateName, type KetName } from './gates'

/** One Gate Golf level. Write text with Unicode kets (e.g. |0⟩), not markdown or LaTeX. */
export type GolfLevel = {
  title: string
  start: KetName
  target: KetName
  /** The only gates the reader may use. */
  gates: GateName[]
  /** Show the par as "?" (used for impossible levels, so the par does not give them away). */
  hidePar?: boolean
  /** What the reader does, shown with the task. */
  task: string
  /** What the level teaches; shown once solved (and always when no bead is paired). */
  lesson: string
}

/**
 * The shortest gate sequence from `start` to `target` using only `gates`, or `null` if the target
 * cannot be reached. Every gate takes a basis state to a basis state, so a breadth-first search
 * over the six basis states finds it.
 */
export function solve(start: KetName, target: KetName, gates: GateName[]): GateName[] | null {
  const paths = new Map<KetName, GateName[]>([[start, []]])
  let frontier = [start]
  while (frontier.length) {
    if (paths.has(target)) return paths.get(target)!
    const next: KetName[] = []
    for (const k of frontier) {
      for (const g of gates) {
        const r = gateResult(k, g)
        if (r && !paths.has(r)) {
          paths.set(r, [...paths.get(k)!, g])
          next.push(r)
        }
      }
    }
    frontier = next
  }
  return paths.get(target) ?? null
}

/**
 * Stars (1 to 3) for a finished level, as on the gate trainer page.
 * Solved: 3 at par, 2 one over, else 1. Correctly called impossible: 3 with no gates used, 2 with up
 * to two, else 1. Each wrong "Impossible!" costs a star; peeking at the solution caps it at 1.
 */
export function golfStars(o: {
  par: number | null
  gatesUsed: number
  claimedImpossible: boolean
  penalty: number
  peeked: boolean
}): number {
  let s: number
  if (o.claimedImpossible) s = o.gatesUsed === 0 ? 3 : o.gatesUsed <= 2 ? 2 : 1
  else s = o.par !== null && o.gatesUsed <= o.par ? 3 : o.gatesUsed === (o.par ?? 0) + 1 ? 2 : 1
  s -= o.penalty
  if (o.peeked) s = 1
  return Math.max(1, Math.min(3, s))
}

/** The ten levels of the Quantum Gates lesson. */
export const GATE_GOLF_LEVELS: GolfLevel[] = [
  {
    title: 'First flip',
    start: '0',
    target: '1',
    gates: ['X', 'Y', 'Z'],
    task: 'Flip the qubit from the north pole to the south pole.',
    lesson:
      'X is the quantum NOT gate (Y works too). Z does nothing here: the poles lie exactly on its rotation axis.',
  },
  {
    title: 'Axis prison',
    start: '0',
    target: '+',
    gates: ['X', 'Y', 'Z'],
    hidePar: true,
    task: 'Try to bring the qubit from the pole down to the equator.',
    lesson:
      'This level is impossible. X, Y and Z are 180° rotations around the coordinate axes, so a state on an axis always stays on that axis. To leave the pole you need H.',
  },
  {
    title: 'Into superposition',
    start: '0',
    target: '+',
    gates: ['H'],
    task: 'Use the Hadamard gate for the first time.',
    lesson:
      'H rotates around the diagonal between x and z and swaps the two axes: |0⟩ ↔ |+⟩. A certain measurement outcome becomes a 50/50 one.',
  },
  {
    title: 'Order matters',
    start: '0',
    target: '-',
    gates: ['H', 'X'],
    task: 'Find the right order of the two gates.',
    lesson:
      'X then H reaches |−⟩. H then X gets stuck at |+⟩, because |+⟩ lies on the rotation axis of X. Quantum gates generally do not commute.',
  },
  {
    title: 'Turning the phase',
    start: '0',
    target: '+i',
    gates: ['H', 'S'],
    task: 'Get onto the equator, then turn along it.',
    lesson:
      'S rotates the equator by a quarter turn around z. The measurement probabilities stay the same; only the relative phase changes.',
  },
  {
    title: 'The detour',
    start: '0',
    target: '-i',
    gates: ['H', 'S'],
    task: 'Beat the obvious 4-gate route H, S, S, S.',
    lesson:
      'H, S, H is shorter, because H also flips the y-axis (|+i⟩ → |−i⟩). Knowing the geometry saves gates, and on real hardware fewer gates mean fewer errors.',
  },
  {
    title: 'Phase trap',
    start: '+',
    target: '-',
    gates: ['X'],
    hidePar: true,
    task: 'Try to flip the relative phase with X.',
    lesson:
      'Impossible: |+⟩ lies on the rotation axis of X, so X does not change it at all. The relative phase can only be changed by a gate with a different axis, such as Z.',
  },
  {
    title: 'Phase detector',
    start: '+',
    target: '1',
    gates: ['Z', 'H'],
    hidePar: true,
    task: 'Turn a phase difference into something you could measure.',
    lesson:
      'Z flips the phase (|+⟩ → |−⟩), then H turns it into a pole (|−⟩ → |1⟩). This is how quantum algorithms read out phase information.',
  },
  {
    title: 'Back home',
    start: '+i',
    target: '0',
    gates: ['H', 'S'],
    task: 'Bring the qubit from the equator back to the north pole.',
    lesson:
      'H, S, H also works in reverse. S only turns in one direction, so a detour through H can beat several S gates in a row.',
  },
  {
    title: 'The shortcut',
    start: '+',
    target: '-i',
    gates: ['S', 'D'],
    task: 'Use the new gate S†.',
    lesson:
      'S† turns the other way: one S† does what three S gates do. Every gate has an inverse that undoes it, and for S that is S†.',
  },
]
