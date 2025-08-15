"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ResumeUpload } from "@/components/resume-upload"
import { AISkillExtractor } from "@/components/ai-skill-extractor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Brain, TrendingUp, Target, Download, Share2 } from "lucide-react"

export default function ResumePage() {
  const [extractedSkills, setExtractedSkills] = useState<string[]>([])
  const [resumeData, setResumeData] = useState<any>(null)

  const handleSkillsExtracted = (skills: string[]) => {
    setExtractedSkills(skills)
  }

  const handleResumeUploaded = (resume: any) => {
    setResumeData(resume)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              AI-Powered{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Resume Analysis
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload your resume and get AI-powered insights, skill extraction, and career recommendations
            </p>
          </div>

          <Tabs defaultValue="upload" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Upload Resume
              </TabsTrigger>
              <TabsTrigger value="extract" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Extract Skills
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Career Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6">
              <ResumeUpload onResumeUploaded={handleResumeUploaded} />

              {resumeData && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Resume Optimization Tips
                    </CardTitle>
                    <CardDescription>AI-generated recommendations to improve your resume</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-medium text-green-600">Strengths</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Strong technical skill set</li>
                          <li>• Clear work experience progression</li>
                          <li>• Relevant education background</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium text-orange-600">Areas for Improvement</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Add more quantifiable achievements</li>
                          <li>• Include relevant certifications</li>
                          <li>• Optimize for ATS keywords</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Optimized Resume
                      </Button>
                      <Button variant="outline">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Analysis
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="extract" className="space-y-6">
              <AISkillExtractor onSkillsExtracted={handleSkillsExtracted} />

              {extractedSkills.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Skill Analysis</CardTitle>
                    <CardDescription>
                      Based on the extracted skills, here's how you compare to market demands
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">85%</div>
                        <div className="text-sm text-muted-foreground">Market Relevance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{extractedSkills.length}</div>
                        <div className="text-sm text-muted-foreground">Skills Identified</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">12</div>
                        <div className="text-sm text-muted-foreground">Matching Jobs</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Trending Skills You Have</h4>
                      <div className="flex flex-wrap gap-2">
                        {extractedSkills.slice(0, 8).map((skill, index) => (
                          <Badge key={index} variant="default" className="bg-green-100 text-green-800">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Recommended Skills to Learn</h4>
                      <div className="flex flex-wrap gap-2">
                        {["TypeScript", "Docker", "Kubernetes", "GraphQL", "AWS"].map((skill, index) => (
                          <Badge key={index} variant="outline" className="border-orange-300 text-orange-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Career Trajectory
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Current Level</span>
                        <Badge variant="secondary">Mid-Level</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Next Role</span>
                        <span className="text-sm font-medium">Senior Developer</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Time to Promotion</span>
                        <span className="text-sm font-medium">12-18 months</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Salary Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Current Market Rate</span>
                        <span className="text-sm font-medium">$85k - $120k</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">With Recommended Skills</span>
                        <span className="text-sm font-medium text-green-600">$100k - $140k</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Potential Increase</span>
                        <span className="text-sm font-medium text-green-600">+20%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Personalized Learning Path</CardTitle>
                  <CardDescription>Based on your current skills and career goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {[
                      {
                        title: "Advanced React Patterns",
                        description: "Learn advanced React concepts like render props, higher-order components",
                        duration: "2-3 weeks",
                        priority: "High",
                      },
                      {
                        title: "System Design Fundamentals",
                        description: "Understand scalable system architecture and design patterns",
                        duration: "4-6 weeks",
                        priority: "High",
                      },
                      {
                        title: "Cloud Computing (AWS)",
                        description: "Get hands-on experience with cloud services and deployment",
                        duration: "3-4 weeks",
                        priority: "Medium",
                      },
                    ].map((course, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{course.title}</h4>
                          <Badge variant={course.priority === "High" ? "default" : "secondary"}>
                            {course.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{course.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{course.duration}</span>
                          <Button size="sm" variant="outline">
                            Start Learning
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
