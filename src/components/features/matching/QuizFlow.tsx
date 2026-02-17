'use client'

import { useRouter } from 'next/navigation'
import { useQuizStore } from '@/stores/use-quiz-store'
import { QuizQuestion, type QuizQuestionData } from './QuizQuestion'
import { QuizProgress } from './QuizProgress'
import { Button } from '@/components/ui/button'
import quizQuestionsData from '@/mocks/data/quiz-questions.json'

// Cast imported JSON to proper type
const quizQuestions = quizQuestionsData as QuizQuestionData[]

export function QuizFlow() {
  const router = useRouter()
  const { currentStep, answers, nextStep, previousStep, completeQuiz } = useQuizStore()
  
  const currentQuestion = quizQuestions[currentStep]
  const isLastQuestion = currentStep === quizQuestions.length - 1
  const canProceed = answers[currentQuestion.id] !== undefined

  const handleNext = () => {
    if (isLastQuestion) {
      completeQuiz()
      router.push('/match/results')
    } else {
      nextStep()
    }
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-heading text-h2 mb-3">
            Find Your Perfect Match
          </h1>
          <p className="text-muted-foreground">
            Answer a few questions to get personalized trainer recommendations
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <QuizProgress
            currentStep={currentStep}
            totalSteps={quizQuestions.length}
          />
        </div>

        {/* Question */}
        <div className="mb-8">
          <QuizQuestion question={currentQuestion} />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={previousStep}
            disabled={currentStep === 0}
          >
            ← Previous
          </Button>

          <span className="text-sm text-muted-foreground">
            {currentStep + 1} of {quizQuestions.length}
          </span>

          <Button
            onClick={handleNext}
            disabled={!canProceed}
          >
            {isLastQuestion ? 'See Matches' : 'Next →'}
          </Button>
        </div>
      </div>
    </div>
  )
}
