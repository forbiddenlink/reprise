import type { ID, FitnessGoal, TrainingStyle, PersonalityTrait, TimeSlot, ExperienceLevel } from './index'

// Canonical Trainer type - single source of truth
export interface Trainer {
  id: ID
  name: string
  email: string
  phone: string
  avatar: string // URL or path to image
  bio: string
  tagline: string
  
  // Specializations
  specialties: FitnessGoal[]
  trainingStyles: TrainingStyle[]
  certifications: string[]
  yearsExperience: number
  
  // Personality & approach
  personality: PersonalityTrait[]
  approachDescription: string
  
  // Pricing
  hourlyRate: number // Base rate in USD
  sessionTypes: SessionType[]
  
  // Availability
  availability: TimeSlot[]
  timezone: string // IANA timezone (e.g., 'America/New_York')
  
  // Stats & social proof
  rating: number // 0-5
  totalSessions: number
  activeClients: number
  successStories: number
  
  // Experience level they work with
  experienceLevels: ExperienceLevel[]
  
  // Location
  location: {
    city: string
    state: string
    country: string
    lat?: number
    lng?: number
  }
  
  // Metadata
  verified: boolean
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface SessionType {
  id: ID
  name: string
  duration: 30 | 45 | 60 | 90 // minutes
  price: number
  description: string
  isVirtual: boolean
  isInPerson: boolean
}

export interface TrainerProfile extends Trainer {
  // Extended profile info (for detail page)
  gallery: string[] // Additional images
  testimonials: Testimonial[]
  education: Education[]
  achievements: Achievement[]
}

export interface Testimonial {
  id: ID
  clientName: string
  clientAvatar?: string
  rating: number
  text: string
  date: Date
  verified: boolean
}

export interface Education {
  institution: string
  degree: string
  year: number
  description?: string
}

export interface Achievement {
  title: string
  description: string
  date: Date
  icon?: string
}
