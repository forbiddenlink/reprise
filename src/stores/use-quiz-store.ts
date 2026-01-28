import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Type-safe answer types
export type QuizAnswer = string | string[] | number | boolean

export interface QuizAnswers {
  [questionId: string]: QuizAnswer
}

interface QuizState {
  currentStep: number
  totalSteps: number
  answers: QuizAnswers
  isComplete: boolean
  startedAt: string | null
  completedAt: string | null
  
  // Actions
  setAnswer: (questionId: string, answer: QuizAnswer) => void
  setAnswers: (answers: QuizAnswers) => void
  nextStep: () => void
  previousStep: () => void
  goToStep: (step: number) => void
  reset: () => void
  completeQuiz: () => void
  hasAnswer: (questionId: string) => boolean
  getProgress: () => number
}

const TOTAL_QUIZ_QUESTIONS = 6

const initialState = {
  currentStep: 0,
  totalSteps: TOTAL_QUIZ_QUESTIONS,
  answers: {},
  isComplete: false,
  startedAt: null,
  completedAt: null,
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setAnswer: (questionId, answer) =>
        set((state) => {
          const newState = {
            answers: { ...state.answers, [questionId]: answer },
          }
          
          // Set startedAt if this is the first answer
          if (Object.keys(state.answers).length === 0 && !state.startedAt) {
            return { ...newState, startedAt: new Date().toISOString() }
          }
          
          return newState
        }),

      setAnswers: (answers) =>
        set({ answers }),

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1),
        })),

      previousStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 0),
        })),

      goToStep: (step) =>
        set((state) => ({
          currentStep: Math.max(0, Math.min(step, state.totalSteps - 1)),
        })),

      reset: () =>
        set({
          ...initialState,
          currentStep: 0,
        }),

      completeQuiz: () =>
        set({
          isComplete: true,
          completedAt: new Date().toISOString(),
        }),

      hasAnswer: (questionId) => {
        const answer = get().answers[questionId]
        return answer !== undefined && answer !== null && answer !== ''
      },

      getProgress: () => {
        const { answers, totalSteps } = get()
        const answeredCount = Object.keys(answers).length
        return Math.round((answeredCount / totalSteps) * 100)
      },
    }),
    {
      name: 'quiz-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist answers and progress, not UI state
      partialize: (state) => ({
        answers: state.answers,
        startedAt: state.startedAt,
      }),
    }
  )
)
