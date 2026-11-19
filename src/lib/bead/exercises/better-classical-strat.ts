import { type ExercisePicker } from './types'

export const classicalStrategyPicker: ExercisePicker = {
    id: 'classical-strategy',
    title: 'Find a better classical strategy',
    question: 'What happens if the strategy is changed so that Alice always outputs 0 and Bob always outputs 0? What is the probability of winning in this case?',
    options: ['0%', '25%', '50%', '75%', '100%'],
    correctAnswer: 3, // 75%
    justification: 'If Alice always outputs 0 and Bob always outputs 0, they will win in 3 out of the 4 possible input combinations: (0,0), (0,1), (1,0). They will lose only in the case (1,1). Therefore, the probability of winning is 3/4 = 75%.',
    hints: 'Think about how many possible input combinations satisfy the winning condition with a (0,0) output.'
}