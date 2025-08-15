"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Globe, Zap, Users, Target, Rocket, Shield, Heart } from "lucide-react"
import Link from "next/link"

const teamMembers = [
  {
    name: "Alex Chen",
    role: "CEO & Co-Founder",
    bio: "Former blockchain engineer at Ethereum Foundation with 8+ years in Web3",
    avatar: "👨‍💼",
  },
  {
    name: "Sarah Kim",
    role: "CTO & Co-Founder",
    bio: "AI researcher and full-stack developer, previously at Google DeepMind",
    avatar: "👩‍💻",
  },
  {
    name: "Marcus Johnson",
    role: "Head of Product",
    bio: "Product strategist with experience scaling platforms to millions of users",
    avatar: "👨‍🚀",
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Design",
    bio: "UX designer passionate about creating intuitive Web3 experiences",
    avatar: "👩‍🎨",
  },
]

const values = [
  {
    icon: <Brain className="h-6 w-6" />,
    title: "Innovation First",
    description: "We push the boundaries of what's possible in Web3 and AI technology",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Trust & Security",
    description: "Building secure, transparent systems that users can rely on",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community Driven",
    description: "Empowering individuals and communities in the decentralized future",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Human-Centric",
    description: "Technology should serve people, not the other way around",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">RizeOS</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            We're building the future of work at the intersection of AI, Web3, and human potential. Our mission is to
            democratize access to cutting-edge career opportunities in the decentralized economy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              AI-Powered
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Globe className="h-4 w-4 mr-2" />
              Web3 Native
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              Community First
            </Badge>
          </div>
        </div>

        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                The future of work is decentralized, intelligent, and human-centric. We're creating the infrastructure
                that connects talented individuals with innovative Web3 companies, using AI to make perfect matches and
                blockchain technology to ensure transparency and trust.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                From DeFi protocols to NFT marketplaces, from AI research to blockchain development - we're the bridge
                between exceptional talent and groundbreaking opportunities.
              </p>
              <Button size="lg" asChild>
                <Link href="/jobs">
                  <Target className="h-5 w-5 mr-2" />
                  Explore Opportunities
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                <div className="text-8xl">🚀</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from product development to community building
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {value.icon}
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate builders, researchers, and visionaries working to reshape the future of work
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="text-6xl mb-4">{member.avatar}</div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="font-medium text-primary">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Join the Future?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're a developer, designer, researcher, or entrepreneur, there's a place for you in the Web3
            ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/register">
                <Rocket className="h-5 w-5 mr-2" />
                Get Started
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">
                <Users className="h-5 w-5 mr-2" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
