"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MessageCircle, Share2, Plus, TrendingUp, Users, BookOpen, Lightbulb, Send } from "lucide-react"

interface Post {
  id: number
  author: {
    name: string
    title: string
    avatar: string
    verified: boolean
  }
  content: string
  type: "advice" | "update" | "question" | "achievement"
  tags: string[]
  likes: number
  comments: number
  shares: number
  timestamp: string
  liked: boolean
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        name: "Sarah Chen",
        title: "Senior Blockchain Developer at DeFi Labs",
        avatar: "/professional-woman-diverse.png",
        verified: true,
      },
      content:
        "Just completed my first smart contract audit! 🎉 Here are 5 key things I learned that every developer should know when building secure DeFi protocols...",
      type: "advice",
      tags: ["Blockchain", "Security", "DeFi"],
      likes: 127,
      comments: 23,
      shares: 15,
      timestamp: "2 hours ago",
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
        "Excited to announce that our team just launched the first cross-chain NFT marketplace! Looking for talented developers to join our growing team. DM me if you're interested in building the future of Web3! 🚀",
      type: "update",
      tags: ["Web3", "NFT", "Hiring"],
      likes: 89,
      comments: 31,
      shares: 22,
      timestamp: "4 hours ago",
      liked: true,
    },
    {
      id: 3,
      author: {
        name: "Alex Thompson",
        title: "Junior Developer",
        avatar: "/young-developer.png",
        verified: false,
      },
      content:
        "Question for the community: What's the best way to transition from traditional web development to Web3? I have 2 years of React experience but feeling overwhelmed by all the blockchain concepts. Any advice would be appreciated! 🙏",
      type: "question",
      tags: ["Career", "Web3", "Learning"],
      likes: 45,
      comments: 67,
      shares: 8,
      timestamp: "6 hours ago",
      liked: false,
    },
    {
      id: 4,
      author: {
        name: "Dr. Emily Watson",
        title: "Blockchain Researcher at Stanford",
        avatar: "/researcher-woman.png",
        verified: true,
      },
      content:
        "Published a new research paper on 'Scalability Solutions for Ethereum 2.0' - excited to share our findings with the community. The future of blockchain scalability looks promising! Link in comments.",
      type: "achievement",
      tags: ["Research", "Ethereum", "Scalability"],
      likes: 203,
      comments: 45,
      shares: 78,
      timestamp: "1 day ago",
      liked: true,
    },
  ])

  const [newPost, setNewPost] = useState({
    content: "",
    type: "update" as Post["type"],
    tags: [] as string[],
  })
  const [currentTag, setCurrentTag] = useState("")
  const [isPosting, setIsPosting] = useState(false)

  const handleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const addTag = () => {
    if (currentTag.trim() && !newPost.tags.includes(currentTag.trim())) {
      setNewPost((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setNewPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.content.trim()) return

    setIsPosting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const post: Post = {
      id: posts.length + 1,
      author: {
        name: "You",
        title: "Web3 Developer",
        avatar: "/diverse-user-avatars.png",
        verified: false,
      },
      content: newPost.content,
      type: newPost.type,
      tags: newPost.tags,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: "Just now",
      liked: false,
    }

    setPosts((prev) => [post, ...prev])
    setNewPost({ content: "", type: "update", tags: [] })
    setIsPosting(false)
  }

  const getPostIcon = (type: Post["type"]) => {
    switch (type) {
      case "advice":
        return <Lightbulb className="h-4 w-4 text-yellow-500" />
      case "update":
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      case "question":
        return <MessageCircle className="h-4 w-4 text-purple-500" />
      case "achievement":
        return <BookOpen className="h-4 w-4 text-green-500" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getPostTypeLabel = (type: Post["type"]) => {
    switch (type) {
      case "advice":
        return "Career Advice"
      case "update":
        return "Update"
      case "question":
        return "Question"
      case "achievement":
        return "Achievement"
      default:
        return "Post"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Professional{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Feed</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with Web3 professionals, share insights, and grow your career network
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Following</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Followers</span>
                    <span className="font-medium">567</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Posts</span>
                    <span className="font-medium">89</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trending Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {["Web3", "DeFi", "Blockchain", "Smart Contracts", "NFT"].map((topic) => (
                      <Badge key={topic} variant="outline" className="mr-2 mb-2">
                        #{topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-3 space-y-6">
              {/* Create Post */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Share with the community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" size="lg">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Post
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create a New Post</DialogTitle>
                        <DialogDescription>
                          Share your insights, ask questions, or update the community
                        </DialogDescription>
                      </DialogHeader>

                      <form onSubmit={handleCreatePost} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="post-type">Post Type</Label>
                          <Select
                            value={newPost.type}
                            onValueChange={(value: Post["type"]) => setNewPost((prev) => ({ ...prev, type: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="update">Update</SelectItem>
                              <SelectItem value="advice">Career Advice</SelectItem>
                              <SelectItem value="question">Question</SelectItem>
                              <SelectItem value="achievement">Achievement</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="content">Content</Label>
                          <Textarea
                            id="content"
                            placeholder="What's on your mind? Share your thoughts with the community..."
                            value={newPost.content}
                            onChange={(e) => setNewPost((prev) => ({ ...prev, content: e.target.value }))}
                            rows={4}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Tags</Label>
                          <div className="flex gap-2">
                            <Input
                              value={currentTag}
                              onChange={(e) => setCurrentTag(e.target.value)}
                              placeholder="Add a tag"
                              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                            />
                            <Button type="button" onClick={addTag} variant="outline">
                              Add
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {newPost.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={() => removeTag(tag)}
                              >
                                {tag} ×
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button type="submit" disabled={isPosting || !newPost.content.trim()} className="w-full">
                          {isPosting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Posting...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Post
                            </>
                          )}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Posts */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{post.author.name}</h3>
                              {post.author.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{post.author.title}</p>
                            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getPostIcon(post.type)}
                          <span className="text-xs text-muted-foreground">{getPostTypeLabel(post.type)}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm leading-relaxed">{post.content}</p>

                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className={post.liked ? "text-red-500" : ""}
                          >
                            <Heart className={`h-4 w-4 mr-2 ${post.liked ? "fill-current" : ""}`} />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4 mr-2" />
                            {post.shares}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
