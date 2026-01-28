/**
 * Type-safe API client for making requests to backend
 */

import type { ApiResponse } from '@/lib/utils/api-response'

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

interface RequestOptions extends RequestInit {
  timeout?: number
}

/**
 * Make a type-safe API request
 */
async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { timeout = 10000, ...fetchOptions } = options

  // Create abort controller for timeout
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(endpoint, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    })

    clearTimeout(timeoutId)

    // Parse response
    const data: ApiResponse<T> = await response.json()

    // Handle error responses
    if (!response.ok || !data.success) {
      throw new ApiError(
        data.error?.message || 'Request failed',
        response.status,
        data.error?.code,
        data.error?.details
      )
    }

    return data.data as T
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof ApiError) {
      throw error
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408, 'TIMEOUT')
      }
      throw new ApiError(error.message, 0, 'NETWORK_ERROR')
    }

    throw new ApiError('Unknown error occurred', 0, 'UNKNOWN_ERROR')
  }
}

/**
 * API client with common methods
 */
export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
}

/**
 * Typed API endpoints
 */
export const api = {
  trainers: {
    list: (filters?: {
      specialty?: string
      style?: string
      experienceLevel?: string
      minRating?: number
      maxPrice?: number
      location?: string
      verified?: boolean
    }) => {
      const params = new URLSearchParams()
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, String(value))
          }
        })
      }
      return apiClient.get<{
        trainers: unknown[]
        count: number
        filters: typeof filters
      }>(`/api/trainers?${params.toString()}`)
    },
  },

  matching: {
    match: (userProfile: Record<string, unknown>, weights?: unknown) => {
      const body = weights ? { ...userProfile, weights } : userProfile
      return apiClient.post<{
        matches: unknown[]
        count: number
        userProfile: unknown
      }>('/api/matching', body)
    },
  },

  bookings: {
    create: (bookingData: {
      trainerId: string
      sessionTypeId: string
      date: string
      timeSlot: { startTime: string; endTime: string }
      userInfo: {
        name: string
        email: string
        phone?: string
        notes?: string
      }
    }) =>
      apiClient.post<{
        booking: {
          id: string
          trainerId: string
          trainerName: string
          sessionType: string
          duration: number
          price: number
          date: string
          timeSlot: { startTime: string; endTime: string }
          status: string
          createdAt: string
          confirmationNumber: string
        }
        message: string
      }>('/api/bookings', bookingData),
  },
}
