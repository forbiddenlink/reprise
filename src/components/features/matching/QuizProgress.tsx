import { Progress } from '@/components/ui/progress'
import { CheckCircle2 } from 'lucide-react'

interface QuizProgressProps {
  currentStep: number
  totalSteps: number
}

export function QuizProgress({ currentStep, totalSteps }: QuizProgressProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="space-y-4">
      {/* Step indicators */}
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              i < currentStep 
                ? 'bg-primary border-primary text-white scale-100' 
                : i === currentStep
                ? 'bg-primary border-primary text-white scale-110 shadow-lg'
                : 'bg-background border-border text-muted-foreground'
            }`}>
              {i < currentStep ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <span className="text-sm font-bold">{i + 1}</span>
              )}
              {i === currentStep && (
                <div className="absolute -inset-1 bg-primary/20 rounded-full blur animate-pulse" />
              )}
            </div>
            {i < totalSteps - 1 && (
              <div className={`flex-1 h-1 mx-2 rounded transition-all duration-500 ${
                i < currentStep ? 'bg-primary' : 'bg-border'
              }`} />
            )}
          </div>
        ))}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary font-body">
            Question {currentStep + 1} of {totalSteps}
          </span>
          <span className="font-medium font-heading text-primary">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  )
}
