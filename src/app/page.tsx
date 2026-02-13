'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Target, Users, Calendar, BarChart3, Heart, Zap, ArrowRight, Star, TrendingUp, Award, Clock } from 'lucide-react'
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
      {/* Featured Hero Image Section */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 -right-20 w-[32rem] h-[32rem] bg-terracotta/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s', animationDuration: '4s' }} />
        
        <Image
          src={getHeroImage('main')}
          alt="Fitness training - Two women doing planks at the beach"
          fill
          className="object-cover brightness-[0.5]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/40" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-terracotta to-transparent opacity-50" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Badge className="mb-8 gap-2 bg-gradient-to-r from-primary to-terracotta text-white border-0 shadow-2xl animate-fade-in px-5 py-2 text-sm font-semibold backdrop-blur-sm">
              <Zap className="w-4 h-4 animate-pulse" />
              AI-Powered Trainer Matching
            </Badge>
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] animate-fade-in delay-100">
              <span className="inline-block drop-shadow-2xl">Find Your</span>
              <span className="block mt-3 bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent drop-shadow-2xl">
                Perfect Trainer
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white/95 leading-relaxed drop-shadow-lg max-w-3xl mx-auto font-medium animate-fade-in delay-200">
              Match with trainers who fit your goals, schedule, and personality.
              <span className="block mt-2 text-white/80">Stop guessing. Start training with someone who gets you.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-in delay-300">
              <Button asChild size="lg" className="group relative text-lg h-16 px-12 shadow-2xl hover:shadow-primary/50 transition-all duration-300 overflow-hidden">
                <Link href="/match/quiz" className="relative z-10">
                  <span className="relative z-10">Start Matching</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-terracotta opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-16 px-12 bg-white/10 hover:bg-white/20 border-white/40 hover:border-white/60 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105">
                <Link href="/trainers">Explore Trainers</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="mb-6 gap-2 text-sm px-4 py-2" variant="outline">
              <Target className="w-4 h-4" />
              Why Choose RepRise
            </Badge>
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Built for Better Matches
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our matching system considers what actually matters for long-term success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-fade-in delay-100 border-2 overflow-hidden bg-gradient-to-br from-background to-muted/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10 p-8 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Target className="w-9 h-9 text-primary" />
                </div>
                <CardTitle className="font-heading text-2xl font-bold">Personalized Matching</CardTitle>
                <CardDescription className="leading-relaxed text-base">
                  Our AI analyzes your goals, experience, personality, and schedule to find trainers who are the perfect fit
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-fade-in delay-200 border-2 overflow-hidden bg-gradient-to-br from-background to-muted/20">
              <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10 p-8 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-terracotta/10 to-terracotta/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Users className="w-9 h-9 text-terracotta" />
                </div>
                <CardTitle className="font-heading text-2xl font-bold">Verified Experts</CardTitle>
                <CardDescription className="leading-relaxed text-base">
                  All trainers are certified professionals with verified credentials and proven track records
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-fade-in delay-300 border-2 overflow-hidden bg-gradient-to-br from-background to-muted/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10 p-8 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Calendar className="w-9 h-9 text-primary" />
                </div>
                <CardTitle className="font-heading text-2xl font-bold">Easy Booking</CardTitle>
                <CardDescription className="leading-relaxed text-base">
                  View real-time availability and book sessions that fit your schedule with just a few clicks
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-fade-in delay-400 border-2 overflow-hidden bg-gradient-to-br from-background to-muted/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10 p-8 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <BarChart3 className="w-9 h-9 text-primary" />
                </div>
                <CardTitle className="font-heading text-2xl font-bold">Track Progress</CardTitle>
                <CardDescription className="leading-relaxed text-base">
                  Monitor your fitness journey with built-in progress tracking and goal metrics
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-fade-in delay-400 border-2 overflow-hidden bg-gradient-to-br from-background to-muted/20">
              <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10 p-8 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-terracotta/10 to-terracotta/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Heart className="w-9 h-9 text-terracotta" />
                </div>
                <CardTitle className="font-heading text-2xl font-bold">Holistic Approach</CardTitle>
                <CardDescription className="leading-relaxed text-base">
                  Match based on personality, training style, and communication preferences - not just skills
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-fade-in delay-500 border-2 overflow-hidden bg-gradient-to-br from-background to-muted/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10 p-8 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Zap className="w-9 h-9 text-primary" />
                </div>
                <CardTitle className="font-heading text-2xl font-bold">Flexible Sessions</CardTitle>
                <CardDescription className="leading-relaxed text-base">
                  Choose from virtual or in-person training, with various session lengths and pricing options
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-28 overflow-hidden bg-gradient-to-b from-background to-muted/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,107,53,0.08),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(255,107,53,0.08),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="mb-6 px-5 py-2 text-sm font-semibold" variant="outline">
              <Zap className="w-4 h-4 mr-2" />
              Simple Process
            </Badge>
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              How It Works
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From quiz to first session in under 10 minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 relative">
            {/* Connection lines - hidden on mobile */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-1 bg-gradient-to-r from-primary/30 via-terracotta to-primary/30 rounded-full" />
            
            <div className="relative text-center animate-fade-in delay-100 group">
              <div className="relative inline-block mb-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-terracotta/30 rounded-3xl blur-2xl animate-pulse" />
                <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-primary via-primary to-terracotta text-white flex items-center justify-center text-4xl font-black mx-auto shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  1
                </div>
              </div>
              <h3 className="font-heading text-3xl font-bold mb-5">Take the Quiz</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-sm mx-auto">
                Answer 6 quick questions about your fitness goals, experience level, training style preferences, schedule, and budget
              </p>
            </div>

            <div className="relative text-center animate-fade-in delay-300 group">
              <div className="relative inline-block mb-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-primary/40 rounded-3xl blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-primary to-primary shadow-[0_0_30px_rgba(255,107,53,0.5)] flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border-2 border-primary/20">
                  <span className="text-5xl font-black text-white drop-shadow-lg">2</span>
                </div>
              </div>
              <h3 className="font-heading text-3xl font-bold mb-5">Review Matches</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-sm mx-auto">
                See your personalized matches ranked by compatibility, with detailed breakdowns of why each trainer is a great fit
              </p>
            </div>

            <div className="relative text-center animate-fade-in delay-500 group">
              <div className="relative inline-block mb-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-terracotta/30 rounded-3xl blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-primary via-primary to-terracotta text-white flex items-center justify-center text-4xl font-black mx-auto shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  3
                </div>
              </div>
              <h3 className="font-heading text-3xl font-bold mb-5">Book & Start</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-sm mx-auto">
                Pick your trainer, book a session that works for you, and get started the same week
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Stats Section with Animated Counters */}
      <section className="relative py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden border-y">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-terracotta/5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <Badge variant="outline" className="mb-4 gap-2 bg-white dark:bg-slate-800 border-2">
              <TrendingUp className="w-3 h-3" />
              Platform Metrics
            </Badge>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-slate-50">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              Join a growing community of people achieving their fitness goals
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="relative group">
              <Card className="relative bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 group-hover:border-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 text-center p-8">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="text-5xl font-bold mb-2 text-primary">
                  <StatsCounter end={2500} suffix="+" />
                </div>
                <div className="text-slate-700 dark:text-slate-300 font-semibold">Active Users</div>
              </Card>
            </div>

            <div className="relative group">
              <Card className="relative bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 group-hover:border-terracotta transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 text-center p-8">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-terracotta/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Award className="w-8 h-8 text-terracotta" />
                  </div>
                </div>
                <div className="text-5xl font-bold mb-2 text-terracotta">
                  <StatsCounter end={150} suffix="+" />
                </div>
                <div className="text-slate-700 dark:text-slate-300 font-semibold">Certified Trainers</div>
              </Card>
            </div>

            <div className="relative group">
              <Card className="relative bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 group-hover:border-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 text-center p-8">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="text-5xl font-bold mb-2 text-primary">
                  <StatsCounter end={1200} suffix="+" />
                </div>
                <div className="text-slate-700 dark:text-slate-300 font-semibold">Sessions Booked</div>
              </Card>
            </div>

            <div className="relative group">
              <Card className="relative bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 group-hover:border-terracotta transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 text-center p-8">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-terracotta/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Clock className="w-8 h-8 text-terracotta" />
                  </div>
                </div>
                <div className="text-5xl font-bold mb-2 text-terracotta">
                  <StatsCounter end={98} suffix="%" />
                </div>
                <div className="text-slate-700 dark:text-slate-300 font-semibold">Satisfaction Rate</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-28 bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
        {/* Modern background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,107,53,0.08),transparent_50%),radial-gradient(circle_at_30%_80%,rgba(255,107,53,0.08),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <Badge variant="outline" className="mb-6 px-5 py-2 text-sm font-semibold backdrop-blur-sm">
              <Star className="w-4 h-4 mr-2 fill-primary text-primary" />
              Success Stories
            </Badge>
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Hear from people who found their match
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative group border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in delay-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-terracotta flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    KD
                  </div>
                  <div>
                    <CardTitle className="text-lg">Kevin D.</CardTitle>
                    <CardDescription>Software Engineer, Boston</CardDescription>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed italic">
                  &quot;I work weird hours and needed someone flexible. The quiz asked about my schedule and matched me with a trainer who does early mornings. Three months in and I haven&apos;t missed a session.&quot;
                </p>
              </CardContent>
            </Card>

            <Card className="relative group border-2 hover:border-terracotta/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in delay-200 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-terracotta to-primary flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    RN
                  </div>
                  <div>
                    <CardTitle className="text-lg">Rachel N.</CardTitle>
                    <CardDescription>New Mom, Denver</CardDescription>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed italic">
                  &quot;After my second kid, I needed someone who understood postpartum fitness. My trainer specializes in it and has been amazing. Worth every penny.&quot;
                </p>
              </CardContent>
            </Card>

            <Card className="relative group border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in delay-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-terracotta flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    TM
                  </div>
                  <div>
                    <CardTitle className="text-lg">Tom M.</CardTitle>
                    <CardDescription>Retired Teacher, Austin</CardDescription>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed italic">
                  &quot;I&apos;m 62 with a bad knee. The quiz matched me with someone who actually knows joint-friendly training. No cookie-cutter workouts here.&quot;
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-terracotta/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-terracotta/20 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="animate-fade-in">
            <Badge className="mb-8 gap-2 bg-gradient-to-r from-primary to-terracotta text-white border-0 shadow-xl px-6 py-3 text-sm font-bold">
              <Zap className="w-4 h-4" />
              Start Your Journey Today
            </Badge>
            <h2 className="font-heading text-5xl md:text-7xl font-black mb-8 leading-tight">
              Ready to Transform Your
              <span className="block mt-2 bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
                Fitness Journey?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-14 max-w-3xl mx-auto leading-relaxed font-medium">
              Take the 2-minute quiz and see who you match with. No commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button asChild size="lg" className="group relative text-lg h-16 px-14 shadow-2xl hover:shadow-primary/50 transition-all duration-300 overflow-hidden">
                <Link href="/match/quiz" className="relative z-10">
                  <span className="relative z-10">Get Started Now</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-terracotta opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-16 px-14 border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:scale-105">
                <Link href="/trainers">
                  Browse Trainers
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}

