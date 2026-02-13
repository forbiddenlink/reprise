import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Lock, Eye, Database, UserCheck, Bell } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy - RepRise',
  description: 'Learn how RepRise collects, uses, and protects your personal information.',
  openGraph: {
    title: 'Privacy Policy - RepRise',
    description: 'Your privacy matters to us',
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-background border-b">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <Badge className="mb-8 px-5 py-2.5 text-sm font-semibold shadow-lg bg-primary text-white border-0">
              <Shield className="w-4 h-4 mr-2" />
              Privacy Policy
            </Badge>
            <h1 className="font-heading text-5xl md:text-7xl font-black mb-6 leading-tight">
              Your Privacy
              <span className="block mt-2 bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
                Matters
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Last updated: December 30, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <Card className="border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
              <CardHeader>
                <Lock className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-xl font-black">Secure by Default</CardTitle>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use industry-standard encryption to protect your data at rest and in transit.
                </p>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
              <CardHeader>
                <Eye className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-xl font-black">Transparent Practices</CardTitle>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We&apos;re clear about what data we collect and why. No hidden tracking or selling.
                </p>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
              <CardHeader>
                <UserCheck className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-xl font-black">Your Control</CardTitle>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Access, download, or delete your data anytime. You&apos;re in control.
                </p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <Card className="border-2 mb-8">
              <CardHeader>
                <Database className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">1. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h4 className="font-bold text-foreground mb-2">Account Information</h4>
                  <p className="leading-relaxed">
                    When you create an account, we collect your name, email address, and basic profile information.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Quiz & Matching Data</h4>
                  <p className="leading-relaxed">
                    Your quiz responses help us match you with trainers. This includes fitness goals, preferences, availability, and budget.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Booking Information</h4>
                  <p className="leading-relaxed">
                    Session bookings, communication with trainers, and booking history to improve your experience.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Usage Data</h4>
                  <p className="leading-relaxed">
                    We collect analytics on how you use our platform to improve features and fix bugs. This is anonymized whenever possible.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 mb-8">
              <CardHeader>
                <Eye className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">2. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <ul className="space-y-3 list-disc list-inside">
                  <li className="leading-relaxed">
                    <strong className="text-foreground">Matching:</strong> Use your quiz responses to recommend compatible trainers
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-foreground">Communication:</strong> Send booking confirmations, reminders, and platform updates
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-foreground">Improvement:</strong> Analyze usage patterns to enhance our matching algorithm and user experience
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-foreground">Safety:</strong> Verify trainer credentials and maintain platform security
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-foreground">Legal:</strong> Comply with legal obligations and enforce our terms of service
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 mb-8">
              <CardHeader>
                <Lock className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">3. Data Protection & Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  We implement industry-standard security measures to protect your data:
                </p>
                <ul className="space-y-3 list-disc list-inside">
                  <li className="leading-relaxed">End-to-end encryption for sensitive communications</li>
                  <li className="leading-relaxed">Secure data storage with regular backups</li>
                  <li className="leading-relaxed">Two-factor authentication options</li>
                  <li className="leading-relaxed">Regular security audits and penetration testing</li>
                  <li className="leading-relaxed">Employee access controls and training</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 mb-8">
              <CardHeader>
                <UserCheck className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">4. Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">You have the right to:</p>
                <ul className="space-y-3 list-disc list-inside">
                  <li className="leading-relaxed">
                    <strong className="text-foreground">Access:</strong> Request a copy of all personal data we hold about you
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-foreground">Correction:</strong> Update or correct inaccurate information
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-foreground">Deletion:</strong> Request deletion of your account and associated data
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-foreground">Portability:</strong> Export your data in a machine-readable format
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-foreground">Opt-out:</strong> Unsubscribe from marketing communications anytime
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 mb-8">
              <CardHeader>
                <Bell className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">5. Cookies & Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  We use cookies and similar technologies to enhance your experience. Essential cookies are required for the platform to function. You can control optional cookies through your browser settings.
                </p>
                <p className="leading-relaxed">
                  Learn more in our <Link href="/cookies" className="text-primary hover:underline font-bold">Cookie Policy</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Shield className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">6. Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="leading-relaxed mb-4">
                  Questions about our privacy practices? We&apos;re here to help.
                </p>
                <p className="leading-relaxed">
                  Email: <a href="mailto:privacy@reprise.app" className="text-primary hover:underline font-bold">privacy@reprise.app</a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-black mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Your data is safe with us. Start your fitness journey today.
          </p>
          <Button asChild size="lg" className="text-lg h-14 px-12 shadow-xl hover:shadow-2xl hover:scale-105 transition-all font-bold">
            <Link href="/match/quiz">
              Take the Quiz →
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
