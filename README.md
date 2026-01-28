# RepRise - Fitness Trainer Matching Platform

A premium fitness trainer matching platform that intelligently connects users with their perfect trainer based on goals, style, schedule, personality, and budget.

## 🎯 Project Overview

RepRise demonstrates sophisticated algorithm design, state management, and thoughtful UX in a focused portfolio project. The core value proposition is **matching fit + frictionless scheduling** - helping users find trainers they'll actually stick with.

## ✨ Features Implemented

### Core Functionality

- **Intelligent Matching Algorithm**
  - Multi-factor weighted scoring with Jaccard similarity
  - Budget constraints and deal-breaker logic
  - Schedule overlap calculation
  - Personality and style compatibility
  - 0-100 confidence scoring based on profile completeness

- **Type-Safe Architecture**
  - Comprehensive TypeScript types for all domain models
  - Zod validation schemas at API boundaries
  - Single source of truth for type definitions
  - Strict mode enabled, zero `any` casts

- **Design System**
  - Custom "Terracotta Vitality" color palette
  - Plus Jakarta Sans (headings) + Source Serif 4 (body) typography
  - 8-point spacing grid
  - WCAG AA compliant colors
  - Reduced motion support

- **Shadcn/UI Integration**
  - Button, Card, Input, Form, Dialog components
  - Badge, Progress, Skeleton, Calendar, Tabs
  - Toast notifications, Checkbox, Popover
  - Fully accessible with ARIA labels

### Mock Data

- 5 diverse trainer profiles with realistic data
- Complete trainer information including:
  - Specialties, training styles, certifications
  - Availability schedules, pricing
  - Ratings, session counts, location data
  - Personality traits, experience levels

## 🏗️ Project Structure

```
reprise/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with fonts
│   │   ├── page.tsx           # Landing page
│   │   └── globals.css        # Global styles
│   │
│   ├── components/
│   │   └── ui/                # shadcn/ui components
│   │
│   ├── types/                 # Domain types (single source of truth)
│   │   ├── index.ts          # Shared types
│   │   ├── trainer.ts        # Trainer types
│   │   ├── matching.ts       # Matching & UserProfile types
│   │   ├── booking.ts        # Booking types
│   │   ├── session.ts        # Session types
│   │   └── progress.ts       # Progress tracking types
│   │
│   ├── lib/
│   │   ├── matching/         # Matching algorithm
│   │   │   ├── algorithm.ts  # Main matching logic
│   │   │   ├── scoring.ts    # Factor calculations
│   │   │   ├── weights.ts    # Weight configuration
│   │   │   └── utils.ts      # Jaccard similarity, helpers
│   │   │
│   │   ├── validations/      # Zod schemas (canonical export)
│   │   │   ├── index.ts
│   │   │   ├── quiz.ts
│   │   │   ├── trainer.ts
│   │   │   └── booking.ts
│   │   │
│   │   └── utils/            # Utility functions
│   │       ├── cn.ts
│   │       ├── date.ts
│   │       ├── format.ts
│   │       └── array.ts
│   │
│   ├── mocks/
│   │   └── data/
│   │       └── trainers.json # Trainer seed data
│   │
│   ├── hooks/
│   │   └── use-toast.ts
│   │
│   └── config/
│       ├── env.ts            # Environment validation
│       └── site.ts           # Site metadata
│
├── tests/
│   └── setup.ts              # Vitest configuration
│
├── docs/
│   └── design-system.md      # Complete design documentation
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── vitest.config.ts
├── playwright.config.ts
└── README.md
```

## 🧪 Commands

```bash
# Development
npm run dev              # Start dev server

# Type checking
npm run type-check       # TypeScript validation

# Building
npm run build            # Production build
npm run start            # Production server

# Testing (to be implemented)
npm run test             # Unit tests (Vitest)
npm run test:e2e         # E2E tests (Playwright)

# Verification
npm run verify           # Full verification pipeline
npm run lint             # ESLint check
```

## 🎨 Design System

### Colors

- **Primary (Terracotta)**: `#E2725B` - Warm, inviting, human connection
- **Secondary (Deep Charcoal)**: `#2D2D2D` - Professional grounding
- **Accent (Warm Gold)**: `#D4A574` - Premium highlights
- **Background (Warm Cream)**: `#FAF7F4` - Soft, approachable
- **Text Secondary (Taupe)**: `#8B8178` - Subtle hierarchy

### Typography

- **Headings**: Plus Jakarta Sans (600-700 weight)
- **Body**: Source Serif 4 (400-500 weight)
- **Line Height**: 1.7 for body, 1.2 for headings

### Spacing (8-point grid)

- xs: 8px, sm: 16px, md: 24px, lg: 32px
- xl: 48px, 2xl: 64px, 3xl: 96px

## 🔒 TypeScript Configuration

- Strict mode enabled
- ESModule interop
- Absolute imports via `@/*` alias
- All code type-checks without errors

## 🚧 Next Steps (Not Yet Implemented)

### High Priority

1. **Quiz Flow Components** (Task 8)
   - QuizFlow, QuizQuestion, QuizProgress
   - Zustand store for quiz state
   - Quiz answer transformation to UserProfile

2. **Match Results UI** (Task 9)
   - MatchResults component
   - MatchCard with visual breakdown
   - Explainability radar chart
   - Interactive weight sliders

3. **Booking Flow** (Task 10)
   - BookingFlow component
   - AvailabilityCalendar
   - TimeSlotPicker
   - Booking state machine (Zustand)
   - Conflict detection

4. **Route Handlers** (Task 14)
   - `/api/trainers` - List & detail
   - `/api/matching` - Match algorithm endpoint
   - `/api/sessions` - Booking management
   - `/api/availability` - Calendar data

5. **Landing Pages** (Task 15)
   - Marketing homepage
   - Header & footer
   - Navigation components
   - Trainer detail pages

### Medium Priority

6. **Dashboard** (Task 11)
   - User dashboard
   - Progress tracking
   - Stats cards
   - Upcoming sessions

7. **3D Visualizations** (Task 12)
   - React Three Fiber components
   - ProgressRing with rotation
   - Error boundaries for 3D

8. **Testing** (Task 16)
   - Unit tests for matching algorithm
   - Integration tests for quiz/booking flows
   - E2E tests for critical paths

### Polish

9. **Error Handling** (Task 19)
   - Error boundaries
   - Loading skeletons
   - Suspense boundaries

10. **CI/CD** (Task 18)
    - GitHub Actions workflow
    - Vercel deployment
    - Build verification

11. **Accessibility** (Task 17)
    - Keyboard navigation enhancements
    - Screen reader optimization
    - Focus management

## 📊 Progress

**Completed**: 7/20 tasks (35%)

- ✅ Project initialization & dependencies
- ✅ TypeScript & Tailwind configuration
- ✅ Type system (all domain types)
- ✅ Validation schemas (Zod)
- ✅ UI component library (shadcn/ui)
- ✅ Mock data & trainers
- ✅ Matching algorithm (complete)

**In Progress**: Tasks 8-20

## 🎯 Demo Mode

This is a portfolio project with certain features intentionally mocked:

- **Authentication**: Demo mode, no real login
- **Payments**: Mock Stripe checkout
- **Database**: LocalStorage for demo
- **API**: JSON imports, not real HTTP

## 🔗 Key Dependencies

- Next.js 15.1+
- React 18.3+
- TypeScript 5.7+
- Tailwind CSS 3.4+
- Radix UI (via shadcn/ui)
- Zod 3.24+
- Zustand 4.5+ (state management)
- date-fns 4.1+
- Framer Motion 11.15+
- React Three Fiber 8.17+
- Recharts 2.15+

## 📝 Implementation Notes

### Matching Algorithm Details

- Uses Jaccard similarity for set comparison
- Neutral scoring (1.0) for unanswered optional fields
- Budget constraint: hard reject if >50% over max
- Schedule overlap: normalizes by user's availability
- All scores normalized to 0-100 for display

### Type Safety Guarantees

- Single source of truth: types in `src/types/*`
- NO duplicate type files (no `lib/*/types.ts`)
- Zod validation at API boundaries only
- Never `export type T = z.infer<typeof schema>`

### Design Decisions

- Serif body text (Source Serif 4) for warmth
- Terracotta primary color for human connection
- 8-point grid for consistent rhythm
- Reduced motion support built-in

## 🛠️ Development Guidelines

1. **Types First**: Define types in `src/types/*` before implementing features
2. **Validate Boundaries**: Use Zod at API/data edges
3. **Test Core Logic**: Unit test algorithms, integration test flows
4. **Accessibility**: WCAG AA minimum, keyboard nav, ARIA labels
5. **Performance**: Lazy load, optimize images, 90+ Lighthouse score

## 📄 License

Portfolio project - All rights reserved

## 👤 Author

Elizabeth Stein

---

**Status**: Foundation complete, core algorithm implemented, ready for UI development
