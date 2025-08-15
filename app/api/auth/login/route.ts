import { type NextRequest, NextResponse } from "next/server"

// Mock user database - in a real app, use a proper database
const users = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    password: "password123", // Using plain text for demo - in production use proper hashing
    createdAt: "2024-01-01T00:00:00Z",
    profileCompletion: 85,
    walletConnected: true,
    walletAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
  },
  {
    id: 2,
    name: "Demo User",
    email: "demo@rizeos.com",
    password: "demo123",
    createdAt: "2024-01-15T00:00:00Z",
    profileCompletion: 60,
    walletConnected: false,
  },
]

function generateToken(userId: number, email: string): string {
  const payload = { userId, email, timestamp: Date.now() }
  return btoa(JSON.stringify(payload))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log("[v0] Login attempt:", { email, password })

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
    }

    // Find user
    const user = users.find((u) => u.email === email)
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
