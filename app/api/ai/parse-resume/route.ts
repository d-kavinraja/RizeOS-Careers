import { type NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Starting resume parsing...");
    const { text, filename } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 });
    }

    if (!GEMINI_API_KEY || GEMINI_API_KEY.length < 20) {
      return NextResponse.json({ error: "Invalid or missing Gemini API key" }, { status: 500 });
    }

    const prompt = `
    Analyze this resume and extract structured information...
    Resume text:
    ${text.substring(0, 2000)}
    `;

    console.log("[v0] Making API call to Gemini 2.5...");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
          },
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      throw new Error("No AI response from Gemini 2.5");
    }

    const cleanedResponse = aiResponse
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
    const parsedResume = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    return NextResponse.json({
      parsedResume,
      filename,
      extractedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("[v0] Resume parsing error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
