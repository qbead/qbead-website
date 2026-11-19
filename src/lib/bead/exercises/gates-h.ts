import type { Exercise } from './types'

/** "Try it yourself" for the Hadamard gate section: predict where H takes three basis states. */
export const gatesH: Exercise = {
  id: 'gates-h',
  title: 'Try it yourself',
  widgets: ['challenges', 'measure'],
  challenges: [
    { kind: 'predict', start: '0', gate: 'H' },
    { kind: 'predict', start: '+', gate: 'H' },
    { kind: 'predict', start: '-', gate: 'H' },
  ],
}
