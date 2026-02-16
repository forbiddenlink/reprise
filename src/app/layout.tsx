import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Source_Serif_4 } from 'next/font/google'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { SkipLink } from '@/components/accessibility/skip-link'
import { Toaster } from '@/components/ui/toaster'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import './globals.css'

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'RepRise - Find Your Perfect Fitness Trainer',
    template: '%s | RepRise'
  },
  description: 'Match with trainers who fit your goals, schedule, and personality. AI-powered matching for lasting fitness success.',
  keywords: ['fitness', 'personal trainer', 'workout', 'training', 'health', 'AI matching', 'fitness coach'],
  authors: [{ name: 'RepRise' }],
  creator: 'RepRise',
  publisher: 'RepRise',
  metadataBase: new URL('https://reprise.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://reprise.app',
    title: 'RepRise - Find Your Perfect Fitness Trainer',
    description: 'Match with trainers who fit your goals, schedule, and personality. AI-powered matching for lasting fitness success.',
    siteName: 'RepRise',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RepRise - AI-Powered Trainer Matching',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RepRise - Find Your Perfect Fitness Trainer',
    description: 'Match with trainers who fit your goals, schedule, and personality.',
    images: ['/og-image.jpg'],
    creator: '@reprise',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jakartaSans.variable} ${sourceSerif.variable}`}>
      <body className="font-body text-text-primary bg-background antialiased">
        <SkipLink />
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main-content" className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Toaster />
        <ScrollToTop />
      </body>
    </html>
  )
}
