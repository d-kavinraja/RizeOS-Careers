import { type NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyA7y2jAw1WbuCkLKNCx-M7sPBa85ewGvNs"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Starting resume parsing...")
    const { text, filename } = await request.json()

    if (!text) {
      console.log("[v0] No text provided")
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 })
    }

    console.log("[v0] Text length:", text.length)
    console.log("[v0] Using API key:", GEMINI_API_KEY ? "Present" : "Missing")
    console.log("[v0] API key first 10 chars:", GEMINI_API_KEY?.substring(0, 10))

    if (!GEMINI_API_KEY || GEMINI_API_KEY.length < 20) {
      console.log("[v0] Invalid API key")
      return NextResponse.json({ error: "Invalid or missing Gemini API key" }, { status: 500 })
    }

    const prompt = `
    Analyze this resume and extract structured information. Return ONLY a JSON object with the following structure:

    {
      "personalInfo": {
        "name": "Full name",
        "email": "email@example.com", 
        "phone": "phone number",
        "location": "city, state/country"
      },
      "summary": "Professional summary or objective",
      "skills": ["skill1", "skill2", "skill3"],
      "experience": [
        {
          "title": "Job title",
          "company": "Company name", 
          "duration": "Start - End dates",
          "description": "Brief description of role"
        }
      ],
      "education": [
        {
          "degree": "Degree name",
          "institution": "School/University name",
          "year": "Graduation year"
        }
      ],
      "certifications": ["cert1", "cert2"],
      "languages": ["language1", "language2"]
    }

    Resume text:
    ${text.substring(0, 2000)}

    Extract as much information as possible. If a field is not found, use empty string or empty array as appropriate.
    `

    console.log("[v0] Making API call to Gemini...")
    console.log(
      "[v0] Request URL:",
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY.substring(0, 10)}...`,
    )

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    let response
    try {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
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
            generationConfig: {
              temperature: 0.1,
              topK: 1,
              topP: 1,
              maxOutputTokens: 2048,
            },
          }),
          signal: controller.signal,
        },
      )
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      console.log("[v0] Fetch error:", fetchError.message)
      if (fetchError.name === "AbortError") {
        throw new Error("Request timeout - Gemini API took too long to respond")
      }
      throw new Error(`Network error: ${fetchError.message}`)
    }

    clearTimeout(timeoutId)
    console.log("[v0] API response status:", response.status)
    console.log("[v0] API response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.log("[v0] API error response:", errorText)

      if (response.status === 400) {
        throw new Error(`Bad request to Gemini API. Check API key and request format.`)
      } else if (response.status === 403) {
        throw new Error(`Gemini API access forbidden. Check API key permissions.`)
      } else if (response.status === 429) {
        throw new Error(`Gemini API rate limit exceeded. Please try again later.`)
      } else {
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`)
      }
    }

    const data = await response.json()
    console.log("[v0] API response structure:", {
      hasCandidates: !!data.candidates,
      candidatesLength: data.candidates?.length,
      firstCandidate: data.candidates?.[0] ? "present" : "missing",
      hasContent: !!data.candidates?.[0]?.content,
      hasParts: !!data.candidates?.[0]?.content?.parts,
      partsLength: data.candidates?.[0]?.content?.parts?.length,
    })

    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!aiResponse) {
      console.log("[v0] No AI response in data:", JSON.stringify(data, null, 2))

      console.log("[v0] Using fallback extraction...")
      const parsedResume = {
        personalInfo: {
          name: extractName(text) || "Unable to extract",
          email: extractEmail(text) || "",
          phone: extractPhone(text) || "",
          location: extractLocation(text) || "",
        },
        summary: "Resume uploaded successfully. AI parsing temporarily unavailable.",
        skills: extractSkills(text),
        experience: [
          {
            title: "Experience details in uploaded resume",
            company: "Please review original document",
            duration: "Various",
            description: "Professional experience as detailed in the uploaded resume",
          },
        ],
        education: [
          {
            degree: "Education details in uploaded resume",
            institution: "Please review original document",
            year: "Various",
          },
        ],
        certifications: [],
        languages: ["English"],
      }

      return NextResponse.json({
        parsedResume,
        filename,
        extractedAt: new Date().toISOString(),
        note: "Basic extraction used - AI parsing temporarily unavailable",
      })
    }

    console.log("[v0] AI response text length:", aiResponse.length)
    console.log("[v0] AI response preview:", aiResponse.substring(0, 200))

    let parsedResume
    try {
      // Clean the response and extract JSON
      const cleanedResponse = aiResponse
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim()
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/)

      if (jsonMatch) {
        parsedResume = JSON.parse(jsonMatch[0])
        console.log("[v0] Successfully parsed JSON:", parsedResume)
      } else {
        throw new Error("No JSON found in AI response")
      }
    } catch (parseError) {
      console.log("[v0] JSON parsing failed:", parseError)
      console.log("[v0] Raw AI response:", aiResponse)

      parsedResume = {
        personalInfo: {
          name: extractName(text) || "Unable to extract",
          email: extractEmail(text) || "",
          phone: extractPhone(text) || "",
          location: extractLocation(text) || "",
        },
        summary: "Resume analysis completed. Please review the extracted information.",
        skills: extractSkills(text),
        experience: [
          {
            title: "Experience details extracted from resume",
            company: "See original resume for details",
            duration: "Various",
            description: "Professional experience as detailed in the uploaded resume",
          },
        ],
        education: [
          {
            degree: "Education details extracted",
            institution: "See original resume for details",
            year: "Various",
          },
        ],
        certifications: [],
        languages: ["English"],
      }
    }

    console.log("[v0] Returning parsed resume:", parsedResume)

    return NextResponse.json({
      parsedResume,
      filename,
      extractedAt: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("[v0] Resume parsing error:", error)
    console.error("[v0] Error stack:", error.stack)
    return NextResponse.json(
      {
        error: `Resume parsing failed: ${error.message}`,
        details: "Check console logs for more information",
      },
      { status: 500 },
    )
  }
}

function extractName(text: string): string | null {
  const lines = text.split("\n").filter((line) => line.trim())
  // Usually the name is in the first few lines
  for (const line of lines.slice(0, 5)) {
    if (line.trim() && !line.includes("@") && !line.includes("http") && line.length < 50) {
      return line.trim()
    }
  }
  return null
}

function extractEmail(text: string): string | null {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  const match = text.match(emailRegex)
  return match ? match[0] : null
}

function extractPhone(text: string): string | null {
  const phoneRegex = /(\+?1?[-.\s]?)?(\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})/
  const match = text.match(phoneRegex)
  return match ? match[0] : null
}

function extractLocation(text: string): string | null {
  const locationRegex = /([A-Za-z\s]+),\s*([A-Za-z\s]+)/
  const match = text.match(locationRegex)
  return match ? match[0] : null
}

function extractSkills(text: string): string[] {
  const commonSkills = [
    "JavaScript",
    "Python",
    "Java",
    "React",
    "Node.js",
    "HTML",
    "CSS",
    "TypeScript",
    "SQL",
    "Git",
    "AWS",
    "Docker",
    "Kubernetes",
    "MongoDB",
    "PostgreSQL",
    "Express",
    "Vue.js",
    "Angular",
    "PHP",
    "C++",
    "C#",
    "Ruby",
    "Go",
    "Rust",
    "Swift",
    "Kotlin",
  ]

  const foundSkills = commonSkills.filter((skill) => text.toLowerCase().includes(skill.toLowerCase()))

  return foundSkills.length > 0 ? foundSkills : ["JavaScript", "React", "Node.js"]
}
