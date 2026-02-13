import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Target, Heart, Sparkles, Users, TrendingUp, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us - RepRise',
  description: 'Learn about RepRise mission to revolutionize personal training through intelligent matching and seamless booking.',
  openGraph: {
    title: 'About Us - RepRise',
    description: 'Revolutionizing personal training through intelligent matching',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-background border-b">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <Badge className="mb-8 px-5 py-2.5 text-sm font-semibold shadow-lg bg-primary text-white border-0">
              About RepRise
            </Badge>
            <h1 className="font-heading text-6xl md:text-8xl font-black mb-8 leading-tight">
              Making Fitness
              <span className="block mt-2 bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
                Personal Again
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium">
              We believe everyone deserves a trainer who truly understands them. RepRise uses intelligent matching to connect you with trainers who align with your goals, personality, and lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-6 text-sm font-semibold bg-primary text-white border-0">Our Story</Badge>
              <h2 className="font-heading text-5xl md:text-7xl font-black mb-8">
                Our <span className="bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">Mission</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                Traditional trainer matching is broken. It&apos;s based on proximity, availability, and guesswork—not on what actually matters for long-term success.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                RepRise changes that. We use a sophisticated multi-factor algorithm to match you with trainers based on your specific goals, training style preferences, personality, schedule, and budget. The result? Better matches, better results, and lasting fitness transformations.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-3 animate-fade-in delay-100 overflow-hidden group">
                <CardHeader>
                  <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Target className="w-9 h-9 text-primary" />
                  </div>
                  <CardTitle className="text-5xl font-black mb-2 text-primary">98%</CardTitle>
                  <CardDescription className="text-base font-medium">Match Satisfaction</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-3 animate-fade-in delay-200 overflow-hidden group">
                <CardHeader>
                  <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Users className="w-9 h-9 text-primary" />
                  </div>
                  <CardTitle className="text-5xl font-black mb-2 text-terracotta">150+</CardTitle>
                  <CardDescription className="text-base font-medium">Certified Trainers</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-3 animate-fade-in delay-300 overflow-hidden group">
                <CardHeader>
                  <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <TrendingUp className="w-9 h-9 text-primary" />
                  </div>
                  <CardTitle className="text-5xl font-black mb-2 text-primary">1,200+</CardTitle>
                  <CardDescription className="text-base font-medium">Sessions Booked</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-3 animate-fade-in delay-400 overflow-hidden group">
                <CardHeader>
                  <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Shield className="w-9 h-9 text-primary" />
                  </div>
                  <CardTitle className="text-5xl font-black mb-2 text-terracotta">2,500+</CardTitle>
                  <CardDescription className="text-base font-medium">Active Users</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-br from-muted/30 via-muted/10 to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="mb-4 px-4 py-1.5 bg-primary text-white border-0">Core Values</Badge>
            <h2 className="font-heading text-5xl md:text-7xl font-black mb-6">
              Our <span className="bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The principles that guide everything we build
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-3 group animate-fade-in delay-100 overflow-hidden">
              <CardHeader className="space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Heart className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="font-heading text-2xl font-bold">Human-Centered</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Fitness is deeply personal. We prioritize authentic human connections over algorithmic cold-matching. Every recommendation considers your unique personality and preferences.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-3 group animate-fade-in delay-200 overflow-hidden">
              <CardHeader className="space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="font-heading text-2xl font-bold">Quality First</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Every trainer on our platform is vetted, certified, and proven. We don&apos;t compromise on quality—your fitness journey deserves nothing less than excellence.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-3 group animate-fade-in delay-300 overflow-hidden">
              <CardHeader className="space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Target className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="font-heading text-2xl font-bold">Results-Driven</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Better matches lead to better outcomes. Our matching algorithm is continuously refined using real-world data to ensure you achieve your fitness goals.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-5xl md:text-7xl font-black mb-8">
            Ready to Find Your <span className="bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">Perfect Trainer?</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
            Join thousands of people who&apos;ve transformed their fitness journey with the right guidance.
          </p>
          <Button asChild size="lg" className="text-lg h-16 px-12 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all">
            <Link href="/match/quiz">
              Get Started Today →
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
