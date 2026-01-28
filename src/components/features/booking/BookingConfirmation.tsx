'use client'

import { format } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock, DollarSign, MapPin, Video, User } from 'lucide-react'
import type { Trainer, SessionType } from '@/types/trainer'

interface BookingConfirmationProps {
  trainer: Trainer
  sessionType: SessionType
  date: Date
  timeSlot: { startTime: string; endTime: string }
}

export function BookingConfirmation({
  trainer,
  sessionType,
  date,
  timeSlot,
}: BookingConfirmationProps) {
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
        <CardTitle className="font-heading">Confirm Your Booking</CardTitle>
        <CardDescription>
          Review the details below before completing your booking
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Trainer Info */}
        <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{trainer.name}</h3>
            <p className="text-sm text-muted-foreground">{trainer.tagline}</p>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{trainer.location.city}, {trainer.location.state}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Session Details */}
        <div className="space-y-4">
          <h3 className="font-semibold">Session Details</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">{sessionType.name}</p>
                <p className="text-sm text-muted-foreground">{sessionType.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{format(date, 'EEEE, MMMM d, yyyy')}</p>
                <p className="text-sm text-muted-foreground">
                  {formatTime(timeSlot.startTime)} - {formatTime(timeSlot.endTime)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{sessionType.duration} minutes</p>
                <p className="text-sm text-muted-foreground">Training session</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {sessionType.isVirtual ? (
                <Video className="w-5 h-5 text-muted-foreground" />
              ) : (
                <MapPin className="w-5 h-5 text-muted-foreground" />
              )}
              <div>
                <p className="font-medium">
                  {sessionType.isVirtual && sessionType.isInPerson
                    ? 'Virtual or In-Person'
                    : sessionType.isVirtual
                    ? 'Virtual Session'
                    : 'In-Person Session'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {sessionType.isVirtual
                    ? 'Meeting link will be sent via email'
                    : `Location: ${trainer.location.city}, ${trainer.location.state}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Pricing */}
        <div className="space-y-3">
          <h3 className="font-semibold">Pricing</h3>
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Session Fee</span>
              <span className="font-semibold">${sessionType.price}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Platform Fee</span>
              <span className="font-semibold">$0</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-primary">${sessionType.price}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Cancellation Policy */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">Cancellation Policy</h3>
          <p className="text-sm text-muted-foreground">
            Free cancellation up to 24 hours before your session. Cancellations within 24 hours
            will result in a 50% charge. No-shows will be charged the full session fee.
          </p>
        </div>

        {/* Important Note */}
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-sm">
            <span className="font-semibold">Note:</span> You&apos;ll receive a confirmation email with
            all the details and a calendar invite after completing this booking.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
