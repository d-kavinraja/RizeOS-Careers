"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone, Clock, Send, MessageCircle, Users, Briefcase } from "lucide-react"
import { useState } from "react"

const contactInfo = [
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Email Us",
    description: "Get in touch via email",
    contact: "hello@rizeos.com",
    action: "mailto:hello@rizeos.com",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    title: "Call Us",
    description: "Speak with our team",
    contact: "+1 (555) 123-4567",
    action: "tel:+15551234567",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Visit Us",
    description: "Our headquarters",
    contact: "San Francisco, CA",
    action: "#",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Business Hours",
    description: "Monday - Friday",
    contact: "9:00 AM - 6:00 PM PST",
    action: "#",
  },
]

const inquiryTypes = [
  { value: "general", label: "General Inquiry", icon: <MessageCircle className="h-4 w-4" /> },
  { value: "partnership", label: "Partnership", icon: <Users className="h-4 w-4" /> },
  { value: "careers", label: "Careers", icon: <Briefcase className="h-4 w-4" /> },
  { value: "support", label: "Technical Support", icon: <Mail className="h-4 w-4" /> },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "general",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("[v0] Contact form submitted:", formData)
    alert("Thank you for your message! We'll get back to you soon.")

    setFormData({
      name: "",
      email: "",
      company: "",
      inquiryType: "general",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Get in <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Have questions about RizeOS? Want to partner with us? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="h-5 w-5 mr-2" />
                  Send us a Message
                </CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiryType">Inquiry Type</Label>
                    <select
                      id="inquiryType"
                      value={formData.inquiryType}
                      onChange={(e) => handleInputChange("inquiryType", e.target.value)}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief subject line"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 gap-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          {info.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{info.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{info.description}</p>
                          <p className="font-medium">{info.contact}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle>Quick Response</CardTitle>
                <CardDescription>
                  We typically respond to inquiries within 24 hours during business days.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    General inquiries: Same day
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    Partnership requests: 1-2 business days
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Technical support: 4-6 hours
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
