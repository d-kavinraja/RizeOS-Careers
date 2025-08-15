import { type NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Starting skill extraction...")
    const { text, type } = await request.json()

    if (!text) {
      console.log("[v0] Error: No text provided")
      return NextResponse.json({ error: "Text content is required" }, { status: 400 })
    }

    console.log("[v0] Text length:", text.length)
    console.log("[v0] Content type:", type || "text")

    if (!GEMINI_API_KEY || GEMINI_API_KEY.length < 20) {
      console.log("[v0] Invalid API key")
      return NextResponse.json({ error: "Invalid or missing Gemini API key" }, { status: 500 })
    }

    const prompt = `Extract relevant skills from this ${type || "text"}. Return ONLY a valid JSON array of strings, no markdown, no additional text:

${text.substring(0, 4000)}

Format: ["skill1", "skill2", "skill3"]`

    console.log("[v0] Making API call to Gemini...")

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`

    const response = await fetch(apiUrl, {
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
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 1000,
        },
      }),
    })

    console.log("[v0] API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.log("[v0] API error response:", errorText)
      throw new Error(`API request failed with status ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!aiResponse) {
      console.log("[v0] No AI response received")
      throw new Error("No AI response received")
    }

    let skills
    try {
      // Clean up the response - remove markdown formatting
      let cleanResponse = aiResponse.trim()
      cleanResponse = cleanResponse.replace(/```json\s*/g, "").replace(/```\s*/g, "")
      cleanResponse = cleanResponse.replace(/^\s*[[{]/, "[").replace(/[\]}]\s*$/, "]")

      // Try to find JSON array in the response
      const jsonMatch = cleanResponse.match(/\[[\s\S]*?\]/)
      if (jsonMatch) {
        skills = JSON.parse(jsonMatch[0])
        console.log("[v0] Successfully parsed skills:", skills.length, "items")
      } else {
        throw new Error("No JSON array found in AI response")
      }
    } catch (parseError) {
      console.log("[v0] JSON parsing failed, using fallback extraction:", parseError)

      const commonSkills = [
        "JavaScript",
        "TypeScript",
        "Python",
        "Java",
        "C++",
        "C#",
        "PHP",
        "Ruby",
        "Go",
        "Rust",
        "React",
        "Vue.js",
        "Angular",
        "Node.js",
        "Express",
        "Next.js",
        "Django",
        "Flask",
        "HTML",
        "CSS",
        "SCSS",
        "Tailwind CSS",
        "Bootstrap",
        "SQL",
        "MongoDB",
        "PostgreSQL",
        "MySQL",
        "Redis",
        "Git",
        "GitHub",
        "GitLab",
        "Docker",
        "Kubernetes",
        "AWS",
        "Azure",
        "Google Cloud",
        "Vercel",
        "Netlify",
        "REST API",
        "GraphQL",
        "Microservices",
        "DevOps",
        "Communication",
        "Leadership",
        "Problem Solving",
        "Team Work",
        "Project Management",
        "Agile",
        "Scrum",
        "Testing",
        "Debugging",
        "Code Review",
      ]

      skills = commonSkills.filter((skill) => text.toLowerCase().includes(skill.toLowerCase())).slice(0, 15)
    }

    console.log("[v0] Final skills extracted:", skills)
    return NextResponse.json({ skills: skills || [] })
  } catch (error) {
    console.error("[v0] Skill extraction error:", error)
    return NextResponse.json(
      {
        error: "Failed to extract skills",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
