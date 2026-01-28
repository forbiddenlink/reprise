'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Star, MapPin, Clock, Award, Calendar, Users, TrendingUp, MessageCircle } from 'lucide-react'
import type { Trainer } from '@/types/trainer'
import { format } from 'date-fns'
import { TrainerAvatar } from './TrainerAvatar'

interface TrainerProfileProps {
  trainer: Trainer
}

export function TrainerProfile({ trainer }: TrainerProfileProps) {
  // Group availability by day for display
  const availabilityByDay = trainer.availability.reduce((acc, slot) => {
    if (!acc[slot.day]) {
      acc[slot.day] = []
    }
    acc[slot.day].push(`${slot.startTime}-${slot.endTime}`)
    return acc
  }, {} as Record<string, string[]>)

  const daysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const sortedDays = Object.keys(availabilityByDay).sort(
    (a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b)
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/5 to-background border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Trainer Avatar */}
            <TrainerAvatar 
              trainerId={trainer.id}
              trainerName={trainer.name}
              size="xl"
              priority={true}
            />

            {/* Header Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="font-heading text-4xl font-bold mb-2">{trainer.name}</h1>
                  <p className="text-xl text-muted-foreground mb-4">{trainer.tagline}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-primary text-primary" />
                      <span className="font-semibold">{trainer.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground">({trainer.totalSessions} sessions)</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{trainer.location.city}, {trainer.location.state}</span>
                    </div>
                  </div>
                </div>
                {trainer.verified && (
                  <Badge variant="default" className="gap-1">
                    <Award className="w-3 h-3" />
                    Verified
                  </Badge>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 mt-6">
                <Button asChild size="lg">
                  <Link href={`/book/${trainer.id}`}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Session
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="md:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">About {trainer.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{trainer.bio}</p>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Training Approach</h3>
                  <p className="text-muted-foreground">{trainer.approachDescription}</p>
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trainer.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="capitalize">
                      {specialty.replace(/-/g, ' ')}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Training Styles */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Training Styles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trainer.trainingStyles.map((style) => (
                    <Badge key={style} variant="outline" className="capitalize">
                      {style.replace(/-/g, ' ')}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Certifications & Credentials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {trainer.certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Experience</span>
                  </div>
                  <span className="font-semibold">{trainer.yearsExperience}+ years</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Active Clients</span>
                  </div>
                  <span className="font-semibold">{trainer.activeClients}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Success Stories</span>
                  </div>
                  <span className="font-semibold">{trainer.successStories}</span>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Session Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trainer.sessionTypes.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{session.name}</p>
                      <p className="text-xs text-muted-foreground">{session.duration} min</p>
                    </div>
                    <span className="font-bold text-primary">${session.price}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Availability</CardTitle>
                <CardDescription className="text-xs">{trainer.timezone}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sortedDays.map((day) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="capitalize font-medium">{day}</span>
                      <span className="text-muted-foreground text-xs">
                        {availabilityByDay[day].join(', ')}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience Levels */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Works With</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trainer.experienceLevels.map((level) => (
                    <Badge key={level} variant="secondary" className="capitalize">
                      {level}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
