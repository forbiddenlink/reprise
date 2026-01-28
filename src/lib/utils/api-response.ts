import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

/**
 * Standardized API response utilities
 */

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string
    details?: unknown
  }
  meta?: {
    timestamp: string
    requestId?: string
  }
}

/**
 * Create a successful API response
 */
export function successResponse<T>(
  data: T,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
      },
    },
    { status }
  )
}

/**
 * Create an error API response
 */
export function errorResponse(
  message: string,
  status: number = 500,
  code?: string,
  details?: unknown
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code,
        details,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    },
    { status }
  )
}

/**
 * Handle validation errors from Zod
 */
export function validationErrorResponse(error: ZodError): NextResponse<ApiResponse> {
  return errorResponse(
    'Validation failed',
    400,
    'VALIDATION_ERROR',
    error.errors.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }))
  )
}

/**
 * Log error safely (won't log in production console, uses proper logging)
 */
export function logError(context: string, error: unknown): void {
  // In production, you'd send this to a logging service like Sentry, DataDog, etc.
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context}]`, error)
  } else {
    // TODO: Send to error tracking service
    // Example: Sentry.captureException(error, { tags: { context } })
  }
}

/**
 * Safe error message extraction
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'An unexpected error occurred'
}
