interface User {
  id: string
  email: string
  password: string
  name: string
  bio?: string
  skills?: string[]
  walletAddress?: string
  createdAt: Date
  updatedAt: Date
}

interface Job {
  id: string
  title: string
  company: string
  description: string
  requirements: string[]
  salary: string
  location: string
  type: string
  postedBy: string
  createdAt: Date
  applications: Application[]
}

interface Application {
  id: string
  jobId: string
  userId: string
  coverLetter: string
  resumeUrl?: string
  status: "pending" | "reviewed" | "accepted" | "rejected"
  createdAt: Date
}

interface Post {
  id: string
  userId: string
  content: string
  type: "text" | "article" | "question"
  likes: string[]
  comments: Comment[]
  createdAt: Date
}

interface Comment {
  id: string
  userId: string
  content: string
  createdAt: Date
}

// In-memory database simulation
class LocalDatabase {
  private users: Map<string, User> = new Map()
  private jobs: Map<string, Job> = new Map()
  private applications: Map<string, Application> = new Map()
  private posts: Map<string, Post> = new Map()

  constructor() {
    this.seedData()
  }

  private seedData() {
    // Seed users
    const sampleUsers: User[] = [
      {
        id: "1",
        email: "alex@example.com",
        password: "password123",
        name: "Alex Johnson",
        bio: "Full-stack developer with 5 years of experience",
        skills: ["React", "Node.js", "TypeScript", "Web3"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        email: "sarah@example.com",
        password: "password123",
        name: "Sarah Chen",
        bio: "AI/ML Engineer passionate about blockchain technology",
        skills: ["Python", "TensorFlow", "Solidity", "React"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    sampleUsers.forEach((user) => this.users.set(user.id, user))

    // Seed jobs
    const sampleJobs: Job[] = [
      {
        id: "1",
        title: "Senior Full-Stack Developer",
        company: "TechCorp",
        description: "Join our team to build next-generation Web3 applications",
        requirements: ["React", "Node.js", "Web3", "3+ years experience"],
        salary: "$120,000 - $150,000",
        location: "Remote",
        type: "Full-time",
        postedBy: "1",
        createdAt: new Date(),
        applications: [],
      },
      {
        id: "2",
        title: "AI Engineer",
        company: "AI Innovations",
        description: "Develop cutting-edge AI solutions for career matching",
        requirements: ["Python", "Machine Learning", "TensorFlow", "2+ years experience"],
        salary: "$100,000 - $130,000",
        location: "San Francisco, CA",
        type: "Full-time",
        postedBy: "2",
        createdAt: new Date(),
        applications: [],
      },
    ]

    sampleJobs.forEach((job) => this.jobs.set(job.id, job))

    // Seed posts
    const samplePosts: Post[] = [
      {
        id: "1",
        userId: "1",
        content:
          "Just completed my first Web3 project! The future of decentralized applications is incredibly exciting. What are your thoughts on the current state of blockchain development?",
        type: "text",
        likes: ["2"],
        comments: [
          {
            id: "1",
            userId: "2",
            content: "Congratulations! Web3 is definitely the future. What blockchain did you build on?",
            createdAt: new Date(),
          },
        ],
        createdAt: new Date(),
      },
    ]

    samplePosts.forEach((post) => this.posts.set(post.id, post))
  }

  // User methods
  async createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
    const id = Date.now().toString()
    const user: User = {
      ...userData,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.users.set(id, user)
    return user
  }

  async getUserByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user
      }
    }
    return null
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const user = this.users.get(id)
    if (!user) return null

    const updatedUser = { ...user, ...updates, updatedAt: new Date() }
    this.users.set(id, updatedUser)
    return updatedUser
  }

  // Job methods
  async createJob(jobData: Omit<Job, "id" | "createdAt" | "applications">): Promise<Job> {
    const id = Date.now().toString()
    const job: Job = {
      ...jobData,
      id,
      createdAt: new Date(),
      applications: [],
    }
    this.jobs.set(id, job)
    return job
  }

  async getJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values())
  }

  async getJobById(id: string): Promise<Job | null> {
    return this.jobs.get(id) || null
  }

  // Application methods
  async createApplication(applicationData: Omit<Application, "id" | "createdAt">): Promise<Application> {
    const id = Date.now().toString()
    const application: Application = {
      ...applicationData,
      id,
      createdAt: new Date(),
    }
    this.applications.set(id, application)

    // Add to job's applications
    const job = this.jobs.get(applicationData.jobId)
    if (job) {
      job.applications.push(application)
    }

    return application
  }

  async getApplicationsByUser(userId: string): Promise<Application[]> {
    return Array.from(this.applications.values()).filter((app) => app.userId === userId)
  }

  // Post methods
  async createPost(postData: Omit<Post, "id" | "createdAt" | "likes" | "comments">): Promise<Post> {
    const id = Date.now().toString()
    const post: Post = {
      ...postData,
      id,
      likes: [],
      comments: [],
      createdAt: new Date(),
    }
    this.posts.set(id, post)
    return post
  }

  async getPosts(): Promise<Post[]> {
    return Array.from(this.posts.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  async likePost(postId: string, userId: string): Promise<boolean> {
    const post = this.posts.get(postId)
    if (!post) return false

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id !== userId)
    } else {
      post.likes.push(userId)
    }

    return true
  }

  async addComment(postId: string, commentData: Omit<Comment, "id" | "createdAt">): Promise<Comment | null> {
    const post = this.posts.get(postId)
    if (!post) return null

    const comment: Comment = {
      ...commentData,
      id: Date.now().toString(),
      createdAt: new Date(),
    }

    post.comments.push(comment)
    return comment
  }
}

export const db = new LocalDatabase()
export type { User, Job, Application, Post, Comment }
