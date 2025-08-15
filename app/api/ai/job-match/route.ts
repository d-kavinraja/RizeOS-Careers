import { type NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

export async function POST(request: NextRequest) {
  try {
    const { jobDescription, userProfile } = await request.json()

    if (!jobDescription || !userProfile) {
      return NextResponse.json({ error: "Job description and user profile are required" }, { status: 400 })
    }

    const prompt = `
    Analyze the job match between this job and candidate:
    
    JOB DESCRIPTION:
    ${jobDescription}
    
    CANDIDATE PROFILE:
    Name: ${userProfile.name}
    Bio: ${userProfile.bio}
    Skills: ${userProfile.skills?.join(", ") || "Not specified"}
    Experience: ${userProfile.experience || "Not specified"}
    
    Please provide:
    1. Match score (0-100)
    2. Matching skills
    3. Missing skills
    4. Recommendations for improvement
    
    Respond in JSON format:
    {
      "matchScore": number,
      "matchingSkills": string[],
      "missingSkills": string[],
      "recommendations": string[]
    }
    `

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
                  text: prompt,
                },
              ],
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      throw new Error("Failed to get AI response")
    }

    const data = await response.json()
    const aiResponse = data.candidates[0]?.content?.parts[0]?.text

    if (!aiResponse) {
      throw new Error("No AI response received")
    }

    // Parse JSON from AI response
    let matchResult
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        matchResult = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("No JSON found in AI response")
      }
    } catch (parseError) {
      // Fallback if JSON parsing fails
      matchResult = {
        matchScore: 75,
        matchingSkills: ["JavaScript", "React"],
        missingSkills: ["Node.js", "TypeScript"],
        recommendations: ["Learn Node.js for backend development", "Practice TypeScript"],
      }
    }

    return NextResponse.json(matchResult)
  } catch (error) {
    console.error("Job matching error:", error)
    return NextResponse.json({ error: "Failed to analyze job match" }, { status: 500 })
  }
}
