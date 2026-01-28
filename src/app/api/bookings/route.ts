import { NextRequest } from 'next/server'
import { z } from 'zod'
import trainersData from '@/mocks/data/trainers.json'
import type { Trainer } from '@/types/trainer'
import { successResponse, errorResponse, validationErrorResponse, logError, getErrorMessage } from '@/lib/utils/api-response'

// Booking request schema
const bookingRequestSchema = z.object({
  trainerId: z.string().min(1, 'Trainer ID is required'),
  sessionTypeId: z.string().min(1, 'Session type ID is required'),
  date: z.string().datetime('Invalid datetime format'), // ISO 8601 datetime string
  timeSlot: z.object({
    startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Start time must be in HH:MM format'),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, 'End time must be in HH:MM format'),
  }),
  userInfo: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
  }),
}).refine(
  (data) => {
    // Validate that end time is after start time
    const start = data.timeSlot.startTime.split(':').map(Number)
    const end = data.timeSlot.endTime.split(':').map(Number)
    return start[0] * 60 + start[1] < end[0] * 60 + end[1]
  },
  {
    message: 'End time must be after start time',
    path: ['timeSlot', 'endTime'],
  }
)

type BookingRequest = z.infer<typeof bookingRequestSchema>

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const validation = bookingRequestSchema.safeParse(body)
    if (!validation.success) {
      return validationErrorResponse(validation.error)
    }

    const bookingData: BookingRequest = validation.data

    // Find trainer
    const trainers = trainersData as unknown as Trainer[]
    const trainer = trainers.find(t => t.id === bookingData.trainerId)

    if (!trainer) {
      return errorResponse('Trainer not found', 404, 'TRAINER_NOT_FOUND')
    }

    // Find session type
    const sessionType = trainer.sessionTypes.find(
      st => st.id === bookingData.sessionTypeId
    )

    if (!sessionType) {
      return errorResponse('Session type not found', 404, 'SESSION_TYPE_NOT_FOUND')
    }

    // Validate date is in the future (at least 1 hour from now)
    const bookingDate = new Date(bookingData.date)
    const minBookingTime = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now
    
    if (bookingDate < minBookingTime) {
      return errorResponse(
        'Bookings must be made at least 1 hour in advance',
        400,
        'BOOKING_TOO_SOON'
      )
    }

    // Validate booking isn't too far in the future (90 days)
    const maxBookingTime = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    if (bookingDate > maxBookingTime) {
      return errorResponse(
        'Bookings can only be made up to 90 days in advance',
        400,
        'BOOKING_TOO_FAR'
      )
    }

    // Check trainer availability
    const dayName = bookingDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    const hasAvailability = trainer.availability.some(slot => 
      slot.day === dayName &&
      slot.startTime <= bookingData.timeSlot.startTime &&
      slot.endTime >= bookingData.timeSlot.endTime
    )

    if (!hasAvailability) {
      return errorResponse(
        'Trainer not available at selected time',
        400,
        'TRAINER_UNAVAILABLE'
      )
    }

    // In a real app, would:
    // 1. Check for booking conflicts in database
    // 2. Create booking record in database
    // 3. Send confirmation emails
    // 4. Create calendar events
    // 5. Process payment

    // For now, return mock success response
    const booking = {
      id: `booking-${Date.now()}`,
      trainerId: trainer.id,
      trainerName: trainer.name,
      trainerEmail: trainer.email,
      sessionType: sessionType.name,
      duration: sessionType.duration,
      price: sessionType.price,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      userInfo: bookingData.userInfo,
      status: 'confirmed' as const,
      createdAt: new Date().toISOString(),
      confirmationNumber: `RPR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    }

    return successResponse(
      {
        booking,
        message: 'Booking created successfully. Confirmation email sent.',
      },
      201
    )

  } catch (error) {
    logError('POST /api/bookings', error)
    return errorResponse(
      'Failed to create booking',
      500,
      'INTERNAL_ERROR',
      process.env.NODE_ENV === 'development' ? getErrorMessage(error) : undefined
    )
  }
}
