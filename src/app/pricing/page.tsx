import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Sparkles } from 'lucide-react'

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
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-background border-b">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <Badge className="mb-8 px-5 py-2.5 text-sm font-semibold shadow-lg bg-primary text-white border-0">
              💰 Simple Pricing
            </Badge>
            <h1 className="font-heading text-5xl md:text-7xl font-black mb-8 leading-tight">
              Pay Only For
              <span className="block mt-2 bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
                What You Need
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium">
              RepRise is free to use. You only pay trainers directly for the sessions you book. No platform fees, no hidden costs.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name}
                className={`transition-all duration-500 hover:-translate-y-3 group animate-fade-in overflow-hidden bg-gradient-to-br from-background to-muted/10 ${
                  plan.popular 
                    ? 'border-primary border-2 shadow-2xl scale-105 md:scale-110 z-10 relative' 
                    : 'border-2 hover:shadow-2xl'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                    <Badge className="gap-1.5 px-5 py-2 shadow-xl bg-gradient-to-r from-primary to-terracotta text-white border-0 font-bold">
                      <Sparkles className="w-4 h-4" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="space-y-5 relative z-10 p-8">
                  <CardTitle className="font-heading text-3xl font-black group-hover:text-primary transition-colors">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed font-medium">
                    {plan.description}
                  </CardDescription>
                  <div className="pt-4">
                    <span className="text-6xl font-black bg-gradient-to-br from-primary to-terracotta bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    {plan.priceDetail && (
                      <div className="text-muted-foreground text-sm mt-2 font-medium">{plan.priceDetail}</div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 p-8 pt-0">
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm leading-relaxed font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-8 pt-0">
                  <Button 
                    asChild 
                    className={`w-full shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105 h-14 text-base font-bold ${
                      plan.popular ? '' : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                  >
                    <Link href={plan.href}>{plan.cta} →</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-br from-muted/30 via-muted/10 to-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <Badge variant="outline" className="mb-4 px-4 py-1.5">
              FAQ
            </Badge>
            <h2 className="font-heading text-4xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-6">
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg animate-fade-in delay-100">
              <CardHeader>
                <CardTitle className="text-xl">Do I pay RepRise or the trainer?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  You pay trainers directly for sessions. RepRise is free to use for matching and booking. Trainers set their own rates, typically ranging from $45-150 per hour depending on experience, specialization, and location.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg animate-fade-in delay-200">
              <CardHeader>
                <CardTitle className="text-xl">Can I try a trainer before committing?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Absolutely! We recommend booking a single session first to ensure it's a good fit. Most trainers offer intro sessions at a discounted rate.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg animate-fade-in delay-300">
              <CardHeader>
                <CardTitle className="text-xl">What if I'm not satisfied with my match?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Your quiz results show multiple compatible trainers. If your first choice isn't perfect, simply try another match. Our algorithm learns from your preferences to improve future recommendations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg animate-fade-in delay-400">
              <CardHeader>
                <CardTitle className="text-xl">Are there any platform or booking fees?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  No. RepRise is completely free for clients. We don't charge platform fees, subscription costs, or booking fees. You only pay trainers for their services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Take the quiz and find your perfect trainer match today.
          </p>
          <Button asChild size="lg" className="text-lg h-14 px-12">
            <Link href="/match/quiz">
              Start Matching Quiz
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
