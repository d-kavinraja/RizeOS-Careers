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
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const jobId = Number.parseInt(params.id)
  const job = jobs.find((j) => j.id === jobId)

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 })
  }

  return NextResponse.json(job)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const jobId = Number.parseInt(params.id)
    const jobIndex = jobs.findIndex((j) => j.id === jobId)

    if (jobIndex === -1) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    const body = await request.json()
    const updatedJob = { ...jobs[jobIndex], ...body }
    jobs[jobIndex] = updatedJob

    return NextResponse.json(updatedJob)
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const jobId = Number.parseInt(params.id)
  const jobIndex = jobs.findIndex((j) => j.id === jobId)

  if (jobIndex === -1) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 })
  }

  jobs.splice(jobIndex, 1)
  return NextResponse.json({ message: "Job deleted successfully" })
}
