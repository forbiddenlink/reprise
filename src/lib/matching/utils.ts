// Jaccard similarity for set comparison (0-1 scale)
export function jaccardSimilarity<T>(set1: T[], set2: T[]): number {
  if (set1.length === 0 && set2.length === 0) return 1.0
  if (set1.length === 0 || set2.length === 0) return 0.0

  const s1 = new Set(set1)
  const s2 = new Set(set2)
  
  const intersection = new Set([...s1].filter(x => s2.has(x)))
  const union = new Set([...s1, ...s2])
  
  return intersection.size / union.size
}

// Schedule overlap calculation
export function calculateScheduleOverlap(
  userSlots: Array<{ day: string; startTime: string; endTime: string }>,
  trainerSlots: Array<{ day: string; startTime: string; endTime: string }>
): number {
  if (userSlots.length === 0 || trainerSlots.length === 0) return 0
  
  let overlapCount = 0
  
  for (const userSlot of userSlots) {
    for (const trainerSlot of trainerSlots) {
      if (userSlot.day === trainerSlot.day) {
        // Check if time ranges overlap
        if (timeSlotsOverlap(
          userSlot.startTime,
          userSlot.endTime,
          trainerSlot.startTime,
          trainerSlot.endTime
        )) {
          overlapCount++
        }
      }
    }
  }
  
  // Normalize by user slots (what percentage of user's availability is covered)
  return overlapCount / userSlots.length
}

function timeSlotsOverlap(
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean {
  // Convert HH:MM to minutes since midnight for comparison
  const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }
  
  const s1 = toMinutes(start1)
  const e1 = toMinutes(end1)
  const s2 = toMinutes(start2)
  const e2 = toMinutes(end2)
  
  // Overlap exists if: start1 < end2 AND end1 > start2
  return s1 < e2 && e1 > s2
}

// Experience level match
export function experienceLevelMatch(
  userLevel: string,
  trainerLevels: string[]
): number {
  return trainerLevels.includes(userLevel) ? 1.0 : 0.5
}

// Budget fit calculation
export function calculateBudgetFit(
  userBudget: { min: number; max: number },
  trainerRate: number
): number {
  // Perfect fit: trainer rate is within budget
  if (trainerRate >= userBudget.min && trainerRate <= userBudget.max) {
    return 1.0
  }
  
  // Trainer is cheaper than min budget (still good!)
  if (trainerRate < userBudget.min) {
    return 1.0
  }
  
  // Trainer is over budget - calculate penalty
  const overBudgetAmount = trainerRate - userBudget.max
  const overBudgetPercent = overBudgetAmount / userBudget.max
  
  // >50% over budget is a deal-breaker (handled in constraints)
  // Scale penalty: 0-50% over budget = 0.5-1.0 score
  if (overBudgetPercent <= 0.5) {
    return 1.0 - (overBudgetPercent * 0.5)
  }
  
  return 0 // >50% over budget
}

// Calculate profile completeness (0-100)
export function profileCompleteness(profile: {
  goals?: unknown[]
  preferredStyles?: unknown[]
  experienceLevel?: unknown
  personality?: unknown[]
  availability?: unknown[]
  budgetRange?: unknown
}): number {
  let score = 0
  let total = 6
  
  if (profile.goals && Array.isArray(profile.goals) && profile.goals.length > 0) score++
  if (profile.preferredStyles && Array.isArray(profile.preferredStyles) && profile.preferredStyles.length > 0) score++
  if (profile.experienceLevel) score++
  if (profile.personality && Array.isArray(profile.personality) && profile.personality.length > 0) score++
  if (profile.availability && Array.isArray(profile.availability) && profile.availability.length > 0) score++
  if (profile.budgetRange) score++
  
  return (score / total) * 100
}
