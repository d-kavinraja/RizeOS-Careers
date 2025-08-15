import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { JobListings } from "@/components/job-listings"
import { Stats } from "@/components/stats"
import { CTA } from "@/components/cta"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <JobListings />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
