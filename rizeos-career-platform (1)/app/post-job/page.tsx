"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { WalletConnect } from "@/components/wallet-connect"
import { sendPayment, verifyPayment, PLATFORM_FEE } from "@/lib/web3"
import { useToast } from "@/hooks/use-toast"
import { Briefcase, CheckCircle, Wallet, CreditCard } from "lucide-react"

interface JobFormData {
  title: string
  company: string
  description: string
  requirements: string
  location: string
  jobType: string
  salaryMin: string
  salaryMax: string
  tags: string[]
  contactEmail: string
}

export default function PostJobPage() {
  const [step, setStep] = useState<"wallet" | "payment" | "form" | "success">("wallet")
  const [walletConnected, setWalletConnected] = useState(false)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [transactionHash, setTransactionHash] = useState<string>("")
  const [jobFormData, setJobFormData] = useState<JobFormData>({
    title: "",
    company: "",
    description: "",
    requirements: "",
    location: "",
    jobType: "",
    salaryMin: "",
    salaryMax: "",
    tags: [],
    contactEmail: "",
  })
  const [currentTag, setCurrentTag] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  // Check wallet connection status
  const checkWalletConnection = () => {
    const connected = localStorage.getItem("walletConnected") === "true"
    setWalletConnected(connected)
    if (connected && step === "wallet") {
      setStep("payment")
    }
  }

  // Handle payment
  const handlePayment = async () => {
    if (!walletConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      })
      return
    }

    setPaymentProcessing(true)
    try {
      const result = await sendPayment(PLATFORM_FEE)

      if (result.success && result.transactionHash) {
        setTransactionHash(result.transactionHash)

        // Verify payment
        const verified = await verifyPayment(result.transactionHash)
        if (verified) {
          setPaymentComplete(true)
          setStep("form")
          toast({
            title: "Payment Successful",
            description: `Transaction confirmed: ${result.transactionHash.slice(0, 10)}...`,
          })
        } else {
          throw new Error("Payment verification failed")
        }
      } else {
        throw new Error(result.error || "Payment failed")
      }
    } catch (error: any) {
      console.error("Payment error:", error)
      toast({
        title: "Payment Failed",
        description: error.message || "Failed to process payment",
        variant: "destructive",
      })
    } finally {
      setPaymentProcessing(false)
    }
  }

  // Add tag
  const addTag = () => {
    if (currentTag.trim() && !jobFormData.tags.includes(currentTag.trim())) {
      setJobFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setJobFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  // Submit job
  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!paymentComplete) {
      toast({
        title: "Payment Required",
        description: "Please complete payment before posting the job",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...jobFormData,
          requirements: jobFormData.requirements.split("\n").filter((req) => req.trim()),
          paymentHash: transactionHash,
        }),
      })

      if (response.ok) {
        setStep("success")
        toast({
          title: "Job Posted Successfully",
          description: "Your job listing is now live and visible to candidates",
        })
      } else {
        throw new Error("Failed to post job")
      }
    } catch (error: any) {
      console.error("Job submission error:", error)
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to post job",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Post a{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Web3 Job</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with top talent in blockchain, DeFi, and decentralized technologies
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center space-x-2 ${step === "wallet" ? "text-primary" : walletConnected ? "text-green-500" : "text-muted-foreground"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${walletConnected ? "bg-green-500 text-white" : step === "wallet" ? "bg-primary text-white" : "bg-muted"}`}
                >
                  {walletConnected ? <CheckCircle className="h-4 w-4" /> : <Wallet className="h-4 w-4" />}
                </div>
                <span className="font-medium">Connect Wallet</span>
              </div>

              <div className="w-8 h-px bg-muted"></div>

              <div
                className={`flex items-center space-x-2 ${step === "payment" ? "text-primary" : paymentComplete ? "text-green-500" : "text-muted-foreground"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentComplete ? "bg-green-500 text-white" : step === "payment" ? "bg-primary text-white" : "bg-muted"}`}
                >
                  {paymentComplete ? <CheckCircle className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
                </div>
                <span className="font-medium">Pay Fee</span>
              </div>

              <div className="w-8 h-px bg-muted"></div>

              <div
                className={`flex items-center space-x-2 ${step === "form" ? "text-primary" : step === "success" ? "text-green-500" : "text-muted-foreground"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "success" ? "bg-green-500 text-white" : step === "form" ? "bg-primary text-white" : "bg-muted"}`}
                >
                  {step === "success" ? <CheckCircle className="h-4 w-4" /> : <Briefcase className="h-4 w-4" />}
                </div>
                <span className="font-medium">Post Job</span>
              </div>
            </div>
          </div>

          {/* Step Content */}
          {step === "wallet" && (
            <div className="flex justify-center">
              <div onLoad={checkWalletConnection}>
                <WalletConnect />
              </div>
            </div>
          )}

          {step === "payment" && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Platform Fee Payment
                </CardTitle>
                <CardDescription>
                  A small fee helps us maintain the platform and ensure quality job listings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{PLATFORM_FEE} ETH</div>
                  <p className="text-muted-foreground">Platform fee for job posting</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Job posting fee</span>
                    <span>{PLATFORM_FEE} ETH</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Network fee</span>
                    <span>~0.001 ETH</span>
                  </div>
                  <hr />
                  <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span>~{(Number.parseFloat(PLATFORM_FEE) + 0.001).toFixed(3)} ETH</span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={paymentProcessing || !walletConnected}
                  className="w-full"
                  size="lg"
                >
                  {paymentProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Wallet className="h-4 w-4 mr-2" />
                      Pay with MetaMask
                    </>
                  )}
                </Button>

                {transactionHash && (
                  <div className="text-center text-sm text-muted-foreground">
                    Transaction: {transactionHash.slice(0, 10)}...{transactionHash.slice(-8)}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {step === "form" && (
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>Fill in the details for your job posting</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleJobSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title *</Label>
                      <Input
                        id="title"
                        value={jobFormData.title}
                        onChange={(e) => setJobFormData((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. Senior Blockchain Developer"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        value={jobFormData.company}
                        onChange={(e) => setJobFormData((prev) => ({ ...prev, company: e.target.value }))}
                        placeholder="e.g. DeFi Protocol"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description *</Label>
                    <Textarea
                      id="description"
                      value={jobFormData.description}
                      onChange={(e) => setJobFormData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requirements *</Label>
                    <Textarea
                      id="requirements"
                      value={jobFormData.requirements}
                      onChange={(e) => setJobFormData((prev) => ({ ...prev, requirements: e.target.value }))}
                      placeholder="List each requirement on a new line..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={jobFormData.location}
                        onChange={(e) => setJobFormData((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="e.g. Remote, San Francisco"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobType">Job Type *</Label>
                      <Select
                        value={jobFormData.jobType}
                        onValueChange={(value) => setJobFormData((prev) => ({ ...prev, jobType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Contact Email *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={jobFormData.contactEmail}
                        onChange={(e) => setJobFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
                        placeholder="hiring@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="salaryMin">Minimum Salary (USD)</Label>
                      <Input
                        id="salaryMin"
                        type="number"
                        value={jobFormData.salaryMin}
                        onChange={(e) => setJobFormData((prev) => ({ ...prev, salaryMin: e.target.value }))}
                        placeholder="80000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salaryMax">Maximum Salary (USD)</Label>
                      <Input
                        id="salaryMax"
                        type="number"
                        value={jobFormData.salaryMax}
                        onChange={(e) => setJobFormData((prev) => ({ ...prev, salaryMax: e.target.value }))}
                        placeholder="120000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Skills & Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        placeholder="Add a skill or tag"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {jobFormData.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removeTag(tag)}
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" disabled={submitting} className="w-full" size="lg">
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Posting Job...
                      </>
                    ) : (
                      <>
                        <Briefcase className="h-4 w-4 mr-2" />
                        Post Job
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {step === "success" && (
            <Card className="max-w-2xl mx-auto text-center">
              <CardContent className="pt-12 pb-12">
                <div className="mb-6">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Job Posted Successfully!</h2>
                <p className="text-muted-foreground mb-8">
                  Your job listing is now live and visible to thousands of Web3 professionals. You'll receive
                  applications directly to your email.
                </p>
                <div className="space-y-4">
                  <Button onClick={() => (window.location.href = "/jobs")} size="lg">
                    View All Jobs
                  </Button>
                  <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
                    Go to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
