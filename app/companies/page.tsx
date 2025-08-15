"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Users, Star, Building2, Globe, Zap } from "lucide-react"
import { useState } from "react"

const companies = [
  {
    id: 1,
    name: "MetaVerse Labs",
    logo: "🚀",
    description: "Building the future of virtual reality and blockchain integration",
    location: "San Francisco, CA",
    employees: "50-100",
    rating: 4.8,
    tags: ["VR", "Blockchain", "Web3"],
    openJobs: 12,
    website: "metaverselabs.com",
  },
  {
    id: 2,
    name: "DeFi Protocol",
    logo: "💎",
    description: "Decentralized finance solutions for the next generation",
    location: "Remote",
    employees: "100-200",
    rating: 4.9,
    tags: ["DeFi", "Smart Contracts", "Ethereum"],
    openJobs: 8,
    website: "defiprotocol.io",
  },
  {
    id: 3,
    name: "AI Blockchain Corp",
    logo: "🤖",
    description: "Combining artificial intelligence with distributed ledger technology",
    location: "New York, NY",
    employees: "200-500",
    rating: 4.7,
    tags: ["AI", "Machine Learning", "Blockchain"],
    openJobs: 15,
    website: "aiblockchain.com",
  },
  {
    id: 4,
    name: "CryptoSecure",
    logo: "🔐",
    description: "Advanced security solutions for Web3 applications",
    location: "London, UK",
    employees: "20-50",
    rating: 4.6,
    tags: ["Security", "Cryptography", "Web3"],
    openJobs: 6,
    website: "cryptosecure.io",
  },
  {
    id: 5,
    name: "NFT Studios",
    logo: "🎨",
    description: "Creating immersive NFT experiences and marketplaces",
    location: "Los Angeles, CA",
    employees: "30-50",
    rating: 4.5,
    tags: ["NFT", "Digital Art", "Marketplace"],
    openJobs: 9,
    website: "nftstudios.com",
  },
  {
    id: 6,
    name: "Web3 Analytics",
    logo: "📊",
    description: "Data analytics and insights for decentralized applications",
    location: "Austin, TX",
    employees: "50-100",
    rating: 4.8,
    tags: ["Analytics", "Data Science", "DApps"],
    openJobs: 11,
    website: "web3analytics.com",
  },
]

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCompanies, setFilteredCompanies] = useState(companies)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = companies.filter(
      (company) =>
        company.name.toLowerCase().includes(term.toLowerCase()) ||
        company.description.toLowerCase().includes(term.toLowerCase()) ||
        company.tags.some((tag) => tag.toLowerCase().includes(term.toLowerCase())),
    )
    setFilteredCompanies(filtered)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Discover{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Web3 Companies
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore innovative companies building the future of decentralized technology
          </p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{company.logo}</div>
                    <div>
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">{company.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">{company.openJobs} jobs</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{company.description}</CardDescription>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {company.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    {company.employees} employees
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Globe className="h-4 w-4 mr-2" />
                    {company.website}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {company.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1" size="sm">
                    <Building2 className="h-4 w-4 mr-2" />
                    View Company
                  </Button>
                  <Button variant="outline" size="sm">
                    <Zap className="h-4 w-4 mr-2" />
                    View Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No companies found matching your search.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
