import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-primary to-accent">
      <div className="container">
        <div className="text-center text-primary-foreground">
          <div className="mb-6 flex justify-center">
            <div className="flex items-center space-x-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Join the Revolution</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Ready to Shape the Future?</h2>

          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of professionals who are already building their careers in the Web3 ecosystem. Your next
            opportunity awaits.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link href="/auth/register">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-white/20 text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <Link href="/jobs">Explore Opportunities</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
