'use client'

import { useState } from 'react'
import type { MatchResult } from '@/types/matching'
import { MatchCard } from '@/components/features/matching/MatchCard'
import { MatchRadarChart } from '@/components/features/matching/MatchRadarChart'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DEFAULT_WEIGHTS } from '@/lib/matching/weights'
import type { MatchWeights } from '@/types/matching'

interface MatchResultsProps {
  matches: MatchResult[]
}

export function MatchResults({ matches: initialMatches }: MatchResultsProps) {
  const [matches, setMatches] = useState(initialMatches)
  const [weights, setWeights] = useState<MatchWeights>(DEFAULT_WEIGHTS)
  const [showWeightControls, setShowWeightControls] = useState(false)

  const handleWeightChange = (factor: keyof MatchWeights, value: number[]) => {
    const newWeights = { ...weights, [factor]: value[0] / 100 }
    
    // Normalize weights to sum to 1.0
    const sum = Object.values(newWeights).reduce((a, b) => a + b, 0)
    const entries = Object.entries(newWeights).map(([k, v]) => [k, v / sum])
    const normalized = Object.fromEntries(entries) as unknown as MatchWeights
    
    setWeights(normalized)
    
    // Recalculate scores with new weights
    const recalculatedMatches = matches.map(match => {
      const newScore = 
        match.breakdown.goalAlignment * normalized.goalAlignment +
        match.breakdown.styleCompatibility * normalized.styleCompatibility +
        match.breakdown.personalityFit * normalized.personalityFit +
        match.breakdown.scheduleMatch * normalized.scheduleMatch +
        match.breakdown.experienceLevel * normalized.experienceLevel +
        match.breakdown.budgetFit * normalized.budgetFit
      
      return { ...match, overallScore: newScore }
    })
    
    // Re-sort by new scores
    recalculatedMatches.sort((a, b) => b.overallScore - a.overallScore)
    setMatches(recalculatedMatches)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <Badge className="mb-6 px-5 py-2.5 bg-primary text-white border-0 shadow-lg" variant="outline">
            <span className="animate-pulse">✨</span> Personalized Matches
          </Badge>
          <h1 className="font-heading text-6xl md:text-8xl font-black text-foreground mb-8 leading-tight">
            Your <span className="bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">Perfect Matches</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
            We found <span className="font-black text-primary">{matches.length}</span> trainer{matches.length !== 1 ? 's' : ''} who align with your goals,
            style, and preferences. 
          </p>
        </div>

        {/* Weight Controls Toggle */}
        <div className="flex justify-center mb-12 animate-fade-in delay-200">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowWeightControls(!showWeightControls)}
            className="shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 h-14 px-8 text-base font-bold border-2"
          >
            {showWeightControls ? '✓ Hide' : '⚙️ Customize'} Matching Priorities
          </Button>
        </div>

        {/* Weight Controls */}
        {showWeightControls && (
          <Card className="mb-12 animate-fade-in border-2 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-black">Adjust Matching Priorities</CardTitle>
              <CardDescription className="text-base font-medium">
                Fine-tune how we prioritize different factors in your matches.
                Scores will update automatically.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {(Object.keys(weights) as Array<keyof MatchWeights>).map((factor) => (
                <div key={factor} className="space-y-3 p-5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300 border-2 border-transparent hover:border-primary/20">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold capitalize">
                      {factor.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <span className="text-xl font-black text-primary">
                      {Math.round(weights[factor] * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[weights[factor] * 100]}
                    onValueChange={(value) => handleWeightChange(factor, value)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Top Match Radar Chart */}
        {matches.length > 0 && (
          <div className="mb-16 animate-fade-in delay-300">
            <MatchRadarChart match={matches[0]} />
          </div>
        )}

        {/* Match Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((match, index) => (
            <div 
              key={match.trainer.id}
              className="animate-fade-in"
              style={{ animationDelay: `${(index + 4) * 100}ms` }}
            >
              <MatchCard match={match} rank={index + 1} />
            </div>
          ))}
        </div>

        {/* No Matches State */}
        {matches.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No trainers match your criteria. Try adjusting your preferences.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
