import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center px-4">
      <Card className="max-w-3xl w-full border-2 shadow-2xl overflow-hidden">
        <CardContent className="pt-16 pb-16 text-center relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-50" />
          
          <div className="relative z-10">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center animate-fade-in">
                <AlertCircle className="w-12 h-12 text-primary" />
              </div>
            </div>
            
            <Badge className="mb-6 px-5 py-2 text-sm font-semibold shadow-lg bg-primary text-white border-0">
              Error 404
            </Badge>
            
            <h1 className="font-heading text-5xl md:text-7xl font-black text-foreground mb-6">
              Page Not
              <span className="block mt-2 bg-gradient-to-r from-primary via-terracotta to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
                Found
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-3 font-medium">
              We couldn&apos;t find the page you&apos;re looking for.
            </p>
            
            <p className="text-muted-foreground mb-10">
              The page may have been moved, deleted, or the URL might be incorrect.
            </p>

            <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
              <Button asChild size="lg" className="h-14 text-base font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                <Link href="/">
                  <Home className="w-5 h-5 mr-2" />
                  Go Home
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="h-14 text-base font-bold border-2 hover:scale-105 transition-all">
                <Link href="/match/quiz">
                  <Search className="w-5 h-5 mr-2" />
                  Find a Trainer
                </Link>
              </Button>
            </div>

            <div className="pt-8 border-t-2">
              <p className="text-sm font-bold text-muted-foreground mb-4">
                Popular pages you might be looking for:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/" 
                  className="text-sm text-primary hover:underline font-bold transition-colors hover:text-primary/80"
                >
                  Home
                </Link>
                <Link 
                  href="/trainers" 
                  className="text-sm text-primary hover:underline font-bold transition-colors hover:text-primary/80"
                >
                  Browse Trainers
                </Link>
                <Link 
                  href="/match/quiz" 
                  className="text-sm text-primary hover:underline font-bold transition-colors hover:text-primary/80"
                >
                  Take Quiz
                </Link>
                <Link 
                  href="/about" 
                  className="text-sm text-primary hover:underline font-bold transition-colors hover:text-primary/80"
                >
                  About Us
                </Link>
                <Link 
                  href="/pricing" 
                  className="text-sm text-primary hover:underline font-bold transition-colors hover:text-primary/80"
                >
                  Pricing
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
