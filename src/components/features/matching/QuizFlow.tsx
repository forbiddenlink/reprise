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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="font-heading text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
              Find Your Perfect Match
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
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
        <div className="mb-10">
          <QuizQuestion question={currentQuestion} />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t-2">
          <Button
            variant="outline"
            onClick={previousStep}
            disabled={currentStep === 0}
            size="lg"
            className="font-heading shadow-lg hover:shadow-xl transition-all hover:scale-105 h-14 px-8 text-base border-2"
          >
            ← Previous
          </Button>

          <div className="text-base font-semibold text-muted-foreground">
            Step {currentStep + 1} of {quizQuestions.length}
          </div>

          <Button
            onClick={handleNext}
            disabled={!canProceed}
            size="lg"
            className="font-heading shadow-xl hover:shadow-2xl transition-all hover:scale-105 h-14 px-8 text-base"
          >
            {isLastQuestion ? '✨ See My Matches' : 'Next →'}
          </Button>
        </div>
      </div>
    </div>
  )
}
