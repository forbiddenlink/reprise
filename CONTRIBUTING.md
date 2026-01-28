# Contributing to RepRise

Thank you for your interest in contributing to RepRise! This document provides guidelines and instructions for contributing to the project.

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/RepRise.git
   cd RepRise
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming

- `feature/` - New features (e.g., `feature/trainer-reviews`)
- `fix/` - Bug fixes (e.g., `fix/calendar-timezone`)
- `refactor/` - Code refactoring (e.g., `refactor/matching-algorithm`)
- `docs/` - Documentation updates (e.g., `docs/api-endpoints`)

### Commit Messages

Follow conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(matching): add personality-based matching factor
fix(booking): resolve timezone conversion bug
docs(readme): update installation instructions
```

## Code Standards

### TypeScript

- Use strict mode (already configured)
- No `any` types - use `unknown` if needed
- Define interfaces for all data structures
- Use type inference where appropriate

### React Components

- Use functional components with hooks
- Extract reusable logic into custom hooks
- Keep components focused (single responsibility)
- Use proper prop types with TypeScript

### File Organization

```
src/
├── app/           # Next.js pages and routes
├── components/    # React components
│   ├── features/  # Feature-specific components
│   ├── ui/        # Reusable UI components (shadcn)
│   └── layout/    # Layout components
├── lib/           # Business logic and utilities
├── store/         # Zustand state stores
└── types/         # TypeScript type definitions
```

### Styling

- Use Tailwind CSS utility classes
- Follow the design system in `docs/design-system.md`
- Use CSS modules only when necessary
- Maintain WCAG AA accessibility standards

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write tests for new features
- Maintain at least 80% code coverage
- Test edge cases and error scenarios
- Use descriptive test names

**Example:**
```typescript
describe('matchTrainers', () => {
  it('sorts trainers by match score in descending order', () => {
    // Test implementation
  })
})
```

## Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, documented code
   - Add tests for new functionality
   - Update documentation as needed

3. **Run Verification**
   ```bash
   npm run verify
   ```
   This runs:
   - Type checking (`npm run type-check`)
   - Linting (`npm run lint`)
   - Build verification (`npm run build`)
   - All tests (`npm test`)

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub

6. **PR Requirements**
   - All CI checks must pass
   - Code review approval required
   - No merge conflicts
   - Updated documentation if needed

## Code Review Guidelines

### For Authors

- Keep PRs focused and reasonably sized
- Write clear PR descriptions
- Respond to feedback promptly
- Update based on review comments

### For Reviewers

- Be constructive and respectful
- Focus on code quality and maintainability
- Check for test coverage
- Verify accessibility standards

## Project Structure Best Practices

### Component Guidelines

- **Location**: Place components in appropriate directories
  - `components/ui/` - Generic, reusable UI components
  - `components/features/` - Feature-specific components
  - `components/layout/` - Layout and navigation components

- **Props**: Use TypeScript interfaces for props
  ```typescript
  interface ButtonProps {
    variant?: 'primary' | 'secondary'
    children: ReactNode
    onClick?: () => void
  }
  ```

- **Accessibility**: Always include proper ARIA labels and semantic HTML

### State Management

- Use Zustand for global state
- Keep state as local as possible
- Use URL state for shareable data (search params)

### API Routes

- Use Zod for request validation
- Return consistent response formats
- Handle errors gracefully
- Include proper HTTP status codes

## Getting Help

- Review existing code for examples
- Check `IMPLEMENTATION_PLAN.md` for architecture decisions
- Open an issue for questions
- Join discussions in GitHub Discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
