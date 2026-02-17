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
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-heading font-semibold mb-1">
            {question.text}
          </h2>
          <p className="text-sm text-muted-foreground">Select one option</p>
        </div>

        <div className="space-y-2">
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
                  'w-full flex items-center gap-3 p-4 rounded-lg border transition-all duration-200',
                  'hover:border-primary/50 hover:bg-primary/5',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card'
                )}
              >
                <div
                  className={cn(
                    'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
                    isSelected ? 'border-primary' : 'border-muted-foreground'
                  )}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
                <span className="flex-1 text-left text-sm">
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
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-heading font-semibold mb-1">
          {question.text}
        </h2>
        <p className="text-sm text-muted-foreground">Select all that apply</p>
      </div>

      <div className="space-y-2">
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
                'w-full flex items-center gap-3 p-4 rounded-lg border transition-all duration-200',
                'hover:border-primary/50 hover:bg-primary/5',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                isChecked
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card'
              )}
            >
              <Checkbox
                checked={isChecked}
                onCheckedChange={() => {}}
                className="pointer-events-none"
              />
              <span className="flex-1 text-left text-sm">
                {option.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
