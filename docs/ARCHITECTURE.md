# RepRise Architecture Documentation

## Table of Contents
1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Architecture Patterns](#architecture-patterns)
5. [Data Flow](#data-flow)
6. [API Design](#api-design)
7. [State Management](#state-management)
8. [Security](#security)
9. [Performance](#performance)
10. [Testing Strategy](#testing-strategy)

---

## Overview

RepRise is a Next.js-based fitness trainer matching platform that uses a sophisticated multi-factor algorithm to connect users with their ideal personal trainers. The application follows modern React and Next.js best practices with a focus on type safety, performance, and user experience.

### Key Features
- Intelligent trainer matching algorithm
- Interactive quiz flow for user profiling
- Real-time availability checking
- Booking management system
- Responsive design with accessibility focus

---

## Technology Stack

### Frontend
- **Framework**: Next.js 15.1+ (App Router)
- **React**: 18.3+
- **TypeScript**: 5.7+ (strict mode)
- **Styling**: Tailwind CSS 3.4+
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Animations**: Framer Motion 11.15+

### State Management
- **Global State**: Zustand 4.5+
- **Server State**: TanStack Query (React Query) 5.62+
- **Form State**: React Hook Form 7.69+

### Data & Validation
- **Schema Validation**: Zod 3.25+
- **Date Handling**: date-fns 4.1+
- **Data Visualization**: Recharts 2.15+

### Development Tools
- **Type Checking**: TypeScript
- **Linting**: ESLint (Next.js config)
- **Formatting**: Prettier
- **Testing**: Jest + React Testing Library
- **E2E Testing**: Playwright

### Future Additions
- **Database**: PostgreSQL + Prisma (planned)
- **Authentication**: NextAuth.js (planned)
- **Error Tracking**: Sentry (planned)
- **Analytics**: PostHog (planned)

---

## Project Structure

```
reprise/
├── .github/                    # GitHub configuration
│   ├── workflows/              # CI/CD workflows
│   └── ISSUE_TEMPLATE/         # Issue templates
├── docs/                       # Documentation
│   ├── api-documentation.md
│   ├── design-system.md
│   └── ARCHITECTURE.md
├── public/                     # Static assets
│   └── images/                 # Images
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API routes
│   │   │   ├── trainers/
│   │   │   ├── matching/
│   │   │   └── bookings/
│   │   ├── (pages)/            # Page routes
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── features/           # Feature components
│   │   ├── layout/             # Layout components
│   │   └── accessibility/      # A11y components
│   ├── lib/                    # Core libraries
│   │   ├── matching/           # Matching algorithm
│   │   ├── utils/              # Utility functions
│   │   ├── validations/        # Zod schemas
│   │   └── api/                # API client
│   ├── hooks/                  # Custom React hooks
│   ├── stores/                 # Zustand stores
│   ├── types/                  # TypeScript types
│   ├── config/                 # Configuration
│   └── mocks/                  # Mock data
├── tests/                      # Test files
└── [config files]              # Various config files
```

### Directory Responsibilities

#### `/src/app/`
Next.js App Router structure containing:
- **Pages**: Each directory represents a route
- **API Routes**: Backend endpoints in `/api/`
- **Layouts**: Shared layouts and templates

#### `/src/components/`
Reusable React components organized by:
- **ui/**: Base UI components (buttons, cards, etc.)
- **features/**: Feature-specific components
- **layout/**: Layout components (header, footer)

#### `/src/lib/`
Core business logic and utilities:
- **matching/**: Trainer matching algorithm
- **utils/**: Helper functions (logging, performance, SEO)
- **validations/**: Zod validation schemas
- **api/**: Type-safe API client

#### `/src/types/`
**Single source of truth** for TypeScript types:
- `index.ts`: Shared types
- `trainer.ts`: Trainer-related types
- `matching.ts`: Matching algorithm types
- `booking.ts`: Booking types

---

## Architecture Patterns

### 1. **Layered Architecture**

```
┌─────────────────────────────────────┐
│     Presentation Layer              │
│  (Components, Pages, UI)            │
├─────────────────────────────────────┤
│     Business Logic Layer            │
│  (Matching Algorithm, Validations)  │
├─────────────────────────────────────┤
│     Data Access Layer               │
│  (API Routes, Mock Data)            │
├─────────────────────────────────────┤
│     Infrastructure Layer            │
│  (Logging, Error Handling, Utils)   │
└─────────────────────────────────────┘
```

### 2. **Component Patterns**

#### Server Components (Default)
- Used for static content and data fetching
- Better performance, smaller bundle size
- No interactivity required

#### Client Components (`'use client'`)
- Used for interactive features
- State management, event handlers
- Browser APIs

### 3. **Type Safety Pattern**

```
Types (single source) → Zod Schema → Runtime Validation → API
     ↓
  Components (type-safe)
```

**Rules:**
- Define types in `/src/types/` first
- Create Zod schemas in `/src/lib/validations/`
- Never `export type T = z.infer<typeof schema>`
- Validate at API boundaries only

### 4. **State Management Pattern**

```
┌──────────────────────────────────────┐
│  Zustand (Client State)              │
│  - Quiz answers                      │
│  - Booking flow                      │
│  - UI state                          │
├──────────────────────────────────────┤
│  React Query (Server State)          │
│  - API data caching                  │
│  - Background refetching             │
│  - Optimistic updates                │
├──────────────────────────────────────┤
│  React Hook Form (Form State)        │
│  - Form validation                   │
│  - Field-level state                 │
└──────────────────────────────────────┘
```

### 5. **Error Handling Pattern**

```typescript
// API Route → Error Handler → Standardized Response → Client

try {
  // Business logic
} catch (error) {
  logError('context', error)
  return errorResponse(message, code, details)
}
```

---

## Data Flow

### 1. **Quiz to Matching Flow**

```
User Input (Quiz)
    ↓
Quiz Store (Zustand)
    ↓
Transform to UserProfile
    ↓
POST /api/matching
    ↓
Matching Algorithm
    ↓
Match Results
    ↓
Display Results
```

### 2. **Booking Flow**

```
Select Trainer
    ↓
Booking Store (Zustand)
    ↓
Choose Session Type
    ↓
Select Date & Time
    ↓
Enter User Info
    ↓
POST /api/bookings
    ↓
Validation & Availability Check
    ↓
Create Booking
    ↓
Confirmation
```

### 3. **API Request Flow**

```
Client Component
    ↓
API Client (type-safe)
    ↓
Fetch with timeout
    ↓
API Route Handler
    ↓
Request Validation (Zod)
    ↓
Business Logic
    ↓
Response Standardization
    ↓
Client (type-safe response)
```

---

## API Design

### Response Format

All API endpoints return standardized responses:

```typescript
// Success
{
  success: true,
  data: { /* response data */ },
  meta: {
    timestamp: "2026-01-16T12:00:00Z"
  }
}

// Error
{
  success: false,
  error: {
    message: "Error message",
    code: "ERROR_CODE",
    details: { /* optional details */ }
  },
  meta: {
    timestamp: "2026-01-16T12:00:00Z"
  }
}
```

### Error Codes

- `VALIDATION_ERROR`: Input validation failed
- `NOT_FOUND`: Resource not found
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `INTERNAL_ERROR`: Server error
- `TIMEOUT`: Request timeout
- Custom codes for specific errors

### Endpoints

#### `GET /api/trainers`
List and filter trainers

**Query Parameters:**
- `specialty`: Filter by specialty
- `style`: Filter by training style
- `experienceLevel`: Filter by experience
- `minRating`: Minimum rating
- `maxPrice`: Maximum price
- `location`: Location search
- `verified`: Verified trainers only

#### `POST /api/matching`
Generate trainer matches

**Body:**
```typescript
{
  goals: string[]
  preferredStyles: string[]
  experienceLevel: string
  availability: TimeSlot[]
  budgetRange: { min: number, max: number }
  // ... other profile fields
}
```

#### `POST /api/bookings`
Create a booking

**Body:**
```typescript
{
  trainerId: string
  sessionTypeId: string
  date: string // ISO 8601
  timeSlot: { startTime: string, endTime: string }
  userInfo: {
    name: string
    email: string
    phone?: string
    notes?: string
  }
}
```

---

## State Management

### Zustand Stores

#### Quiz Store (`use-quiz-store.ts`)
- Quiz progress and answers
- Persisted to localStorage
- Progress tracking
- Timestamps

#### Booking Store (`use-booking-store.ts`)
- Current booking context
- Multi-step flow state
- Validation state
- Error handling

### Best Practices
1. **Keep stores focused**: One store per domain
2. **Use selectors**: Avoid unnecessary re-renders
3. **Persist wisely**: Only persist necessary state
4. **Type everything**: Full TypeScript support

---

## Security

### Current Implementation

1. **Security Headers** (next.config.js)
   - HSTS
   - X-Frame-Options
   - X-Content-Type-Options
   - X-XSS-Protection
   - Referrer-Policy
   - Permissions-Policy

2. **Input Validation**
   - Zod schemas on all API routes
   - Type-safe validation
   - Sanitization helpers

3. **Error Handling**
   - Production-safe error messages
   - No sensitive data in errors
   - Centralized logging

4. **XSS Prevention**
   - React's built-in protection
   - HTML sanitization utility
   - Escape user content

### Future Security Enhancements

- [ ] Authentication (NextAuth.js)
- [ ] Authorization & RBAC
- [ ] Rate limiting
- [ ] CSRF protection
- [ ] API authentication
- [ ] Database encryption
- [ ] Audit logging

---

## Performance

### Optimization Strategies

1. **Code Splitting**
   - Dynamic imports for large components
   - Route-based splitting (automatic with Next.js)

2. **Image Optimization**
   - Next.js Image component
   - Lazy loading with Intersection Observer
   - Responsive images

3. **Caching**
   - React Query for API caching
   - Static generation where possible
   - CDN caching

4. **Bundle Size**
   - Tree shaking
   - Minification (SWC)
   - Compression enabled

5. **Performance Monitoring**
   - Performance utilities
   - Render time tracking
   - API response time logging

### Best Practices
- Use Server Components by default
- Lazy load heavy components
- Debounce search inputs
- Optimize images
- Monitor Core Web Vitals

---

## Testing Strategy

### Unit Tests (Jest)
- Utility functions
- Business logic (matching algorithm)
- Validation schemas
- Custom hooks

### Component Tests (React Testing Library)
- Component rendering
- User interactions
- State changes
- Error states

### Integration Tests
- API endpoints
- Complete user flows
- State management

### E2E Tests (Playwright)
- Critical user paths
- Quiz to booking flow
- Cross-browser testing

### Test Coverage Goals
- Utilities: 90%+
- Business Logic: 90%+
- Components: 80%+
- Overall: 80%+

---

## Deployment

### Recommended Platform
**Vercel** (optimized for Next.js)

### Deployment Checklist
- [ ] Environment variables configured
- [ ] Database connected
- [ ] Error tracking enabled
- [ ] Analytics configured
- [ ] Security headers verified
- [ ] Performance monitoring enabled
- [ ] Domain configured
- [ ] SSL certificate active

### CI/CD Pipeline
1. **On PR**: Type check, lint, test, build
2. **On Merge to Main**: Deploy to production
3. **On PR**: Deploy preview environment

---

## Scalability Considerations

### Horizontal Scaling
- Stateless API design
- CDN for static assets
- Database connection pooling
- Redis for session storage

### Vertical Scaling
- Code optimization
- Query optimization
- Caching strategies
- Lazy loading

### Performance Targets
- Time to Interactive: < 3s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

---

## Monitoring & Observability

### Metrics to Track
1. **Performance**: Page load times, API response times
2. **Errors**: Error rate, error types
3. **Usage**: User flows, feature adoption
4. **Business**: Conversions, match quality

### Tools
- **Error Tracking**: Sentry (planned)
- **Analytics**: PostHog (planned)
- **Performance**: Vercel Analytics
- **Logs**: Centralized logging system

---

## Future Enhancements

### Phase 2
- Real-time chat with trainers
- Payment integration (Stripe)
- Advanced scheduling (calendar sync)
- Progress tracking dashboard
- Mobile app (React Native)

### Phase 3
- Video call integration
- AI-powered workout recommendations
- Social features
- Gamification
- Multi-language support

---

**Last Updated**: January 16, 2026  
**Version**: 0.1.0
