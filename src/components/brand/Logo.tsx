import { cn } from '@/lib/utils/cn'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
}

/**
 * RepRise Logo Component
 * Modern, minimal logo combining a rising arrow with fitness elements
 * Terracotta color scheme for warmth and energy
 */
export function Logo({ className, size = 'md', showText = true }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Icon Mark */}
      <svg
        viewBox="0 0 40 40"
        className={cn(sizeMap[size], 'flex-shrink-0')}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer ring - represents personal growth/fitness journey */}
        <circle 
          cx="20" 
          cy="20" 
          r="18" 
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
          opacity="0.3"
        />
        
        {/* Rising arrow - represents progress and elevation */}
        <path
          d="M20 28V12M20 12L14 18M20 12L26 18"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        />
        
        {/* Base line - represents foundation/starting point */}
        <line
          x1="12"
          y1="30"
          x2="28"
          y2="30"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-accent"
        />
      </svg>

      {/* Text Wordmark */}
      {showText && (
        <span className="font-heading font-bold text-primary tracking-tight">
          RepRise
        </span>
      )}
    </div>
  )
}

/**
 * Icon-only version for favicons and small spaces
 */
export function LogoIcon({ className, size = 'md' }: Omit<LogoProps, 'showText'>) {
  return <Logo className={className} size={size} showText={false} />
}
