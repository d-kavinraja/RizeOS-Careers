import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

function generateToken(userId: string, email: string): string {
  const payload = { userId, email, timestamp: Date.now() }
  return btoa(JSON.stringify(payload))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log("[v0] Login attempt:", { email })

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
    }

    const user = await db.getUserByEmail(email)
    if (!user) {
      console.log("[v0] User not found:", email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    if (user.password !== password) {
      console.log("[v0] Invalid password for user:", email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate token
    const token = generateToken(user.id, user.email)

    // Return user without password
    const { password: _, ...userWithoutPassword } = user

    console.log("[v0] Login successful for:", email)
    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
