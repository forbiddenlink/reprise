// Shared utility types
export type ID = string

export interface TimeSlot {
  day: string // 'monday' | 'tuesday' etc
  startTime: string // 'HH:MM' format (zero-padded)
  endTime: string // 'HH:MM' format (zero-padded)
}

export interface BudgetRange {
  min: number
  max: number
}

export interface DateRange {
  start: Date
  end: Date
}

// Quiz-related types
export type FitnessGoal =
  | 'weight-loss'
  | 'muscle-gain'
  | 'endurance'
  | 'flexibility'
  | 'general-fitness'
  | 'rehabilitation'

export type TrainingStyle =
  | 'high-intensity'
  | 'steady-state'
  | 'functional'
  | 'sport-specific'
  | 'mindful'
  | 'strength-focused'

export type PersonalityTrait =
  | 'motivating'
  | 'analytical'
  | 'empathetic'
  | 'disciplined'
  | 'flexible'
  | 'energetic'

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'athlete'

// Age ranges for matching
export type AgeRange = '18-25' | '26-35' | '36-45' | '46-55' | '56-65' | '65+'
