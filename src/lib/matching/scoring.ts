import type { UserProfile } from '@/types/matching'
import type { Trainer } from '@/types/trainer'
import type { MatchFactor } from '@/types/matching'
import {
  jaccardSimilarity,
  calculateScheduleOverlap,
  experienceLevelMatch,
  calculateBudgetFit,
} from './utils'

// Calculate goal alignment score (0-1)
export function calculateGoalAlignment(
  userGoals: string[],
  trainerSpecialties: string[]
): MatchFactor {
  const score = userGoals.length > 0 
    ? jaccardSimilarity(userGoals, trainerSpecialties)
    : 1.0 // Neutral if no goals specified
  
  return {
    score,
    weight: 0, // Filled by algorithm
    contributionScore: 0, // Filled by algorithm
    details: `${Math.round(score * 100)}% alignment between your fitness goals and trainer specialties`,
  }
}

// Calculate training style compatibility (0-1)
export function calculateStyleCompatibility(
  userStyles: string[],
  trainerStyles: string[]
): MatchFactor {
  const score = userStyles.length > 0
    ? jaccardSimilarity(userStyles, trainerStyles)
    : 1.0 // Neutral if no styles specified
  
  return {
    score,
    weight: 0,
    contributionScore: 0,
    details: `${Math.round(score * 100)}% match in preferred training approaches`,
  }
}

// Calculate personality fit (0-1)
export function calculatePersonalityFit(
  userTraits: string[],
  trainerTraits: string[]
): MatchFactor {
  const score = userTraits.length > 0
    ? jaccardSimilarity(userTraits, trainerTraits)
    : 1.0 // Neutral if not answered
  
  return {
    score,
    weight: 0,
    contributionScore: 0,
    details: `${Math.round(score * 100)}% personality compatibility`,
  }
}

// Calculate schedule overlap (0-1)
export function calculateScheduleScore(
  userAvailability: Array<{ day: string; startTime: string; endTime: string }>,
  trainerAvailability: Array<{ day: string; startTime: string; endTime: string }>
): MatchFactor {
  const score = calculateScheduleOverlap(userAvailability, trainerAvailability)
  
  return {
    score,
    weight: 0,
    contributionScore: 0,
    details: `${Math.round(score * 100)}% of your availability matches trainer's schedule`,
  }
}

// Calculate experience match (0-1)
export function calculateExperienceScore(
  userLevel: string,
  trainerLevels: string[]
): MatchFactor {
  const score = experienceLevelMatch(userLevel, trainerLevels)
  
  return {
    score,
    weight: 0,
    contributionScore: 0,
    details: trainerLevels.includes(userLevel)
      ? 'Trainer works with your experience level'
      : 'Trainer can adapt to your experience level',
  }
}

// Calculate budget fit (0-1)
export function calculateBudgetScore(
  userBudget: { min: number; max: number },
  trainerRate: number
): MatchFactor {
  const score = calculateBudgetFit(userBudget, trainerRate)
  
  let details: string
  if (trainerRate <= userBudget.max) {
    details = `Trainer's rate ($${trainerRate}/hr) is within your budget`
  } else {
    const overAmount = trainerRate - userBudget.max
    details = `Trainer's rate ($${trainerRate}/hr) is $${overAmount} above your max budget`
  }
  
  return {
    score,
    weight: 0,
    contributionScore: 0,
    details,
  }
}

// Apply budget constraint (deal-breaker logic)
export function applyBudgetConstraint(
  userBudget: { min: number; max: number },
  trainerRate: number
): boolean {
  // Hard reject if trainer is >50% over max budget
  const overBudgetPercent = (trainerRate - userBudget.max) / userBudget.max
  return overBudgetPercent <= 0.5
}

// Apply experience mismatch penalty
export function applyExperienceMismatch(
  userLevel: string,
  trainerLevels: string[],
  currentScore: number
): number {
  if (!trainerLevels.includes(userLevel)) {
    return currentScore * 0.9 // 10% penalty for experience mismatch
  }
  return currentScore
}
