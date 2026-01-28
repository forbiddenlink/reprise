'use client'

import { useParams } from 'next/navigation'
import { BookingFlow } from '@/components/features/booking/BookingFlow'
import trainersData from '@/mocks/data/trainers.json'
import type { Trainer } from '@/types/trainer'

export default function BookingPage() {
  const params = useParams()
  const trainerId = params.trainerId as string

  // Find trainer by ID
  const trainer = (trainersData as unknown as Trainer[]).find(t => t.id === trainerId)

  if (!trainer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Trainer Not Found</h1>
          <p className="text-muted-foreground">
            The trainer you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
        </div>
      </div>
    )
  }

  return <BookingFlow trainer={trainer} />
}
