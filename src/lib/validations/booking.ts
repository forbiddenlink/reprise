import { z } from 'zod'
import { timeSlotSchema } from './quiz'

// Booking validation schemas
export const bookingStateSchema = z.enum([
  'idle',
  'selecting-trainer',
  'selecting-session',
  'selecting-time',
  'confirming',
  'processing',
  'success',
  'error',
])

export const bookingStatusSchema = z.enum([
  'pending',
  'confirmed',
  'in-progress',
  'completed',
  'cancelled',
  'no-show',
])

export const bookingDataSchema = z.object({
  trainer: z.any().nullable(), // TODO: Use trainerSchema
  sessionType: z.any().nullable(), // TODO: Use sessionTypeSchema
  selectedDate: z.coerce.date().nullable(),
  selectedTimeSlot: timeSlotSchema.nullable(),
  notes: z.string().default(''),
  isVirtual: z.boolean().default(false),
})

export const bookingSchema = z.object({
  id: z.string(),
  userId: z.string(),
  trainer: z.any(), // TODO: Use trainerSchema
  sessionType: z.any(), // TODO: Use sessionTypeSchema
  scheduledDate: z.coerce.date(),
  timeSlot: timeSlotSchema,
  notes: z.string(),
  isVirtual: z.boolean(),
  status: bookingStatusSchema,
  totalPrice: z.number().min(0),
  
  // Payment info
  paymentStatus: z.enum(['pending', 'paid', 'refunded']),
  paymentMethod: z.string(),
  
  // Metadata
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  cancelledAt: z.coerce.date().optional(),
  completedAt: z.coerce.date().optional(),
})

export const availabilitySlotSchema = z.object({
  date: z.coerce.date(),
  timeSlot: timeSlotSchema,
  available: z.boolean(),
  bookedBy: z.string().optional(),
  trainer: z.string(),
})

export const conflictCheckSchema = z.object({
  hasConflict: z.boolean(),
  conflictingBookings: z.array(bookingSchema),
  reason: z.string().optional(),
})
