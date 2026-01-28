import { matchTrainers } from '@/lib/matching/algorithm'
import type { UserProfile, MatchWeights } from '@/types/matching'
import type { Trainer } from '@/types/trainer'

describe('matchTrainers', () => {
  const mockTrainer: Trainer = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-1234',
    avatar: '/avatars/john.jpg',
    bio: 'Experienced trainer with 10+ years in strength training',
    tagline: 'Build strength, build confidence',
    specialties: ['muscle-gain', 'general-fitness'],
    trainingStyles: ['high-intensity', 'strength-focused'],
    certifications: ['NASM-CPT', 'CSCS'],
    yearsExperience: 10,
    personality: ['energetic', 'disciplined'],
    approachDescription: 'I believe in pushing limits while maintaining proper form',
    hourlyRate: 80,
    sessionTypes: [
      {
        id: '1',
        name: 'In-Person Training',
        duration: 60,
        price: 80,
        description: 'One-on-one training at our facility',
        isVirtual: false,
        isInPerson: true,
      },
    ],
    availability: [
      { day: 'monday', startTime: '06:00', endTime: '12:00' },
      { day: 'monday', startTime: '13:00', endTime: '18:00' },
      { day: 'tuesday', startTime: '06:00', endTime: '12:00' },
      { day: 'tuesday', startTime: '13:00', endTime: '18:00' },
      { day: 'wednesday', startTime: '06:00', endTime: '12:00' },
      { day: 'wednesday', startTime: '13:00', endTime: '18:00' },
    ],
    timezone: 'America/New_York',
    rating: 4.8,
    totalSessions: 500,
    activeClients: 15,
    successStories: 25,
    experienceLevels: ['beginner', 'intermediate', 'advanced'],
    location: {
      city: 'New York',
      state: 'NY',
      country: 'USA',
    },
    verified: true,
    featured: false,
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2024-01-01'),
  }

  const mockUserProfile: UserProfile = {
    goals: ['muscle-gain', 'general-fitness'],
    preferredStyles: ['high-intensity', 'strength-focused'],
    experienceLevel: 'intermediate',
    personality: ['energetic', 'disciplined'],
    availability: [
      { day: 'monday', startTime: '06:00', endTime: '09:00' },
      { day: 'tuesday', startTime: '06:00', endTime: '09:00' },
      { day: 'wednesday', startTime: '06:00', endTime: '09:00' },
      { day: 'thursday', startTime: '06:00', endTime: '09:00' },
      { day: 'friday', startTime: '06:00', endTime: '09:00' },
    ],
    timezone: 'America/New_York',
    budgetRange: { min: 60, max: 100 },
    virtualOnly: false,
    inPersonOnly: false,
    completeness: 90,
  }

  const defaultWeights: MatchWeights = {
    goalAlignment: 0.25,
    styleCompatibility: 0.20,
    personalityFit: 0.15,
    scheduleMatch: 0.20,
    experienceLevel: 0.10,
    budgetFit: 0.10,
  }

  it('returns an array of match results', () => {
    const results = matchTrainers(mockUserProfile, [mockTrainer], defaultWeights)
    
    expect(Array.isArray(results)).toBe(true)
    expect(results).toHaveLength(1)
  })

  it('calculates match scores between 0 and 1', () => {
    const results = matchTrainers(mockUserProfile, [mockTrainer], defaultWeights)
    
    expect(results[0].overallScore).toBeGreaterThanOrEqual(0)
    expect(results[0].overallScore).toBeLessThanOrEqual(1)
  })

  it('sorts trainers by match score', () => {
    const goodMatch: Trainer = { ...mockTrainer, id: '1' }
    const poorMatch: Trainer = {
      ...mockTrainer,
      id: '2',
      specialties: ['flexibility', 'rehabilitation'],
      trainingStyles: ['mindful', 'steady-state'],
    }
    
    const results = matchTrainers(mockUserProfile, [poorMatch, goodMatch], defaultWeights)
    
    // Results should be sorted with best match first
    expect(results[0].trainer.id).toBe('1')
    expect(results[0].overallScore).toBeGreaterThan(results[1].overallScore)
  })

  it('includes trainer reference in result', () => {
    const results = matchTrainers(mockUserProfile, [mockTrainer], defaultWeights)
    
    expect(results[0].trainer.id).toBe(mockTrainer.id)
    expect(results[0].trainer.name).toBe(mockTrainer.name)
  })

  it('handles empty trainer list', () => {
    const results = matchTrainers(mockUserProfile, [], defaultWeights)
    
    expect(results).toHaveLength(0)
  })
})
