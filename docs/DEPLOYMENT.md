# Deployment Guide

Complete guide for deploying RepRise to production.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Deployment Platforms](#deployment-platforms)
4. [Vercel Deployment](#vercel-deployment)
5. [Docker Deployment](#docker-deployment)
6. [Post-Deployment](#post-deployment)
7. [Monitoring](#monitoring)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required
- Node.js 20.x or higher
- npm or yarn
- Git repository
- Domain name (optional but recommended)

### For Production
- [ ] Database setup (PostgreSQL recommended)
- [ ] Environment variables configured
- [ ] SSL certificate (handled by platform)
- [ ] Error tracking service (Sentry)
- [ ] Analytics configured
- [ ] Email service configured
- [ ] Payment gateway setup (if applicable)

---

## Environment Setup

### 1. Create Environment Files

Create `.env.production`:

```bash
# Application
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=RepRise
NODE_ENV=production

# Database (when implemented)
DATABASE_URL=postgresql://user:password@host:5432/reprise?sslmode=require

# Authentication (NextAuth - when implemented)
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-super-secret-key-min-32-chars

# Error Tracking
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_AUTH_TOKEN=your-sentry-token

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Email
EMAIL_SERVER_HOST=smtp.sendgrid.net
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=apikey
EMAIL_SERVER_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=noreply@your-domain.com

# Payments (Stripe - when implemented)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

### 2. Validate Configuration

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Build
npm run build

# Test (if tests exist)
npm test
```

---

## Deployment Platforms

### Recommended: Vercel
**Best for**: Next.js projects (optimized)

**Pros**:
- Zero configuration
- Automatic HTTPS
- Global CDN
- Preview deployments
- Built-in analytics
- Excellent Next.js support

**Pricing**: Free tier available, Pro at $20/month

### Alternative: Netlify
**Best for**: Static sites with serverless functions

**Pros**:
- Easy setup
- Good free tier
- Form handling
- Identity service

**Cons**:
- Less optimized for Next.js

### Alternative: AWS Amplify
**Best for**: AWS ecosystem integration

**Pros**:
- Integrates with AWS services
- Scalable
- Good monitoring

**Cons**:
- More complex setup
- Higher learning curve

### Alternative: Railway
**Best for**: Full-stack apps with database

**Pros**:
- Includes database hosting
- Simple pricing
- Good DX

### Self-Hosted: Docker
**Best for**: Custom infrastructure

**Pros**:
- Full control
- Any cloud provider
- Cost-effective at scale

**Cons**:
- More maintenance
- Need DevOps knowledge

---

## Vercel Deployment

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Vercel auto-detects Next.js

3. **Configure Environment Variables**
- In Vercel dashboard, go to Project Settings → Environment Variables
- Add all production environment variables
- Separate values for Production, Preview, and Development

4. **Deploy**
- Click "Deploy"
- Vercel builds and deploys automatically
- Get your production URL

### Method 2: Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login**
```bash
vercel login
```

3. **Deploy**
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Configure Custom Domain

1. **Add Domain in Vercel**
- Go to Project Settings → Domains
- Add your domain
- Configure DNS records as instructed

2. **Update Environment Variables**
```bash
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

3. **Redeploy**
```bash
vercel --prod
```

### Vercel Configuration

Create `vercel.json` (optional):

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "github": {
    "silent": true
  }
}
```

---

## Docker Deployment

### 1. Create Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built application
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

### 2. Create .dockerignore

```
node_modules
.next
.git
.env*
README.md
.vscode
coverage
```

### 3. Build and Run

```bash
# Build image
docker build -t reprise:latest .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_APP_URL=https://your-domain.com \
  -e DATABASE_URL=postgresql://... \
  reprise:latest
```

### 4. Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/reprise
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=reprise
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

Run with:
```bash
docker-compose up -d
```

---

## Post-Deployment

### 1. Verify Deployment

**Check Health:**
```bash
curl https://your-domain.com
```

**Test API Endpoints:**
```bash
# Test trainers endpoint
curl https://your-domain.com/api/trainers

# Test with filter
curl "https://your-domain.com/api/trainers?verified=true"
```

### 2. Configure DNS

If using custom domain:
- Set A record to point to your server IP (self-hosted)
- Set CNAME to point to Vercel (Vercel hosting)
- Configure SSL/TLS settings

### 3. Set Up Monitoring

**Error Tracking (Sentry):**
```bash
npm install @sentry/nextjs

# Run Sentry wizard
npx @sentry/wizard@latest -i nextjs
```

**Analytics (PostHog):**
```typescript
// In _app.tsx or layout.tsx
import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST
  })
}
```

### 4. Performance Optimization

**Enable Caching:**
- Configure CDN caching rules
- Set appropriate cache headers
- Use ISR (Incremental Static Regeneration) where applicable

**Optimize Images:**
- Use Next.js Image component
- Configure image optimization
- Use WebP format

**Bundle Analysis:**
```bash
npm install @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

# Analyze bundle
ANALYZE=true npm run build
```

---

## Monitoring

### Key Metrics to Track

1. **Performance**
   - Page load times
   - Time to First Byte (TTFB)
   - Largest Contentful Paint (LCP)
   - First Input Delay (FID)
   - Cumulative Layout Shift (CLS)

2. **Availability**
   - Uptime percentage
   - Response times
   - Error rates

3. **Business**
   - User registrations
   - Booking completions
   - Match quality scores

### Tools

**Vercel Analytics:**
- Built-in for Vercel deployments
- Real User Monitoring (RUM)
- Web Vitals tracking

**Google Analytics 4:**
```typescript
// Add to layout.tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive"
/>
```

**Uptime Monitoring:**
- UptimeRobot (free)
- Pingdom
- StatusCake

---

## Troubleshooting

### Build Failures

**Type Errors:**
```bash
# Check TypeScript errors
npm run type-check

# Fix and rebuild
npm run build
```

**Dependency Issues:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Memory Issues:**
```bash
# Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Runtime Errors

**500 Errors:**
- Check server logs
- Verify environment variables
- Check database connection
- Review Sentry errors

**404 Errors:**
- Verify routes exist
- Check build output
- Review next.config.js redirects

**API Errors:**
- Check API logs
- Verify request format
- Test with curl
- Check rate limits

### Performance Issues

**Slow Page Loads:**
- Run Lighthouse audit
- Check bundle size
- Review network waterfall
- Optimize images

**Memory Leaks:**
- Profile with Chrome DevTools
- Check for cleanup in useEffect
- Review event listeners
- Monitor server memory

---

## Rollback Procedure

### Vercel
```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback
```

### Docker
```bash
# Tag current version
docker tag reprise:latest reprise:v1.0.0

# Rollback
docker-compose down
docker-compose up -d reprise:v0.9.0
```

### Git
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset (destructive)
git reset --hard HEAD~1
git push --force origin main
```

---

## Checklist

### Pre-Deployment
- [ ] All tests pass
- [ ] Type check passes
- [ ] Lint check passes
- [ ] Build succeeds locally
- [ ] Environment variables documented
- [ ] Database migrations ready
- [ ] SSL certificate configured
- [ ] DNS records configured

### Post-Deployment
- [ ] Application accessible
- [ ] API endpoints working
- [ ] Database connected
- [ ] Error tracking active
- [ ] Analytics tracking
- [ ] Monitoring configured
- [ ] Backups enabled
- [ ] Documentation updated

---

## Support

**Issues:**
- GitHub Issues for bug reports
- Email: support@reprise.app

**Resources:**
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Docker Documentation](https://docs.docker.com)

---

**Last Updated**: January 16, 2026
