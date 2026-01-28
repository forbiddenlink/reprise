import { useState, useEffect } from 'react'

/**
 * Custom hook to track media query matches
 * Useful for responsive behavior in components
 * 
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    // Set initial value
    setMatches(media.matches)

    // Create listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener('change', listener)
      return () => media.removeEventListener('change', listener)
    } 
    // Legacy browsers
    else {
      media.addListener(listener)
      return () => media.removeListener(listener)
    }
  }, [query])

  return matches
}
