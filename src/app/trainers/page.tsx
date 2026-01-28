import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, DollarSign, Search, SlidersHorizontal } from 'lucide-react'
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
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-background border-b">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <Badge className="mb-8 px-5 py-2.5 text-sm font-semibold shadow-lg bg-primary text-white border-0">
              <Search className="w-4 h-4 mr-2" />
              {trainers.length} Expert Trainers
            </Badge>
            <h1 className="font-heading text-5xl md:text-7xl font-black mb-8 leading-tight">
              Browse All
              <span className="block mt-2 bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
                Trainers
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
              Explore our network of certified fitness professionals. Or take the quiz for personalized matches.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button asChild size="lg" className="group relative text-lg h-16 px-12 shadow-2xl hover:shadow-primary/50 transition-all duration-300 overflow-hidden">
                <Link href="/match/quiz" className="relative z-10">
                  <span className="relative z-10">Get Matched with Quiz</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-terracotta opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg h-16 px-12 border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:scale-105">
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
      <section id="trainers" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 animate-fade-in">
            <h2 className="font-heading text-5xl font-black mb-4">
              All <span className="bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">Trainers</span>
            </h2>
            <p className="text-xl text-muted-foreground font-medium">
              Click any trainer to view their full profile and availability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer, index) => (
              <Card 
                key={trainer.id}
                className="overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-primary/50 hover:-translate-y-3 group animate-fade-in border-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex gap-4 items-start">
                    {/* Trainer Avatar */}
                    <div className="group-hover:scale-110 transition-transform duration-500">
                      <TrainerAvatar 
                        trainerId={trainer.id}
                        trainerName={trainer.name}
                        size="lg"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-2xl font-heading font-black mb-1 group-hover:text-primary transition-colors">
                        {trainer.name}
                      </CardTitle>
                      {trainer.verified && (
                        <Badge className="mb-2 text-xs bg-green-500 text-white border-0 font-bold">
                          ✓ Verified
                        </Badge>
                      )}
                      <CardDescription className="flex items-center gap-1 text-sm font-medium">
                        <MapPin className="w-4 h-4" />
                        {trainer.location.city}, {trainer.location.state}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="font-semibold text-sm">{trainer.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({trainer.totalSessions} sessions)
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {trainer.bio}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2">
                    {trainer.specialties.slice(0, 3).map((specialty) => (
                      <Badge key={specialty} className="text-xs bg-primary text-white border-0">
                        {specialty}
                      </Badge>
                    ))}
                    {trainer.specialties.length > 3 && (
                      <Badge variant="outline" className="text-xs font-bold border-2">
                        +{trainer.specialties.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">
                      ${trainer.hourlyRate}/hr
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Button asChild variant="outline" className="flex-1 h-12 font-bold border-2 hover:scale-105 transition-all duration-500">
                    <Link href={`/trainers/${trainer.id}`}>
                      View Profile
                    </Link>
                  </Button>
                  <Button asChild className="flex-1 h-12 font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500">
                    <Link href={`/book/${trainer.id}`}>
                      Book Now →
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 bg-gradient-to-br from-muted/30 via-background to-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-5xl md:text-7xl font-black mb-6">
            Not Sure Where to <span className="bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">Start?</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
            Take our quick quiz to get personalized trainer recommendations based on your goals and preferences.
          </p>
          <Button asChild size="lg" className="text-lg h-16 px-12 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all font-bold">
            <Link href="/match/quiz">
              Take the Matching Quiz →
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
