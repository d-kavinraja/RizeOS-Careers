import { type NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Mock jobs database
const availableJobs = [
  {
    id: 1,
    title: "Senior Blockchain Developer",
    company: "DeFi Protocol",
    skills: ["Solidity", "Web3.js", "React", "Node.js", "DeFi"],
    experience: "Senior",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $180k",
  },
  {
    id: 2,
    title: "Web3 Frontend Engineer",
    company: "MetaVerse Studios",
    skills: ["React", "TypeScript", "Ethers.js", "IPFS"],
    experience: "Mid-level",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$100k - $150k",
  },
  {
    id: 3,
    title: "Smart Contract Auditor",
    company: "Security Labs",
    skills: ["Solidity", "Security", "Auditing", "DeFi"],
    experience: "Senior",
    location: "Remote",
    type: "Contract",
    salary: "$80 - $120/hr",
  },
  {
    id: 4,
    title: "DevOps Engineer - Web3",
    company: "Blockchain Infrastructure",
    skills: ["Docker", "Kubernetes", "AWS", "Blockchain"],
    experience: "Mid-level",
    location: "New York, NY",
    type: "Full-time",
    salary: "$110k - $160k",
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userProfile } = body

    if (!userProfile) {
      return NextResponse.json({ error: "Missing userProfile" }, { status: 400 })
    }

    // Call Gemini API for job recommendations
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Based on this user profile, analyze and rank the following job opportunities. Return a JSON array of job recommendations with match scores (0-100) and reasons.

User Profile:
${JSON.stringify(userProfile, null, 2)}

Available Jobs:
${JSON.stringify(availableJobs, null, 2)}

Please respond with only valid JSON in this format:
[
  {
    "jobId": number,
    "matchScore": number,
    "reasons": ["reason1", "reason2"],
    "title": "job title",
    "company": "company name"
  }
]

Rank by match score (highest first) and include only jobs with score > 60.`,
                },
              ],
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      throw new Error("Failed to call Gemini API")
    }

    const data = await response.json()
    const aiResponse = data.candidates[0].content.parts[0].text

    try {
      // Parse the AI response as JSON
      const recommendations = JSON.parse(aiResponse)

      // Enrich recommendations with full job data
      const enrichedRecommendations = recommendations.map((rec: any) => {
        const fullJob = availableJobs.find((job) => job.id === rec.jobId)
        return {
          ...rec,
          ...fullJob,
          matchScore: rec.matchScore,
          reasons: rec.reasons,
        }
      })

      return NextResponse.json(enrichedRecommendations)
    } catch (parseError) {
      // If parsing fails, return fallback recommendations
      const fallbackRecommendations = availableJobs.slice(0, 3).map((job, index) => ({
        ...job,
        matchScore: 85 - index * 10,
        reasons: ["Skills alignment", "Experience level match", "Industry fit"],
      }))

      return NextResponse.json(fallbackRecommendations)
    }
  } catch (error) {
    console.error("AI recommendations error:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}
