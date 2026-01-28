import { NextRequest } from 'next/server'
import { matchTrainers } from '@/lib/matching/algorithm'
import { userProfileSchema } from '@/lib/validations/quiz'
import trainersData from '@/mocks/data/trainers.json'
import type { Trainer } from '@/types/trainer'
import type { UserProfile } from '@/types/matching'
import { successResponse, errorResponse, validationErrorResponse, logError, getErrorMessage } from '@/lib/utils/api-response'
import { ZodError } from 'zod'

// POST /api/matching - Run matching algorithm
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const validation = userProfileSchema.safeParse(body)
    if (!validation.success) {
      return validationErrorResponse(validation.error)
    }

    const userProfile: UserProfile = validation.data

    // Optional: Parse custom weights if provided
    const customWeights = body.weights || undefined

    // Validate custom weights if provided
    if (customWeights) {
      const totalWeight = Object.values(customWeights as Record<string, number>).reduce((a, b) => a + b, 0)
      if (Math.abs(totalWeight - 1.0) > 0.01) {
        return errorResponse(
          'Custom weights must sum to 1.0',
          400,
          'INVALID_WEIGHTS'
        )
      }
    }

    // Run matching algorithm
    const trainers = trainersData as unknown as Trainer[]
    
    if (trainers.length === 0) {
      return errorResponse('No trainers available', 404, 'NO_TRAINERS')
    }

    const matches = matchTrainers(userProfile, trainers, customWeights)

    return successResponse({
      matches,
      count: matches.length,
      userProfile: {
        completeness: userProfile.completeness,
        goals: userProfile.goals,
        experienceLevel: userProfile.experienceLevel,
      },
    }, 200)
  } catch (error) {
    logError('POST /api/matching', error)
    
    if (error instanceof ZodError) {
      return validationErrorResponse(error)
    }
    
    return errorResponse(
      'Failed to generate matches',
      500,
      'INTERNAL_ERROR',
      process.env.NODE_ENV === 'development' ? getErrorMessage(error) : undefined
    )
  }
}
