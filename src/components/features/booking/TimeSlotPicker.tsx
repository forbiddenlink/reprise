'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, DollarSign } from 'lucide-react'
import { format } from 'date-fns'
import type { SessionType, Trainer } from '@/types/trainer'
import type { TimeSlot } from '@/types'

interface TimeSlotPickerProps {
  trainer: Trainer
  selectedDate: Date
  selectedSessionType: SessionType
  selectedTimeSlot: { startTime: string; endTime: string } | null
  onSelectTimeSlot: (slot: { startTime: string; endTime: string }) => void
}

export function TimeSlotPicker({
  trainer,
  selectedDate,
  selectedSessionType,
  selectedTimeSlot,
  onSelectTimeSlot,
}: TimeSlotPickerProps) {
  // Get available slots for the selected date
  const dayName = format(selectedDate, 'EEEE').toLowerCase()
  const availableSlots = trainer.availability.filter(slot => slot.day === dayName)

  // Generate specific time slots based on session duration
  const generateTimeSlots = (availability: TimeSlot[]): Array<{ startTime: string; endTime: string }> => {
    const slots: Array<{ startTime: string; endTime: string }> = []
    const duration = selectedSessionType.duration

    availability.forEach(slot => {
      const [startHour, startMinute] = slot.startTime.split(':').map(Number)
      const [endHour, endMinute] = slot.endTime.split(':').map(Number)

      let currentHour = startHour
      let currentMinute = startMinute

      while (true) {
        // Calculate end time
        let slotEndMinute = currentMinute + duration
        let slotEndHour = currentHour

        if (slotEndMinute >= 60) {
          slotEndHour += Math.floor(slotEndMinute / 60)
          slotEndMinute = slotEndMinute % 60
        }

        // Check if this slot fits within availability
        if (slotEndHour > endHour || (slotEndHour === endHour && slotEndMinute > endMinute)) {
          break
        }

        const startTimeStr = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`
        const endTimeStr = `${String(slotEndHour).padStart(2, '0')}:${String(slotEndMinute).padStart(2, '0')}`

        slots.push({ startTime: startTimeStr, endTime: endTimeStr })

        // Move to next slot (30-minute intervals)
        currentMinute += 30
        if (currentMinute >= 60) {
          currentHour += 1
          currentMinute = 0
        }
      }
    })

    return slots
  }

  const timeSlots = generateTimeSlots(availableSlots)

  // Format time for display (12-hour format)
  const formatTime = (time: string): string => {
    const [hour, minute] = time.split(':').map(Number)
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${String(minute).padStart(2, '0')} ${period}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Select a Time Slot</CardTitle>
        <CardDescription>
          Choose a time for your {selectedSessionType.name} session ({selectedSessionType.duration} min)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Session Type Summary */}
        <div className="p-4 bg-muted rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">{selectedSessionType.name}</span>
            <Badge variant="secondary">${selectedSessionType.price}</Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{selectedSessionType.duration} minutes</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>${selectedSessionType.price} per session</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{selectedSessionType.description}</p>
        </div>

        {/* Available Time Slots */}
        <div>
          <p className="text-sm font-medium mb-3">
            Available times on {format(selectedDate, 'EEEE, MMMM d')}:
          </p>
          {timeSlots.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {timeSlots.map((slot, idx) => {
                const isSelected = 
                  selectedTimeSlot?.startTime === slot.startTime && 
                  selectedTimeSlot?.endTime === slot.endTime

                return (
                  <Button
                    key={idx}
                    variant={isSelected ? 'default' : 'outline'}
                    onClick={() => onSelectTimeSlot(slot)}
                    className="h-auto py-3 flex flex-col gap-1"
                  >
                    <span className="font-semibold">{formatTime(slot.startTime)}</span>
                    <span className="text-xs opacity-80">to {formatTime(slot.endTime)}</span>
                  </Button>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No available slots for this date and session duration.
            </p>
          )}
        </div>

        {/* Timezone Note */}
        <p className="text-xs text-muted-foreground text-center pt-2 border-t">
          All times shown in {trainer.timezone}
        </p>
      </CardContent>
    </Card>
  )
}
