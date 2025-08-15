"use client"

import type React from "react"
import { toast } from "@/components/ui/use-toast"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Brain, Upload, Loader2, CheckCircle } from "lucide-react"

interface SkillExtractorProps {
  onSkillsExtracted?: (skills: string[]) => void
}

export function AISkillExtractor({ onSkillsExtracted }: SkillExtractorProps) {
  const [text, setText] = useState("")
  const [extractedSkills, setExtractedSkills] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const extractSkills = async () => {
    if (!text.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/extract-skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text.trim(),
          type: "resume/bio",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to extract skills")
      }

      const result = await response.json()
      setExtractedSkills(result.skills || [])

      if (onSkillsExtracted) {
        onSkillsExtracted(result.skills || [])
      }
    } catch (err: any) {
      setError(err.message || "Failed to extract skills")
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          setText(content)
          toast({
            title: "File Uploaded",
            description: `Loaded ${file.name} successfully. Click "Extract Skills" to analyze.`,
          })
        }
        reader.onerror = () => {
          setError("Failed to read file")
        }
        reader.readAsText(file)
      } else {
        setError("Please upload a .txt file only")
        toast({
          title: "Invalid File Type",
          description: "Please upload a .txt file for skill extraction.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Skill Extraction
        </CardTitle>
        <CardDescription>
          Paste your resume, bio, or job description to automatically extract relevant skills
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text-input">Resume/Bio Text</Label>
          <Textarea
            id="text-input"
            placeholder="Paste your resume content, bio, or any text containing skills..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            className="resize-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={extractSkills} disabled={!text.trim() || loading} className="flex-1">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Extracting Skills...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Extract Skills
              </>
            )}
          </Button>

          <div className="relative">
            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button variant="outline" type="button">
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </Button>
          </div>
        </div>

        {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

        {extractedSkills.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <h4 className="font-medium">Extracted Skills ({extractedSkills.length})</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {extractedSkills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
