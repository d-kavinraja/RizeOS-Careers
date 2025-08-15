import { type NextRequest, NextResponse } from "next/server"

// Mock posts data - in a real app, this would come from a database
const posts = [
  {
    id: 1,
    author: {
      name: "Sarah Chen",
      title: "Senior Blockchain Developer at DeFi Labs",
      avatar: "/professional-woman-diverse.png",
      verified: true,
    },
    content:
      "Just completed my first smart contract audit! Here are 5 key things I learned that every developer should know when building secure DeFi protocols...",
    type: "advice",
    tags: ["Blockchain", "Security", "DeFi"],
    likes: 127,
    comments: 23,
    shares: 15,
    timestamp: "2024-01-15T10:00:00Z",
    liked: false,
  },
  {
    id: 2,
    author: {
      name: "Marcus Rodriguez",
      title: "Web3 Product Manager at MetaVerse Inc",
      avatar: "/professional-man.png",
      verified: true,
    },
    content:
      "Excited to announce that our team just launched the first cross-chain NFT marketplace! Looking for talented developers to join our growing team.",
    type: "update",
    tags: ["Web3", "NFT", "Hiring"],
    likes: 89,
    comments: 31,
    shares: 22,
    timestamp: "2024-01-15T08:00:00Z",
    liked: false,
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  let filteredPosts = posts

  if (type) {
    filteredPosts = filteredPosts.filter((post) => post.type === type)
  }

  const limitedPosts = filteredPosts.slice(0, limit)

  return NextResponse.json({
    posts: limitedPosts,
    total: filteredPosts.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, type, tags, authorId } = body

    // Validate required fields
    if (!content || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, you would save to database
    const newPost = {
      id: posts.length + 1,
      author: {
        name: "User",
        title: "Web3 Professional",
        avatar: "/diverse-user-avatars.png",
        verified: false,
      },
      content,
      type,
      tags: tags || [],
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date().toISOString(),
      liked: false,
    }

    posts.unshift(newPost)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
