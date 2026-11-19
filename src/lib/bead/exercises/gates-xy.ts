import { ran, type Exercise } from './types'

/** "Try it yourself" for the X and Y gates section of the Quantum Gates lesson. */
export const gatesXY: Exercise = {
  id: 'gates-xy',
  title: 'Try it yourself',
  widgets: ['picker', 'history', 'tasks'],
  tasks: [
    {
      text: 'Apply X, then reset and apply Y. What do you notice about the two results on the sphere?',
      done: (runs) => ran(runs, 'X') && ran(runs, 'Y'),
    },
    {
      text: 'Prepare |+⟩ with H and apply X. Then reset, prepare |+⟩ again and apply Y. What happens?',
      done: (runs) => ran(runs, 'H', 'X') && ran(runs, 'H', 'Y'),
    },
    {
      text: 'Apply X twice, then Y twice. Where does the state end up?',
      done: (runs) => ran(runs, 'X', 'X', 'Y', 'Y'),
    },
  ],
}
