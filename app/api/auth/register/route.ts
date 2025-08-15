import { type NextRequest, NextResponse } from "next/server"

// Mock user database - in a real app, use a proper database
const users: any[] = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    password: "password123",
    createdAt: "2024-01-01T00:00:00Z",
    profileCompletion: 85,
    walletConnected: true,
    walletAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
  },
]

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

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      console.log("[v0] User already exists:", email)
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password, // In production, hash this password
      createdAt: new Date().toISOString(),
      profileCompletion: 25,
      walletConnected: false,
    }

    users.push(newUser)

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
