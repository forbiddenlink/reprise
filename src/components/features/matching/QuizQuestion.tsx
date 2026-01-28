'use client'

import { useQuizStore } from '@/stores/use-quiz-store'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils/cn'

export interface QuizOption {
  id: string
  value: string
  label: string
}

export interface QuizQuestionData {
  id: string
  text: string
  type: 'single' | 'multiple'
  options: QuizOption[]
}

interface QuizQuestionProps {
  question: QuizQuestionData
}

export function QuizQuestion({ question }: QuizQuestionProps) {
  const { answers, setAnswer } = useQuizStore()
  const currentAnswer = answers[question.id]

  if (question.type === 'single') {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h2 className="text-3xl font-heading font-bold text-text-primary mb-3">
            {question.text}
          </h2>
          <p className="text-text-secondary font-body">Select one option</p>
        </div>

        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = currentAnswer === option.value

            return (
              <button
                key={option.id}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setAnswer(question.id, option.value)
                }}
                className={cn(
                  'w-full flex items-center space-x-4 p-5 rounded-lg border-2 transition-all',
                  'hover:border-primary hover:bg-primary/5',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-surface'
                )}
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                    isSelected ? 'border-primary' : 'border-text-secondary'
                  )}
                >
                  {isSelected && (
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  )}
                </div>
                <span className="flex-1 text-left font-body text-base">
                  {option.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Multiple choice
  const selectedValues = (currentAnswer as string[]) || []

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-3">
          {question.text}
        </h2>
        <p className="text-text-secondary font-body">Select all that apply</p>
      </div>

      <div className="space-y-3">
        {question.options.map((option) => {
          const isChecked = selectedValues.includes(option.value)

          return (
            <button
              key={option.id}
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                const newValues = isChecked
                  ? selectedValues.filter((v) => v !== option.value)
                  : [...selectedValues, option.value]
                setAnswer(question.id, newValues)
              }}
              className={cn(
                'w-full flex items-center space-x-4 p-5 rounded-lg border-2 transition-all',
                'hover:border-primary hover:bg-primary/5',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                isChecked
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-surface'
              )}
            >
              <Checkbox
                checked={isChecked}
                onCheckedChange={() => {}} // Handled by button onClick
                className="pointer-events-none"
              />
              <span className="flex-1 text-left font-body text-base">
                {option.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
