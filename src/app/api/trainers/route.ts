import { NextRequest } from 'next/server'
import trainersData from '@/mocks/data/trainers.json'
import type { Trainer } from '@/types/trainer'
import type { FitnessGoal, TrainingStyle, ExperienceLevel } from '@/types'
import { successResponse, errorResponse, logError, getErrorMessage } from '@/lib/utils/api-response'

// GET /api/trainers - List all trainers with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parse query parameters
    const specialty = searchParams.get('specialty') as FitnessGoal | null
    const style = searchParams.get('style') as TrainingStyle | null
    const experienceLevel = searchParams.get('experienceLevel') as ExperienceLevel | null
    const minRating = searchParams.get('minRating') ? parseFloat(searchParams.get('minRating')!) : null
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : null
    const location = searchParams.get('location')
    const verified = searchParams.get('verified') === 'true'

    // Validate numeric inputs
    if (minRating !== null && (isNaN(minRating) || minRating < 0 || minRating > 5)) {
      return errorResponse('Invalid minRating parameter. Must be between 0 and 5', 400, 'INVALID_PARAMETER')
    }

    if (maxPrice !== null && (isNaN(maxPrice) || maxPrice < 0)) {
      return errorResponse('Invalid maxPrice parameter. Must be a positive number', 400, 'INVALID_PARAMETER')
    }

    // Start with all trainers
    let trainers = trainersData as unknown as Trainer[]

    // Apply filters
    if (specialty) {
      trainers = trainers.filter(t => t.specialties.includes(specialty))
    }

    if (style) {
      trainers = trainers.filter(t => t.trainingStyles.includes(style))
    }

    if (experienceLevel) {
      trainers = trainers.filter(t => t.experienceLevels.includes(experienceLevel))
    }

    if (minRating !== null) {
      trainers = trainers.filter(t => t.rating >= minRating)
    }

    if (maxPrice !== null) {
      trainers = trainers.filter(t => t.hourlyRate <= maxPrice)
    }

    if (location) {
      const locationLower = location.toLowerCase()
      trainers = trainers.filter(t => 
        t.location.city.toLowerCase().includes(locationLower) ||
        t.location.state.toLowerCase().includes(locationLower)
      )
    }

    if (verified) {
      trainers = trainers.filter(t => t.verified === true)
    }

    return successResponse({
      trainers,
      count: trainers.length,
      filters: {
        specialty,
        style,
        experienceLevel,
        minRating,
        maxPrice,
        location,
        verified,
      },
    })
  } catch (error) {
    logError('GET /api/trainers', error)
    return errorResponse(
      'Failed to fetch trainers',
      500,
      'INTERNAL_ERROR',
      process.env.NODE_ENV === 'development' ? getErrorMessage(error) : undefined
    )
  }
}
