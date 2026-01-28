/**
 * Image URLs from Pexels - Free to use, no attribution required
 * All images are optimized and served via Pexels CDN
 */

export const TRAINER_IMAGES = {
  // Male trainers
  t1: 'https://images.pexels.com/photos/733500/pexels-photo-733500.jpeg?auto=compress&cs=tinysrgb&w=800',
  t2: 'https://images.pexels.com/photos/3912953/pexels-photo-3912953.jpeg?auto=compress&cs=tinysrgb&w=800',
  t3: 'https://images.pexels.com/photos/3912944/pexels-photo-3912944.jpeg?auto=compress&cs=tinysrgb&w=800',
  t4: 'https://images.pexels.com/photos/1144864/pexels-photo-1144864.jpeg?auto=compress&cs=tinysrgb&w=800',
  t5: 'https://images.pexels.com/photos/3912516/pexels-photo-3912516.jpeg?auto=compress&cs=tinysrgb&w=800',
  
  // Female trainers
  t6: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=800',
  t7: 'https://images.pexels.com/photos/136409/pexels-photo-136409.jpeg?auto=compress&cs=tinysrgb&w=800',
  t8: 'https://images.pexels.com/photos/3757374/pexels-photo-3757374.jpeg?auto=compress&cs=tinysrgb&w=800',
  t9: 'https://images.pexels.com/photos/3757645/pexels-photo-3757645.jpeg?auto=compress&cs=tinysrgb&w=800',
  t10: 'https://images.pexels.com/photos/3757947/pexels-photo-3757947.jpeg?auto=compress&cs=tinysrgb&w=800',
} as const

export const HERO_IMAGES = {
  main: 'https://images.pexels.com/photos/1199607/pexels-photo-1199607.jpeg?auto=compress&cs=tinysrgb&w=1920',
  gym: 'https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg?auto=compress&cs=tinysrgb&w=1920',
  outdoor: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=1920',
} as const

export const SESSION_IMAGES = {
  yoga: 'https://images.pexels.com/photos/3822668/pexels-photo-3822668.jpeg?auto=compress&cs=tinysrgb&w=800',
  strength: 'https://images.pexels.com/photos/2204196/pexels-photo-2204196.jpeg?auto=compress&cs=tinysrgb&w=800',
  cardio: 'https://images.pexels.com/photos/28080/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
  boxing: 'https://images.pexels.com/photos/1544774/pexels-photo-1544774.jpeg?auto=compress&cs=tinysrgb&w=800',
  stretching: 'https://images.pexels.com/photos/4057112/pexels-photo-4057112.jpeg?auto=compress&cs=tinysrgb&w=800',
  training: 'https://images.pexels.com/photos/4662336/pexels-photo-4662336.jpeg?auto=compress&cs=tinysrgb&w=800',
  weightlifting: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800',
  pushups: 'https://images.pexels.com/photos/4162491/pexels-photo-4162491.jpeg?auto=compress&cs=tinysrgb&w=800',
} as const

export const CATEGORY_IMAGES = {
  weightLoss: 'https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&cs=tinysrgb&w=600',
  muscleGain: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600',
  flexibility: 'https://images.pexels.com/photos/3822668/pexels-photo-3822668.jpeg?auto=compress&cs=tinysrgb&w=600',
  endurance: 'https://images.pexels.com/photos/2204196/pexels-photo-2204196.jpeg?auto=compress&cs=tinysrgb&w=600',
} as const

/**
 * Get trainer image URL by ID
 */
export function getTrainerImage(trainerId: string): string {
  return TRAINER_IMAGES[trainerId as keyof typeof TRAINER_IMAGES] || TRAINER_IMAGES.t1
}

/**
 * Get hero image URL by type
 */
export function getHeroImage(type: keyof typeof HERO_IMAGES = 'main'): string {
  return HERO_IMAGES[type]
}

/**
 * Get session type image URL
 */
export function getSessionImage(sessionType: keyof typeof SESSION_IMAGES): string {
  return SESSION_IMAGES[sessionType] || SESSION_IMAGES.training
}

/**
 * Get category image URL
 */
export function getCategoryImage(category: keyof typeof CATEGORY_IMAGES): string {
  return CATEGORY_IMAGES[category]
}
