import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

/**
 * Custom hook for Intersection Observer
 * Useful for lazy loading, infinite scroll, animations on scroll, etc.
 * 
 * @example
 * const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 })
 * 
 * return (
 *   <div ref={ref}>
 *     {isVisible ? 'I am visible!' : 'Scroll to see me'}
 *   </div>
 * )
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<T>, boolean] {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
  } = options

  const elementRef = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    
    if (!element) return

    // If already visible and should freeze, don't observe
    if (freezeOnceVisible && isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting

        setIsVisible(isIntersecting)

        // If visible and should freeze, unobserve
        if (isIntersecting && freezeOnceVisible) {
          observer.unobserve(element)
        }
      },
      { threshold, root, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible, isVisible])

  return [elementRef, isVisible]
}
