# API Examples

This document provides practical examples of using the RepRise API endpoints.

## Table of Contents
1. [Authentication](#authentication)
2. [Trainers API](#trainers-api)
3. [Matching API](#matching-api)
4. [Bookings API](#bookings-api)
5. [Error Handling](#error-handling)
6. [Using the API Client](#using-the-api-client)

---

## Authentication

> **Note**: Authentication is not yet implemented. When added, all requests will require authentication tokens.

---

## Trainers API

### List All Trainers

**Request:**
```javascript
// Using fetch
const response = await fetch('/api/trainers')
const data = await response.json()

// Using API client
import { api } from '@/lib/api/client'
const { trainers, count } = await api.trainers.list()
```

**Response:**
```json
{
  "success": true,
  "data": {
    "trainers": [
      {
        "id": "1",
        "name": "John Doe",
        "email": "john@example.com",
        "specialties": ["muscle-gain", "general-fitness"],
        "rating": 4.8,
        "hourlyRate": 80,
        "verified": true
      }
    ],
    "count": 1,
    "filters": {}
  },
  "meta": {
    "timestamp": "2026-01-16T12:00:00Z"
  }
}
```

### Filter Trainers

**Request:**
```javascript
// Filter by specialty and location
const response = await fetch(
  '/api/trainers?specialty=weight-loss&location=New%20York&verified=true'
)

// Using API client
const { trainers } = await api.trainers.list({
  specialty: 'weight-loss',
  location: 'New York',
  verified: true
})
```

**Available Filters:**
- `specialty`: `weight-loss`, `muscle-gain`, `endurance`, `flexibility`, `general-fitness`, `rehabilitation`
- `style`: `high-intensity`, `steady-state`, `functional`, `sport-specific`, `mindful`, `strength-focused`
- `experienceLevel`: `beginner`, `intermediate`, `advanced`, `athlete`
- `minRating`: Number (0-5)
- `maxPrice`: Number
- `location`: String (searches city and state)
- `verified`: Boolean

**Example with Multiple Filters:**
```javascript
const { trainers, count } = await api.trainers.list({
  specialty: 'muscle-gain',
  style: 'high-intensity',
  experienceLevel: 'intermediate',
  minRating: 4.5,
  maxPrice: 100,
  verified: true
})

console.log(`Found ${count} trainers matching your criteria`)
```

---

## Matching API

### Generate Matches

**Request:**
```javascript
const userProfile = {
  goals: ['weight-loss', 'general-fitness'],
  preferredStyles: ['high-intensity', 'functional'],
  experienceLevel: 'beginner',
  personality: ['motivating', 'empathetic'],
  availability: [
    { day: 'monday', startTime: '06:00', endTime: '09:00' },
    { day: 'wednesday', startTime: '06:00', endTime: '09:00' },
    { day: 'friday', startTime: '06:00', endTime: '09:00' }
  ],
  timezone: 'America/New_York',
  budgetRange: { min: 50, max: 100 },
  virtualOnly: false,
  inPersonOnly: false,
  age: 28,
  gender: 'female',
  completeness: 85
}

// Using fetch
const response = await fetch('/api/matching', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(userProfile)
})
const data = await response.json()

// Using API client
import { api } from '@/lib/api/client'
const { matches, count } = await api.matching.match(userProfile)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "matches": [
      {
        "trainer": { /* trainer object */ },
        "overallScore": 0.87,
        "confidence": 85,
        "breakdown": {
          "goalAlignment": 0.95,
          "styleCompatibility": 0.90,
          "personalityFit": 0.85,
          "scheduleMatch": 0.80,
          "experienceLevel": 1.0,
          "budgetFit": 0.85
        },
        "explanation": {
          "summary": "Excellent match! This trainer aligns well with your goals...",
          "topFactors": [
            { "name": "Goal Alignment", "score": 0.95 },
            { "name": "Style Compatibility", "score": 0.90 }
          ],
          "strengths": [
            "Training style is an excellent match for your preferences",
            "Pricing fits comfortably within your budget"
          ]
        },
        "passesConstraints": true
      }
    ],
    "count": 5,
    "userProfile": {
      "completeness": 85,
      "goals": ["weight-loss", "general-fitness"],
      "experienceLevel": "beginner"
    }
  },
  "meta": {
    "timestamp": "2026-01-16T12:00:00Z"
  }
}
```

### Custom Weights

You can customize the importance of different matching factors:

```javascript
const customWeights = {
  goalAlignment: 0.30,      // 30% weight
  styleCompatibility: 0.20, // 20% weight
  personalityFit: 0.15,     // 15% weight
  scheduleMatch: 0.20,      // 20% weight
  experienceLevel: 0.10,    // 10% weight
  budgetFit: 0.05          // 5% weight
}
// Must sum to 1.0

const { matches } = await api.matching.match(userProfile, customWeights)
```

---

## Bookings API

### Create a Booking

**Request:**
```javascript
const bookingData = {
  trainerId: "trainer-123",
  sessionTypeId: "session-456",
  date: "2026-01-20T10:00:00Z", // ISO 8601 format
  timeSlot: {
    startTime: "10:00",
    endTime: "11:00"
  },
  userInfo: {
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1-555-0123",
    notes: "First session, looking forward to it!"
  }
}

// Using fetch
const response = await fetch('/api/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(bookingData)
})
const data = await response.json()

// Using API client
import { api } from '@/lib/api/client'
const result = await api.bookings.create(bookingData)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "booking": {
      "id": "booking-1705406400000",
      "trainerId": "trainer-123",
      "trainerName": "John Doe",
      "trainerEmail": "john@example.com",
      "sessionType": "In-Person Training",
      "duration": 60,
      "price": 80,
      "date": "2026-01-20T10:00:00Z",
      "timeSlot": {
        "startTime": "10:00",
        "endTime": "11:00"
      },
      "userInfo": {
        "name": "Jane Smith",
        "email": "jane@example.com",
        "phone": "+1-555-0123",
        "notes": "First session, looking forward to it!"
      },
      "status": "confirmed",
      "createdAt": "2026-01-16T12:00:00Z",
      "confirmationNumber": "RPR-A7K9M2X5"
    },
    "message": "Booking created successfully. Confirmation email sent."
  },
  "meta": {
    "timestamp": "2026-01-16T12:00:00Z"
  }
}
```

### Booking Validation Rules

The API validates:
- ✅ Bookings must be at least **1 hour in advance**
- ✅ Bookings can be made up to **90 days in advance**
- ✅ Trainer must be available at the selected time
- ✅ Time slot must match trainer's availability
- ✅ End time must be after start time

---

## Error Handling

All API endpoints return consistent error responses:

### Validation Error

```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "path": "email",
        "message": "Invalid email address"
      },
      {
        "path": "timeSlot.endTime",
        "message": "End time must be after start time"
      }
    ]
  },
  "meta": {
    "timestamp": "2026-01-16T12:00:00Z"
  }
}
```

### Not Found Error

```json
{
  "success": false,
  "error": {
    "message": "Trainer not found",
    "code": "TRAINER_NOT_FOUND"
  },
  "meta": {
    "timestamp": "2026-01-16T12:00:00Z"
  }
}
```

### Internal Server Error

```json
{
  "success": false,
  "error": {
    "message": "Failed to generate matches",
    "code": "INTERNAL_ERROR"
    // Details only included in development
  },
  "meta": {
    "timestamp": "2026-01-16T12:00:00Z"
  }
}
```

### Handling Errors in Code

```javascript
import { ApiError } from '@/lib/api/client'

try {
  const { trainers } = await api.trainers.list({ minRating: 5.5 }) // Invalid
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`Error ${error.statusCode}: ${error.message}`)
    console.error(`Code: ${error.code}`)
    
    if (error.code === 'VALIDATION_ERROR') {
      console.error('Validation details:', error.details)
    }
  } else {
    console.error('Unexpected error:', error)
  }
}
```

---

## Using the API Client

The type-safe API client provides better developer experience:

### Benefits
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Error Handling**: Automatic error parsing
- ✅ **Timeout Handling**: Built-in request timeouts
- ✅ **Consistent Responses**: Standardized format

### Import and Use

```typescript
import { api, ApiError } from '@/lib/api/client'

// All methods are fully typed
const { trainers } = await api.trainers.list({
  specialty: 'weight-loss', // Autocomplete works!
  maxPrice: 100
})

// Type-safe responses
trainers.forEach(trainer => {
  console.log(trainer.name) // TypeScript knows the shape
})
```

### With React Query

```typescript
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api/client'

function TrainersList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['trainers', { specialty: 'weight-loss' }],
    queryFn: () => api.trainers.list({ specialty: 'weight-loss' })
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {data?.trainers.map(trainer => (
        <div key={trainer.id}>{trainer.name}</div>
      ))}
    </div>
  )
}
```

### Custom Timeout

```typescript
import { apiClient } from '@/lib/api/client'

// Custom timeout for slow operations
const data = await apiClient.post('/api/heavy-operation', 
  { /* data */ }, 
  { timeout: 30000 } // 30 seconds
)
```

---

## Rate Limiting (Future)

When rate limiting is implemented, responses will include headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705406400
```

Rate limit exceeded response:
```json
{
  "success": false,
  "error": {
    "message": "Rate limit exceeded",
    "code": "RATE_LIMIT_EXCEEDED",
    "details": {
      "limit": 100,
      "reset": 1705406400
    }
  }
}
```

---

## Best Practices

### 1. Always Handle Errors

```typescript
try {
  const result = await api.trainers.list()
  // Handle success
} catch (error) {
  // Handle error
  if (error instanceof ApiError) {
    // API error
  } else {
    // Network or unexpected error
  }
}
```

### 2. Use Type Safety

```typescript
// Good - Type-safe
import { api } from '@/lib/api/client'
const { trainers } = await api.trainers.list()

// Avoid - No type safety
const response = await fetch('/api/trainers')
const data = await response.json() // any type
```

### 3. Implement Loading States

```typescript
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

try {
  setLoading(true)
  const result = await api.bookings.create(data)
  // Success
} catch (err) {
  setError(err.message)
} finally {
  setLoading(false)
}
```

### 4. Cache When Appropriate

Use React Query for automatic caching:

```typescript
const { data } = useQuery({
  queryKey: ['trainers'],
  queryFn: () => api.trainers.list(),
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 30 * 60 * 1000 // 30 minutes
})
```

---

**Need Help?**

- Check the [API Documentation](./api-documentation.md)
- Review the [Architecture Guide](./ARCHITECTURE.md)
- Open an issue on GitHub

---

**Last Updated**: January 16, 2026
