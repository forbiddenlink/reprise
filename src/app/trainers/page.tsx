import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, DollarSign, SlidersHorizontal } from 'lucide-react'
import { TrainerAvatar } from '@/components/features/trainers/TrainerAvatar'
import trainersData from '@/mocks/data/trainers.json'
import type { Trainer } from '@/types/trainer'

export const metadata: Metadata = {
  title: 'Browse Trainers - RepRise',
  description: 'Browse our network of certified personal trainers. Filter by specialty, location, and price.',
  openGraph: {
    title: 'Browse All Trainers - RepRise',
    description: 'Find certified personal trainers in your area',
  },
}

// Cast imported data to proper type
const trainers = trainersData as unknown as Trainer[]

export default function TrainersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-20 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-medium text-primary mb-3">
              {trainers.length} Expert Trainers
            </p>
            <h1 className="font-heading text-h1 mb-4">
              Browse All Trainers
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our network of certified fitness professionals, or take the quiz for personalized matches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href="/match/quiz">
                  Get Matched with Quiz
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link href="#trainers">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Browse & Filter
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trainers Grid */}
      <section id="trainers" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="font-heading text-h2 mb-2">
              All Trainers
            </h2>
            <p className="text-muted-foreground">
              Click any trainer to view their full profile and availability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.map((trainer) => (
              <Card key={trainer.id}>
                <CardHeader className="pb-3">
                  <div className="flex gap-3 items-start">
                    <TrainerAvatar 
                      trainerId={trainer.id}
                      trainerName={trainer.name}
                      size="lg"
                    />
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg mb-1">
                        {trainer.name}
                      </CardTitle>
                      {trainer.verified && (
                        <Badge className="text-xs bg-green-600 text-white border-0 mb-1">
                          ✓ Verified
                        </Badge>
                      )}
                      <CardDescription className="flex items-center gap-1 text-sm">
                        <MapPin className="w-3 h-3" />
                        {trainer.location.city}, {trainer.location.state}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-medium text-sm">{trainer.rating.toFixed(1)}</span>
                    <span className="text-xs text-muted-foreground">
                      ({trainer.totalSessions} sessions)
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {trainer.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {trainer.specialties.slice(0, 3).map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {trainer.specialties.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{trainer.specialties.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-sm">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">${trainer.hourlyRate}/hr</span>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2 pt-0">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href={`/trainers/${trainer.id}`}>
                      View Profile
                    </Link>
                  </Button>
                  <Button asChild className="flex-1">
                    <Link href={`/book/${trainer.id}`}>
                      Book Now
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-h2 mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Take our quick quiz to get personalized trainer recommendations based on your goals.
          </p>
          <Button asChild size="lg" className="h-12 px-8">
            <Link href="/match/quiz">
              Take the Matching Quiz
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
