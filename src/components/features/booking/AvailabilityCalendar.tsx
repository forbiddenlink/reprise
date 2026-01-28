'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Trainer } from '@/types/trainer'
import type { TimeSlot } from '@/types'
import { format, isSameDay, addDays, startOfToday } from 'date-fns'

interface AvailabilityCalendarProps {
  trainer: Trainer
  selectedDate: Date | null
  onSelectDate: (date: Date) => void
}

export function AvailabilityCalendar({ trainer, selectedDate, onSelectDate }: AvailabilityCalendarProps) {
  const [month, setMonth] = useState<Date>(selectedDate || new Date())
  const today = startOfToday()

  // Helper to check if trainer has availability on a given date
  const hasAvailability = (date: Date): boolean => {
    const dayName = format(date, 'EEEE').toLowerCase()
    return trainer.availability.some(slot => slot.day === dayName)
  }

  // Get available slots for selected date
  const getAvailableSlotsForDate = (date: Date): TimeSlot[] => {
    const dayName = format(date, 'EEEE').toLowerCase()
    return trainer.availability.filter(slot => slot.day === dayName)
  }

  const selectedDateSlots = selectedDate ? getAvailableSlotsForDate(selectedDate) : []

  // Custom day content to show availability indicators
  const modifiers = {
    available: (date: Date) => {
      // Only show as available if date is today or future
      if (date < today) return false
      return hasAvailability(date)
    },
    unavailable: (date: Date) => {
      if (date < today) return true
      return !hasAvailability(date)
    },
  }

  const modifiersClassNames = {
    available: 'bg-primary/10 text-primary font-semibold hover:bg-primary/20',
    unavailable: 'text-muted-foreground opacity-50 line-through',
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Select a Date</CardTitle>
        <CardDescription>
          Choose from {trainer.name}&apos;s available days
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Calendar */}
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate || undefined}
            onSelect={(date) => date && onSelectDate(date)}
            month={month}
            onMonthChange={setMonth}
            disabled={(date) => date < today || !hasAvailability(date)}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            className="rounded-md border"
          />
        </div>

        {/* Legend */}
        <div className="flex gap-4 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary/10 border border-primary/20" />
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-muted" />
            <span className="text-muted-foreground">Unavailable</span>
          </div>
        </div>

        {/* Selected Date Info */}
        {selectedDate && selectedDateSlots.length > 0 && (
          <div className="pt-4 border-t space-y-3">
            <div>
              <p className="text-sm font-medium mb-2">
                Available times on {format(selectedDate, 'EEEE, MMMM d')}:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedDateSlots.map((slot, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {slot.startTime} - {slot.endTime}
                  </Badge>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Timezone: {trainer.timezone}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
