import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Shield, Zap, Globe, Users, TrendingUp } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Our advanced AI analyzes your skills, experience, and preferences to find the perfect job matches.",
    },
    {
      icon: Shield,
      title: "Blockchain Verification",
      description:
        "Secure, transparent credential verification using blockchain technology for trust and authenticity.",
    },
    {
      icon: Zap,
      title: "Instant Applications",
      description: "Apply to multiple positions with one click using your verified Web3 profile and smart contracts.",
    },
    {
      icon: Globe,
      title: "Global Opportunities",
      description: "Access remote and on-site positions from leading Web3 companies worldwide.",
    },
    {
      icon: Users,
      title: "Community Network",
      description: "Connect with like-minded professionals and build your network in the Web3 ecosystem.",
    },
    {
      icon: TrendingUp,
      title: "Career Analytics",
      description: "Track your career progress with detailed analytics and personalized growth recommendations.",
    },
  ]

  return (
    <section className="py-24 lg:py-32 xl:py-40 bg-background">
      <div className="container">
        <div className="text-center mb-16 lg:mb-24 xl:mb-32">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6">Why Choose RizeOS?</h2>
          <p className="text-lg lg:text-xl xl:text-2xl text-muted-foreground max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto leading-relaxed">
            Experience the next generation of career platforms with cutting-edge technology and innovative features
            designed for the Web3 era.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary/20 transition-colors p-2 lg:p-4 xl:p-6">
              <CardHeader className="pb-4 lg:pb-6">
                <div className="mb-4 lg:mb-6 flex h-12 w-12 lg:h-16 lg:w-16 xl:h-20 xl:w-20 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10 text-primary" />
                </div>
                <CardTitle className="text-xl lg:text-2xl xl:text-3xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base lg:text-lg xl:text-xl leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
