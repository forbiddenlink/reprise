import type { ID, TimeSlot } from './index'
import type { Trainer, SessionType } from './trainer'

// Booking state machine states
export type BookingState =
  | 'idle'
  | 'selecting-trainer'
  | 'selecting-session'
  | 'selecting-time'
  | 'confirming'
  | 'processing'
  | 'success'
  | 'error'

// Booking flow data
export interface BookingData {
  trainer: Trainer | null
  sessionType: SessionType | null
  selectedDate: Date | null
  selectedTimeSlot: TimeSlot | null
  notes: string
  isVirtual: boolean
}

// Booking state machine transitions
export interface BookingTransition {
  from: BookingState
  to: BookingState
  guard?: (data: BookingData) => boolean
}

// Booking state store
export interface BookingStore {
  state: BookingState
  data: BookingData
  error: string | null
  
  // Actions
  selectTrainer: (trainer: Trainer) => void
  selectSessionType: (sessionType: SessionType) => void
  selectDateTime: (date: Date, timeSlot: TimeSlot) => void
  setNotes: (notes: string) => void
  confirm: () => Promise<void>
  reset: () => void
}

// Confirmed booking
export interface Booking {
  id: ID
  userId: ID
  trainer: Trainer
  sessionType: SessionType
  scheduledDate: Date
  timeSlot: TimeSlot
  notes: string
  isVirtual: boolean
  status: BookingStatus
  totalPrice: number
  
  // Payment info (demo)
  paymentStatus: 'pending' | 'paid' | 'refunded'
  paymentMethod: string
  
  // Metadata
  createdAt: Date
  updatedAt: Date
  cancelledAt?: Date
  completedAt?: Date
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'no-show'

// Availability checking
export interface AvailabilitySlot {
  date: Date
  timeSlot: TimeSlot
  available: boolean
  bookedBy?: ID // User ID if booked
  trainer: ID
}

export interface ConflictCheck {
  hasConflict: boolean
  conflictingBookings: Booking[]
  reason?: string
}

// Calendar view types
export interface CalendarDay {
  date: Date
  slots: AvailabilitySlot[]
  isAvailable: boolean
  isPast: boolean
  isToday: boolean
}

export interface CalendarWeek {
  weekNumber: number
  days: CalendarDay[]
}

export interface CalendarMonth {
  month: number
  year: number
  weeks: CalendarWeek[]
}
