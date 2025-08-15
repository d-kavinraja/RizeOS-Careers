"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, AlertCircle, CheckCircle, Loader2 } from "lucide-react"

interface JobMatchProps {
  job: {
    id: number
    title: string
    company: string
    description: string
    tags: string[]
  }
  userProfile: {
    name: string
    bio: string
    skills: string[]
    experience: string
  }
}

interface MatchResult {
  matchScore: number
  matchingSkills: string[]
  missingSkills: string[]
  recommendations: string[]
}

export function AIJobMatch({ job, userProfile }: JobMatchProps) {
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzeMatch = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/job-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription: `${job.title} at ${job.company}: ${job.description}. Required skills: ${job.tags.join(", ")}`,
          userProfile,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze job match")
      }

      const result = await response.json()
      setMatchResult(result)
    } catch (err: any) {
      setError(err.message || "Failed to analyze job match")
    } finally {
      setLoading(false)
    }
  }

  const getMatchColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getMatchLabel = (score: number) => {
    if (score >= 80) return "Excellent Match"
    if (score >= 60) return "Good Match"
    return "Needs Improvement"
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Job Match Analysis
        </CardTitle>
        <CardDescription>Get AI-powered insights on how well you match this position</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!matchResult && !loading && (
          <Button onClick={analyzeMatch} className="w-full">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analyze Match
          </Button>
        )}

        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Analyzing your match...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {matchResult && (
          <div className="space-y-6">
            {/* Match Score */}
            <div className="text-center space-y-2">
              <div className={`text-3xl font-bold ${getMatchColor(matchResult.matchScore)}`}>
                {matchResult.matchScore}%
              </div>
              <div className="text-sm text-muted-foreground">{getMatchLabel(matchResult.matchScore)}</div>
              <Progress value={matchResult.matchScore} className="w-full" />
            </div>

            {/* Matching Skills */}
            {matchResult.matchingSkills.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Matching Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {matchResult.matchingSkills.map((skill, index) => (
                    <Badge key={index} variant="default" className="bg-green-100 text-green-800">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Skills */}
            {matchResult.missingSkills.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  Skills to Develop
                </h4>
                <div className="flex flex-wrap gap-2">
                  {matchResult.missingSkills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="border-orange-300 text-orange-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {matchResult.recommendations.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary" />
                  AI Recommendations
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {matchResult.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
