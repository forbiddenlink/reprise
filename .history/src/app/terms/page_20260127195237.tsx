import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Scale, Shield, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service - RepRise',
  description: 'Read the RepRise terms of service and user agreement.',
  openGraph: {
    title: 'Terms of Service - RepRise',
    description: 'Terms and conditions for using RepRise',
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-background border-b">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <Badge className="mb-8 px-5 py-2.5 text-sm font-semibold shadow-lg bg-primary text-white border-0">
              <FileText className="w-4 h-4 mr-2" />
              Terms of Service
            </Badge>
            <h1 className="font-heading text-5xl md:text-7xl font-black mb-6 leading-tight">
              Terms &
              <span className="block mt-2 bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
                Conditions
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Last updated: December 30, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 mb-12 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="pt-8">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-foreground mb-2">Please Read Carefully</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    By using RepRise, you agree to these terms. If you don&apos;t agree, please don&apos;t use our services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="border-2">
              <CardHeader>
                <Scale className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  Welcome to RepRise. These Terms of Service (&quot;Terms&quot;) govern your use of our website, mobile application, and related services (collectively, the &quot;Platform&quot;). By accessing or using the Platform, you agree to be bound by these Terms.
                </p>
                <p className="leading-relaxed">
                  If you&apos;re using RepRise on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <FileText className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">2. Platform Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  RepRise is a matching and booking platform that connects fitness clients with personal trainers. We:
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li className="leading-relaxed">Provide tools for clients to find and book trainers</li>
                  <li className="leading-relaxed">Use algorithms to match clients with compatible trainers</li>
                  <li className="leading-relaxed">Facilitate communication and booking between parties</li>
                  <li className="leading-relaxed">Do NOT provide fitness training services ourselves</li>
                </ul>
                <p className="leading-relaxed font-bold text-foreground">
                  RepRise is a platform only. Training services are provided by independent trainers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Shield className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">3. User Accounts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h4 className="font-bold text-foreground mb-2">Account Registration</h4>
                  <p className="leading-relaxed">
                    You must create an account to use certain features. You agree to provide accurate, current information and keep your account credentials secure.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Account Responsibilities</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    <li className="leading-relaxed">You&apos;re responsible for all activity on your account</li>
                    <li className="leading-relaxed">You must be at least 18 years old to create an account</li>
                    <li className="leading-relaxed">You may not share your account credentials</li>
                    <li className="leading-relaxed">Notify us immediately of any unauthorized access</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <FileText className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">4. Payments & Fees</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h4 className="font-bold text-foreground mb-2">Platform Fees</h4>
                  <p className="leading-relaxed">
                    RepRise is currently free for clients. We don&apos;t charge platform fees, booking fees, or subscription costs to clients using the service.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Trainer Payments</h4>
                  <p className="leading-relaxed">
                    You pay trainers directly for their services. RepRise does not process payments between clients and trainers. All payment arrangements, rates, and refund policies are between you and your trainer.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Future Changes</h4>
                  <p className="leading-relaxed">
                    We reserve the right to introduce fees in the future. We&apos;ll provide at least 30 days notice before implementing any new fees.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <AlertCircle className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">5. User Conduct</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">You agree NOT to:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li className="leading-relaxed">Violate any laws or regulations</li>
                  <li className="leading-relaxed">Harass, abuse, or harm other users or trainers</li>
                  <li className="leading-relaxed">Impersonate others or provide false information</li>
                  <li className="leading-relaxed">Attempt to bypass security measures or access restricted areas</li>
                  <li className="leading-relaxed">Use the Platform for unauthorized commercial purposes</li>
                  <li className="leading-relaxed">Scrape, crawl, or collect data without permission</li>
                  <li className="leading-relaxed">Interfere with the Platform&apos;s operation or infrastructure</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Shield className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">6. Disclaimers & Limitations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h4 className="font-bold text-foreground mb-2">No Warranties</h4>
                  <p className="leading-relaxed">
                    The Platform is provided &quot;as is&quot; without warranties of any kind. We don&apos;t guarantee uninterrupted or error-free service.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Trainer Services</h4>
                  <p className="leading-relaxed">
                    RepRise does NOT employ trainers. Trainers are independent contractors. We don&apos;t guarantee the quality, safety, or results of any training services. We verify trainer certifications but are not responsible for trainer conduct or services.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Health & Safety</h4>
                  <p className="leading-relaxed font-bold text-foreground">
                    IMPORTANT: Consult your doctor before starting any fitness program. RepRise is not responsible for injuries or health issues resulting from training activities.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Scale className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">7. Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  We reserve the right to suspend or terminate your account at any time for violations of these Terms or any other reason. You may also delete your account at any time through your account settings.
                </p>
                <p className="leading-relaxed">
                  Upon termination, you lose access to your account and all associated data, except where required by law to retain it.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <FileText className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">8. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  We may update these Terms periodically. We'll notify you of material changes via email or Platform notification. Continued use after changes constitutes acceptance of the new Terms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Shield className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">9. Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="leading-relaxed mb-4">
                  Questions about these Terms? Contact us:
                </p>
                <p className="leading-relaxed">
                  Email: <a href="mailto:legal@reprise.com" className="text-primary hover:underline font-bold">legal@reprise.com</a><br />
                  Address: 123 Fitness Street, Suite 456, San Francisco, CA 94102
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-black mb-6">
            Ready to Find Your Trainer?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            By using RepRise, you agree to these terms. Let's get started!
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
