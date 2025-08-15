import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    console.log("[v0] Registration attempt:", { name, email })

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const existingUser = await db.getUserByEmail(email)
    if (existingUser) {
      console.log("[v0] User already exists:", email)
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    const newUser = await db.createUser({
      name,
      email,
      password, // In production, hash this password
      bio: "",
      skills: [],
    })

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser

    console.log("[v0] User created successfully:", email)
    return NextResponse.json(
      {
        message: "User created successfully",
        user: userWithoutPassword,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
