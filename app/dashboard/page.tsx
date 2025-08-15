"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Briefcase, Wallet, Brain, Star, MapPin, Clock, Save, Bell, Shield, Eye, Globe } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Environment } from "@react-three/drei"

function AnimatedSphere() {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial color="#6366f1" attach="material" distort={0.3} speed={1.5} roughness={0} />
    </Sphere>
  )
}

function Scene3D() {
  return (
    <div className="h-48 w-full rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <AnimatedSphere />
          <Environment preset="city" />
          <OrbitControls enableZoom={false} autoRotate />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default function DashboardPage() {
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    bio: "Passionate Web3 developer with 5+ years of experience in blockchain technology and DeFi protocols.",
    location: "San Francisco, CA",
    skills: "React, Solidity, Web3.js, Node.js, TypeScript",
    experience: "Senior",
    profileCompletion: 85,
    walletConnected: true,
    walletAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
  })

  const [settings, setSettings] = useState({
    emailNotifications: true,
    jobAlerts: true,
    profileVisibility: "public",
    twoFactorAuth: false,
    darkMode: false,
    language: "en",
  })

  const [isEditing, setIsEditing] = useState(false)

  const [applications] = useState([
    {
      id: 1,
      company: "DeFi Protocol",
      position: "Senior Blockchain Developer",
      status: "Interview Scheduled",
      appliedDate: "2024-01-15",
      salary: "$120k - $180k",
    },
    {
      id: 2,
      company: "MetaVerse Studios",
      position: "Web3 Frontend Engineer",
      status: "Under Review",
      appliedDate: "2024-01-12",
      salary: "$100k - $150k",
    },
  ])

  const [recommendations] = useState([
    {
      id: 1,
      title: "Smart Contract Developer",
      company: "Blockchain Labs",
      match: 95,
      location: "Remote",
      type: "Full-time",
    },
    {
      id: 2,
      title: "DeFi Protocol Engineer",
      company: "Yield Farming Co",
      match: 88,
      location: "San Francisco",
      type: "Full-time",
    },
  ])

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Here you would typically save to backend
    console.log("[v0] Profile saved:", user)
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    console.log("[v0] Setting updated:", key, value)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-4 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Track your applications and discover new opportunities in Web3</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Profile Completion</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{user.profileCompletion}%</div>
              <Progress value={user.profileCompletion} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Active Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{applications.length}</div>
              <p className="text-xs text-muted-foreground">+2 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">AI Matches</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{recommendations.length}</div>
              <p className="text-xs text-muted-foreground">New recommendations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Wallet Status</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-xl font-bold">{user.walletConnected ? "Connected" : "Disconnected"}</div>
              <p className="text-xs text-muted-foreground truncate">
                {user.walletConnected ? user.walletAddress : "Connect wallet"}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="applications" className="text-xs md:text-sm">
              Applications
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="text-xs md:text-sm">
              AI Matches
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-xs md:text-sm">
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs md:text-sm">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Track the status of your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg space-y-2 md:space-y-0"
                    >
                      <div className="space-y-1">
                        <h3 className="font-semibold">{app.position}</h3>
                        <p className="text-sm text-muted-foreground">{app.company}</p>
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-xs text-muted-foreground space-y-1 md:space-y-0">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Applied {app.appliedDate}
                          </span>
                          <span>{app.salary}</span>
                        </div>
                      </div>
                      <div className="text-left md:text-right">
                        <Badge variant={app.status === "Interview Scheduled" ? "default" : "secondary"}>
                          {app.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Job Recommendations</CardTitle>
                <CardDescription>Personalized job matches based on your skills and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg space-y-3 md:space-y-0"
                    >
                      <div className="space-y-1">
                        <h3 className="font-semibold">{rec.title}</h3>
                        <p className="text-sm text-muted-foreground">{rec.company}</p>
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-xs text-muted-foreground space-y-1 md:space-y-0">
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {rec.location}
                          </span>
                          <span>{rec.type}</span>
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col items-start md:items-end space-x-4 md:space-x-0 md:space-y-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{rec.match}% match</span>
                        </div>
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Manage your personal and professional details</CardDescription>
                    </div>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                    >
                      {isEditing ? (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </>
                      ) : (
                        "Edit Profile"
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            value={user.name}
                            onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground">{user.name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        {isEditing ? (
                          <Input
                            id="location"
                            value={user.location}
                            onChange={(e) => setUser((prev) => ({ ...prev, location: e.target.value }))}
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground">{user.location}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience Level</Label>
                        {isEditing ? (
                          <Select
                            value={user.experience}
                            onValueChange={(value) => setUser((prev) => ({ ...prev, experience: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Junior">Junior</SelectItem>
                              <SelectItem value="Mid-level">Mid-level</SelectItem>
                              <SelectItem value="Senior">Senior</SelectItem>
                              <SelectItem value="Lead">Lead</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-sm text-muted-foreground">{user.experience}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      {isEditing ? (
                        <Textarea
                          id="bio"
                          value={user.bio}
                          onChange={(e) => setUser((prev) => ({ ...prev, bio: e.target.value }))}
                          rows={3}
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">{user.bio}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills</Label>
                      {isEditing ? (
                        <Textarea
                          id="skills"
                          value={user.skills}
                          onChange={(e) => setUser((prev) => ({ ...prev, skills: e.target.value }))}
                          placeholder="Enter skills separated by commas"
                          rows={2}
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">{user.skills}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Web3 Wallet</Label>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-3 border rounded-lg space-y-2 md:space-y-0">
                        <div>
                          <p className="text-sm font-medium">
                            Status: {user.walletConnected ? "Connected" : "Not Connected"}
                          </p>
                          {user.walletConnected && (
                            <p className="text-xs text-muted-foreground truncate">{user.walletAddress}</p>
                          )}
                        </div>
                        <Button variant="outline" size="sm">
                          {user.walletConnected ? "Disconnect" : "Connect Wallet"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Visualization</CardTitle>
                    <CardDescription>Your Web3 career journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Scene3D />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Profile Views</span>
                      <span className="font-semibold">127</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Applications Sent</span>
                      <span className="font-semibold">{applications.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Response Rate</span>
                      <span className="font-semibold">68%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notifications
                  </CardTitle>
                  <CardDescription>Manage your notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Job Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified about new job matches</p>
                    </div>
                    <Switch
                      checked={settings.jobAlerts}
                      onCheckedChange={(checked) => handleSettingChange("jobAlerts", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    Privacy
                  </CardTitle>
                  <CardDescription>Control your profile visibility</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Profile Visibility</Label>
                    <Select
                      value={settings.profileVisibility}
                      onValueChange={(value) => handleSettingChange("profileVisibility", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="connections">Connections Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Security
                  </CardTitle>
                  <CardDescription>Secure your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                    />
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Change Password
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Preferences
                  </CardTitle>
                  <CardDescription>Customize your experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Toggle dark theme</p>
                    </div>
                    <Switch
                      checked={settings.darkMode}
                      onCheckedChange={(checked) => handleSettingChange("darkMode", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
