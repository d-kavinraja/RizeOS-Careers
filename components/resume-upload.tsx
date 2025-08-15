"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  Upload,
  FileText,
  Brain,
  CheckCircle,
  AlertCircle,
  Loader2,
  Download,
  Eye,
  Trash2,
  RefreshCw,
} from "lucide-react"

interface ParsedResume {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
  }
  summary: string
  skills: string[]
  experience: Array<{
    title: string
    company: string
    duration: string
    description: string
  }>
  education: Array<{
    degree: string
    institution: string
    year: string
  }>
  certifications: string[]
  languages: string[]
}

interface ResumeUploadProps {
  onResumeUploaded?: (resume: ParsedResume) => void
}

export function ResumeUpload({ onResumeUploaded }: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [parsing, setParsing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ]
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Please upload a PDF, DOC, DOCX, or TXT file")
        return
      }

      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB")
        return
      }

      setFile(selectedFile)
      setError(null)
      setParsedResume(null)
    }
  }, [])

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      const droppedFile = event.dataTransfer.files[0]
      if (droppedFile) {
        const fakeEvent = {
          target: { files: [droppedFile] },
        } as React.ChangeEvent<HTMLInputElement>
        handleFileSelect(fakeEvent)
      }
    },
    [handleFileSelect],
  )

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }, [])

  const uploadAndParseResume = async () => {
    if (!file) return

    setUploading(true)
    setError(null)

    try {
      // Simulate file upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      // Convert file to text for parsing
      const text = await extractTextFromFile(file)

      setParsing(true)
      setUploading(false)

      // Parse resume with AI
      const response = await fetch("/api/ai/parse-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          filename: file.name,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to parse resume")
      }

      const result = await response.json()
      setParsedResume(result.parsedResume)

      if (onResumeUploaded) {
        onResumeUploaded(result.parsedResume)
      }

      toast({
        title: "Resume Parsed Successfully",
        description: "Your resume has been analyzed and key information extracted",
      })
    } catch (err: any) {
      setError(err.message || "Failed to upload and parse resume")
      toast({
        title: "Upload Failed",
        description: err.message || "Failed to upload and parse resume",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      setParsing(false)
      setUploadProgress(0)
    }
  }

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        resolve(text)
      }
      reader.onerror = () => reject(new Error("Failed to read file"))

      if (file.type === "text/plain") {
        reader.readAsText(file)
      } else {
        // For PDF/DOC files, we'll simulate text extraction
        // In a real app, you'd use a proper PDF/DOC parser
        reader.readAsText(file)
      }
    })
  }

  const clearResume = () => {
    setFile(null)
    setParsedResume(null)
    setError(null)
    setUploadProgress(0)
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {!file && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Resume
            </CardTitle>
            <CardDescription>Upload your resume to get AI-powered insights and skill extraction</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById("resume-upload")?.click()}
            >
              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Drop your resume here</h3>
              <p className="text-muted-foreground mb-4">or click to browse files</p>
              <p className="text-xs text-muted-foreground">Supports PDF, DOC, DOCX, TXT (max 5MB)</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* File Selected */}
      {file && !parsedResume && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Resume Ready for Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={clearResume}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {uploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            {parsing && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span>AI is analyzing your resume...</span>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <Button onClick={uploadAndParseResume} disabled={uploading || parsing} className="w-full" size="lg">
              {uploading || parsing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {uploading ? "Uploading..." : "Analyzing..."}
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Analyze with AI
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Parsed Results */}
      {parsedResume && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Resume Analysis Complete
            </CardTitle>
            <CardDescription>AI has extracted key information from your resume</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Info */}
            <div className="space-y-3">
              <h4 className="font-medium">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Name:</span>
                  <span className="ml-2 font-medium">{parsedResume.personalInfo.name || "Not found"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <span className="ml-2 font-medium">{parsedResume.personalInfo.email || "Not found"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="ml-2 font-medium">{parsedResume.personalInfo.phone || "Not found"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <span className="ml-2 font-medium">{parsedResume.personalInfo.location || "Not found"}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Skills */}
            <div className="space-y-3">
              <h4 className="font-medium">Extracted Skills ({parsedResume.skills.length})</h4>
              <div className="flex flex-wrap gap-2">
                {parsedResume.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Experience */}
            {parsedResume.experience.length > 0 && (
              <>
                <div className="space-y-3">
                  <h4 className="font-medium">Work Experience</h4>
                  <div className="space-y-4">
                    {parsedResume.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-primary/20 pl-4">
                        <h5 className="font-medium">{exp.title}</h5>
                        <p className="text-sm text-muted-foreground">
                          {exp.company} • {exp.duration}
                        </p>
                        <p className="text-sm mt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Education */}
            {parsedResume.education.length > 0 && (
              <>
                <div className="space-y-3">
                  <h4 className="font-medium">Education</h4>
                  <div className="space-y-2">
                    {parsedResume.education.map((edu, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium">{edu.degree}</span>
                        <span className="text-muted-foreground"> from {edu.institution}</span>
                        {edu.year && <span className="text-muted-foreground"> ({edu.year})</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" onClick={clearResume}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Upload New Resume
              </Button>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
