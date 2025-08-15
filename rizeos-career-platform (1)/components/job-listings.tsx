"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign, Building } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function JobListings() {
  const router = useRouter()
  const { toast } = useToast()
  const [jobs] = useState([
    {
      id: 1,
      title: "Senior Blockchain Developer",
      company: "DeFi Protocol",
      location: "Remote",
      type: "Full-time",
      salary: "$120k - $180k",
      tags: ["Solidity", "Web3.js", "React", "Node.js"],
      description: "Build the future of decentralized finance with cutting-edge smart contracts.",
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "Web3 Frontend Engineer",
      company: "MetaVerse Studios",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$100k - $150k",
      tags: ["React", "TypeScript", "Ethers.js", "IPFS"],
      description: "Create immersive Web3 experiences for the next generation of users.",
      posted: "1 week ago",
    },
    {
      id: 3,
      title: "Smart Contract Auditor",
      company: "Security Labs",
      location: "Remote",
      type: "Contract",
      salary: "$80 - $120/hr",
      tags: ["Solidity", "Security", "Auditing", "DeFi"],
      description: "Ensure the security and reliability of smart contracts across various protocols.",
      posted: "3 days ago",
    },
  ])

  const handleApplyNow = (jobId: number) => {
    router.push(`/jobs?apply=${jobId}`)
    toast({
      title: "Redirecting to Application",
      description: "Taking you to the job application page...",
    })
  }

  const handleViewAllJobs = () => {
    router.push("/jobs")
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Opportunities</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover hand-picked positions from leading Web3 companies and startups looking for talented professionals
            like you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                    <CardDescription className="flex items-center text-base">
                      <Building className="h-4 w-4 mr-1" />
                      {job.company}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{job.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{job.description}</p>

                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {job.salary}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {job.posted}
                  </div>
                </div>

                <Button className="w-full" onClick={() => handleApplyNow(job.id)}>
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" onClick={handleViewAllJobs}>
            View All Jobs
          </Button>
        </div>
      </div>
    </section>
  )
}
