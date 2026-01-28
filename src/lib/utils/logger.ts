/**
 * Centralized logging utility
 * In production, this would integrate with services like:
 * - Sentry for error tracking
 * - DataDog for application monitoring
 * - LogRocket for session replay
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogContext {
  [key: string]: unknown
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'
  private isTest = process.env.NODE_ENV === 'test'

  private shouldLog(level: LogLevel): boolean {
    if (this.isTest) return false
    if (this.isDevelopment) return true
    // In production, only log warnings and errors
    return level === 'warn' || level === 'error'
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString()
    const contextStr = context ? ` ${JSON.stringify(context)}` : ''
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`
  }

  debug(message: string, context?: LogContext): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message, context))
    }
  }

  info(message: string, context?: LogContext): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message, context))
    }
  }

  warn(message: string, context?: LogContext): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, context))
    }
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    if (this.shouldLog('error')) {
      const errorContext = {
        ...context,
        error: error instanceof Error ? {
          message: error.message,
          stack: error.stack,
          name: error.name,
        } : error,
      }
      console.error(this.formatMessage('error', message, errorContext))
      
      // In production, send to error tracking service
      if (!this.isDevelopment) {
        // TODO: Send to Sentry, DataDog, etc.
        // Example: Sentry.captureException(error, { tags: { message }, extra: context })
      }
    }
  }

  // Specialized methods for common scenarios
  apiError(endpoint: string, error: unknown, context?: LogContext): void {
    this.error(`API Error: ${endpoint}`, error, { ...context, endpoint })
  }

  componentError(component: string, error: Error, context?: LogContext): void {
    this.error(`Component Error: ${component}`, error, { ...context, component })
  }

  performanceWarning(operation: string, duration: number, threshold: number): void {
    if (duration > threshold) {
      this.warn(`Slow operation: ${operation}`, { duration, threshold })
    }
  }
}

// Export singleton instance
export const logger = new Logger()

// Export convenience functions
export const { debug, info, warn, error, apiError, componentError, performanceWarning } = logger
