import { z } from 'zod'
import { 
  fitnessGoalSchema, 
  trainingStyleSchema, 
  personalityTraitSchema, 
  experienceLevelSchema,
  timeSlotSchema 
} from './quiz'

// SessionType validation
export const sessionTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  duration: z.union([
    z.literal(30),
    z.literal(45),
    z.literal(60),
    z.literal(90),
  ]),
  price: z.number().min(0),
  description: z.string(),
  isVirtual: z.boolean(),
  isInPerson: z.boolean(),
})

// Trainer validation schema (canonical)
export const trainerSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string(),
  avatar: z.string().url().or(z.string().startsWith('/')), // URL or relative path
  bio: z.string().min(50, 'Bio must be at least 50 characters'),
  tagline: z.string().min(10, 'Tagline must be at least 10 characters'),
  
  // Specializations
  specialties: z.array(fitnessGoalSchema).min(1, 'Select at least one specialty'),
  trainingStyles: z.array(trainingStyleSchema).min(1),
  certifications: z.array(z.string()),
  yearsExperience: z.number().min(0).max(50),
  
  // Personality & approach
  personality: z.array(personalityTraitSchema),
  approachDescription: z.string(),
  
  // Pricing
  hourlyRate: z.number().min(0),
  sessionTypes: z.array(sessionTypeSchema),
  
  // Availability
  availability: z.array(timeSlotSchema),
  timezone: z.string(),
  
  // Stats & social proof
  rating: z.number().min(0).max(5),
  totalSessions: z.number().min(0),
  activeClients: z.number().min(0),
  successStories: z.number().min(0),
  
  // Experience level they work with
  experienceLevels: z.array(experienceLevelSchema),
  
  // Location
  location: z.object({
    city: z.string(),
    state: z.string(),
    country: z.string(),
    lat: z.number().optional(),
    lng: z.number().optional(),
  }),
  
  // Metadata
  verified: z.boolean(),
  featured: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const testimonialSchema = z.object({
  id: z.string(),
  clientName: z.string(),
  clientAvatar: z.string().optional(),
  rating: z.number().min(0).max(5),
  text: z.string(),
  date: z.coerce.date(),
  verified: z.boolean(),
})

export const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  year: z.number(),
  description: z.string().optional(),
})

export const achievementSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  icon: z.string().optional(),
})

export const trainerProfileSchema = trainerSchema.extend({
  gallery: z.array(z.string()),
  testimonials: z.array(testimonialSchema),
  education: z.array(educationSchema),
  achievements: z.array(achievementSchema),
})
