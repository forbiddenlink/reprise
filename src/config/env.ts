import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_APP_NAME: z.string().default('RepRise'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
})

// Safely parse environment variables with defaults
const parseEnv = () => {
  try {
    return envSchema.parse({
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'RepRise',
      NODE_ENV: process.env.NODE_ENV || 'development',
    })
  } catch (error) {
    console.error('❌ Invalid environment variables:', error)
    throw new Error('Invalid environment configuration. Please check your .env file.')
  }
}

export const env = parseEnv()

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>
