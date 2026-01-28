'use client'

import Link from 'next/link'
import type { MatchResult } from '@/types/matching'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Star, MapPin, Clock, DollarSign } from 'lucide-react'
import { TrainerAvatar } from '../trainers/TrainerAvatar'

interface MatchCardProps {
  match: MatchResult
  rank: number
}

export function MatchCard({ match, rank }: MatchCardProps) {
  const { trainer, overallScore, breakdown, explanation } = match

  const scorePercentage = Math.round(overallScore * 100)
  const isTopMatch = rank === 1

  return (
    <Card className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 group ${
      isTopMatch ? 'border-primary border-2 shadow-2xl' : 'border-2'
    }`}>
      {isTopMatch && (
        <div className="absolute top-0 right-0 bg-gradient-to-br from-primary to-terracotta text-white px-5 py-2.5 text-sm font-black rounded-bl-2xl shadow-xl">
          🏆 Top Match
        </div>
      )}
      
      {/* Rank badge */}
      <div className={`absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center font-black text-base shadow-xl z-10 ${
        isTopMatch 
          ? 'bg-gradient-to-br from-primary to-terracotta text-white' 
          : 'bg-muted text-muted-foreground'
      }`}>
        #{rank}
      </div>

      <CardHeader className="pb-4 pt-6">
        <div className="flex gap-4 items-start">
          {/* Trainer Avatar with ring */}
          <div className={`relative group-hover:scale-110 transition-transform duration-500 ${
            isTopMatch ? 'ring-4 ring-primary/30 rounded-full' : ''
          }`}>
            <TrainerAvatar 
              trainerId={trainer.id}
              trainerName={trainer.name}
              size="md"
            />
          </div>

          <div className="flex-1 min-w-0 mt-2">
            <CardTitle className="text-2xl font-heading font-black truncate group-hover:text-primary transition-colors">
              {trainer.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1 font-medium">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{trainer.location.city}, {trainer.location.state}</span>
            </CardDescription>
          </div>
        </div>

        {/* Match Score with gradient background */}
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-foreground">Match Score</span>
            <span className="text-3xl font-black text-primary">{scorePercentage}%</span>
          </div>
          <Progress value={scorePercentage} className="h-3" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Specialties */}
        <div>
          <p className="text-sm font-bold mb-2">Specialties</p>
          <div className="flex flex-wrap gap-2">
            {trainer.specialties.slice(0, 3).map((specialty) => (
              <Badge key={specialty} className="text-xs bg-primary text-white border-0">
                {specialty}
              </Badge>
            ))}
            {trainer.specialties.length > 3 && (
              <Badge variant="outline" className="text-xs font-bold border-2">
                +{trainer.specialties.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" />
            <span>{trainer.rating.toFixed(1)} ({trainer.totalSessions} sessions)</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>{trainer.yearsExperience}+ years</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <DollarSign className="w-4 h-4 text-primary" />
            <span>${trainer.hourlyRate}/session</span>
          </div>
        </div>

        {/* Match Breakdown */}
        <div className="space-y-3 pt-4 border-t">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            💡 Why This Match?
          </p>
          {explanation.topFactors.slice(0, 2).map((factor, idx) => (
            <div key={idx} className="text-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground font-medium">{factor.name}</span>
                <span className="font-bold text-primary">{Math.round(factor.score * 100)}%</span>
              </div>
              <Progress value={factor.score * 100} className="h-1.5" />
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex gap-3 pt-6">
        <Button asChild className="flex-1 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 h-12 font-bold">
          <Link href={`/trainers/${trainer.id}`}>
            View Profile
          </Link>
        </Button>
        <Button asChild variant="outline" className="flex-1 hover:bg-primary/5 transition-all duration-500 hover:scale-105 h-12 font-bold border-2">
          <Link href={`/book/${trainer.id}`}>
            Book Session →
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
