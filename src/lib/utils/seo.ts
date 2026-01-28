/**
 * SEO utilities and metadata helpers
 */

import type { Metadata } from 'next'

interface SEOConfig {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  keywords?: string[]
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

/**
 * Generate comprehensive SEO metadata
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    image = '/images/og-image.png',
    url,
    type = 'website',
    keywords = [],
    author,
    publishedTime,
    modifiedTime,
  } = config

  const siteName = 'RepRise'
  const fullTitle = `${title} | ${siteName}`

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : undefined,
    openGraph: {
      title: fullTitle,
      description,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      url,
      siteName,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
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
  }
}

/**
 * Generate structured data for rich snippets
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RepRise',
    description: 'AI-powered fitness trainer matching platform',
    url: 'https://reprise.app',
    logo: 'https://reprise.app/logo.png',
    sameAs: [
      'https://twitter.com/reprise',
      'https://facebook.com/reprise',
      'https://instagram.com/reprise',
      'https://linkedin.com/company/reprise',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@reprise.app',
      contactType: 'Customer Service',
    },
  }
}

/**
 * Generate trainer profile structured data
 */
export function generateTrainerSchema(trainer: {
  name: string
  bio: string
  rating: number
  totalSessions: number
  specialties: string[]
  certifications: string[]
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: trainer.name,
    description: trainer.bio,
    image: trainer.image,
    jobTitle: 'Personal Trainer',
    knowsAbout: trainer.specialties,
    hasCredential: trainer.certifications.map((cert) => ({
      '@type': 'EducationalOccupationalCredential',
      name: cert,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: trainer.rating,
      reviewCount: trainer.totalSessions,
      bestRating: 5,
      worstRating: 0,
    },
  }
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate FAQ structured data
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
