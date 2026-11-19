import type { Exercise } from './types'

/** "Try it yourself" for combining gates: reach a target state in as few gates as possible. */
export const gatesCombining: Exercise = {
  id: 'gates-combining',
  title: 'Try it yourself',
  widgets: ['challenges'],
  challenges: [
    { kind: 'target', start: '0', target: '1', gates: ['H', 'Z'], par: 3 },
    { kind: 'target', start: '0', target: '-', gates: ['H', 'X', 'Z'], par: 2 },
    { kind: 'target', start: '+', target: '1', gates: ['H', 'X', 'Z'], par: 2 },
  ],
}
