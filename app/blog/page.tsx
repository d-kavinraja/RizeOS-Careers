import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, TrendingUp, Zap, Users } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web3 Careers: What You Need to Know",
    excerpt:
      "Explore the emerging opportunities in blockchain technology and how to position yourself for success in the decentralized economy.",
    author: "Sarah Chen",
    date: "2024-01-15",
    category: "Web3",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    title: "AI-Powered Job Matching: How It Works",
    excerpt:
      "Discover how artificial intelligence is revolutionizing the way we match candidates with their perfect job opportunities.",
    author: "Alex Johnson",
    date: "2024-01-12",
    category: "AI",
    readTime: "4 min read",
    featured: false,
  },
  {
    id: 3,
    title: "Building Your Professional Network in the Digital Age",
    excerpt:
      "Learn effective strategies for networking online and building meaningful professional relationships that advance your career.",
    author: "Maria Rodriguez",
    date: "2024-01-10",
    category: "Career",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 4,
    title: "Remote Work Best Practices for Tech Professionals",
    excerpt:
      "Master the art of remote work with proven strategies for productivity, communication, and work-life balance.",
    author: "David Kim",
    date: "2024-01-08",
    category: "Remote Work",
    readTime: "7 min read",
    featured: false,
  },
]

const categories = ["All", "Web3", "AI", "Career", "Remote Work", "Technology"]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">RizeOS Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights, trends, and expert advice for the future of work in Web3 and AI
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((category) => (
              <Button key={category} variant="outline" size="sm">
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className={post.featured ? "border-primary" : ""}>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={post.featured ? "default" : "secondary"}>{post.category}</Badge>
                      {post.featured && <Badge variant="outline">Featured</Badge>}
                    </div>
                    <CardTitle className="text-xl hover:text-primary cursor-pointer">{post.title}</CardTitle>
                    <CardDescription className="text-base">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </div>
                        <span>{post.readTime}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Web3 Development</span>
                      <Badge variant="secondary">Hot</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">AI Job Matching</span>
                      <Badge variant="secondary">Trending</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Remote Work</span>
                      <Badge variant="secondary">Popular</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Blockchain Careers</span>
                      <Badge variant="secondary">Rising</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Quick Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/jobs" className="block text-sm hover:text-primary">
                    Browse Jobs
                  </Link>
                  <Link href="/companies" className="block text-sm hover:text-primary">
                    Top Companies
                  </Link>
                  <Link href="/resume" className="block text-sm hover:text-primary">
                    Resume AI
                  </Link>
                  <Link href="/post-job" className="block text-sm hover:text-primary">
                    Post a Job
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Join Our Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with other professionals and stay updated on the latest trends.
                  </p>
                  <Button className="w-full" asChild>
                    <Link href="/feed">Join Community</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
