"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Globe, Brain } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container relative py-24 lg:py-32 xl:py-40">
        <div className="mx-auto max-w-4xl xl:max-w-6xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Career Matching</span>
            </div>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
            The Future of{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Web3 Careers</span>
          </h1>

          <p className="mb-8 text-lg text-muted-foreground sm:text-xl lg:text-2xl xl:text-3xl max-w-3xl xl:max-w-5xl mx-auto leading-relaxed">
            Connect with cutting-edge opportunities in blockchain, AI, and decentralized technologies. Our intelligent
            matching system finds your perfect role in the Web3 ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center mb-12 xl:mb-16">
            <Button size="lg" className="text-lg lg:text-xl px-8 py-6 lg:px-12 lg:py-8" asChild>
              <Link href="/auth/register">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg lg:text-xl px-8 py-6 lg:px-12 lg:py-8 bg-transparent"
              asChild
            >
              <Link href="/jobs">
                Browse Jobs
                <Globe className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 lg:mb-6 flex h-12 w-12 lg:h-16 lg:w-16 xl:h-20 xl:w-20 items-center justify-center rounded-lg bg-primary/10">
                <Brain className="h-6 w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10 text-primary" />
              </div>
              <h3 className="mb-2 text-lg lg:text-xl xl:text-2xl font-semibold">AI Matching</h3>
              <p className="text-sm lg:text-base xl:text-lg text-muted-foreground">
                Advanced algorithms match your skills with perfect opportunities
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 lg:mb-6 flex h-12 w-12 lg:h-16 lg:w-16 xl:h-20 xl:w-20 items-center justify-center rounded-lg bg-accent/10">
                <Globe className="h-6 w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10 text-accent" />
              </div>
              <h3 className="mb-2 text-lg lg:text-xl xl:text-2xl font-semibold">Web3 Native</h3>
              <p className="text-sm lg:text-base xl:text-lg text-muted-foreground">
                Built for the decentralized future with blockchain integration
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 lg:mb-6 flex h-12 w-12 lg:h-16 lg:w-16 xl:h-20 xl:w-20 items-center justify-center rounded-lg bg-chart-3/10">
                <Sparkles className="h-6 w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10 text-chart-3" />
              </div>
              <h3 className="mb-2 text-lg lg:text-xl xl:text-2xl font-semibold">Smart Contracts</h3>
              <p className="text-sm lg:text-base xl:text-lg text-muted-foreground">
                Transparent, automated hiring with blockchain verification
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
