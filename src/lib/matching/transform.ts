import type { UserProfile } from '@/types/matching'
import type { FitnessGoal, TrainingStyle, PersonalityTrait, ExperienceLevel, BudgetRange, TimeSlot } from '@/types'

interface QuizAnswers {
  goals?: string | string[]
  experience?: string
  'training-style'?: string | string[]
  schedule?: string | string[]
  budget?: string
  personality?: string | string[]
}

/**
 * Transform quiz answers into UserProfile
 * Handles all parsing, validation, and default values
 */
export function transformQuizAnswersToProfile(answers: QuizAnswers): UserProfile {
  return {
    goals: parseGoals(answers.goals),
    preferredStyles: parseTrainingStyles(answers['training-style']),
    experienceLevel: parseExperience(answers.experience),
    personality: parsePersonality(answers.personality),
    availability: parseSchedule(answers.schedule),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    budgetRange: parseBudgetRange(answers.budget),
    virtualOnly: false,
    inPersonOnly: false,
    completeness: calculateCompleteness(answers),
  }
}

/**
 * Parse fitness goals from quiz answer
 */
function parseGoals(value?: string | string[]): FitnessGoal[] {
  const goals = Array.isArray(value) ? value : value ? [value] : []
  return goals.filter(isValidGoal)
}

function isValidGoal(value: string): value is FitnessGoal {
  return [
    'weight-loss',
    'muscle-gain',
    'endurance',
    'flexibility',
    'general-fitness',
    'rehabilitation',
  ].includes(value)
}

/**
 * Parse training styles from quiz answer
 */
function parseTrainingStyles(value?: string | string[]): TrainingStyle[] {
  const styles = Array.isArray(value) ? value : value ? [value] : []
  return styles.filter(isValidStyle)
}

function isValidStyle(value: string): value is TrainingStyle {
  return [
    'high-intensity',
    'steady-state',
    'functional',
    'sport-specific',
    'mindful',
    'strength-focused',
  ].includes(value)
}

/**
 * Parse experience level from quiz answer
 */
function parseExperience(value?: string): ExperienceLevel {
  if (value && isValidExperience(value)) {
    return value
  }
  return 'beginner' // Default
}

function isValidExperience(value: string): value is ExperienceLevel {
  return ['beginner', 'intermediate', 'advanced', 'athlete'].includes(value)
}

/**
 * Parse personality traits from quiz answer
 */
function parsePersonality(value?: string | string[]): PersonalityTrait[] {
  const traits = Array.isArray(value) ? value : value ? [value] : []
  return traits.filter(isValidPersonality)
}

function isValidPersonality(value: string): value is PersonalityTrait {
  return [
    'motivating',
    'analytical',
    'empathetic',
    'disciplined',
    'flexible',
    'energetic',
  ].includes(value)
}

/**
 * Parse budget range from quiz answer (e.g., "50-75" or "125+")
 */
export function parseBudgetRange(value?: string): BudgetRange {
  if (!value) return { min: 50, max: 100 }

  // Handle "125+" format
  if (value.includes('+')) {
    const min = parseInt(value.replace('+', ''), 10)
    return { min: Number.isFinite(min) ? min : 125, max: 999 }
  }

  // Handle "50-75" format
  const [minStr, maxStr] = value.split('-')
  const min = parseInt(minStr, 10)
  const max = parseInt(maxStr, 10)

  return {
    min: Number.isFinite(min) ? min : 50,
    max: Number.isFinite(max) ? max : 100,
  }
}

/**
 * Parse schedule availability from quiz answer
 * Maps quiz buckets to TimeSlot[] deterministically
 */
export function parseSchedule(value?: string | string[]): TimeSlot[] {
  const selected = Array.isArray(value) ? value : value ? [value] : []
  const slots: TimeSlot[] = []

  const addWeekdays = (start: string, end: string) => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    for (const day of days) {
      slots.push({ day, startTime: start, endTime: end })
    }
  }

  const addWeekends = (start: string, end: string) => {
    const days = ['saturday', 'sunday']
    for (const day of days) {
      slots.push({ day, startTime: start, endTime: end })
    }
  }

  for (const option of selected) {
    switch (option) {
      case 'weekday-morning':
        addWeekdays('06:00', '10:00')
        break
      case 'weekday-afternoon':
        addWeekdays('12:00', '17:00')
        break
      case 'weekday-evening':
        addWeekdays('17:00', '21:00')
        break
      case 'weekend-morning':
        addWeekends('08:00', '12:00')
        break
      case 'weekend-afternoon':
        addWeekends('12:00', '17:00')
        break
    }
  }

  // If no schedule selected, default to flexible (all times)
  if (slots.length === 0) {
    addWeekdays('06:00', '21:00')
    addWeekends('08:00', '17:00')
  }

  return slots
}

/**
 * Calculate profile completeness (0-100)
 * Based on number of questions answered
 */
function calculateCompleteness(answers: QuizAnswers): number {
  let answeredCount = 0
  const totalQuestions = 6

  if (answers.goals && (Array.isArray(answers.goals) ? answers.goals.length > 0 : true)) answeredCount++
  if (answers.experience) answeredCount++
  if (answers['training-style'] && (Array.isArray(answers['training-style']) ? answers['training-style'].length > 0 : true)) answeredCount++
  if (answers.schedule && (Array.isArray(answers.schedule) ? answers.schedule.length > 0 : true)) answeredCount++
  if (answers.budget) answeredCount++
  if (answers.personality && (Array.isArray(answers.personality) ? answers.personality.length > 0 : true)) answeredCount++

  return Math.round((answeredCount / totalQuestions) * 100)
}
