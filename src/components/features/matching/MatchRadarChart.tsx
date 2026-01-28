'use client'

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import type { MatchResult } from '@/types/matching'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface MatchRadarChartProps {
  match: MatchResult
}

export function MatchRadarChart({ match }: MatchRadarChartProps) {
  const { trainer, breakdown } = match

  // Transform breakdown into radar chart data format
  const data = [
    {
      factor: 'Goals',
      score: Math.round(breakdown.goalAlignment * 100),
      fullMark: 100,
    },
    {
      factor: 'Style',
      score: Math.round(breakdown.styleCompatibility * 100),
      fullMark: 100,
    },
    {
      factor: 'Personality',
      score: Math.round(breakdown.personalityFit * 100),
      fullMark: 100,
    },
    {
      factor: 'Schedule',
      score: Math.round(breakdown.scheduleMatch * 100),
      fullMark: 100,
    },
    {
      factor: 'Experience',
      score: Math.round(breakdown.experienceLevel * 100),
      fullMark: 100,
    },
    {
      factor: 'Budget',
      score: Math.round(breakdown.budgetFit * 100),
      fullMark: 100,
    },
  ]

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-heading">Match Analysis: {trainer.name}</CardTitle>
        <CardDescription>
          Visual breakdown of how this trainer aligns with your preferences across key factors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis 
              dataKey="factor" 
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 14 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Radar
              name={trainer.name}
              dataKey="score"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>

        {/* Factor Breakdown Details */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((item) => (
            <div key={item.factor} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{item.factor}</span>
                <span className="text-sm text-muted-foreground">{item.score}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Explanation Text */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Why this match works:</span>{' '}
            {match.explanation.summary}
          </p>
          {match.explanation.strengths.length > 0 && (
            <ul className="mt-3 space-y-1">
              {match.explanation.strengths.map((strength, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  {strength}
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
