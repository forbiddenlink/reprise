'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { TrainerProfile } from '@/components/features/trainers/TrainerProfile'
import { Button } from '@/components/ui/button'
import trainersData from '@/mocks/data/trainers.json'
import type { Trainer } from '@/types/trainer'

export default function TrainerProfilePage() {
  const params = useParams()
  const trainerId = params.trainerId as string

  // Find trainer by ID
  const trainer = (trainersData as unknown as Trainer[]).find(t => t.id === trainerId)

  if (!trainer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Trainer Not Found</h1>
          <p className="text-muted-foreground">
            The trainer you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/match/quiz">Find Your Perfect Trainer</Link>
          </Button>
        </div>
      </div>
    )
  }

  return <TrainerProfile trainer={trainer} />
}
