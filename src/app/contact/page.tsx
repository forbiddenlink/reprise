import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, MessageSquare, Phone, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us - RepRise',
  description: 'Get in touch with the RepRise team. We\'re here to help with any questions about our platform.',
  openGraph: {
    title: 'Contact RepRise',
    description: 'Get in touch with our team',
  },
}

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us an email anytime',
      value: 'hello@reprise.com',
      action: 'mailto:hello@reprise.com',
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Mon-Fri, 9am-6pm EST',
      value: '(555) 123-4567',
      action: 'tel:+15551234567',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Available during business hours',
      value: 'Start Chat',
      action: '#',
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
              <MessageSquare className="w-4 h-4 mr-2" />
              Get in Touch
            </Badge>
            <h1 className="font-heading text-6xl md:text-8xl font-black mb-8 leading-tight">
              We're Here to
              <span className="block mt-2 bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
                Help
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium">
              Have questions about RepRise? Want to become a trainer? Need support? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <Card 
                key={method.title}
                className="border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 group animate-fade-in text-center overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <method.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-black">{method.title}</CardTitle>
                  <CardDescription className="text-sm font-medium">
                    {method.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-bold text-foreground mb-4">{method.value}</p>
                  <Button asChild variant="outline" className="w-full border-2 font-bold hover:scale-105 transition-all">
                    <a href={method.action}>{method.title.split(' ')[0]}</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-3xl font-black text-center">Send Us a Message</CardTitle>
                <CardDescription className="text-center text-base">
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="font-bold">First Name</Label>
                      <Input id="firstName" placeholder="John" className="h-12 border-2" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="font-bold">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" className="h-12 border-2" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-bold">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="h-12 border-2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-bold">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" className="h-12 border-2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-bold">Message</Label>
                    <textarea 
                      id="message" 
                      rows={6}
                      placeholder="Tell us more about your question or feedback..."
                      className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full h-14 text-base font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                    Send Message →
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Office Info */}
      <section className="py-28 bg-gradient-to-br from-muted/30 via-muted/10 to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-2">
              <CardHeader>
                <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-black">Visit Our Office</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  RepRise HQ<br />
                  123 Fitness Street, Suite 456<br />
                  San Francisco, CA 94102
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-black">Business Hours</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                  Saturday: 10:00 AM - 4:00 PM EST<br />
                  Sunday: Closed
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
