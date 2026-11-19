import { ran, type Exercise } from './types'

/** "Try it yourself" for the Z, S, and T gates section of the Quantum Gates lesson. */
export const gatesZS: Exercise = {
  id: 'gates-zs',
  title: 'Try it yourself',
  widgets: ['picker', 'history', 'readout', 'tasks'],
  tasks: [
    {
      text: 'Apply Z to |0⟩. Does anything change on the sphere?',
      done: (runs) => ran(runs, 'Z'),
    },
    {
      text: 'Prepare |+⟩ with H and apply S twice. Then reset, prepare |+⟩ and apply Z once. Compare.',
      done: (runs) => ran(runs, 'H', 'S', 'S') && ran(runs, 'H', 'Z'),
    },
    {
      text: 'Apply T four times in a row and watch the state travel around the equator. How does the result compare to applying S twice?',
      done: (runs) => ran(runs, 'T', 'T', 'T', 'T'),
    },
  ],
}
