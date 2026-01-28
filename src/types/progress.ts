import type { ID, FitnessGoal } from './index'

// Progress tracking
export interface ProgressData {
  userId: ID
  
  // Metrics over time
  weight: MetricHistory[]
  bodyFat: MetricHistory[]
  muscleMass: MetricHistory[]
  strength: StrengthMetrics
  endurance: EnduranceMetrics
  flexibility: FlexibilityMetrics
  
  // Goals & milestones
  goals: Goal[]
  milestones: Milestone[]
  
  // Streaks & consistency
  streak: StreakData
  consistency: ConsistencyData
  
  // Metadata
  startDate: Date
  lastUpdated: Date
}

export interface MetricHistory {
  date: Date
  value: number
  unit: string
  note?: string
}

export interface StrengthMetrics {
  benchPress: MetricHistory[]
  squat: MetricHistory[]
  deadlift: MetricHistory[]
  overheadPress: MetricHistory[]
  pullUps: MetricHistory[]
  // Add more exercises as needed
}

export interface EnduranceMetrics {
  vo2Max: MetricHistory[]
  restingHeartRate: MetricHistory[]
  mile5KTime: MetricHistory[]
  plankDuration: MetricHistory[]
}

export interface FlexibilityMetrics {
  sitAndReach: MetricHistory[]
  shoulderFlexibility: MetricHistory[]
  hipFlexibility: MetricHistory[]
}

// Goal tracking
export interface Goal {
  id: ID
  type: FitnessGoal
  title: string
  description: string
  targetValue: number
  currentValue: number
  unit: string
  targetDate: Date
  progress: number // 0-100
  status: 'active' | 'completed' | 'abandoned'
  createdAt: Date
  completedAt?: Date
}

export interface Milestone {
  id: ID
  title: string
  description: string
  achievedAt: Date
  icon: string
  category: 'strength' | 'endurance' | 'consistency' | 'weight' | 'other'
}

// Streak tracking
export interface StreakData {
  current: number // days
  longest: number // days
  total: number // total workouts
  lastWorkout: Date
}

// Consistency metrics
export interface ConsistencyData {
  weeklyAverage: number // sessions per week
  monthlyAverage: number // sessions per month
  completionRate: number // 0-100
  consistencyScore: number // 0-100
}

// Progress visualization data
export interface ProgressChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
  }[]
}

// 3D visualization data
export interface Progress3DData {
  strength: number // 0-100
  endurance: number // 0-100
  flexibility: number // 0-100
  consistency: number // 0-100
  nutrition: number // 0-100
  recovery: number // 0-100
}
