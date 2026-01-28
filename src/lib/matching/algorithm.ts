import type { UserProfile, MatchResult, MatchBreakdown, MatchExplanation } from '@/types/matching'
import type { Trainer } from '@/types/trainer'
import { DEFAULT_WEIGHTS } from './weights'
import { profileCompleteness } from './utils'
import {
  calculateGoalAlignment,
  calculateStyleCompatibility,
  calculatePersonalityFit,
  calculateScheduleScore,
  calculateExperienceScore,
  calculateBudgetScore,
  applyBudgetConstraint,
  applyExperienceMismatch,
} from './scoring'

/**
 * Match trainers against user profile
 * @param userProfile - User's preferences and requirements
 * @param trainers - List of available trainers
 * @param weights - Optional custom weights for factors
 * @returns Sorted list of match results (best matches first)
 */
export function matchTrainers(
  userProfile: UserProfile,
  trainers: Trainer[],
  weights = DEFAULT_WEIGHTS
): MatchResult[] {
  const results: MatchResult[] = []
  
  // Calculate data completeness (0-100)
  const confidence = profileCompleteness(userProfile)
  
  for (const trainer of trainers) {
    // Calculate individual factor scores (returns MatchFactor objects)
    const goalAlignmentFactor = calculateGoalAlignment(
      userProfile.goals,
      trainer.specialties
    )
    const styleCompatibilityFactor = calculateStyleCompatibility(
      userProfile.preferredStyles,
      trainer.trainingStyles
    )
    const personalityFitFactor = calculatePersonalityFit(
      userProfile.personality || [],
      trainer.personality
    )
    const scheduleOverlapFactor = calculateScheduleScore(
      userProfile.availability,
      trainer.availability
    )
    const experienceMatchFactor = calculateExperienceScore(
      userProfile.experienceLevel,
      trainer.experienceLevels
    )
    const budgetFitFactor = calculateBudgetScore(
      userProfile.budgetRange,
      trainer.hourlyRate
    )
    
    // Extract scores (0-1)
    const goalAlignment = goalAlignmentFactor.score
    const styleCompatibility = styleCompatibilityFactor.score
    const personalityFit = personalityFitFactor.score
    const scheduleMatch = scheduleOverlapFactor.score
    const experienceLevel = experienceMatchFactor.score
    const budgetFit = budgetFitFactor.score
    
    // Calculate weighted overall score (0-1)
    let overallScore = 
      goalAlignment * weights.goalAlignment +
      styleCompatibility * weights.styleCompatibility +
      personalityFit * weights.personalityFit +
      scheduleMatch * weights.scheduleMatch +
      experienceLevel * weights.experienceLevel +
      budgetFit * weights.budgetFit
    
    // Apply constraints
    const passesConstraints = applyBudgetConstraint(
      userProfile.budgetRange,
      trainer.hourlyRate
    )
    
    // Apply experience mismatch penalty
    overallScore = applyExperienceMismatch(
      userProfile.experienceLevel,
      trainer.experienceLevels,
      overallScore
    )
    
    // Build simplified breakdown (0-1 scores)
    const breakdown: MatchBreakdown = {
      goalAlignment,
      styleCompatibility,
      personalityFit,
      scheduleMatch,
      experienceLevel,
      budgetFit,
    }
    
    // Generate explanation
    const explanation = generateExplanation(breakdown, overallScore, passesConstraints, trainer)
    
    results.push({
      trainer,
      overallScore, // 0-1 scale
      confidence, // User profile data completeness
      breakdown,
      explanation,
      passesConstraints,
    })
  }
  
  // Sort by overall score (descending)
  return results.sort((a, b) => b.overallScore - a.overallScore)
}

/**
 * Generate human-readable explanation
 * @param breakdown - Match factor breakdown
 * @param overallScore - Overall score (0-1)
 * @param passesConstraints - Whether hard constraints are met
 * @param trainer - The trainer being matched
 */
function generateExplanation(
  breakdown: MatchBreakdown,
  overallScore: number,
  passesConstraints: boolean,
  trainer: { name: string }
): MatchExplanation {
  // Sort factors by score to identify top performers
  const factors = [
    { name: 'Goal Alignment', score: breakdown.goalAlignment, key: 'goalAlignment' as const },
    { name: 'Style Compatibility', score: breakdown.styleCompatibility, key: 'styleCompatibility' as const },
    { name: 'Personality Fit', score: breakdown.personalityFit, key: 'personalityFit' as const },
    { name: 'Schedule Match', score: breakdown.scheduleMatch, key: 'scheduleMatch' as const },
    { name: 'Experience Level', score: breakdown.experienceLevel, key: 'experienceLevel' as const },
    { name: 'Budget Fit', score: breakdown.budgetFit, key: 'budgetFit' as const },
  ]
  
  factors.sort((a, b) => b.score - a.score)
  
  const topFactors = factors.slice(0, 3).map(f => ({ name: f.name, score: f.score }))
  
  // Generate summary based on score
  let summary: string
  const scorePercent = Math.round(overallScore * 100)
  
  if (!passesConstraints) {
    summary = 'This trainer exceeds your budget constraints by more than 50%.'
  } else if (scorePercent >= 80) {
    summary = 'Excellent match! This trainer aligns well with your goals, style, and schedule.'
  } else if (scorePercent >= 60) {
    summary = 'Good match. This trainer meets most of your requirements and preferences.'
  } else if (scorePercent >= 40) {
    summary = 'Moderate match. Consider this trainer if you\'re flexible on some preferences.'
  } else {
    summary = 'Lower match. This trainer may not align closely with your stated preferences.'
  }
  
  // Generate strengths based on top factors
  const strengths: string[] = []
  factors.forEach(factor => {
    if (factor.score >= 0.8) {
      switch (factor.key) {
        case 'goalAlignment':
          strengths.push(`${trainer.name}'s specialties align strongly with your fitness goals`)
          break
        case 'styleCompatibility':
          strengths.push('Training style is an excellent match for your preferences')
          break
        case 'personalityFit':
          strengths.push('Personality traits suggest great working chemistry')
          break
        case 'scheduleMatch':
          strengths.push('Strong schedule overlap for convenient booking')
          break
        case 'experienceLevel':
          strengths.push('Experience level matches your training background')
          break
        case 'budgetFit':
          strengths.push('Pricing fits comfortably within your budget')
          break
      }
    }
  })
  
  // Generate considerations for lower scores
  const considerations: string[] = []
  factors.forEach(factor => {
    if (factor.score < 0.5) {
      switch (factor.key) {
        case 'budgetFit':
          considerations.push('This trainer\'s rates are at the higher end of your budget')
          break
        case 'scheduleMatch':
          considerations.push('Limited availability overlap - may need flexible scheduling')
          break
      }
    }
  })
  
  return {
    summary,
    topFactors,
    strengths,
    considerations: considerations.length > 0 ? considerations : undefined,
  }
}
