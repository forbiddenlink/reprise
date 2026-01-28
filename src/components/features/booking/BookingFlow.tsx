'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useBookingStore } from '@/stores/use-booking-store'
import { AvailabilityCalendar } from './AvailabilityCalendar'
import { TimeSlotPicker } from './TimeSlotPicker'
import { BookingConfirmation } from '@/components/features/booking/BookingConfirmation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, DollarSign, CheckCircle } from 'lucide-react'
import type { Trainer } from '@/types/trainer'

interface BookingFlowProps {
  trainer: Trainer
}

export function BookingFlow({ trainer }: BookingFlowProps) {
  const router = useRouter()
  const {
    currentStep,
    selectedSessionType,
    selectedDate,
    selectedTimeSlot,
    error,
    setTrainer,
    selectSessionType,
    selectDate,
    selectTimeSlot,
    nextStep,
    previousStep,
    reset,
  } = useBookingStore()

  // Initialize trainer on mount
  useEffect(() => {
    setTrainer(trainer)
  }, [trainer, setTrainer])

  const canProceed = () => {
    switch (currentStep) {
      case 'session-type':
        return selectedSessionType !== null
      case 'date':
        return selectedDate !== null
      case 'time':
        return selectedTimeSlot !== null
      case 'confirmation':
        return true
      default:
        return false
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 'session-type':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Choose a Session Type</CardTitle>
              <CardDescription>
                Select the type of training session you&apos;d like to book with {trainer.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {trainer.sessionTypes.map((sessionType) => {
                const isSelected = selectedSessionType?.id === sessionType.id

                return (
                  <button
                    key={sessionType.id}
                    onClick={() => selectSessionType(sessionType)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all hover:border-primary/50 ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{sessionType.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {sessionType.description}
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{sessionType.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold text-primary">${sessionType.price}</span>
                      </div>
                      <div className="flex gap-2 ml-auto">
                        {sessionType.isVirtual && (
                          <Badge variant="secondary" className="text-xs">Virtual</Badge>
                        )}
                        {sessionType.isInPerson && (
                          <Badge variant="secondary" className="text-xs">In-Person</Badge>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </CardContent>
          </Card>
        )

      case 'date':
        if (!selectedSessionType) return null
        return (
          <AvailabilityCalendar
            trainer={trainer}
            selectedDate={selectedDate}
            onSelectDate={selectDate}
          />
        )

      case 'time':
        if (!selectedSessionType || !selectedDate) return null
        return (
          <TimeSlotPicker
            trainer={trainer}
            selectedDate={selectedDate}
            selectedSessionType={selectedSessionType}
            selectedTimeSlot={selectedTimeSlot}
            onSelectTimeSlot={selectTimeSlot}
          />
        )

      case 'confirmation':
        if (!selectedSessionType || !selectedDate || !selectedTimeSlot) return null
        return (
          <BookingConfirmation
            trainer={trainer}
            sessionType={selectedSessionType}
            date={selectedDate}
            timeSlot={selectedTimeSlot}
          />
        )

      default:
        return null
    }
  }

  // Step indicators
  const steps = [
    { key: 'session-type', label: 'Session Type' },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'confirmation', label: 'Confirm' },
  ]
  const currentStepIndex = steps.findIndex(s => s.key === currentStep)

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            ← Back
          </Button>
          <h1 className="font-heading text-3xl font-bold">Book a Session</h1>
          <p className="text-muted-foreground mt-2">with {trainer.name}</p>
        </div>

        {/* Step Indicators */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      index <= currentStepIndex
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs mt-2 text-center">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded transition-colors ${
                      index < currentStepIndex ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Step Content */}
        <div className="mb-8">{renderStepContent()}</div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={previousStep}
            disabled={currentStep === 'session-type'}
            size="lg"
          >
            Previous
          </Button>

          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            size="lg"
            className="font-heading"
          >
            {currentStep === 'confirmation' ? 'Complete Booking' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  )
}
