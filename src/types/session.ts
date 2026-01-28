import type { ID, TimeSlot } from './index'
import type { Trainer, SessionType } from './trainer'

// Training session
export interface Session {
  id: ID
  userId: ID
  trainer: Trainer
  sessionType: SessionType
  scheduledDate: Date
  timeSlot: TimeSlot
  actualStartTime?: Date
  actualEndTime?: Date
  
  // Location
  isVirtual: boolean
  meetingLink?: string
  location?: string
  
  // Status
  status: SessionStatus
  attendance: 'present' | 'absent' | 'late' | 'pending'
  
  // Notes
  trainerNotes: string
  clientNotes: string
  
  // Feedback
  clientRating?: number // 1-5
  clientFeedback?: string
  trainerFeedback?: string
  
  // Metadata
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
  cancelledAt?: Date
}

export type SessionStatus =
  | 'scheduled'
  | 'confirmed'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'no-show'
  | 'rescheduled'

// Session summary for dashboard
export interface SessionSummary {
  totalSessions: number
  completedSessions: number
  upcomingSessions: number
  cancelledSessions: number
  attendanceRate: number
  averageRating: number
}

// Upcoming session card data
export interface UpcomingSession {
  session: Session
  trainer: Trainer
  daysUntil: number
  canCancel: boolean
  canReschedule: boolean
}
