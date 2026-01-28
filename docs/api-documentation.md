# API Documentation

RepRise provides REST API endpoints for trainer matching, trainer search, and booking management.

## Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Authentication

Currently, the API is open for development. In production, implement authentication headers:

```
Authorization: Bearer <your-token>
```

---

## Endpoints

### 1. Get Trainers

Retrieve a filtered list of trainers.

**Endpoint:** `GET /api/trainers`

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `specialty` | string | No | Filter by specialty (e.g., 'muscle-gain') |
| `style` | string | No | Filter by training style (e.g., 'high-intensity') |
| `minExperience` | number | No | Minimum years of experience |
| `maxPrice` | number | No | Maximum hourly rate |
| `location` | string | No | Location filter (e.g., 'New York, NY') |
| `verified` | boolean | No | Only show verified trainers |
| `page` | number | No | Page number (default: 1) |
| `limit` | number | No | Results per page (default: 20, max: 100) |

**Example Request:**

```bash
GET /api/trainers?specialty=muscle-gain&maxPrice=100&verified=true&page=1&limit=10
```

**Example Response:**

```json
{
  "trainers": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "/avatars/john.jpg",
      "tagline": "Build strength, build confidence",
      "specialties": ["muscle-gain", "general-fitness"],
      "trainingStyles": ["high-intensity", "strength-focused"],
      "hourlyRate": 80,
      "rating": 4.8,
      "totalSessions": 500,
      "verified": true,
      "location": {
        "city": "New York",
        "state": "NY",
        "country": "USA"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid query parameters
- `500` - Server error

---

### 2. Match Trainers

Get personalized trainer matches based on user profile.

**Endpoint:** `POST /api/matching`

**Request Body:**

```json
{
  "userProfile": {
    "goals": ["muscle-gain", "general-fitness"],
    "preferredStyles": ["high-intensity", "strength-focused"],
    "experienceLevel": "intermediate",
    "personality": ["energetic", "disciplined"],
    "availability": [
      {
        "day": "monday",
        "startTime": "06:00",
        "endTime": "09:00"
      }
    ],
    "timezone": "America/New_York",
    "budgetRange": {
      "min": 60,
      "max": 100
    },
    "virtualOnly": false,
    "inPersonOnly": false,
    "completeness": 90
  },
  "weights": {
    "goalAlignment": 0.25,
    "styleCompatibility": 0.20,
    "personalityFit": 0.15,
    "scheduleMatch": 0.20,
    "experienceLevel": 0.10,
    "budgetFit": 0.10
  }
}
```

**Response:**

```json
{
  "matches": [
    {
      "trainer": {
        "id": "1",
        "name": "John Doe",
        "avatar": "/avatars/john.jpg",
        "tagline": "Build strength, build confidence",
        "hourlyRate": 80,
        "rating": 4.8
      },
      "overallScore": 0.87,
      "confidence": 90,
      "breakdown": {
        "goalAlignment": 0.95,
        "styleCompatibility": 0.88,
        "personalityFit": 0.82,
        "scheduleMatch": 0.75,
        "experienceLevel": 1.0,
        "budgetFit": 1.0
      },
      "explanation": {
        "summary": "Excellent match! This trainer aligns very well with your goals.",
        "topFactors": [
          { "name": "Goal Alignment", "score": 0.95 },
          { "name": "Style Compatibility", "score": 0.88 },
          { "name": "Experience Level", "score": 1.0 }
        ],
        "strengths": [
          "Specializes in your primary goals",
          "Training style matches your preferences",
          "Within your budget range"
        ],
        "considerations": [
          "Limited availability on weekends"
        ]
      },
      "passesConstraints": true
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid request body (validation error)
- `500` - Server error

**Validation Rules:**
- `userProfile.goals` - Must be non-empty array of valid FitnessGoal values
- `userProfile.experienceLevel` - Must be 'beginner', 'intermediate', 'advanced', or 'athlete'
- `userProfile.budgetRange` - Must have min and max (min < max)
- `weights` - Must sum to 1.0 (±0.001 tolerance)

---

### 3. Create Booking

Create a new training session booking.

**Endpoint:** `POST /api/bookings`

**Request Body:**

```json
{
  "trainerId": "1",
  "sessionTypeId": "session-1",
  "date": "2025-01-15",
  "time": "09:00",
  "clientName": "Jane Smith",
  "clientEmail": "jane@example.com",
  "clientPhone": "+1-555-0123",
  "notes": "First session, focus on form assessment"
}
```

**Response:**

```json
{
  "booking": {
    "id": "booking-123",
    "confirmationNumber": "REP-20250115-ABC123",
    "trainerId": "1",
    "trainerName": "John Doe",
    "sessionType": "In-Person Training",
    "date": "2025-01-15",
    "time": "09:00",
    "duration": 60,
    "price": 80,
    "status": "confirmed",
    "clientName": "Jane Smith",
    "clientEmail": "jane@example.com",
    "createdAt": "2025-01-01T10:00:00Z"
  }
}
```

**Status Codes:**
- `201` - Booking created successfully
- `400` - Invalid request body (validation error)
- `409` - Time slot not available
- `500` - Server error

**Validation Rules:**
- `date` - Must be in the future
- `time` - Must be in HH:MM format
- `clientEmail` - Must be valid email format
- `clientPhone` - Optional, but if provided must be valid format

---

## Error Responses

All error responses follow this format:

```json
{
  "error": {
    "message": "Human-readable error message",
    "code": "ERROR_CODE",
    "details": {
      "field": "Additional context"
    }
  }
}
```

**Common Error Codes:**

- `VALIDATION_ERROR` - Request validation failed
- `NOT_FOUND` - Resource not found
- `CONFLICT` - Resource conflict (e.g., time slot taken)
- `INTERNAL_ERROR` - Server error

---

## Rate Limiting

**Current Limits:**
- 100 requests per minute per IP
- 1000 requests per hour per IP

**Rate Limit Headers:**

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

When rate limit is exceeded, you'll receive a `429 Too Many Requests` response.

---

## Pagination

List endpoints support pagination:

```
?page=1&limit=20
```

**Response includes pagination metadata:**

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## Webhooks (Future)

For production integration, webhooks will be available for:

- `booking.created` - New booking created
- `booking.updated` - Booking modified
- `booking.cancelled` - Booking cancelled
- `trainer.updated` - Trainer profile updated

**Webhook Payload Example:**

```json
{
  "event": "booking.created",
  "timestamp": "2025-01-01T10:00:00Z",
  "data": {
    "bookingId": "booking-123",
    "trainerId": "1",
    "date": "2025-01-15"
  }
}
```

---

## Development & Testing

### Mock Data

The API currently uses mock data from `src/lib/data/mock-trainers.ts`. Replace with real database calls in production.

### Testing API Endpoints

```bash
# Using curl
curl -X GET "http://localhost:3000/api/trainers?verified=true"

# Using httpie
http GET localhost:3000/api/trainers verified==true

# Using Postman
Import the collection from docs/postman-collection.json
```

---

## Support

For API support and questions:
- GitHub Issues: https://github.com/your-org/RepRise/issues
- Email: api-support@reprise.com
- Documentation: https://docs.reprise.com
