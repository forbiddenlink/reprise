'use client'

import { useEffect, useState } from 'react'
import { useQuizStore } from '@/stores/use-quiz-store'
import { matchTrainers } from '@/lib/matching/algorithm'
import { transformQuizAnswersToProfile } from '@/lib/matching/transform'
import type { MatchResult } from '@/types/matching'
import type { Trainer } from '@/types/trainer'
import trainersData from '@/mocks/data/trainers.json'
import { MatchResults } from '@/components/features/matching/MatchResults'
import { Skeleton } from '@/components/ui/skeleton'

export default function MatchResultsPage() {
  const { answers } = useQuizStore()
  const [matches, setMatches] = useState<MatchResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Transform quiz answers to UserProfile
    const userProfile = transformQuizAnswersToProfile(answers)
    
    // Run matching algorithm
    const results = matchTrainers(userProfile, trainersData as unknown as Trainer[])
    
    setMatches(results)
    setLoading(false)
  }, [answers])

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-6 w-96" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-96 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <MatchResults matches={matches} />
}
