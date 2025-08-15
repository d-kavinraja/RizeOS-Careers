import { type NextRequest, NextResponse } from "next/server"

// Mock job data - in a real app, this would come from a database
const jobs = [
  {
    id: 1,
    title: "Senior Blockchain Developer",
    company: "DeFi Protocol",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $180k",
    tags: ["Solidity", "Web3.js", "React", "Node.js"],
    description: "Build the future of decentralized finance with cutting-edge smart contracts and DeFi protocols.",
    requirements: [
      "5+ years of software development experience",
      "Strong knowledge of Solidity and smart contract development",
      "Experience with Web3.js or Ethers.js",
      "Understanding of DeFi protocols and mechanisms",
    ],
    posted: "2024-01-15T10:00:00Z",
    featured: true,
  },
  {
    id: 2,
    title: "Web3 Frontend Engineer",
    company: "MetaVerse Studios",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$100k - $150k",
    tags: ["React", "TypeScript", "Ethers.js", "IPFS"],
    description: "Create immersive Web3 experiences for the next generation of users in the metaverse.",
    requirements: [
      "3+ years of React development experience",
      "Strong TypeScript skills",
      "Experience with Web3 integration",
      "Knowledge of IPFS and decentralized storage",
    ],
    posted: "2024-01-12T14:30:00Z",
    featured: false,
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")
  const location = searchParams.get("location")
  const type = searchParams.get("type")

  let filteredJobs = jobs

  if (search) {
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())),
    )
  }

  if (location) {
    filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()))
  }

  if (type) {
    filteredJobs = filteredJobs.filter((job) => job.type === type)
  }

  return NextResponse.json({
    jobs: filteredJobs,
    total: filteredJobs.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, company, location, jobType, salary, tags, description, requirements, contactEmail, paymentHash } =
      body

    // Validate required fields
    if (!title || !company || !location || !jobType || !description || !contactEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verify payment hash if provided
    if (!paymentHash) {
      return NextResponse.json({ error: "Payment verification required" }, { status: 400 })
    }

    // In a real app, you would save to database and verify payment on blockchain
    const newJob = {
      id: jobs.length + 1,
      title,
      company,
      location,
      type: jobType,
      salary: salary || "Competitive",
      tags: tags || [],
      description,
      requirements: requirements || [],
      posted: new Date().toISOString(),
      featured: false,
      paymentHash, // Store payment verification
    }

    jobs.push(newJob)

    return NextResponse.json(newJob, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
