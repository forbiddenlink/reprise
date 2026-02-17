import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Sparkles } from 'lucide-react'
// Badge used only for "Most Popular" label on featured plan

export const metadata: Metadata = {
  title: 'Pricing - RepRise',
  description: 'Simple, transparent pricing for finding your perfect fitness trainer. Pay only for the sessions you book.',
}

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for exploring trainers',
      features: [
        'Unlimited trainer browsing',
        'AI-powered matching quiz',
        'View trainer profiles',
        'Read reviews and ratings',
        'Schedule consultation calls',
      ],
      cta: 'Get Started',
      href: '/match/quiz',
      popular: false,
    },
    {
      name: 'Pay Per Session',
      price: '$45-150',
      priceDetail: 'per session',
      description: 'Most flexible option',
      features: [
        'Everything in Starter',
        'Book individual sessions',
        'Choose any trainer',
        'Cancel anytime',
        'No long-term commitment',
        'Direct trainer messaging',
      ],
      cta: 'Find a Trainer',
      href: '/match/quiz',
      popular: true,
    },
    {
      name: 'Session Packages',
      price: '$300+',
      priceDetail: '5-20 sessions',
      description: 'Best value for committed clients',
      features: [
        'Everything in Pay Per Session',
        'Save 15-25% per session',
        'Priority booking',
        'Flexible scheduling',
        'Progress tracking included',
        'Nutrition guidance add-ons',
      ],
      cta: 'View Packages',
      href: '/match/quiz',
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 md:py-20 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-medium text-primary mb-3">
              Simple Pricing
            </p>
            <h1 className="font-heading text-h1 mb-4">
              Pay Only For What You Need
            </h1>
            <p className="text-lg text-muted-foreground">
              RepRise is free to use. You only pay trainers directly for the sessions you book. No platform fees, no hidden costs.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card 
                key={plan.name}
                className={plan.popular ? 'border-primary border-2 relative' : ''}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white border-0">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="p-6">
                  <CardTitle className="text-xl mb-1">
                    {plan.name}
                  </CardTitle>
                  <CardDescription>
                    {plan.description}
                  </CardDescription>
                  <div className="pt-4">
                    <span className="text-3xl font-bold text-primary">
                      {plan.price}
                    </span>
                    {plan.priceDetail && (
                      <span className="text-muted-foreground text-sm ml-1">{plan.priceDetail}</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    asChild 
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-h2 text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Do I pay RepRise or the trainer?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You pay trainers directly for sessions. RepRise is free to use for matching and booking. Trainers set their own rates, typically $45-150/hour.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Can I try a trainer before committing?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Yes! We recommend booking a single session first to ensure it&apos;s a good fit. Most trainers offer intro sessions at a discounted rate.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">What if I&apos;m not satisfied with my match?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your quiz results show multiple compatible trainers. If your first choice isn&apos;t perfect, simply try another match.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Are there any platform or booking fees?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No. RepRise is completely free for clients. You only pay trainers for their services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-h2 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Take the quiz and find your perfect trainer match today.
          </p>
          <Button asChild size="lg" className="h-12 px-8">
            <Link href="/match/quiz">
              Start Matching Quiz
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
