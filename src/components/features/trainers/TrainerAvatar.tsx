'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils/cn'
import { getTrainerImage } from '@/config/images'

interface TrainerAvatarProps {
  /**
   * Trainer ID to determine which image to load
   */
  trainerId: string
  /**
   * Trainer name for alt text (accessibility)
   */
  trainerName: string
  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Priority loading for LCP optimization
   * @default false
   */
  priority?: boolean
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-32 h-32',
  xl: 'w-40 h-40'
}

/**
 * Optimized trainer avatar component with Next.js Image
 * Uses real Pexels photos with automatic optimization
 */
export function TrainerAvatar({ 
  trainerId, 
  trainerName, 
  size = 'md',
  className,
  priority = false
}: TrainerAvatarProps) {
  const imageSrc = getTrainerImage(trainerId)

  return (
    <div className={cn(
      'relative rounded-full overflow-hidden flex-shrink-0 border-4 border-background shadow-lg',
      sizeClasses[size],
      className
    )}>
      <Image
        src={imageSrc}
        alt={`${trainerName} - Personal Trainer`}
        fill
        sizes={`${sizeClasses[size]}`}
        className="object-cover"
        priority={priority}
      />
    </div>
  )
}
