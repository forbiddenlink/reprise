'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Target, Users, Calendar, BarChart3, Heart, Zap, ArrowRight, Star } from 'lucide-react'
import { getHeroImage } from '@/config/images'
import { StatsCounter } from '@/components/features/stats-counter'

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RepRise',
    description: 'AI-powered fitness trainer matching platform',
    url: 'https://reprise.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://reprise.app/trainers?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[75vh] min-h-[550px] overflow-hidden">
        <Image
          src={getHeroImage('main')}
          alt="Fitness training - Two women doing planks at the beach"
          fill
          className="object-cover brightness-[0.45]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-wider text-white/80 mb-4">
              AI-Powered Trainer Matching
            </p>
            <h1 className="font-heading text-h1 text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your{' '}
              <span className="gradient-text">Perfect Trainer</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 text-white/90 leading-relaxed max-w-2xl mx-auto">
              Match with trainers who fit your goals, schedule, and personality. Stop guessing—start training with someone who gets you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href="/match/quiz">
                  Start Matching
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Link href="/trainers">Explore Trainers</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-h2 mb-4">
              Built for Better Matches
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our matching system considers what actually matters for long-term success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Personalized Matching</CardTitle>
                <CardDescription>
                  Our AI analyzes your goals, experience, personality, and schedule to find trainers who are the perfect fit
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Verified Experts</CardTitle>
                <CardDescription>
                  All trainers are certified professionals with verified credentials and proven track records
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Easy Booking</CardTitle>
                <CardDescription>
                  View real-time availability and book sessions that fit your schedule with just a few clicks
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Track Progress</CardTitle>
                <CardDescription>
                  Monitor your fitness journey with built-in progress tracking and goal metrics
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Holistic Approach</CardTitle>
                <CardDescription>
                  Match based on personality, training style, and communication preferences—not just skills
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Flexible Sessions</CardTitle>
                <CardDescription>
                  Choose from virtual or in-person training, with various session lengths and pricing options
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-h2 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From quiz to first session in under 10 minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">Take the Quiz</h3>
              <p className="text-muted-foreground">
                Answer 6 quick questions about your goals, experience, training preferences, schedule, and budget
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">Review Matches</h3>
              <p className="text-muted-foreground">
                See personalized matches ranked by compatibility, with breakdowns of why each trainer fits
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">Book & Start</h3>
              <p className="text-muted-foreground">
                Pick your trainer, book a session that works for you, and get started the same week
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                <StatsCounter end={2500} suffix="+" />
              </div>
              <div className="text-muted-foreground text-sm">Active Users</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                <StatsCounter end={150} suffix="+" />
              </div>
              <div className="text-muted-foreground text-sm">Certified Trainers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                <StatsCounter end={1200} suffix="+" />
              </div>
              <div className="text-muted-foreground text-sm">Sessions Booked</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                <StatsCounter end={98} suffix="%" />
              </div>
              <div className="text-muted-foreground text-sm">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-h2 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from people who found their match
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    KD
                  </div>
                  <div>
                    <CardTitle className="text-base">Kevin D.</CardTitle>
                    <CardDescription className="text-sm">Software Engineer, Boston</CardDescription>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={`star-${i}`} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  &quot;I work weird hours and needed someone flexible. The quiz matched me with a trainer who does early mornings. Three months in and I haven&apos;t missed a session.&quot;
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    RN
                  </div>
                  <div>
                    <CardTitle className="text-base">Rachel N.</CardTitle>
                    <CardDescription className="text-sm">New Mom, Denver</CardDescription>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={`star-rachel-${i}`} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  &quot;After my second kid, I needed someone who understood postpartum fitness. My trainer specializes in it and has been amazing.&quot;
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    TM
                  </div>
                  <div>
                    <CardTitle className="text-base">Tom M.</CardTitle>
                    <CardDescription className="text-sm">Retired Teacher, Austin</CardDescription>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={`star-tom-${i}`} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  &quot;I&apos;m 62 with a bad knee. The quiz matched me with someone who actually knows joint-friendly training. No cookie-cutter workouts.&quot;
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-h2 mb-4">
            Ready to Find Your Trainer?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Take the 2-minute quiz and see who you match with. No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="h-12 px-8">
              <Link href="/match/quiz">
                Get Started Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8">
              <Link href="/trainers">
                Browse Trainers
              </Link>
            </Button>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}

