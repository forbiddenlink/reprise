import type { MatchWeights } from '@/types/matching'

// Default weights (must sum to 1.0)
export const DEFAULT_WEIGHTS: MatchWeights = {
  goalAlignment: 0.25,
  styleCompatibility: 0.20,
  personalityFit: 0.15,
  scheduleMatch: 0.20,
  experienceLevel: 0.10,
  budgetFit: 0.10,
}

// Validate weights sum to 1.0
export function normalizeWeights(weights: Partial<MatchWeights>): MatchWeights {
  const merged = { ...DEFAULT_WEIGHTS, ...weights }
  const sum = Object.values(merged).reduce((a, b) => a + b, 0)
  
  if (Math.abs(sum - 1.0) < 0.001) {
    return merged
  }
  
  // Normalize if sum !== 1.0
  return {
    goalAlignment: merged.goalAlignment / sum,
    styleCompatibility: merged.styleCompatibility / sum,
    personalityFit: merged.personalityFit / sum,
    scheduleMatch: merged.scheduleMatch / sum,
    experienceLevel: merged.experienceLevel / sum,
    budgetFit: merged.budgetFit / sum,
  }
}
