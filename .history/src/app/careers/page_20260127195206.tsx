import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Briefcase, Heart, Users, TrendingUp, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Careers - RepRise',
  description: 'Join our team and help revolutionize personal training. Explore career opportunities at RepRise.',
  openGraph: {
    title: 'Careers at RepRise',
    description: 'Help us revolutionize personal training',
  },
}

export default function CareersPage() {
  const openPositions = [
    {
      title: 'Senior Full-Stack Engineer',
      department: 'Engineering',
      location: 'Remote (US)',
      type: 'Full-time',
      description: 'Build scalable features for our matching algorithm and booking platform using Next.js, TypeScript, and modern cloud infrastructure.',
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Design intuitive experiences that help people find their perfect trainer match. Work on web and mobile interfaces.',
    },
    {
      title: 'Trainer Success Manager',
      department: 'Operations',
      location: 'Hybrid (Major Cities)',
      type: 'Full-time',
      description: 'Support our network of trainers with onboarding, best practices, and ongoing success. Build relationships and solve problems.',
    },
  ]

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, dental, vision, and free training sessions with our network.',
    },
    {
      icon: Users,
      title: 'Remote-First Culture',
      description: 'Work from anywhere in the US. We provide home office setup and coworking stipends.',
    },
    {
      icon: TrendingUp,
      title: 'Growth & Learning',
      description: '$2,000 annual learning budget, conference attendance, and mentorship programs.',
    },
    {
      icon: Clock,
      title: 'Work-Life Balance',
      description: 'Flexible hours, unlimited PTO, and 12 weeks parental leave for all parents.',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-background border-b">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <Badge className="mb-8 px-5 py-2.5 text-sm font-semibold shadow-lg bg-primary text-white border-0">
              <Briefcase className="w-4 h-4 mr-2" />
              Join Our Team
            </Badge>
            <h1 className="font-heading text-6xl md:text-8xl font-black mb-8 leading-tight">
              Help Us Change
              <span className="block mt-2 bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
                Fitness Forever
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium">
              We&apos;re on a mission to make fitness personal again. Join our team of passionate builders creating the future of personal training.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="mb-4 px-4 py-1.5 bg-primary text-white border-0">Why RepRise?</Badge>
            <h2 className="font-heading text-5xl md:text-7xl font-black mb-6">
              Built for <span className="bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">People</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We take care of our team so they can take care of our mission
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card 
                key={benefit.title}
                className="border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 group animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-black">{benefit.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed font-medium">
                    {benefit.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-28 bg-gradient-to-br from-muted/30 via-muted/10 to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="mb-4 px-4 py-1.5 bg-primary text-white border-0">Open Roles</Badge>
            <h2 className="font-heading text-5xl md:text-7xl font-black mb-6">
              Join the <span className="bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">Team</span>
            </h2>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {openPositions.map((position, index) => (
              <Card 
                key={position.title}
                className="border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-black mb-2 group-hover:text-primary transition-colors">
                        {position.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className="bg-primary/10 text-primary border-0">
                          {position.department}
                        </Badge>
                        <Badge variant="outline" className="border-2">
                          <MapPin className="w-3 h-3 mr-1" />
                          {position.location}
                        </Badge>
                        <Badge variant="outline" className="border-2">
                          <Clock className="w-3 h-3 mr-1" />
                          {position.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {position.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full h-14 text-base font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500">
                    Apply Now →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Open Positions CTA */}
          <Card className="mt-12 border-2 border-dashed max-w-2xl mx-auto">
            <CardContent className="pt-8 pb-8 text-center">
              <h3 className="font-heading text-2xl font-bold mb-3">
                Don't see the right role?
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <Button variant="outline" size="lg" className="h-12 px-8 border-2 font-bold">
                Send Your Resume
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-5xl md:text-7xl font-black mb-8">
            Ready to Make an <span className="bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">Impact?</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
            Join us in revolutionizing how people find and connect with personal trainers.
          </p>
          <Button asChild size="lg" className="text-lg h-16 px-12 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all font-bold">
            <Link href="#open-positions">
              View Open Positions →
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
