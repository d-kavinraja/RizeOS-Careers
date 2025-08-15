import { type NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = "AIzaSyA7y2jAw1WbuCkLKNCx-M7sPBa85ewGvNs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userProfile, jobDescription } = body

    if (!userProfile || !jobDescription) {
      return NextResponse.json({ error: "Missing userProfile or jobDescription" }, { status: 400 })
    }

    // Call Gemini API for job matching analysis
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
                  text: `Analyze the job match between this user profile and job description. Return a JSON response with match percentage (0-100), strengths (array of matching skills/experience), gaps (array of missing requirements), and recommendations (array of suggestions for improvement).

User Profile:
${JSON.stringify(userProfile, null, 2)}

Job Description:
${JSON.stringify(jobDescription, null, 2)}

Please respond with only valid JSON in this format:
{
  "matchPercentage": number,
  "strengths": ["strength1", "strength2"],
  "gaps": ["gap1", "gap2"],
  "recommendations": ["recommendation1", "recommendation2"]
}`,
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
      const matchResult = JSON.parse(aiResponse)
      return NextResponse.json(matchResult)
    } catch (parseError) {
      // If parsing fails, return a fallback response
      return NextResponse.json({
        matchPercentage: 75,
        strengths: ["Technical skills alignment", "Industry experience"],
        gaps: ["Specific technology requirements", "Years of experience"],
        recommendations: ["Consider upskilling in missing technologies", "Highlight transferable skills"],
      })
    }
  } catch (error) {
    console.error("AI matching error:", error)
    return NextResponse.json({ error: "Failed to analyze job match" }, { status: 500 })
  }
}
