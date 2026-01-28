import { z } from 'zod'

// Quiz-related validation schemas
export const timeSlotSchema = z.object({
  day: z.string(),
  startTime: z.string().regex(/^\d{2}:\d{2}$/), // HH:MM format
  endTime: z.string().regex(/^\d{2}:\d{2}$/), // HH:MM format
})

export const budgetRangeSchema = z.object({
  min: z.number().min(0),
  max: z.number().min(0),
})

export const fitnessGoalSchema = z.enum([
  'weight-loss',
  'muscle-gain',
  'endurance',
  'flexibility',
  'general-fitness',
  'rehabilitation',
])

export const trainingStyleSchema = z.enum([
  'high-intensity',
  'steady-state',
  'functional',
  'sport-specific',
  'mindful',
  'strength-focused',
])

export const personalityTraitSchema = z.enum([
  'motivating',
  'analytical',
  'empathetic',
  'disciplined',
  'flexible',
  'energetic',
])

export const experienceLevelSchema = z.enum([
  'beginner',
  'intermediate',
  'advanced',
  'athlete',
])

// UserProfile validation schema (canonical)
export const userProfileSchema = z.object({
  goals: z.array(fitnessGoalSchema).min(1, 'Select at least one goal'),
  preferredStyles: z.array(trainingStyleSchema),
  experienceLevel: experienceLevelSchema,
  personality: z.array(personalityTraitSchema).optional().default([]),
  availability: z.array(timeSlotSchema),
  timezone: z.string(),
  budgetRange: budgetRangeSchema,
  virtualOnly: z.boolean().default(false),
  inPersonOnly: z.boolean().default(false),
  age: z.number().min(13).max(120).optional(),
  gender: z.enum(['male', 'female', 'non-binary', 'prefer-not-to-say']).optional(),
  completeness: z.number().min(0).max(100),
})

// Quiz answers validation (form handling)
export const quizAnswersSchema = z.object({
  // Step 1: Goals
  goals: z.array(fitnessGoalSchema).min(1, 'Select at least one goal'),
  preferredStyles: z.array(trainingStyleSchema),
  
  // Step 2: Experience
  experienceLevel: experienceLevelSchema,
  injuries: z.string().optional(),
  
  // Step 3: Schedule
  daysPerWeek: z.number().min(1).max(7),
  preferredTime: z.enum(['morning', 'afternoon', 'evening', 'flexible']),
  availability: z.array(timeSlotSchema),
  
  // Step 4: Budget
  budgetMin: z.number().min(0),
  budgetMax: z.number().min(0),
  
  // Step 5: Preferences
  personality: z.array(personalityTraitSchema).optional(),
  virtualOnly: z.boolean().default(false),
  inPersonOnly: z.boolean().default(false),
  age: z.number().min(13).max(120).optional(),
  gender: z.enum(['male', 'female', 'non-binary', 'prefer-not-to-say']).optional(),
}).refine(data => data.budgetMax >= data.budgetMin, {
  message: 'Maximum budget must be greater than or equal to minimum budget',
  path: ['budgetMax'],
})
