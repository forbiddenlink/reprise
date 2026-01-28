import type { ID, FitnessGoal, TrainingStyle, PersonalityTrait, TimeSlot, BudgetRange, ExperienceLevel } from './index'
import type { Trainer } from './trainer'

// User profile from quiz answers (canonical shape - single source of truth)
export interface UserProfile {
  // Goals & preferences
  goals: FitnessGoal[]
  preferredStyles: TrainingStyle[]
  experienceLevel: ExperienceLevel
  
  // Personality matching
  personality: PersonalityTrait[] // Optional - may be empty array
  
  // Scheduling
  availability: TimeSlot[] // At root level (not nested)
  timezone: string
  
  // Budget
  budgetRange: BudgetRange // {min, max} shape - NOT budget: number
  
  // Additional constraints
  virtualOnly: boolean
  inPersonOnly: boolean
  
  // Optional demographics
  age?: number
  gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say'
  
  // Metadata
  completeness: number // 0-100 data completeness score
}

// Match result from algorithm
export interface MatchResult {
  trainer: Trainer
  overallScore: number // 0-1 overall match score (0-100 when displayed)
  confidence: number // 0-100 confidence in match (data completeness)
  breakdown: MatchBreakdown
  explanation: MatchExplanation
  passesConstraints: boolean // True if all hard constraints met
}

// Explanation breakdown for UI
export interface MatchExplanation {
  summary: string // Overall summary text
  topFactors: Array<{ name: string; score: number }> // Top contributing factors
  strengths: string[] // Key strengths
  considerations?: string[] // Things to consider
}

// Detailed factor scores
export interface MatchBreakdown {
  goalAlignment: number // 0-1 score
  styleCompatibility: number // 0-1 score
  personalityFit: number // 0-1 score
  scheduleMatch: number // 0-1 score (renamed from scheduleOverlap)
  experienceLevel: number // 0-1 score (renamed from experienceMatch)
  budgetFit: number // 0-1 score
}

export interface MatchFactor {
  score: number // 0-1 (converted to 0-100 for display)
  weight: number // 0-1 
  contributionScore: number // score * weight
  details: string // Human-readable explanation
}

// Match weights configuration
export interface MatchWeights {
  goalAlignment: number
  styleCompatibility: number
  personalityFit: number
  scheduleMatch: number // renamed from scheduleOverlap
  experienceLevel: number // renamed from experienceMatch
  budgetFit: number
}

// Explainability for UI display
export interface ExplanationBreakdown {
  factor: string
  score: number // 0-100
  weight: number // 0-100
  contribution: number // 0-100
  details: string
}

// Match constraints (deal-breakers)
export interface MatchConstraints {
  budgetHardLimit: boolean // Reject if >50% over max budget
  scheduleRequired: boolean // Reject if no overlap
  experienceMismatch: boolean // Penalty if wrong experience level
  virtualRequired: boolean
  inPersonRequired: boolean
}

// Quiz answer types (for form handling)
export interface QuizAnswers {
  // Step 1: Goals
  goals: FitnessGoal[]
  preferredStyles: TrainingStyle[]
  
  // Step 2: Experience
  experienceLevel: ExperienceLevel
  injuries?: string
  
  // Step 3: Schedule
  daysPerWeek: number
  preferredTime: 'morning' | 'afternoon' | 'evening' | 'flexible'
  availability: TimeSlot[]
  
  // Step 4: Budget
  budgetMin: number
  budgetMax: number
  
  // Step 5: Preferences (optional)
  personality?: PersonalityTrait[]
  virtualOnly: boolean
  inPersonOnly: boolean
  age?: number
  gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say'
}
