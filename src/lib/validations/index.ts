// Canonical export point for all validation schemas
// Always import from here: import { userProfileSchema } from '@/lib/validations'

export {
  // Quiz & UserProfile schemas
  userProfileSchema,
  quizAnswersSchema,
  timeSlotSchema,
  budgetRangeSchema,
  fitnessGoalSchema,
  trainingStyleSchema,
  personalityTraitSchema,
  experienceLevelSchema,
} from './quiz'

export {
  // Trainer schemas
  trainerSchema,
  trainerProfileSchema,
  sessionTypeSchema,
  testimonialSchema,
  educationSchema,
  achievementSchema,
} from './trainer'

export {
  // Booking schemas
  bookingSchema,
  bookingDataSchema,
  bookingStateSchema,
  bookingStatusSchema,
  availabilitySlotSchema,
  conflictCheckSchema,
} from './booking'
