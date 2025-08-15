"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, MapPin, Clock, DollarSign, Building, Filter, Star, Briefcase, Upload, Heart, Send } from "lucide-react"

interface Job {
  id: number
  title: string
  company: string
  location: string
  type: string
  salary: string
  tags: string[]
  description: string
  posted: string
  featured: boolean
}

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [savedJobs, setSavedJobs] = useState<number[]>([])
  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null as File | null,
  })
  const [isApplying, setIsApplying] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const [jobs] = useState<Job[]>([
    {
      id: 1,
      title: "Senior Blockchain Developer",
      company: "DeFi Protocol",
      location: "Remote",
      type: "Full-time",
      salary: "$120k - $180k",
      tags: ["Solidity", "Web3.js", "React", "Node.js"],
      description:
        "Build the future of decentralized finance with cutting-edge smart contracts and DeFi protocols. Work with a passionate team to create innovative financial products.",
      posted: "2 days ago",
      featured: true,
    },
    {
      id: 2,
      title: "Web3 Frontend Engineer",
      company: "MetaVerse Studios",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$100k - $150k",
      tags: ["React", "TypeScript", "Ethers.js", "IPFS"],
      description:
        "Create immersive Web3 experiences for the next generation of users in the metaverse. Design and implement user interfaces for decentralized applications.",
      posted: "1 week ago",
      featured: false,
    },
    {
      id: 3,
      title: "Smart Contract Auditor",
      company: "Security Labs",
      location: "Remote",
      type: "Contract",
      salary: "$80 - $120/hr",
      tags: ["Solidity", "Security", "Auditing", "DeFi"],
      description:
        "Ensure the security and reliability of smart contracts across various DeFi protocols. Conduct thorough security assessments and provide detailed reports.",
      posted: "3 days ago",
      featured: false,
    },
    {
      id: 4,
      title: "DevOps Engineer - Web3",
      company: "Blockchain Infrastructure",
      location: "New York, NY",
      type: "Full-time",
      salary: "$110k - $160k",
      tags: ["Docker", "Kubernetes", "AWS", "Blockchain"],
      description:
        "Scale blockchain infrastructure and ensure high availability for Web3 applications. Manage deployment pipelines and monitoring systems.",
      posted: "5 days ago",
      featured: true,
    },
    {
      id: 5,
      title: "Product Manager - DeFi",
      company: "Yield Protocol",
      location: "Remote",
      type: "Full-time",
      salary: "$130k - $180k",
      tags: ["Product Management", "DeFi", "Strategy", "Analytics"],
      description:
        "Lead product strategy for innovative DeFi products and drive user adoption. Work closely with engineering and design teams to deliver exceptional user experiences.",
      posted: "1 week ago",
      featured: false,
    },
    {
      id: 6,
      title: "Rust Developer",
      company: "Solana Labs",
      location: "Remote",
      type: "Full-time",
      salary: "$140k - $200k",
      tags: ["Rust", "Solana", "Blockchain", "Performance"],
      description:
        "Build high-performance blockchain applications on the Solana ecosystem. Optimize transaction processing and develop innovative consensus mechanisms.",
      posted: "4 days ago",
      featured: true,
    },
  ])

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesLocation =
      locationFilter === "all" || job.location.toLowerCase().includes(locationFilter.toLowerCase())
    const matchesType = typeFilter === "all" || job.type === typeFilter

    return matchesSearch && matchesLocation && matchesType
  })

  const handleSaveJob = (jobId: number) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsApplying(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("[v0] Job application submitted:", {
      job: selectedJob,
      application: applicationData,
    })

    alert(`Application submitted successfully for ${selectedJob?.title} at ${selectedJob?.company}!`)

    // Reset form
    setApplicationData({
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
      resume: null,
    })
    setIsApplying(false)
    setSelectedJob(null)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setApplicationData((prev) => ({ ...prev, resume: file }))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Discover{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Web3 Opportunities
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find your next career opportunity in blockchain, DeFi, and decentralized technologies
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search jobs, companies, or skills..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="san-francisco">San Francisco</SelectItem>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="london">London</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </p>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className={`hover:shadow-lg transition-shadow ${job.featured ? "border-primary/50" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        {job.featured && (
                          <Badge variant="default" className="text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
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

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4 flex-wrap gap-2">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.posted}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSaveJob(job.id)}
                        className={savedJobs.includes(job.id) ? "text-red-500" : ""}
                      >
                        <Heart className={`h-4 w-4 mr-2 ${savedJobs.includes(job.id) ? "fill-current" : ""}`} />
                        {savedJobs.includes(job.id) ? "Saved" : "Save"}
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" onClick={() => setSelectedJob(job)}>
                            <Briefcase className="h-4 w-4 mr-2" />
                            Apply Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Apply for {job.title}</DialogTitle>
                            <DialogDescription>
                              {job.company} • {job.location} • {job.type}
                            </DialogDescription>
                          </DialogHeader>

                          <form onSubmit={handleApplySubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name *</Label>
                                <Input
                                  id="fullName"
                                  value={applicationData.fullName}
                                  onChange={(e) =>
                                    setApplicationData((prev) => ({ ...prev, fullName: e.target.value }))
                                  }
                                  placeholder="Your full name"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">Email Address *</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  value={applicationData.email}
                                  onChange={(e) => setApplicationData((prev) => ({ ...prev, email: e.target.value }))}
                                  placeholder="your@email.com"
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                id="phone"
                                value={applicationData.phone}
                                onChange={(e) => setApplicationData((prev) => ({ ...prev, phone: e.target.value }))}
                                placeholder="+1 (555) 123-4567"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="resume">Resume/CV *</Label>
                              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                                <input
                                  type="file"
                                  id="resume"
                                  accept=".pdf,.doc,.docx"
                                  onChange={handleFileUpload}
                                  className="hidden"
                                  required
                                />
                                <label htmlFor="resume" className="cursor-pointer">
                                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                  <p className="text-sm text-muted-foreground">
                                    {applicationData.resume
                                      ? applicationData.resume.name
                                      : "Click to upload your resume"}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX (max 5MB)</p>
                                </label>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="coverLetter">Cover Letter *</Label>
                              <Textarea
                                id="coverLetter"
                                value={applicationData.coverLetter}
                                onChange={(e) =>
                                  setApplicationData((prev) => ({ ...prev, coverLetter: e.target.value }))
                                }
                                placeholder="Tell us why you're interested in this role and what makes you a great fit..."
                                rows={6}
                                required
                              />
                            </div>

                            <div className="flex justify-end space-x-2">
                              <DialogTrigger asChild>
                                <Button type="button" variant="outline">
                                  Cancel
                                </Button>
                              </DialogTrigger>
                              <Button type="submit" disabled={isApplying}>
                                {isApplying ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Submitting...
                                  </>
                                ) : (
                                  <>
                                    <Send className="h-4 w-4 mr-2" />
                                    Submit Application
                                  </>
                                )}
                              </Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <div className="mb-4">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setLocationFilter("all")
                    setTypeFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
