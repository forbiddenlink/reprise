/**
 * Performance monitoring and optimization utilities
 */

import { logger } from './logger'

/**
 * Measure and log the performance of an async function
 */
export async function measurePerformance<T>(
  name: string,
  fn: () => Promise<T>,
  warnThreshold: number = 1000
): Promise<T> {
  const startTime = performance.now()
  
  try {
    const result = await fn()
    const duration = performance.now() - startTime
    
    if (duration > warnThreshold) {
      logger.performanceWarning(name, duration, warnThreshold)
    } else {
      logger.debug(`${name} completed`, { duration: `${duration.toFixed(2)}ms` })
    }
    
    return result
  } catch (error) {
    const duration = performance.now() - startTime
    logger.error(`${name} failed after ${duration.toFixed(2)}ms`, error)
    throw error
  }
}

/**
 * Debounce function - useful for search inputs, window resize, etc.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function - useful for scroll events, mousemove, etc.
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Memoize expensive computations
 */
export function memoize<T extends (...args: unknown[]) => unknown>(
  fn: T
): T {
  const cache = new Map<string, ReturnType<T>>()
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args)
    
    if (cache.has(key)) {
      return cache.get(key)
    }
    
    const result = fn(...args) as ReturnType<T>
    cache.set(key, result)
    return result
  }) as T
}

/**
 * Track component render performance (for use in useEffect)
 */
export function trackRenderTime(componentName: string, threshold: number = 100): () => void {
  const renderTime = performance.now()
  
  return () => {
    const duration = performance.now() - renderTime
    
    if (duration > threshold) {
      logger.performanceWarning(
        `${componentName} render`,
        duration,
        threshold
      )
    }
  }
}

/**
 * Lazy load a component with better error handling
 */
export function lazyLoadWithRetry<T extends React.ComponentType<unknown>>(
  importFunc: () => Promise<{ default: T }>,
  componentName: string,
  retries: number = 3
): Promise<{ default: T }> {
  return new Promise((resolve, reject) => {
    const attemptLoad = (retriesLeft: number) => {
      importFunc()
        .then(resolve)
        .catch((error) => {
          if (retriesLeft <= 0) {
            logger.error(`Failed to load component: ${componentName}`, error)
            reject(error)
          } else {
            logger.warn(`Retrying component load: ${componentName}`, {
              retriesLeft,
            })
            setTimeout(() => attemptLoad(retriesLeft - 1), 1000)
          }
        })
    }
    
    attemptLoad(retries)
  })
}

/**
 * Check if code is running on client side
 */
export const isClient = typeof window !== 'undefined'

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (!isClient) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Check connection quality
 */
export function getConnectionQuality(): 'slow' | 'medium' | 'fast' {
  if (!isClient) return 'fast'
  
  const connection = (navigator as Navigator & {
    connection?: {
      effectiveType?: string
    }
  }).connection
  
  if (!connection) return 'fast'
  
  const effectiveType = connection.effectiveType
  
  if (effectiveType === 'slow-2g' || effectiveType === '2g') return 'slow'
  if (effectiveType === '3g') return 'medium'
  return 'fast'
}
