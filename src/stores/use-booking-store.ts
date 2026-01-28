import { create } from 'zustand'
import type { Trainer, SessionType } from '@/types/trainer'

export type BookingStep = 'session-type' | 'date' | 'time' | 'confirmation'

interface BookingState {
  // Current booking context
  trainer: Trainer | null
  selectedSessionType: SessionType | null
  selectedDate: Date | null
  selectedTimeSlot: { startTime: string; endTime: string } | null
  
  // Booking flow state
  currentStep: BookingStep
  isLoading: boolean
  error: string | null
  
  // Actions
  setTrainer: (trainer: Trainer) => void
  selectSessionType: (sessionType: SessionType) => void
  selectDate: (date: Date) => void
  selectTimeSlot: (slot: { startTime: string; endTime: string }) => void
  nextStep: () => void
  previousStep: () => void
  goToStep: (step: BookingStep) => void
  reset: () => void
  confirmBooking: () => Promise<void>
}

const initialState = {
  trainer: null,
  selectedSessionType: null,
  selectedDate: null,
  selectedTimeSlot: null,
  currentStep: 'session-type' as BookingStep,
  isLoading: false,
  error: null,
}

export const useBookingStore = create<BookingState>((set, get) => ({
  ...initialState,

  setTrainer: (trainer) => set({ 
    ...initialState,
    trainer,
  }),

  selectSessionType: (sessionType) => 
    set({ selectedSessionType: sessionType, error: null }),

  selectDate: (date) => 
    set({ selectedDate: date, selectedTimeSlot: null, error: null }),

  selectTimeSlot: (slot) => 
    set({ selectedTimeSlot: slot, error: null }),

  nextStep: () => {
    const { currentStep, selectedSessionType, selectedDate, selectedTimeSlot } = get()
    
    // Validate before proceeding
    if (currentStep === 'session-type' && !selectedSessionType) {
      set({ error: 'Please select a session type' })
      return
    }
    if (currentStep === 'date' && !selectedDate) {
      set({ error: 'Please select a date' })
      return
    }
    if (currentStep === 'time' && !selectedTimeSlot) {
      set({ error: 'Please select a time slot' })
      return
    }

    // Progress to next step
    const steps: BookingStep[] = ['session-type', 'date', 'time', 'confirmation']
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      set({ currentStep: steps[currentIndex + 1], error: null })
    }
  },

  previousStep: () => {
    const { currentStep } = get()
    const steps: BookingStep[] = ['session-type', 'date', 'time', 'confirmation']
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      set({ currentStep: steps[currentIndex - 1], error: null })
    }
  },

  goToStep: (step) => set({ currentStep: step, error: null }),

  reset: () => set(initialState),

  confirmBooking: async () => {
    const { trainer, selectedSessionType, selectedDate, selectedTimeSlot } = get()
    
    if (!trainer || !selectedSessionType || !selectedDate || !selectedTimeSlot) {
      set({ error: 'Missing required booking information' })
      return
    }

    set({ isLoading: true, error: null })

    try {
      // In a real app, this would call an API
      // For now, simulate a network delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // TODO: Call API to create booking
      // const response = await fetch('/api/bookings', { method: 'POST', body: ... })
      
      // Success - reset state
      set({ ...initialState, isLoading: false })
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to create booking' 
      })
    }
  },
}))
