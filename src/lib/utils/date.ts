import { format, parseISO, addDays, startOfWeek, endOfWeek, isSameDay, isPast, isToday } from 'date-fns'

export function formatDate(date: Date | string, formatStr: string = 'PPP'): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, formatStr)
}

export function formatTime(date: Date | string): string {
  return formatDate(date, 'p')
}

export function formatDateTime(date: Date | string): string {
  return formatDate(date, 'PPp')
}

export function isDatePast(date: Date): boolean {
  return isPast(date) && !isToday(date)
}

export function isDateToday(date: Date): boolean {
  return isToday(date)
}

export function areDatesEqual(date1: Date, date2: Date): boolean {
  return isSameDay(date1, date2)
}

export function getWeekDays(date: Date = new Date()): Date[] {
  const start = startOfWeek(date, { weekStartsOn: 1 }) // Monday
  return Array.from({ length: 7 }, (_, i) => addDays(start, i))
}

export function daysUntil(futureDate: Date): number {
  const now = new Date()
  const diff = futureDate.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function getDayName(date: Date): string {
  return format(date, 'EEEE').toLowerCase()
}

export function parseTimeString(timeStr: string): { hours: number; minutes: number } {
  const [hours, minutes] = timeStr.split(':').map(Number)
  return { hours, minutes }
}

export function createDateFromTime(date: Date, timeStr: string): Date {
  const { hours, minutes } = parseTimeString(timeStr)
  const newDate = new Date(date)
  newDate.setHours(hours, minutes, 0, 0)
  return newDate
}
