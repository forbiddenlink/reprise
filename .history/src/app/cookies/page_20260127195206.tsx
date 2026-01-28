import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Cookie, CheckCircle, XCircle, Settings } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookie Policy - RepRise',
  description: 'Learn about how RepRise uses cookies and similar tracking technologies.',
  openGraph: {
    title: 'Cookie Policy - RepRise',
    description: 'How we use cookies on RepRise',
  },
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-background border-b">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <Badge className="mb-8 px-5 py-2.5 text-sm font-semibold shadow-lg bg-primary text-white border-0">
              <Cookie className="w-4 h-4 mr-2" />
              Cookie Policy
            </Badge>
            <h1 className="font-heading text-5xl md:text-7xl font-black mb-6 leading-tight">
              Cookie
              <span className="block mt-2 bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
                Policy
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
          <Card className="border-2 mb-12">
            <CardHeader>
              <Cookie className="w-10 h-10 text-primary mb-2" />
              <CardTitle className="text-2xl font-black">What Are Cookies?</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p className="leading-relaxed mb-4">
                Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, keep you logged in, and understand how you use the site.
              </p>
              <p className="leading-relaxed">
                RepRise uses cookies and similar technologies (like local storage and session storage) to provide you with a better experience.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="border-2">
              <CardHeader>
                <CheckCircle className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">Essential Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  These cookies are necessary for the Platform to function. They enable core features like:
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li className="leading-relaxed">Authentication (keeping you logged in)</li>
                  <li className="leading-relaxed">Security features and fraud prevention</li>
                  <li className="leading-relaxed">Session management during your visit</li>
                  <li className="leading-relaxed">Load balancing and performance optimization</li>
                </ul>
                <p className="leading-relaxed font-bold text-foreground">
                  You cannot opt out of essential cookies as they&apos;re required for the Platform to work.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Settings className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">Functional Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  These cookies enhance your experience by remembering your choices:
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li className="leading-relaxed">Language and region preferences</li>
                  <li className="leading-relaxed">Dark mode / theme preferences</li>
                  <li className="leading-relaxed">Quiz progress and saved filters</li>
                  <li className="leading-relaxed">Recently viewed trainers</li>
                </ul>
                <p className="leading-relaxed">
                  Without these cookies, some features may not work as intended, but the Platform will still function.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Settings className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">Analytics Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  These cookies help us understand how you use RepRise so we can improve:
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li className="leading-relaxed">Page views and navigation patterns</li>
                  <li className="leading-relaxed">Feature usage and engagement metrics</li>
                  <li className="leading-relaxed">Error tracking and bug reports</li>
                  <li className="leading-relaxed">Performance monitoring (page load times, etc.)</li>
                </ul>
                <p className="leading-relaxed">
                  We use services like Google Analytics and our own analytics tools. Data is anonymized whenever possible.
                </p>
                <p className="leading-relaxed font-bold text-foreground">
                  You can opt out of analytics cookies in your browser settings.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <XCircle className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">Advertising Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed font-bold text-foreground">
                  RepRise does NOT currently use advertising cookies.
                </p>
                <p className="leading-relaxed">
                  We don&apos;t show ads or track you for advertising purposes. If this changes in the future, we&apos;ll update this policy and give you control over these cookies.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Settings className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">Third-Party Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  Some third-party services we use may set their own cookies:
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li className="leading-relaxed"><strong className="text-foreground">Google Analytics:</strong> Website analytics and usage tracking</li>
                  <li className="leading-relaxed"><strong className="text-foreground">Vercel:</strong> Hosting and performance monitoring</li>
                </ul>
                <p className="leading-relaxed">
                  These services have their own privacy policies. We recommend reviewing them if you're concerned about third-party data collection.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Settings className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">Managing Your Cookie Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h4 className="font-bold text-foreground mb-2">Browser Settings</h4>
                  <p className="leading-relaxed">
                    Most browsers allow you to control cookies through settings. You can typically:
                  </p>
                  <ul className="space-y-2 list-disc list-inside mt-2">
                    <li className="leading-relaxed">View which cookies are stored</li>
                    <li className="leading-relaxed">Delete cookies individually or all at once</li>
                    <li className="leading-relaxed">Block cookies from specific websites</li>
                    <li className="leading-relaxed">Block all third-party cookies</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Browser-Specific Instructions</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    <li className="leading-relaxed"><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                    <li className="leading-relaxed"><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
                    <li className="leading-relaxed"><strong>Safari:</strong> Preferences → Privacy</li>
                    <li className="leading-relaxed"><strong>Edge:</strong> Settings → Privacy → Cookies</li>
                  </ul>
                </div>
                <p className="leading-relaxed font-bold text-foreground">
                  Note: Blocking all cookies may prevent some parts of RepRise from working properly.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Cookie className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">Cookie Duration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h4 className="font-bold text-foreground mb-2">Session Cookies</h4>
                  <p className="leading-relaxed">
                    These cookies are temporary and are deleted when you close your browser.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Persistent Cookies</h4>
                  <p className="leading-relaxed">
                    These cookies remain on your device for a set period (typically 30 days to 2 years) or until you manually delete them. We use persistent cookies for features like "remember me" and saved preferences.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Settings className="w-10 h-10 text-primary mb-2" />
                <CardTitle className="text-2xl font-black">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="leading-relaxed mb-4">
                  Questions about our use of cookies? Contact us:
                </p>
                <p className="leading-relaxed">
                  Email: <a href="mailto:privacy@reprise.com" className="text-primary hover:underline font-bold">privacy@reprise.com</a><br />
                  See our full <Link href="/privacy" className="text-primary hover:underline font-bold">Privacy Policy</Link>
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
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            We use cookies responsibly to give you the best experience.
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
